/**
 * MVP 验证脚本
 * 检查所有页面的关键要素和链接完整性
 */

const fs = require('fs');
const path = require('path');

// 定义需要检查的页面
const pages = [
  { file: 'index.html', name: '首页' },
  { file: 'portfolio.html', name: '作品集页面' },
  { file: 'notes.html', name: '学习笔记列表页' },
  { file: 'life.html', name: '生活记录列表页' },
  { file: 'about.html', name: '关于我页面' }
];

// 验证结果
const results = {
  passed: [],
  failed: [],
  warnings: []
};

/**
 * 检查文件是否存在
 */
function checkFileExists(filePath) {
  return fs.existsSync(filePath);
}

/**
 * 检查 HTML 文件的基本结构
 */
function validateHTMLStructure(filePath, pageName) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const checks = [];

  // 检查基本 HTML 结构
  if (!content.includes('<!DOCTYPE html>')) {
    checks.push(`❌ 缺少 DOCTYPE 声明`);
  }
  if (!content.includes('<html')) {
    checks.push(`❌ 缺少 <html> 标签`);
  }
  if (!content.includes('<head>')) {
    checks.push(`❌ 缺少 <head> 标签`);
  }
  if (!content.includes('<body>')) {
    checks.push(`❌ 缺少 <body> 标签`);
  }

  // 检查 meta viewport
  if (!content.includes('name="viewport"')) {
    checks.push(`⚠️  缺少 viewport meta 标签（响应式必需）`);
  }

  // 检查导航栏
  if (!content.includes('<nav') && !content.includes('class="nav')) {
    checks.push(`⚠️  可能缺少导航栏`);
  }

  // 检查 CSS 引入
  if (!content.includes('css/variables.css')) {
    checks.push(`⚠️  未引入变量样式表`);
  }

  return checks;
}

/**
 * 检查所有必需的资源文件
 */
function checkResources() {
  const resources = [
    'css/variables.css',
    'css/reset.css',
    'css/global.css',
    'components/nav/nav.css',
    'components/footer/footer.css',
    'assets/avatar.jpg',
    'scripts/main.js'
  ];

  const missing = [];
  resources.forEach(resource => {
    if (!checkFileExists(resource)) {
      missing.push(resource);
    }
  });

  return missing;
}

/**
 * 检查生成的笔记和生活记录
 */
function checkGeneratedContent() {
  const checks = [];

  // 检查笔记数据
  if (!checkFileExists('notes-data.json')) {
    checks.push('❌ 缺少 notes-data.json');
  } else {
    const notesData = JSON.parse(fs.readFileSync('notes-data.json', 'utf-8'));
    checks.push(`✅ 找到 ${notesData.length} 篇笔记`);
  }

  // 检查生活记录数据
  if (!checkFileExists('life-data.json')) {
    checks.push('❌ 缺少 life-data.json');
  } else {
    const lifeData = JSON.parse(fs.readFileSync('life-data.json', 'utf-8'));
    checks.push(`✅ 找到 ${lifeData.length} 条生活记录`);
  }

  return checks;
}

/**
 * 主验证函数
 */
function validate() {
  console.log('🚀 开始 MVP 验证...\n');
  console.log('=' .repeat(60));

  // 1. 检查核心页面
  console.log('\n📄 检查核心页面:\n');
  pages.forEach(page => {
    const filePath = path.join(__dirname, '..', page.file);
    if (!checkFileExists(filePath)) {
      console.log(`❌ ${page.name} (${page.file}) - 文件不存在`);
      results.failed.push(`${page.name} 文件不存在`);
    } else {
      console.log(`✅ ${page.name} (${page.file})`);
      results.passed.push(`${page.name} 文件存在`);

      // 检查 HTML 结构
      const structureIssues = validateHTMLStructure(filePath, page.name);
      if (structureIssues.length > 0) {
        structureIssues.forEach(issue => {
          console.log(`   ${issue}`);
          if (issue.startsWith('❌')) {
            results.failed.push(`${page.name}: ${issue}`);
          } else {
            results.warnings.push(`${page.name}: ${issue}`);
          }
        });
      }
    }
  });

  // 2. 检查资源文件
  console.log('\n📦 检查资源文件:\n');
  const missingResources = checkResources();
  if (missingResources.length === 0) {
    console.log('✅ 所有核心资源文件存在');
    results.passed.push('所有核心资源文件存在');
  } else {
    console.log('❌ 缺少以下资源文件:');
    missingResources.forEach(resource => {
      console.log(`   - ${resource}`);
      results.failed.push(`缺少资源: ${resource}`);
    });
  }

  // 3. 检查生成的内容
  console.log('\n📝 检查生成的内容:\n');
  const contentChecks = checkGeneratedContent();
  contentChecks.forEach(check => console.log(check));

  // 4. 总结
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 验证总结:\n');
  console.log(`✅ 通过: ${results.passed.length} 项`);
  console.log(`⚠️  警告: ${results.warnings.length} 项`);
  console.log(`❌ 失败: ${results.failed.length} 项`);

  if (results.failed.length === 0 && results.warnings.length === 0) {
    console.log('\n🎉 所有检查通过！可以继续进行浏览器测试。');
    return 0;
  } else if (results.failed.length === 0) {
    console.log('\n⚠️  存在一些警告，但不影响基本功能。');
    return 0;
  } else {
    console.log('\n❌ 存在严重问题，请修复后再继续。');
    return 1;
  }
}

// 运行验证
const exitCode = validate();
process.exit(exitCode);
