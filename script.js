document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o contador de itens no carrinho
    let carrinhoContador = 0;
    
    // Seleciona o elemento que exibe o contador (o '0' na barra de navegação)
    const contadorElemento = document.getElementById('contador-carrinho');
    
    // Seleciona todos os botões de 'Adicionar ao Carrinho'
    // Usa 'data-id' e 'data-nome' para identificar o produto
    const botoesAdicionar = document.querySelectorAll('.adicionar-carrinho');
    
    // 1. Adiciona o Event Listener para cada botão de Adicionar
    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', (event) => {
            // Aumenta o contador do carrinho
            carrinhoContador++;
            
            // Atualiza o texto no HTML
            contadorElemento.textContent = carrinhoContador;
            
            // Opcional: Mensagem de feedback
            const produtoNome = event.target.dataset.nome || 'Bicicleta';
            console.log(`${produtoNome} (ID: ${event.target.dataset.id}) adicionada ao carrinho! Total: ${carrinhoContador}`);
            
            // Feedback visual simples
            alert(`"${produtoNome}" adicionada ao seu carrinho!`);
        });
    });

    // 2. Funcionalidade para o botão do Carrinho
    const carrinhoBtn = document.getElementById('carrinho-btn');
    carrinhoBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Impede o comportamento padrão de link para '#'
        
        if (carrinhoContador > 0) {
            alert(`Você tem ${carrinhoContador} bicicletas no seu carrinho. Hora de fechar a compra!`);
        } else {
            alert('Seu carrinho está vazio. Adicione uma bicicleta para começar a aventura!');
        }
    });

    // Observação: Para uma loja real, você precisaria de um array para armazenar
    // os detalhes dos itens adicionados, e não apenas o contador.
});