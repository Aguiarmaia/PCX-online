import { updateBarrelPrice } from './compras.js';
import { updateEnergyPrice } from './vendas.js';

export function initProducao() {
  // Inicializa preços e produção automática na homepage ou página de produção
  try {
    const barrelPriceElement = document.getElementById('barrelPrice');
    const energyPriceElement = document.getElementById('energyPrice');
    
    if (barrelPriceElement) {
      updateBarrelPrice();
    } else {
      console.warn('Elemento #barrelPrice não encontrado. Preço do barril não atualizado.');
    }
    
    if (energyPriceElement) {
      updateEnergyPrice();
    } else {
      console.warn('Elemento #energyPrice não encontrado. Preço da energia não atualizado.');
    }
    
    startAutoProduction();
    startAutoSell();
  } catch (error) {
    console.error('Erro ao inicializar produção:', error);
  }
}

function startAutoProduction() {
  setInterval(() => {
    try {
      const energyElement = document.getElementById('energy');
      const barrelsElement = document.getElementById('barrels');
      
      if (!energyElement || !barrelsElement) {
        console.warn('Elementos #energy ou #barrels não encontrados. Produção automática pausada.');
        return;
      }

      let energy = parseInt(energyElement.textContent) || 0;
      let barrels = parseInt(barrelsElement.textContent) || 0;

      const energyPerTick = 10; // 10 kW por segundo
      const barrelsRequired = energyPerTick / 10; // 1 barril por 10 kW

      if (barrels >= barrelsRequired) {
        energy += energyPerTick;
        barrels -= barrelsRequired;
        energyElement.textContent = energy;
        barrelsElement.textContent = Math.floor(barrels);
        console.log(`Produção: +${energyPerTick} kW, -${barrelsRequired} barris`);
      } else {
        console.log('Sem barris suficientes para produzir energia.');
      }
    } catch (error) {
      console.error('Erro na produção automática:', error);
    }
  }, 1000); // A cada 1 segundo (ajustado de 120000ms)
}

function startAutoSell() {
  // Placeholder para venda automática
  console.log('Venda automática iniciada (placeholder).');
}