// Catálogo de Produtos
const products = [
    { id: 1, name: "Mountain Bike Extreme", price: 1800.00, image: "bike-mtb.jpg" },
    { id: 2, name: "Speed Racer Pro", price: 2500.00, image: "bike-speed.jpg" },
    { id: 3, name: "City Comfort", price: 1200.00, image: "bike-city.jpg" },
    // Adicione mais produtos conforme necessário
];

let cart = []; // Array para armazenar os itens do carrinho

// Seletores do DOM
const productList = document.getElementById('product-list');
const cartCountSpan = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalSpan = document.getElementById('cart-total');
const cartPopup = document.getElementById('cart-popup');

/**
 * Renderiza todos os produtos na página.
 */
function renderProducts() {
    productList.innerHTML = ''; // Limpa a lista antes de renderizar
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">R$ ${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
        `;
        productList.appendChild(productCard);
    });
}

/**
 * Adiciona um produto ao carrinho.
 * @param {number} productId - O ID do produto a ser adicionado.
 */
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
        updateCartDisplay();
        alert(`${product.name} adicionada ao carrinho!`);
    }
}

/**
 * Remove um item do carrinho.
 * @param {number} productId - O ID do produto a ser removido.
 */
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

/**
 * Calcula o total do carrinho.
 * @returns {number} O valor total do carrinho.
 */
function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Atualiza a exibição do carrinho (ícone e pop-up).
 */
function updateCartDisplay() {
    // 1. Atualizar contagem no ícone do cabeçalho
    const totalItems = cart.reduce((count, item) => count + item.quantity, 0);
    cartCountSpan.textContent = totalItems;

    // 2. Atualizar a lista de itens no pop-up do carrinho
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #666;">Seu carrinho está vazio.</p>';
    } else {
        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <div class="item-info">
                    <span>${item.name}</span>
                    <span>Qtd: ${item.quantity} | R$ ${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <button class="remove-item-btn" onclick="removeFromCart(${item.id})">Remover</button>
            `;
            cartItemsContainer.appendChild(itemDiv);
        });
    }

    // 3. Atualizar o total
    cartTotalSpan.textContent = calculateTotal().toFixed(2);
}

/**
 * Alterna a visibilidade do pop-up do carrinho.
 */
function toggleCart() {
    cartPopup.classList.toggle('open');
}


// Inicialização: Renderizar os produtos ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartDisplay(); // Para garantir que a contagem inicial seja 0
});