let energyPrice = 0; // Preço da energia (atualizado dinamicamente)

export function initVendas() {
  console.log('vendas.js: Inicializando vendas...');
  updateEnergyPrice();
}

export function updateEnergyPrice(updateDisplay = true) {
  energyPrice = generateRandomEnergyPrice();
  if (updateDisplay) {
    const energyPriceElement = document.getElementById('energyPrice');
    if (energyPriceElement) {
      energyPriceElement.textContent = `R$ ${energyPrice.toFixed(2).replace('.', ',')}`;
      console.log(`vendas.js: Preço da energia atualizado para R$ ${energyPrice}`);
    } else {
      console.warn('vendas.js: Elemento #energyPrice não encontrado');
    }
  }
  return energyPrice;
}

function generateRandomEnergyPrice() {
  const min = 100.0;
  const max = 150.0;
  const randomPrice = Math.random() * (max - min) + min;
  return parseFloat(randomPrice.toFixed(2));
}

export function getCurrentCash() {
  const cashElement = document.getElementById('cash');
  if (!cashElement) {
    console.warn('vendas.js: Elemento #cash não encontrado');
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
    console.warn('vendas.js: Elemento #cash não encontrado');
    return;
  }
  let cash = getCurrentCash();
  cash += amount;
  cashElement.textContent = `R$ ${cash.toFixed(2).replace('.', ',')}`;
  console.log(`vendas.js: Caixa atualizado para R$ ${cash}`);
}

export function selectMaxEnergy() {
  const energyElement = document.getElementById('energy');
  if (!energyElement) {
    console.warn('vendas.js: Elemento #energy não encontrado');
    return;
  }
  const energy = parseInt(energyElement.textContent) || 0;
  const quantityInput = document.getElementById('sellEnergyQuantity');
  if (quantityInput) {
    quantityInput.value = energy > 0 ? energy : 0;
    console.log(`vendas.js: Selecionado ${energy} kW`);
  }
}

export function openSellBox() {
  updateEnergyPrice();
  const overlay = document.getElementById('overlay-sell');
  if (overlay) {
    overlay.classList.add('active');
    console.log('vendas.js: Modal de venda aberto');
  } else {
    console.warn('vendas.js: Elemento #overlay-sell não encontrado');
  }
}

export function closeSellBox() {
  const overlay = document.getElementById('overlay-sell');
  const quantityInput = document.getElementById('sellEnergyQuantity');
  if (overlay) {
    overlay.classList.remove('active');
    console.log('vendas.js: Modal de venda fechado');
  }
  if (quantityInput) {
    quantityInput.value = '';
  }
}

export function sellEnergy() {
  const quantity = parseInt(document.getElementById('sellEnergyQuantity').value);
  const energyElement = document.getElementById('energy');
  if (!energyElement) {
    console.warn('vendas.js: Elemento #energy não encontrado');
    return;
  }
  let energy = parseInt(energyElement.textContent) || 0;

  if (isNaN(quantity) || quantity <= 0) {
    alert('Por favor, insira uma quantidade válida.');
    return;
  }

  if (energy >= quantity) {
    const energyPrice = updateEnergyPrice(false);
    const total = quantity * energyPrice;
    updateCash(total);
    energy -= quantity;
    energyElement.textContent = energy;
    closeSellBox();
    alert(`Venda concluída! Você vendeu ${quantity} kW por R$ ${total.toFixed(2).replace('.', ',')}.`);
  } else {
    alert('Energia insuficiente para essa venda.');
  }
}