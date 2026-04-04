const openButtons = document.querySelectorAll('.more-info-btn');
const overlays = document.querySelectorAll('.modal-overlay');

function closeAllModals() {
  overlays.forEach((overlay) => {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
  });
  document.body.style.overflow = '';
}

openButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modalId = button.dataset.modal;
    const overlay = document.getElementById(modalId);
    if (!overlay) return;
    closeAllModals();
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

document.querySelectorAll('.modal-close').forEach((button) => {
  button.addEventListener('click', closeAllModals);
});

overlays.forEach((overlay) => {
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeAllModals();
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeAllModals();
});
