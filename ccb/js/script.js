// Função que cria e retorna uma nova célula de tabela (td) com o texto fornecido.
function criarCelula(texto) {
    const cell = document.createElement("td"); // Cria um elemento <td>
    cell.textContent = texto; // Define o texto da célula como o valor fornecido
    return cell; // Retorna a célula criada
}

// Função assíncrona que obtém dados de uma URL usando a API fetch.
async function obterDados() {
    try {
        const response = await fetch("http://ccbdourados.org.br:8000/igrejas"); // Faz a requisição
        const data = await response.json(); // Converte a resposta para JSON
        return data; // Retorna os dados obtidos
    } catch (error) {
        console.error("Erro ao obter dados: ", error); // Mostra um erro se algo der errado
    }
}

// Função que gera uma tabela com base nos dados fornecidos.
function gerarTabela(data) {
    const tabelaCorpo = document.getElementById("tabelaCorpo"); // Obtém o corpo da tabela pelo ID
    tabelaCorpo.innerHTML = ""; // Limpa o conteúdo atual da tabela

    // Itera sobre os dados e cria uma nova linha (tr) para cada conjunto de dados.
    for (const dado of data) {
        const linha = document.createElement("tr"); // Cria uma nova linha

        // Para cada dado, cria células de tabela (td) e atribui os valores correspondentes.
        linha.appendChild(criarCelula(dado.cod));
        linha.appendChild(criarCelula(dado.igreja));
        linha.appendChild(criarCelula(dado.domingo));
        linha.appendChild(criarCelula(dado.segunda));
        linha.appendChild(criarCelula(dado.terca));
        linha.appendChild(criarCelula(dado.quarta));
        linha.appendChild(criarCelula(dado.quinta));
        linha.appendChild(criarCelula(dado.sexta));
        linha.appendChild(criarCelula(dado.sabado));

        tabelaCorpo.appendChild(linha); // Adiciona a linha à tabela
    }
}

// Aguarda o evento de carregamento do DOM para iniciar as ações.
document.addEventListener("DOMContentLoaded", () => {
    // Chama a função para obter dados e, se houver dados válidos, gera a tabela.
    obterDados().then(data => {
        if (data) {
            gerarTabela(data);
        }
    });
});