export function initEstoque() {
    // Configurar eventos ou atualizar UI, se necessário
  }
  
  export function adicionarProduto() {
    const nome = document.getElementById('nomeProduto').value;
    const quantidade = parseInt(document.getElementById('quantidadeProduto').value);
    const preco = parseFloat(document.getElementById('precoProduto').value);
  
    if (nome && quantidade > 0 && preco > 0) {
      // Lógica para adicionar produto (ex.: salvar em localStorage ou API)
      alert(`Produto ${nome} adicionado com sucesso!`);
      document.getElementById('nomeProduto').value = '';
      document.getElementById('quantidadeProduto').value = '';
      document.getElementById('precoProduto').value = '';
    } else {
      alert('Preencha todos os campos corretamente!');
    }
  }