# Agenda de Cultos CCB - Dourados/MS

![Logo CCB](https://ccbdourados.org.br/dir/img/Logo-ccb-para-fundo-claro.png)

Este projeto é uma Aplicação Web (PWA) voltada para listar e organizar a agenda semanal de cultos e reuniões da **Congregação Cristã no Brasil (CCB)** em Dourados - Mato Grosso do Sul, englobando também regiões vizinhas (distritos, sítios e aldeias).  
O site tem como principal objetivo ajudar a irmandade a encontrar facilmente os horários de cultos oficiais, reuniões de jovens e menores (RJM) e obter as rotas de navegação até as igrejas de forma rápida, eficiente e acessível.

## 🚀 Funcionalidades Principais

* **Agenda Dinâmica**: Renderização automática dos horários dos cultos separados por dia da semana (Domingo a Sábado). O card do dia atual é destacado (auto-scroll e estilo diferenciado).
* **Filtros Ágeis**: Encontre rapidamente:
  * *Todos os cultos*
  * *RJM* (Reunião de Jovens e Menores)
  * *Culto Oficial*
  * *Reunião Evangélica*
  * *Ensaio*
* **Congregação Mais Próxima**: Utiliza dados de geolocalização do dispositivo combinados com uma fórmula matemática (*Haversine*) para encontrar o culto mais próximo válido para o dia atual, exibindo a distância exata em metros/quilômetros e a rota de navegação.
* **Busca Textual Dinâmica (Fuzzy Search)**: Permite pesquisar em tempo real por bairro ou congregação; o texto correspondente é destacado dinamicamente sem perder a capacidade do link de redirecionamento para o mapa.
* **Integração Inteligente com Maps**: A localização de cada templo listado pode ser aberta com apenas um clique diretamente no aplicativo de GPS padrão do dispositivo traçando a rota lógica até o lugar.
* **Progressive Web App (PWA)**: O site funciona offline e é otimizado para celulares. Uma notificação amigável instrui os usuários sobre a instalação, transformando o site em um App na tela incial do smartphone ou desktop (arquitetura apoiada por Web Manifest e Service Workers).
* **Recursos Adicionais e Acessibilidade**: Botão de "Voltar ao Topo" suave, links rápidos para a intranet (Siga/Webmail CCB) e opção para download de guias vitais em arquivo estático `.pdf` (Lista de Batismos e Reuniões para o Ministério).

## 🗂 Estrutura do Projeto

A lógica de programação da aplicação foi separada do banco de coordenadas, visando máxima flexibilidade em caso de expansão ou atualizações. A estrutura da árvore principal está disposta assim:

```text
ccb-ddos-web/
├── index.html         # Arquivo-mestre raiz, definindo cabeçalho, estrutura principal e chamadas de SEO/PWA.
├── js/
│   ├── data.js        # Repositório de dados isolado com os arrays/objetos de casas de oração, diário e coordenadas (lat/long).
│   └── script.js      # Lógicas de renderização, listeners de ações visuais, buscas (Regex) e cálculos espaciais da aplicação.
├── style/
│   └── style.css      # Sistema estruturado de formatações, grid-css e identidade visual inspirada nos padrões da CCB.
├── img/               # Imagens necessárias para SEO e interface e arquivos `.ico`.
├── download/          # Diretório provisionado para listagens mensais submetidas pelos encarregados (arquivos PDF estáticos).
├── manifest.json      # Definições técnicas do Web App (cores, nome, tema, ícone) usadas para exibição standalone.
└── sw.js              # Script de Service Worker encarregado do cache de requisições de assets para performance online/offline.
```

## 🛠 Tecnologias e Dependências

Para garantir máxima performance global até mesmo nos dispositivos mais básicos, a aplicação não carrega enormes e custosas bibliotecas ou frameworks (React, Angular). Em vez disso, a fundação e motor da ferramenta utilizam-se de:
* **HTML5 e Semântica Web Moderna**: Utilizando de maneira extensiva os metadados do `Open Graph` de forma amigável ao compartilhamento (via WhatsApp, Telegram).
* **CSS3 Vanilla**: Estilização rica customizada e layouts fluidamente responsíveis elaborados para `Mobile-First`. Cores em concordância total às definições oficias (`#033D60` theme app).
* **JavaScript Puro**: Lógica limpa e coesa para features matemáticas (distância entre coordenadas geográficas) e detecção dinâmica de PWA prompts, sem o "peso" na renderização.
* **Universal Google Links (No-Cost API)**: Geração de rotas em malhas utilizando as Strings universais de tráfego, ex: `https://www.google.com/maps/dir/?api=1&destination={LAT},{LONG}` diminuindo custo comercial de APIs pagas do Maps Platform permitindo tráfego ilimitado de buscas.
* **Google Analytics (`gtag.js`)**: Coleta controlada de eventos (`filtro_clicado`, `pesquisa_realizada`, `nearest_church_used`), permitindo acompanhar relatórios métricos sobre interações dos usuários e adoção de inovações sem ferir normas pesadas de privacidade.

## 💻 Como Executar Localmente

Sendo uma aplicação voltada para processamento *Client-Side* sem depedências complexas do NPM vinculadas ao projeto final, iniciar o desenvolvimento local é tão prático quanto sua utilização na nuvem:

1. Faça o clone ou o fork direto desta página da máquina principal (necessário ter o `git` configurado):
   ```bash
   git clone https://github.com/SeuUsuario/ccb-ddos-web.git
   ```
   
2. Acesse a pasta do terminal recém criada:
   ```bash
   cd ccb-ddos-web
   ```

3. Abra o projeto na IDE suportada de sua preferência (ex: *VS Code*). Embora o site opere abrindo o `index.html` em uma aba do navegador, visando conseguir rodar livremente test flights com o **Service Worker** (que requer conexões sob TLS na web ou localhost na máquina) você deverá usar um `Live Server`:
   - Utilizando o pacote *NPM*: instale `npm i -g serve` e rode: `serve .` no terminal alocado neste repositório.
   - Utilizando a Extensão Padrão do *VS Code*: Pressione **Go Live** no rodapé (Live Server by Ritwick Dey). 
```
