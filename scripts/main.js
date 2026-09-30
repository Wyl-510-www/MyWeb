import { initNav } from '../components/nav/nav.js';
import { initCards } from '../components/cards/cards.js';
import { initFooter } from '../components/footer/footer.js';

// 初始化滚动显示动画
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// DOM 加载完成后初始化所有组件
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initCards();
  initFooter();
  initScrollReveal();
});
