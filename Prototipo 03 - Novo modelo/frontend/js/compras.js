let lastPrice = 100; // Preço inicial do barril
let barrelPrice = 0; // Preço do barril (atualizado dinamicamente)

export function initCompras() {
  console.log('compras.js: Inicializando compras...');
  updateBarrelPrice();
}

export function updateBarrelPrice() {
  barrelPrice = generateRandomBarrelPrice();
  const barrelPriceElement = document.getElementById('barrelPrice');
  if (barrelPriceElement) {
    barrelPriceElement.textContent = `R$ ${barrelPrice.toFixed(2).replace('.', ',')}`;
    barrelPriceElement.dataset.price = barrelPrice;
    console.log(`compras.js: Preço do barril atualizado para R$ ${barrelPrice}`);
  } else {
    console.warn('compras.js: Elemento #barrelPrice não encontrado');
  }
  return barrelPrice;
}

function generateRandomBarrelPrice() {
  const variation = (Math.random() - 0.5) * 20; // Variação de até ±10
  let newPrice = lastPrice + variation;
  newPrice = Math.max(50, Math.min(200, newPrice)); // Limita entre 50 e 200
  lastPrice = newPrice;
  return parseFloat(newPrice.toFixed(2));
}

export function getCurrentCash() {
  const cashElement = document.getElementById('cash');
  if (!cashElement) {
    console.warn('compras.js: Elemento #cash não encontrado');
    return 0;
  }
  let cashText = cashElement.textContent.trim();
  cashText = cashText.replace('R$', '').replace(',', '.').trim();
  const cashValue = parseFloat(cashText);
  return isNaN(cashValue) ? 0 : cashValue;
}

export function updateCash(amount) {
  const cashElement = document.getElementById('cash');
  if (!cashElement) {
    console.warn('compras.js: Elemento #cash não encontrado');
    return;
  }
  let cash = getCurrentCash();
  cash += amount;
  cashElement.textContent = `R$ ${cash.toFixed(2).replace('.', ',')}`;
  console.log(`compras.js: Caixa atualizado para R$ ${cash}`);
}

export function selectMaxBarrels() {
  const currentCash = getCurrentCash();
  const maxBarrels = Math.floor(currentCash / barrelPrice);
  const quantityInput = document.getElementById('barrelQuantity');
  if (quantityInput) {
    quantityInput.value = maxBarrels > 0 ? maxBarrels : 0;
    console.log(`compras.js: Selecionado ${maxBarrels} barris`);
  } else {
    console.warn('compras.js: Elemento #barrelQuantity não encontrado');
  }
}

export function openBuyBox() {
  updateBarrelPrice();
  const overlay = document.getElementById('overlay-buy');
  if (overlay) {
    overlay.classList.add('active');
    console.log('compras.js: Modal de compra aberto');
  } else {
    console.warn('compras.js: Elemento #overlay-buy não encontrado');
  }
}

export function closeBuyBox() {
  const overlay = document.getElementById('overlay-buy');
  const quantityInput = document.getElementById('barrelQuantity');
  if (overlay) {
    overlay.classList.remove('active');
    console.log('compras.js: Modal de compra fechado');
  }
  if (quantityInput) {
    quantityInput.value = '';
  }
}

export function buyBarrel() {
  const quantity = parseInt(document.getElementById('barrelQuantity').value);
  const barrelsElement = document.getElementById('barrels');
  if (!barrelsElement) {
    console.warn('compras.js: Elemento #barrels não encontrado');
    return;
  }
  let barrels = parseInt(barrelsElement.textContent) || 0;
  const totalCost = quantity * barrelPrice;

  if (isNaN(quantity) || quantity <= 0) {
    alert('Por favor, insira uma quantidade válida.');
    return;
  }

  if (isNaN(barrelPrice) || barrelPrice <= 0) {
    alert('Erro: Preço do barril inválido. Tente novamente.');
    return;
  }

  const currentCash = getCurrentCash();
  if (isNaN(currentCash)) {
    alert('Erro: Saldo inválido. Verifique o valor do caixa.');
    return;
  }

  if (currentCash >= totalCost) {
    updateCash(-totalCost);
    barrels += quantity;
    barrelsElement.textContent = barrels;
    closeBuyBox();
    console.log(`compras.js: Comprado ${quantity} barris por R$ ${totalCost}`);
  } else {
    alert(`Saldo insuficiente! Você tem R$ ${currentCash.toFixed(2).replace('.', ',')} e precisa de R$ ${totalCost.toFixed(2).replace('.', ',')}.`);
  }
}