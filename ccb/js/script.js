// Função para criar uma célula de tabela
function criarCelula(texto) {
    const cell = document.createElement("td");
    cell.textContent = texto;
    return cell;
}

async function obterDados() {
    return fetch("http://ccbdourados.org.br:8000/dados")
        .then(response => response.json())
        .catch(error => {
            console.error("Erro ao obter dados: ", error);
        });
}

// Função para obter os dados do servidor e gerar a tabela dinamicamente
function gerarTabela(data) {
    const tabelaCorpo = document.getElementById("tabelaCorpo");
    tabelaCorpo.innerHTML = "";

    for (const dado of data) {
        const linha = document.createElement("tr");

        linha.appendChild(criarCelula(dado.cod));
        linha.appendChild(criarCelula(dado.igreja));
        linha.appendChild(criarCelula(dado.domingo));
        linha.appendChild(criarCelula(dado.segunda));
        linha.appendChild(criarCelula(dado.terca));
        linha.appendChild(criarCelula(dado.quarta));
        linha.appendChild(criarCelula(dado.quinta));
        linha.appendChild(criarCelula(dado.sexta));
        linha.appendChild(criarCelula(dado.sabado));

        tabelaCorpo.appendChild(linha);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    obterDados().then(data => {
        if (data) {
            gerarTabela(data)
        }
    });
});
