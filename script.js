// Dados das Motocicletas
const motos = [
    { id: 101, nome: "Esportiva GT 1000", preco: 45000.00, imagem: "https://via.placeholder.com/350x200?text=Moto+Esportiva" },
    { id: 102, nome: "Custom Cruiser 850", preco: 38500.00, imagem: "https://via.placeholder.com/350x200?text=Moto+Custom" },
    { id: 103, nome: "Trail Aventura XA", preco: 28990.00, imagem: "https://via.placeholder.com/350x200?text=Moto+Trail" },
    { id: 104, nome: "Urbana Commuter 150", preco: 12500.00, imagem: "https://via.placeholder.com/350x200?text=Moto+Urbana" }
];

// Carrinho de Compras (simples lista de interesse neste exemplo)
let carrinho = [];

// Elementos do DOM
const listaProdutos = document.getElementById('lista-produtos');
const contadorCarrinho = document.getElementById('contador-carrinho');
const totalCarrinho = document.getElementById('total-carrinho');

// Função para formatar o preço como moeda brasileira
function formatarMoeda(valor) {
    return valor.toFixed(2).replace('.', ',');
}

// 1. Função para Renderizar as Motos na Página
function renderizarMotos() {
    listaProdutos.innerHTML = ''; // Limpa antes de adicionar
    motos.forEach(moto => {
        const produtoCard = document.createElement('div');
        produtoCard.classList.add('produto-card');
        
        produtoCard.innerHTML = `
            <img src="${moto.imagem}" alt="${moto.nome}">
            <h3>${moto.nome}</h3>
            <p class="preco">R$ ${formatarMoeda(moto.preco)}</p>
            <p>12x de R$ ${formatarMoeda(moto.preco / 12)}</p>
            <button class="adicionar-carrinho" data-id="${moto.id}">QUERO ESSA MOTO!</button>
        `;

        listaProdutos.appendChild(produtoCard);
    });

    // Adiciona event listeners (ouvintes de evento) aos botões
    document.querySelectorAll('.adicionar-carrinho').forEach(button => {
        button.addEventListener('click', adicionarAoCarrinho);
    });
}

// 2. Função para Adicionar uma Moto ao Carrinho (Lista de Interesse)
function adicionarAoCarrinho(event) {
    const motoId = parseInt(event.target.getAttribute('data-id'));
    const moto = motos.find(m => m.id === motoId);
    
    if (moto) {
        carrinho.push(moto);
        atualizarCarrinhoInfo();
        alert(`A moto "${moto.nome}" foi adicionada à sua lista de interesse. Entraremos em contato!`);
    }
}

// 3. Função para Atualizar a Contagem e o Total do Carrinho
function atualizarCarrinhoInfo() {
    const totalItens = carrinho.length;
    
    // Calcula o valor total (soma de todas as motos no carrinho)
    const totalPreco = carrinho.reduce((total, moto) => total + moto.preco, 0);

    // Atualiza o HTML
    contadorCarrinho.textContent = totalItens;
    totalCarrinho.textContent = formatarMoeda(totalPreco);
}

// Inicialização: Renderiza as motos quando a página carrega
document.addEventListener('DOMContentLoaded', renderizarMotos);