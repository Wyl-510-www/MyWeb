---
title: React Hooks 最佳实践
date: 2026-09-26
tags: [React, JavaScript]
description: useEffect、useMemo、useCallback 等 Hooks 的使用技巧和常见陷阱
readingTime: 10 分钟
---

# React Hooks 最佳实践

React Hooks 自 16.8 版本引入以来，已经成为函数组件的核心特性。本文将介绍常用 Hooks 的最佳实践和常见陷阱。

## 1. useEffect 的正确使用

### 依赖数组的重要性

`useEffect` 的依赖数组决定了副作用何时重新执行。

```javascript
import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUser(data);
    }

    fetchUser();
  }, [userId]); // ✅ 依赖 userId，当它变化时重新请求

  return <div>{user?.name}</div>;
}
```

> **重要**：遗漏依赖会导致闭包陷阱，使用过多依赖会导致不必要的重新执行。

### 清理副作用

对于订阅、定时器等副作用，必须在组件卸载时清理。

```javascript
useEffect(() => {
  const subscription = dataSource.subscribe(data => {
    setData(data);
  });

  // 返回清理函数
  return () => {
    subscription.unsubscribe();
  };
}, []);
```

### 避免无限循环

```javascript
// ❌ 错误：会导致无限循环
useEffect(() => {
  setCount(count + 1);
}, [count]); // count 变化 → 执行 effect → count 变化 → ...

// ✅ 正确：使用函数式更新
useEffect(() => {
  setCount(c => c + 1);
}, []); // 只执行一次
```

## 2. useMemo 优化计算

`useMemo` 用于缓存计算结果，避免每次渲染时重复计算。

### 何时使用 useMemo

```javascript
import { useMemo } from 'react';

function DataTable({ items, filterText }) {
  // ✅ 过滤和排序是昂贵的计算
  const filteredItems = useMemo(() => {
    return items
      .filter(item => item.name.includes(filterText))
      .sort((a, b) => a.date - b.date);
  }, [items, filterText]);

  return (
    <table>
      {filteredItems.map(item => (
        <tr key={item.id}>
          <td>{item.name}</td>
        </tr>
      ))}
    </table>
  );
}
```

### 不要过度使用

```javascript
// ❌ 没必要：简单计算不需要 useMemo
const doubled = useMemo(() => value * 2, [value]);

// ✅ 直接计算即可
const doubled = value * 2;
```

**经验法则**：只在计算明显昂贵或用于依赖对比时使用 `useMemo`。

## 3. useCallback 稳定函数引用

`useCallback` 缓存函数引用，防止子组件不必要的重新渲染。

### 配合 React.memo 使用

```javascript
import { useCallback, memo } from 'react';

// 子组件使用 memo 包裹
const Button = memo(({ onClick, children }) => {
  console.log('Button 渲染');
  return <button onClick={onClick}>{children}</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // ✅ 使用 useCallback 稳定函数引用
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []); // 依赖为空，函数引用永远不变

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <Button onClick={handleClick}>点击 {count}</Button>
      {/* text 变化时，Button 不会重新渲染 */}
    </div>
  );
}
```

### useCallback vs useMemo

```javascript
// useCallback 缓存函数本身
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

// useMemo 缓存函数的返回值
const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// 实际上 useCallback(fn, deps) 等同于 useMemo(() => fn, deps)
```

## 4. 自定义 Hooks 复用逻辑

自定义 Hooks 是提取和复用组件逻辑的最佳方式。

### 示例：useLocalStorage

```javascript
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // 从 localStorage 读取初始值
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // 值变化时写入 localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  return [value, setValue];
}

// 使用
function App() {
  const [name, setName] = useLocalStorage('userName', '');

  return (
    <input 
      value={name} 
      onChange={e => setName(e.target.value)} 
      placeholder="输入姓名"
    />
  );
}
```

### 示例：useDebounce

```javascript
import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// 使用
function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // 执行搜索 API 调用
      console.log('搜索:', debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      placeholder="搜索..."
    />
  );
}
```

## 5. Hooks 使用规则

### 只在最顶层调用 Hooks

```javascript
// ❌ 错误：在条件语句中使用
function Bad({ condition }) {
  if (condition) {
    const [state, setState] = useState(0); // 违反规则
  }
}

// ✅ 正确：始终在顶层调用
function Good({ condition }) {
  const [state, setState] = useState(0);
  
  if (condition) {
    // 使用 state
  }
}
```

### 只在 React 函数中调用 Hooks

- ✅ 在函数组件中调用
- ✅ 在自定义 Hooks 中调用
- ❌ 不在普通 JavaScript 函数中调用

## 总结清单

- [ ] `useEffect` 始终声明完整的依赖数组
- [ ] 副作用有清理逻辑时，返回清理函数
- [ ] 只在昂贵计算时使用 `useMemo`
- [ ] 配合 `React.memo` 使用 `useCallback`
- [ ] 将可复用逻辑提取为自定义 Hooks
- [ ] 遵守 Hooks 的两条规则

掌握这些最佳实践，能帮助你写出更高效、更易维护的 React 代码。
