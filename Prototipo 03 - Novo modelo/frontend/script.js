// Função para alternar entre páginas
function showPage(pageId) {
  // Oculta todas as páginas
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));

  // Exibe a página desejada
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }
}

// Variáveis globais
let lastPrice = 100; // Preço inicial do barril
let barrelPrice = 0; // Preço do barril (atualizado dinamicamente)
let energyPrice = 0; // Preço da energia (atualizado dinamicamente)

// Inicialização
window.addEventListener('DOMContentLoaded', () => {
  // Garante que os modais estejam ocultos ao carregar a página
  document.getElementById('overlay-buy').classList.remove('active');
  document.getElementById('overlay-sell').classList.remove('active');

  // Força valor inicial do caixa
  const cashElement = document.getElementById('cash');

  // Exibe a tela inicial por padrão
  showPage('home-page');

  updateBarrelPrice(); // Atualiza o preço do barril
  updateEnergyPrice(); // Atualiza o preço da energia
  startAutoProduction(); // Inicia a produção automática de energia
  startAutoSell(); // Inicia a venda automática de energia
});

// Gerar preço aleatório do barril
function generateRandomBarrelPrice() {
  const variation = (Math.random() - 0.5) * 20; // Variação de até ±10
  let newPrice = lastPrice + variation;
  newPrice = Math.max(50, Math.min(200, newPrice)); // Limita entre 50 e 200
  lastPrice = newPrice;
  return parseFloat(newPrice.toFixed(2));
}

// Função para atualizar o preço do barril
function updateBarrelPrice() {
  barrelPrice = generateRandomBarrelPrice(); // Gera um novo preço aleatório
  const barrelPriceElement = document.getElementById('barrelPrice'); // Elemento que mostra o preço do barril
  if (barrelPriceElement) {
    barrelPriceElement.textContent = `R$ ${barrelPrice.toFixed(2).replace('.', ',')}`; // Atualiza o elemento na tela
    barrelPriceElement.dataset.price = barrelPrice; // Atualiza o atributo data-price
  }
  return barrelPrice; // Retorna o novo preço
}

// Gerar preço aleatório da energia
function generateRandomEnergyPrice() {
  const min = 100.0; // Preço mínimo da energia
  const max = 150.0; // Preço máximo da energia
  const randomPrice = Math.random() * (max - min) + min;
  return parseFloat(randomPrice.toFixed(2));
}

// Função para atualizar o preço da energia
function updateEnergyPrice(updateDisplay = true) {
  energyPrice = generateRandomEnergyPrice();
  if (updateDisplay) {
    const energyPriceElement = document.getElementById('energyPrice');
    energyPriceElement.textContent = `R$ ${energyPrice.toFixed(2).replace('.', ',')}`;
  }
  return energyPrice;
}

// Função para obter valor atual do caixa
function getCurrentCash() {
  const cashElement = document.getElementById('cash');
  let cashText = cashElement.textContent.trim();
  // Remove "R$" e substitui vírgula por ponto para conversão
  cashText = cashText.replace('R$', '').replace(',', '.').trim();
  const cashValue = parseFloat(cashText);
  return isNaN(cashValue) ? 0 : cashValue; // Retorna 0 se a conversão falhar
}

// Função para atualizar o caixa
function updateCash(amount) {
  const cashElement = document.getElementById('cash');
  let cash = getCurrentCash();
  console.log('Saldo antes:', cash, 'Alteração:', amount); // Depuração
  cash += amount;
  cashElement.textContent = `R$ ${cash.toFixed(2).replace('.', ',')}`;
  console.log('Saldo após:', cash); // Depuração
}

// Função para iniciar a produção automática de energia
function startAutoProduction() {
  setInterval(() => {
    const energyElement = document.getElementById('energy');
    const barrelsElement = document.getElementById('barrels');
    let energy = parseInt(energyElement.textContent);
    let barrels = parseInt(barrelsElement.textContent);

    // Produz 10 kW por segundo, consumindo 1 barril por 10 kW
    const energyPerTick = 10; // Quantidade de energia produzida por segundo
    const barrelsRequired = energyPerTick / 10; // 1 barril produz 10 kW

    if (barrels >= barrelsRequired) {
      energy += energyPerTick; // Adiciona energia
      barrels -= barrelsRequired; // Consome barris
      energyElement.textContent = energy;
      barrelsElement.textContent = Math.floor(barrels); // Atualiza barris (arredonda para baixo)
    } else {
      console.log('Sem barris suficientes para produzir energia.');
    }
  }, 120000); // A cada 1 segundo
}

// Função para iniciar a venda automática (placeholder)
function startAutoSell() {
  console.log('Venda automática iniciada (placeholder).');
}

