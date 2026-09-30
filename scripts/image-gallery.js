/**
 * 图片画廊和 Lightbox 功能
 */

(function() {
  let currentImageIndex = 0;
  let galleryImages = [];

  // 页面加载完成后初始化
  document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    createLightbox();
  });

  /**
   * 初始化图片画廊
   */
  function initializeGallery() {
    const gallery = document.querySelector('.image-gallery');
    if (!gallery) return;

    galleryImages = Array.from(gallery.querySelectorAll('.gallery-image'));

    // 为每张图片绑定点击事件
    galleryImages.forEach((img, index) => {
      img.addEventListener('click', () => {
        openLightbox(index);
      });
    });
  }

  /**
   * 创建 Lightbox 模态框
   */
  function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.id = 'lightbox';

    lightbox.innerHTML = `
      <div class="lightbox-content">
        <img src="" alt="" class="lightbox-image" id="lightbox-image">
      </div>
      <button class="lightbox-close" id="lightbox-close">&times;</button>
      <button class="lightbox-prev" id="lightbox-prev">←</button>
      <button class="lightbox-next" id="lightbox-next">→</button>
    `;

    document.body.appendChild(lightbox);

    // 使用 setTimeout 确保 DOM 元素已插入后再绑定事件
    setTimeout(() => {
      const closeBtn = document.getElementById('lightbox-close');
      const prevBtn = document.getElementById('lightbox-prev');
      const nextBtn = document.getElementById('lightbox-next');

      if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
      if (prevBtn) prevBtn.addEventListener('click', showPrevImage);
      if (nextBtn) nextBtn.addEventListener('click', showNextImage);

      // 点击遮罩关闭
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          closeLightbox();
        }
      });
    }, 0);

    // 键盘导航
    document.addEventListener('keydown', handleKeyPress);
  }

  /**
   * 打开 Lightbox
   */
  function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');

    if (galleryImages[index]) {
      lightboxImage.src = galleryImages[index].src;
      lightboxImage.alt = galleryImages[index].alt;
      lightbox.classList.add('active');
      updateNavigationButtons();
    }
  }

  /**
   * 关闭 Lightbox
   */
  function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
  }

  /**
   * 显示上一张图片
   */
  function showPrevImage() {
    if (currentImageIndex > 0) {
      currentImageIndex--;
      updateLightboxImage();
    }
  }

  /**
   * 显示下一张图片
   */
  function showNextImage() {
    if (currentImageIndex < galleryImages.length - 1) {
      currentImageIndex++;
      updateLightboxImage();
    }
  }

  /**
   * 更新 Lightbox 图片（带淡入淡出动画）
   */
  function updateLightboxImage() {
    const lightboxImage = document.getElementById('lightbox-image');
    if (galleryImages[currentImageIndex]) {
      // 淡出动画
      lightboxImage.classList.add('fade-out');

      setTimeout(() => {
        // 更新图片
        lightboxImage.src = galleryImages[currentImageIndex].src;
        lightboxImage.alt = galleryImages[currentImageIndex].alt;

        // 淡入动画
        lightboxImage.classList.remove('fade-out');
        lightboxImage.classList.add('fade-in');

        updateNavigationButtons();
      }, 300);
    }
  }

  /**
   * 更新导航按钮状态
   */
  function updateNavigationButtons() {
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    prevBtn.disabled = currentImageIndex === 0;
    nextBtn.disabled = currentImageIndex === galleryImages.length - 1;
  }

  /**
   * 处理键盘按键
   */
  function handleKeyPress(e) {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('active')) return;

    switch(e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        showPrevImage();
        break;
      case 'ArrowRight':
        showNextImage();
        break;
    }
  }
})();
