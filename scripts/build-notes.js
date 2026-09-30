/**
 * 学习笔记构建脚本
 * 将 content/notes/*.md 转换为静态 HTML 页面
 */

const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');
const matter = require('gray-matter');

// 配置路径
const CONTENT_DIR = path.join(__dirname, '../content/notes');
const OUTPUT_DIR = path.join(__dirname, '../notes');
const TEMPLATE_PATH = path.join(__dirname, 'templates/note-detail.html');
const DATA_OUTPUT = path.join(__dirname, '../notes-data.json');

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

  const notes = [];

  for (const file of mdFiles) {
    const filePath = path.join(CONTENT_DIR, file);
    const content = await fs.readFile(filePath, 'utf-8');
    const { data, content: markdown } = matter(content);

    const slug = path.basename(file, '.md');
    const html = marked(markdown);

    notes.push({
      slug,
      title: data.title || '无标题',
      date: data.date || new Date().toISOString().split('T')[0],
      tags: data.tags || [],
      description: data.description || '',
      readingTime: data.readingTime || '5 分钟',
      content: html,
      sourceFile: `content/notes/${file}`
    });
  }

  // 按日期倒序排序
  notes.sort((a, b) => new Date(b.date) - new Date(a.date));

  return notes;
}

/**
 * 生成笔记详情页 HTML
 */
async function generateNotePages(notes) {
  await fs.ensureDir(OUTPUT_DIR);
  const template = await fs.readFile(TEMPLATE_PATH, 'utf-8');

  for (const note of notes) {
    // 格式化日期为 YYYY-MM-DD
    const date = new Date(note.date);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    const html = template
      .replace(/\{\{title\}\}/g, note.title)
      .replace(/\{\{date\}\}/g, formattedDate)
      .replace(/\{\{readingTime\}\}/g, note.readingTime)
      .replace(/\{\{tags\}\}/g, note.tags.map(tag =>
        `<span class="tag">${tag}</span>`
      ).join(''))
      .replace(/\{\{content\}\}/g, note.content)
      .replace(/\{\{slug\}\}/g, note.slug)
      .replace(/\{\{sourceFile\}\}/g, note.sourceFile);

    const outputPath = path.join(OUTPUT_DIR, `${note.slug}.html`);
    await fs.writeFile(outputPath, html, 'utf-8');
    console.log(`✓ 生成: ${note.slug}.html`);
  }
}

/**
 * 生成笔记列表数据 JSON
 */
async function generateNotesData(notes) {
  const data = notes.map(note => ({
    slug: note.slug,
    title: note.title,
    date: note.date,
    tags: note.tags,
    description: note.description,
    readingTime: note.readingTime
  }));

  await fs.writeFile(DATA_OUTPUT, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`✓ 生成: notes-data.json (${data.length} 篇笔记)`);
}

/**
 * 主函数
 */
async function build() {
  console.log('🚀 开始构建学习笔记...\n');

  try {
    const notes = await readMarkdownFiles();

    if (notes.length === 0) {
      console.log('⚠️  未找到 Markdown 文件，请在 content/notes/ 目录添加 .md 文件');
      return;
    }

    console.log(`📝 找到 ${notes.length} 篇笔记\n`);

    await generateNotePages(notes);
    await generateNotesData(notes);

    console.log('\n✅ 构建完成！');
  } catch (error) {
    console.error('❌ 构建失败:', error.message);
    process.exit(1);
  }
}

// 运行构建
build();
