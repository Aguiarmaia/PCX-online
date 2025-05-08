import { loadPage } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
  // Garante que os modais estejam ocultos ao carregar a página
  const buyModal = document.getElementById('overlay-buy');
  const sellModal = document.getElementById('overlay-sell');
  if (buyModal) buyModal.classList.remove('active');
  if (sellModal) sellModal.classList.remove('active');

  // Carrega a homepage por padrão
  loadPage('homepage');
});