// Função para selecionar a quantidade máxima de barris
function selectMaxBarrels() {
  const currentCash = getCurrentCash();
  const maxBarrels = Math.floor(currentCash / barrelPrice); // Máximo de barris que podem ser comprados
  const quantityInput = document.getElementById('barrelQuantity');
  quantityInput.value = maxBarrels > 0 ? maxBarrels : 0; // Preenche o campo
}

// Função para selecionar a quantidade máxima de energia
function selectMaxEnergy() {
  const energyElement = document.getElementById('energy');
  const energy = parseInt(energyElement.textContent);
  const quantityInput = document.getElementById('sellEnergyQuantity');
  quantityInput.value = energy > 0 ? energy : 0; // Preenche o campo
}

// Controle do Modal de Compra de Barris
function openBuyBox() {
  updateBarrelPrice(); // Atualiza o preço do barril ao abrir
  document.getElementById('overlay-buy').classList.add('active');
}

function closeBuyBox() {
  document.getElementById('overlay-buy').classList.remove('active');
  document.getElementById('barrelQuantity').value = '';
}

function buyBarrel() {
  const quantity = parseInt(document.getElementById('barrelQuantity').value); // Quantidade de barris
  const barrelsElement = document.getElementById('barrels'); // Elemento de barris
  let barrels = parseInt(barrelsElement.textContent);
  const totalCost = quantity * barrelPrice; // Custo total da compra

  if (isNaN(quantity) || quantity <= 0) {
    alert('Por favor, insira uma quantidade válida.');
    return;
  }

  if (isNaN(barrelPrice) || barrelPrice <= 0) {
    alert('Erro: Preço do barril inválido. Tente novamente.');
    return;
  }

  const currentCash = getCurrentCash();
  console.log('Tentando comprar:', quantity, 'barris. Saldo:', currentCash, 'Custo:', totalCost); // Depuração

  if (isNaN(currentCash)) {
    alert('Erro: Saldo inválido. Verifique o valor do caixa.');
    return;
  }

  if (currentCash >= totalCost) {
    updateCash(-totalCost);
    barrels += quantity;
    barrelsElement.textContent = barrels;
    closeBuyBox();
  } else {
    alert(`Saldo insuficiente! Você tem R$ ${currentCash.toFixed(2).replace('.', ',')} e precisa de R$ ${totalCost.toFixed(2).replace('.', ',')}.`);
  }
}

// Controle do Modal de Venda de Energia
function openSellBox() {
  updateEnergyPrice(); // Atualiza o preço da energia ao abrir
  document.getElementById('overlay-sell').classList.add('active');
}

function closeSellBox() {
  document.getElementById('overlay-sell').classList.remove('active');
  document.getElementById('sellEnergyQuantity').value = '';
}

// Venda de energia
function sellEnergy() {
  const quantity = parseInt(document.getElementById('sellEnergyQuantity').value);
  const energyElement = document.getElementById('energy');
  let energy = parseInt(energyElement.textContent);

  if (isNaN(quantity) || quantity <= 0) {
    alert('Por favor, insira uma quantidade válida.');
    return;
  }

  if (energy >= quantity) {
    const energyPrice = updateEnergyPrice(false); // Pega preço atual sem atualizar display
    const total = quantity * energyPrice;
    updateCash(total); // Adiciona o valor ao caixa
    energy -= quantity;
    energyElement.textContent = energy;
    closeSellBox();
    alert(`Venda concluída! Você vendeu ${quantity} kW por R$ ${total.toFixed(2).replace('.', ',')}.`);
  } else {
    alert('Energia insuficiente para essa venda.');
  }
}

function showcompras() {
  document.querySelector('.homepage').style.display = 'none';
  document.querySelector('.compras').style.display = 'block';
}

function showvendas() {
  document.querySelector('.homepage').style.display = 'none';
  document.querySelector('.vendas').style.display = 'block';
}

function showFinanceiro() {
  document.querySelector('.homepage').style.display = 'none';
  document.querySelector('.financeiro').style.display = 'block';
}

function showRecursoshumanos() {
  document.querySelector('.homepage').style.display = 'none';
  document.querySelector('.producao-energia').style.display = 'block';
}

function showProducao() {
  document.querySelector('.homepage').style.display = 'none';
  document.querySelector('.producao-energia').style.display = 'block';
}

function showEstoque() {
  document.querySelector('.homepage').style.display = 'none';
  document.querySelector('.estoque').style.display = 'block';
}

function showDashboard() {
  document.querySelector('.financeiro').style.display = 'none';
  document.querySelector('.homepage').style.display = 'block'; // Oculta a página financeiro
}

function showSection(sectionClass) {
  const allSections = document.querySelectorAll('.dashboard');
  allSections.forEach(section => section.style.display = 'none');

  const targetSection = document.querySelector(`.${sectionClass}`);
  if (targetSection) {
    targetSection.style.display = 'block';
  }
}

function showDashboard() {
  showSection('homepage');
}

function showFinanceiro() {
  showSection('financeiro');
}

function showVendas() {
  showSection('vendas');
}