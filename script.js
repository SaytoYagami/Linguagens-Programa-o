const cardContainer = document.querySelector(".card-container");
const inputBusca = document.querySelector("#input-busca");
let dados = [];

// Função para carregar os dados do JSON.
// Será chamada assim que o script for carregado.
async function carregarDados() {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados); // Exibe todos os cards inicialmente
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
        cardContainer.innerHTML = "<p>Não foi possível carregar os personagens. Tente novamente mais tarde.</p>";
    }
}

function iniciarBusca() {
    const termoBusca = inputBusca.value.toLowerCase();
    const resultados = dados.filter(personagem => 
        personagem.nome.toLowerCase().includes(termoBusca)
    );
    renderizarCards(resultados);
}

function renderizarCards(personagens) {
    cardContainer.innerHTML = ""; // Limpa os resultados anteriores
    for (const personagem of personagens) {
        const article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
         <h2>${personagem.nome}</h2>
        <p><strong>${personagem.descricao}:</strong> ${personagem.elemento}</p>
        <p>${personagem.data_criacao}</p>
        <a href="${personagem.link}" target="_blank" rel="noopener noreferrer">Ver detalhes em DBZ Space</a>
        `;
        cardContainer.appendChild(article);
    }
}

// Carrega os dados assim que a página é aberta.
carregarDados();