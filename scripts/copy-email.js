// 邮箱复制功能
document.addEventListener('DOMContentLoaded', () => {
  const copyBtn = document.getElementById('copyEmailBtn');

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = 'wyl510www@gmail.com';

      try {
        await navigator.clipboard.writeText(email);

        // 显示"已复制"提示
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '已复制!';
        copyBtn.style.background = 'var(--yellow)';
        copyBtn.style.color = 'var(--ink)';

        // 2秒后恢复原状
        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.style.background = '';
          copyBtn.style.color = '';
        }, 2000);
      } catch (err) {
        console.error('复制失败:', err);
        alert('复制失败，请手动复制邮箱地址');
      }
    });
  }
});
