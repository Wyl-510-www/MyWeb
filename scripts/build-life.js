/**
 * 生活记录构建脚本
 * 将 content/life/*.md 转换为静态 HTML 页面
 */

const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');
const matter = require('gray-matter');

// 配置路径
const CONTENT_DIR = path.join(__dirname, '../content/life');
const OUTPUT_DIR = path.join(__dirname, '../life');
const TEMPLATE_PATH = path.join(__dirname, 'templates/life-detail.html');
const DATA_OUTPUT = path.join(__dirname, '../life-data.json');

// 配置 marked
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: true,
  mangle: false
});

/**
 * 读取所有 Markdown 文件
 */
async function readMarkdownFiles() {
  await fs.ensureDir(CONTENT_DIR);
  const files = await fs.readdir(CONTENT_DIR);
  const mdFiles = files.filter(f => f.endsWith('.md'));

  const records = [];

  for (const file of mdFiles) {
    const filePath = path.join(CONTENT_DIR, file);
    const content = await fs.readFile(filePath, 'utf-8');
    const { data, content: markdown } = matter(content);

    const slug = path.basename(file, '.md');
    const html = marked(markdown);

    records.push({
      slug,
      title: data.title || '无标题',
      date: data.date || new Date().toISOString().split('T')[0],
      tags: data.tags || [],
      description: data.description || '',
      images: data.images || [],
      readingTime: data.readingTime || '3 分钟',
      content: html,
      sourceFile: `content/life/${file}`
    });
  }

  // 按日期倒序排序
  records.sort((a, b) => new Date(b.date) - new Date(a.date));

  return records;
}

/**
 * 生成生活记录详情页 HTML
 */
async function generateLifePages(records) {
  await fs.ensureDir(OUTPUT_DIR);
  const template = await fs.readFile(TEMPLATE_PATH, 'utf-8');

  for (const record of records) {
    // 格式化日期为 YYYY-MM-DD
    const date = new Date(record.date);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    // 生成图片画廊 HTML
    let imagesHtml = '';
    if (record.images.length > 0) {
      imagesHtml = '<div class="image-gallery">' +
        record.images.map(img => `<img src="${img}" alt="${record.title}" loading="lazy" class="gallery-image">`).join('') +
        '</div>';
    }

    const html = template
      .replace(/\{\{title\}\}/g, record.title)
      .replace(/\{\{date\}\}/g, formattedDate)
      .replace(/\{\{readingTime\}\}/g, record.readingTime)
      .replace(/\{\{tags\}\}/g, record.tags.map(tag =>
        `<a href="../life.html?tag=${encodeURIComponent(tag)}" class="tag">${tag}</a>`
      ).join(''))
      .replace(/\{\{images\}\}/g, imagesHtml)
      .replace(/\{\{content\}\}/g, record.content)
      .replace(/\{\{slug\}\}/g, record.slug)
      .replace(/\{\{sourceFile\}\}/g, record.sourceFile);

    const outputPath = path.join(OUTPUT_DIR, `${record.slug}.html`);
    await fs.writeFile(outputPath, html, 'utf-8');
    console.log(`✓ 生成: ${record.slug}.html`);
  }
}

/**
 * 生成生活记录列表数据 JSON
 */
async function generateLifeData(records) {
  const data = records.map(record => ({
    slug: record.slug,
    title: record.title,
    date: record.date,
    tags: record.tags,
    description: record.description,
    images: record.images,
    readingTime: record.readingTime
  }));

  await fs.writeFile(DATA_OUTPUT, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`✓ 生成: life-data.json (${data.length} 条记录)`);
}

/**
 * 主函数
 */
async function build() {
  console.log('🚀 开始构建生活记录...\n');

  try {
    const records = await readMarkdownFiles();

    if (records.length === 0) {
      console.log('⚠️  未找到 Markdown 文件，请在 content/life/ 目录添加 .md 文件');
      return;
    }

    console.log(`📝 找到 ${records.length} 条记录\n`);

    await generateLifePages(records);
    await generateLifeData(records);

    console.log('\n✅ 构建完成！');
  } catch (error) {
    console.error('❌ 构建失败:', error.message);
    process.exit(1);
  }
}

// 运行构建
build();
