export function initFooter() {
  const stack = document.getElementById('contactStack');

  if (!stack) return;

  window.flipContactStack = function() {
    const cards = [...stack.children];
    const first = cards[0];

    first.style.transform = 'translateX(-120%) rotate(-5deg)';
    first.style.opacity = '0';

    setTimeout(() => {
      stack.appendChild(first);
      first.style.transform = '';
      first.style.opacity = '';

      [...stack.children].forEach((card, i) => {
        card.style.zIndex = 3 - i;
        if (i === 0) {
          card.style.transform = 'translateY(0) scale(1)';
          card.style.opacity = '1';
        } else if (i === 1) {
          card.style.transform = 'translateY(12px) scale(0.96)';
          card.style.opacity = '0.8';
        }
      });
    }, 300);
  };
}
