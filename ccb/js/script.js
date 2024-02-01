document.addEventListener("DOMContentLoaded", function () {
    // URL da API
    const apiUrl = "http://api.ccbdourados.org.br/igrejas";

    // Elemento onde as igrejas serão exibidas
    const igrejasListElement = document.getElementById("igrejas-list");

    // Função para obter e exibir as igrejas
    async function obterIgrejas() {
        try {
            const resposta = await fetch(apiUrl);
            const dados = await resposta.json();

            // Criar cards para cada igreja
            dados.igrejas.forEach(igreja => {
                const igrejaCard = document.createElement("div");
                igrejaCard.classList.add("igreja-card");

                const icoIgreja = document.createElement("img");
                icoIgreja.src = "ccb/img/igreja.png";
                icoIgreja.alt = "Ícone da Igreja";
                igrejaCard.appendChild(icoIgreja);

                const titulo = document.createElement("h3");
                titulo.textContent = igreja.igreja;
                igrejaCard.appendChild(titulo);

                const cultosList = document.createElement("ul");
                cultosList.classList.add("cultos-list");

                // Adicionar cada culto à lista
                for (const dia in igreja.cultos) {
                    const cultoItem = document.createElement("li");
                    cultoItem.classList.add("culto-item");
                    cultoItem.textContent = `${dia}: ${igreja.cultos[dia]}`;
                    cultosList.appendChild(cultoItem);
                }

                igrejaCard.appendChild(cultosList);
                igrejasListElement.appendChild(igrejaCard);
            });
        } catch (erro) {
            console.error("Erro ao obter as igrejas:", erro);
        }
    }

    // Chamar a função para exibir as igrejas
    obterIgrejas();
});
