/**
 * 生活记录标签筛选功能
 */

(function() {
  let allRecords = [];
  let currentTag = null;

  // 页面加载完成后初始化
  document.addEventListener('DOMContentLoaded', async function() {
    try {
      // 加载生活记录数据
      const response = await fetch('life-data.json');
      allRecords = await response.json();

      // 提取所有唯一标签
      const allTags = new Set();
      allRecords.forEach(record => {
        if (record.tags && Array.isArray(record.tags)) {
          record.tags.forEach(tag => allTags.add(tag));
        }
      });

      // 渲染标签筛选按钮
      renderTagFilters(Array.from(allTags));

      // 读取 URL 参数
      const urlParams = new URLSearchParams(window.location.search);
      const tagParam = urlParams.get('tag');

      if (tagParam) {
        currentTag = tagParam;
        filterRecords(tagParam);
      } else {
        renderRecords(allRecords);
      }

    } catch (error) {
      console.error('加载生活记录数据失败:', error);
      showEmptyState();
    }
  });

  /**
   * 渲染标签筛选按钮
   */
  function renderTagFilters(tags) {
    const filterContainer = document.querySelector('.tags-filter');
    if (!filterContainer) return;

    // 清空容器
    filterContainer.innerHTML = '';

    // 添加"显示全部"按钮
    const allBtn = document.createElement('button');
    allBtn.className = 'tag-filter-btn all-btn';
    allBtn.textContent = '显示全部';
    allBtn.addEventListener('click', () => {
      currentTag = null;
      updateURL(null);
      renderRecords(allRecords);
      updateActiveTag(null);
    });
    filterContainer.appendChild(allBtn);

    // 添加标签按钮
    tags.forEach(tag => {
      const btn = document.createElement('button');
      btn.className = 'tag-filter-btn';
      btn.textContent = tag;
      btn.dataset.tag = tag;
      btn.addEventListener('click', () => {
        currentTag = tag;
        updateURL(tag);
        filterRecords(tag);
        updateActiveTag(tag);
      });
      filterContainer.appendChild(btn);
    });

    // 初始化激活状态
    updateActiveTag(currentTag);
  }

  /**
   * 更新激活状态
   */
  function updateActiveTag(tag) {
    const allBtns = document.querySelectorAll('.tag-filter-btn');
    allBtns.forEach(btn => {
      if (tag === null) {
        btn.classList.toggle('active', btn.classList.contains('all-btn'));
      } else {
        btn.classList.toggle('active', btn.dataset.tag === tag);
      }
    });
  }

  /**
   * 筛选记录
   */
  function filterRecords(tag) {
    const filtered = allRecords.filter(record => {
      return record.tags && record.tags.includes(tag);
    });
    renderRecords(filtered);
  }

  /**
   * 渲染记录列表
   */
  function renderRecords(records) {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;

    // 清空时间线
    timeline.innerHTML = '';

    if (records.length === 0) {
      showEmptyState();
      return;
    }

    // 渲染每条记录
    records.forEach(record => {
      const item = createRecordItem(record);
      timeline.appendChild(item);
    });
  }

  /**
   * 创建记录项
   */
  function createRecordItem(record) {
    const item = document.createElement('div');
    item.className = 'timeline-item';

    // 日期标签
    const dateLabel = document.createElement('div');
    dateLabel.className = 'timeline-date';
    dateLabel.textContent = formatDate(record.date);
    item.appendChild(dateLabel);

    // 卡片容器
    const card = document.createElement('div');
    card.className = 'life-card';
    card.addEventListener('click', () => {
      window.location.href = `life/${record.slug}.html`;
    });

    // 封面图片
    if (record.images && record.images.length > 0) {
      const img = document.createElement('img');
      img.src = new URL(record.images[0], new URL('life/', window.location.href)).href;
      img.alt = record.title;
      img.className = 'life-card-image';
      img.loading = 'lazy';
      card.appendChild(img);
    }

    // 标题
    const title = document.createElement('h3');
    title.className = 'life-card-title';
    title.textContent = record.title;
    card.appendChild(title);

    // 日期
    const date = document.createElement('div');
    date.className = 'life-card-date';
    date.textContent = formatDate(record.date);
    card.appendChild(date);

    // 描述
    if (record.description) {
      const desc = document.createElement('p');
      desc.className = 'life-card-description';
      desc.textContent = record.description;
      card.appendChild(desc);
    }

    // 标签
    if (record.tags && record.tags.length > 0) {
      const tagsContainer = document.createElement('div');
      tagsContainer.className = 'life-card-tags';
      record.tags.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'life-card-tag';
        tagSpan.textContent = tag;
        tagsContainer.appendChild(tagSpan);
      });
      card.appendChild(tagsContainer);
    }

    item.appendChild(card);
    return item;
  }

  /**
   * 格式化日期
   */
  function formatDate(dateStr) {
    if (/^\d{4}-\d{2}$/.test(dateStr)) {
      return `${dateStr.slice(0, 4)}年${Number(dateStr.slice(5))}月`;
    }
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日`;
  }

  /**
   * 更新 URL 参数
   */
  function updateURL(tag) {
    const url = new URL(window.location);
    if (tag) {
      url.searchParams.set('tag', tag);
    } else {
      url.searchParams.delete('tag');
    }
    window.history.pushState({}, '', url);
  }

  /**
   * 显示空状态
   */
  function showEmptyState() {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;

    timeline.innerHTML = `
      <div class="empty-state">
        <p>暂无生活记录</p>
      </div>
    `;
  }
})();
