/**
 * 链接完整性检查脚本
 * 检查所有 HTML 文件中的内部链接是否有效
 */

const fs = require('fs');
const path = require('path');

// 收集所有 HTML 文件
function collectHTMLFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // 排除 node_modules、设计系统目录和模板目录
      if (file !== 'node_modules' && file !== 'esther-design-system-main' && file !== '.git' && file !== 'templates') {
        collectHTMLFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * 提取 HTML 文件中的所有链接
 */
function extractLinks(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const links = [];

  // 匹配 href="..." 和 src="..."
  const hrefRegex = /href=["']([^"']+)["']/g;
  const srcRegex = /src=["']([^"']+)["']/g;

  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    const href = match[1];
    // 只检查内部链接（相对路径）
    if (!href.startsWith('http://') && !href.startsWith('https://') && !href.startsWith('mailto:') && !href.startsWith('#')) {
      links.push({ type: 'href', url: href });
    }
  }

  while ((match = srcRegex.exec(content)) !== null) {
    const src = match[1];
    // 只检查内部资源（相对路径）
    if (!src.startsWith('http://') && !src.startsWith('https://') && !src.startsWith('//')) {
      links.push({ type: 'src', url: src });
    }
  }

  return links;
}

/**
 * 检查文件是否存在
 */
function checkLink(baseDir, htmlFilePath, link) {
  const htmlDir = path.dirname(htmlFilePath);
  let targetPath;

  // 移除 URL 参数和锚点
  const cleanUrl = link.url.split('?')[0].split('#')[0];

  if (cleanUrl.startsWith('/')) {
    // 绝对路径（从根目录）
    targetPath = path.join(baseDir, cleanUrl);
  } else {
    // 相对路径
    targetPath = path.join(htmlDir, cleanUrl);
  }

  return fs.existsSync(targetPath);
}

/**
 * 主函数
 */
function main() {
  console.log('🔍 开始检查链接完整性...\n');

  const baseDir = path.join(__dirname, '..');
  const htmlFiles = collectHTMLFiles(baseDir);

  console.log(`📄 找到 ${htmlFiles.length} 个 HTML 文件\n`);

  let totalLinks = 0;
  let brokenLinks = 0;
  const issues = [];

  htmlFiles.forEach(filePath => {
    const relativePath = path.relative(baseDir, filePath);
    const links = extractLinks(filePath);

    if (links.length === 0) {
      return;
    }

    totalLinks += links.length;

    links.forEach(link => {
      const exists = checkLink(baseDir, filePath, link);

      if (!exists) {
        brokenLinks++;
        issues.push({
          file: relativePath,
          link: link.url,
          type: link.type
        });
      }
    });
  });

  console.log('=' .repeat(60));
  console.log('\n📊 检查结果:\n');
  console.log(`✅ 检查的链接总数: ${totalLinks}`);
  console.log(`❌ 损坏的链接数: ${brokenLinks}`);

  if (brokenLinks > 0) {
    console.log('\n🔴 发现以下损坏的链接:\n');
    issues.forEach(issue => {
      console.log(`  文件: ${issue.file}`);
      console.log(`  链接: ${issue.link} (${issue.type})`);
      console.log('');
    });
    return 1;
  } else {
    console.log('\n🎉 所有链接都有效！');
    return 0;
  }
}

const exitCode = main();
process.exit(exitCode);
