export function initCards() {
  const cards = document.querySelectorAll('.nav-card');

  cards.forEach(card => {
    card.addEventListener('click', function() {
      this.classList.toggle('flipped');
    });
  });
}
