// Carrinho de Compras (simples lista de interesse neste exemplo)
let carrinho = [];

// Elementos do DOM
const contadorCarrinho = document.getElementById('contador-carrinho');
const totalCarrinho = document.getElementById('total-carrinho');
const botoesAdicionar = document.querySelectorAll('.adicionar-carrinho');

// Função para formatar o preço como moeda brasileira
function formatarMoeda(valor) {
    // Garante que o valor seja tratado como número antes de formatar
    return parseFloat(valor).toFixed(2).replace('.', ',');
}

// 1. Função para Adicionar uma Moto ao Carrinho (Lista de Interesse)
function adicionarAoCarrinho(event) {
    // Pega o elemento pai do botão (o produto-card)
    const card = event.target.closest('.produto-card');
    
    // Extrai os dados do HTML usando os atributos 'data-'
    const motoId = card.getAttribute('data-id');
    const nome = card.getAttribute('data-nome');
    const preco = parseFloat(card.getAttribute('data-preco'));
    
    const motoSelecionada = { id: motoId, nome: nome, preco: preco };
    
    carrinho.push(motoSelecionada);
    atualizarCarrinhoInfo();
    
    alert(`A moto "${nome}" (R$ ${formatarMoeda(preco)}) foi adicionada à sua lista de interesse. Total de itens: ${carrinho.length}.`);
}

// 2. Função para Atualizar a Contagem e o Total do Carrinho
function atualizarCarrinhoInfo() {
    const totalItens = carrinho.length;
    
    // Calcula o valor total (soma de todas as motos no carrinho)
    const totalPreco = carrinho.reduce((total, moto) => total + moto.preco, 0);

    // Atualiza o HTML
    contadorCarrinho.textContent = totalItens;
    totalCarrinho.textContent = formatarMoeda(totalPreco);
}

// Inicialização: Adiciona os event listeners a todos os botões
document.addEventListener('DOMContentLoaded', () => {
    botoesAdicionar.forEach(button => {
        button.addEventListener('click', adicionarAoCarrinho);
    });
    // Garante que o carrinho comece zerado ao carregar a página
    atualizarCarrinhoInfo(); 
});