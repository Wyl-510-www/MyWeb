/**
 * 笔记列表页标签筛选功能
 */

// 全局变量
let allNotes = [];
let allTags = new Set();

/**
 * 初始化页面
 */
async function init() {
  try {
    // 加载笔记数据
    const response = await fetch('notes-data.json');
    allNotes = await response.json();

    // 提取所有唯一标签
    allNotes.forEach(note => {
      note.tags.forEach(tag => allTags.add(tag));
    });

    // 渲染标签筛选器
    renderTagFilter();

    // 渲染笔记卡片
    renderNoteCards(allNotes);

    // 检查 URL 参数
    const urlParams = new URLSearchParams(window.location.search);
    const tagParam = urlParams.get('tag');
    if (tagParam && allTags.has(tagParam)) {
      filterByTag(tagParam);
      highlightActiveTag(tagParam);
    }
  } catch (error) {
    console.error('加载笔记数据失败:', error);
    document.getElementById('notes-grid').innerHTML = '<p style="text-align:center;color:var(--ink-light);">加载失败，请刷新页面重试</p>';
  }
}

/**
 * 渲染标签筛选器
 */
function renderTagFilter() {
  const tagFilter = document.querySelector('.tag-filter');

  // 为每个标签创建按钮
  allTags.forEach(tag => {
    const button = document.createElement('button');
    button.className = 'tag-btn';
    button.textContent = tag;
    button.dataset.tag = tag;
    button.onclick = () => {
      filterByTag(tag);
      highlightActiveTag(tag);
      updateURL(tag);
    };
    tagFilter.appendChild(button);
  });

  // "全部" 按钮点击事件
  const allButton = tagFilter.querySelector('[data-tag="all"]');
  allButton.onclick = () => {
    renderNoteCards(allNotes);
    highlightActiveTag('all');
    updateURL(null);
  };
}

/**
 * 渲染笔记卡片
 */
function renderNoteCards(notes) {
  const grid = document.getElementById('notes-grid');
  grid.innerHTML = '';

  notes.forEach(note => {
    const card = createNoteCard(note);
    grid.appendChild(card);
  });
}

/**
 * 创建单个笔记卡片
 */
function createNoteCard(note) {
  const card = document.createElement('div');
  card.className = 'note-card';
  card.dataset.tags = note.tags.join(',');

  // 格式化日期
  const date = new Date(note.date);
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  card.innerHTML = `
    <h3 class="note-card-title">${note.title}</h3>
    <div class="note-card-meta">
      <span class="note-card-date">📅 ${formattedDate}</span>
      <span class="note-card-reading-time">⏱️ ${note.readingTime}</span>
    </div>
    <div class="note-card-tags">
      ${note.tags.map(tag => `<span class="note-card-tag" onclick="filterByTag('${tag}'); highlightActiveTag('${tag}'); updateURL('${tag}');">${tag}</span>`).join('')}
    </div>
    <p class="note-card-description">${note.description}</p>
    <a href="notes/${note.slug}.html" class="note-card-link">阅读全文</a>
  `;

  return card;
}

/**
 * 按标签筛选笔记
 */
function filterByTag(tag) {
  const cards = document.querySelectorAll('.note-card');

  cards.forEach(card => {
    const cardTags = card.dataset.tags.split(',');
    if (cardTags.includes(tag)) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

/**
 * 高亮选中的标签按钮
 */
function highlightActiveTag(activeTag) {
  const buttons = document.querySelectorAll('.tag-btn');
  buttons.forEach(btn => {
    if (btn.dataset.tag === activeTag) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
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

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
