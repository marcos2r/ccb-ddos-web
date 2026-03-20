# Manipulação e Inserção de Dados (Data Structure)

Se você for manter as atualizações de cultos, ensaios e novas congregações ativas para essa plataforma, as atualizações devem ser feitas exclusivamente no arquivo `/js/data.js`.

A arquitetura do dado é composta por dois objetos e vetores principais:
1. `locationLinks`: Dicionário chave-valor de Coordenadas (GPS)
2. `agendaSemanal`: Array contendo dias da semana, horários e bairros atrelados à ID de localização.

---

## 📍 1. Mapeamento de Coordenadas (`locationLinks`)

Este dicionário mapeia uma *String identificadora (ID)* única do bairro para um conjunto de Latitude e Longitude obtido diretamente no Google Maps.

**Exemplo do código:**
```javascript
const locationLinks = {
    'vila-planalto': '-22.222883,-54.802340',
    'aldeia-bororo': '-22.1532788,-54.8580426',
    'distrito-de-carapa': '-22.441832,-55.017601'
    /* ... */
};
```
* **Regra Importante**: A chave (ex: `vila-planalto`) não pode possuir acentuações, letras maiúsculas ou espaços. Use formato **kebab-case** (como-esse-texto).
* O valor são as direções estritas sem espaços extras, unidas por vírgula.

---

## 📅 2. Montagem dos Dias e Horários (`agendaSemanal`)

Esta é a espinha dorsal estrutural, lida em cadeia. É um vetor de *Objetos Dia*.
Cada Dia possui um campo String `dia` (Ex: "Segunda-feira") e uma lista principal de `cultos`.

### Estrutura de um bloco de Culto

Dentro de `cultos`, existem categorizações:
```javascript
{
    tipo: "rjm",
    descricao: "09:30 - RJM",
    congrs: [
        { bairro: "Vila Planalto - Central", location: "vila-planalto" },
        { bairro: "Outra Igreja", location: "outra-igreja-id" }
    ]
}
```

#### Regras:
* **`tipo`**: Referência interna usada pelos "Botões de Filtros" presentes na página inicial.
  * *Valores Disponíveis*: `"rjm"`, `"oficial"`, `"reuniao"`, `"ensaio"`. Importante usar letras minúsculas e exatamente esses termos.
* **`descricao`**: É o texto que aparecerá de forma visível sobre os listados. Se necessário inserir quebras de linha estéticas (ex: detalhar no segundo Sábado do mês), a tag HTML `<br>` é permitida.
* **`congrs`**: Vetor de casas de oração.
  * O `bairro` é o texto visível impresso na tela.
  * O `location` DEVE necessariamente ter o nome rigorosamente idêntico a chave cadastrada do `locationLinks`. (ex, se o location for `"meu-bairro"`, deve constar `"meu-bairro": "-x, -y"` no inicio do arquivo).
  * **Se as Coordenadas não existirem**: Você pode deixar o `location` em branco `""` no bloco de `locationLinks`, isso vai fazer com que o usuário não consiga clicar para abrir rotas e exibirá um alerta formatado para ele avisando a indisponibilidade.
