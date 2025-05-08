import { initCompras } from './compras.js';
import { initVendas } from './vendas.js';
import { initFinanceiro } from './financeiro.js';
import { initRecursosHumanos } from './rh.js';
import { initProducao } from './producao.js';
import { initEstoque } from './estoque.js';

export async function loadPage(page) {
  try {
    const response = await fetch(`components/${page}.html`);
    if (!response.ok) throw new Error('Página não encontrada');
    const content = await response.text();
    document.getElementById('app').innerHTML = content;

    // Inicializar scripts específicos da página
    switch (page) {
      case 'homepage':
        initProducao(); // Inicializa produção e preços na homepage
        break;
      case 'compras':
        initCompras();
        break;
      case 'vendas':
        initVendas();
        break;
      case 'financeiro':
        initFinanceiro();
        break;
      case 'recursoshumanos':
        initRecursosHumanos();
        break;
      case 'producao-energia':
        initProducao();
        break;
      case 'estoque':
        initEstoque();
        break;
    }
  } catch (error) {
    console.error('Erro ao carregar página:', error);
    document.getElementById('app').innerHTML = '<h2>Erro ao carregar a página</h2>';
  }
}