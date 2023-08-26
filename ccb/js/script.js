// Função para criar uma célula de tabela
function criarCelula(texto) {
    const cell = document.createElement("td");
    cell.textContent = texto;
    return cell;
}

// Função para obter os dados do servidor e gerar a tabela dinamicamente
function obterDadosEGerarTabela() {
    const tabelaCorpo = document.getElementById("tabelaCorpo");

    fetch("http://ccbdourados.org.br:8000/dados")
        .then(response => response.json())
        .then(data => {
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
        })
        .catch(error => {
            console.error("Erro ao obter dados:", error);
        });
}

document.addEventListener("DOMContentLoaded", obterDadosEGerarTabela);