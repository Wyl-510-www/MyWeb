/**
 * 阅读进度条
 * 监听页面滚动，更新顶部进度条
 */

(function() {
  const progressBar = document.getElementById('reading-progress');

  if (!progressBar) return;

  function updateProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;

    progressBar.style.width = scrolled + '%';
  }

  window.addEventListener('scroll', updateProgress);
  window.addEventListener('resize', updateProgress);

  updateProgress();
})();
