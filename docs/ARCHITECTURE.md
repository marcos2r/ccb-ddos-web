# Arquitetura do Software (CCB Dourados Web)

O projeto **CCB - Dourados / MS** foi arquitetado sob o paradigma de **Progressive Web App (PWA)** atuando inteiramente no lado do cliente (Client-Side). Devido ao escopo e acessibilidade como fator chave, o projeto optou por zero dependências de NPM para o *build* e *deploy*, dispensando o uso de Frameworks reativos (como React ou Vue) que adicionariam *overhead* na carga inicial para usuários com conexões restritas.

## 1. Topologia da Aplicação

### 1.1 Interface de Usuário (Desktop / Mobile)
A interface baseia-se em `index.html` consumindo o `style/style.css`.
- O design atende aos preceitos do `Mobile-First`.
- Dispensa Bootstrap ou Tailwind, utilizando **Flexbox** e **CSS Grid** para lidar com os componentes da interface.

### 1.2 Gerenciamento de Dados Locais
A separação de preocupações (Separation of Concerns) isolou os dados para facilitar a vida de mantenedores leigos.
- **`data.js`**: Único ponto da verdade (Single Source of Truth). Armazena as constantes `locationLinks` e `agendaSemanal`. 
  - Isso removeu a necessidade de banco de dados SQL/NoSQL (Backendless app), já que a volumetria de congregações caberá para sempre em poucos KB, sendo extremamente rápida a leitura por array JS.

### 1.3 Lógica de Aplicação
O `script.js` carrega após o DOM (usando o atributo `defer` na head) e invoca Listeners e funções core:
- **Renderização Dinâmica**: Lê `agendaSemanal`, cria e injeta os elementos HTML no DOM (`<ul>`, `<li>` e âncoras).
- **Fuzzy Search & DOM Manipulation**: Modifica as classes `hidden` nos itens em vez de removê-los do DOM, injetando spans com a tag nativa de RegEx do JavaScript para realce.
- **Detecção Geoespacial (Fórmula de Haversine)**: Através da Web API `navigator.geolocation`, mapeia a distância geométrica real calculando a curvatura da terra baseando-se no cruzamento de variáveis (latitude/longitude do usuário com as da lista ativa no dia correspondente).

## 2. PWA (Progressive Web Application)

Para prover uma rotina similar à de aplicações de grandes Stores (Play Store/App Store), algumas regras vitais do PWA foram aplicadas:

1. **`manifest.json`**:
   Prove metadados nativos, como logotipo (em múltiplas resoluções), cores-tema do topo do celular e o display do aplicativo simulado como (`standalone` ou `fullscreen`).

2. **`sw.js` (Service Worker)**:
   Funciona como um proxy local para as requisições, ativando recursos essenciais:
   - **Offline Strategy (`Cache First` ou `Network Falling Back to Cache`)**.
   - Salva a infraestrutura visual básica nos Caches da Browser Storage após o primeiro loading, permitindo que a congregação abra a agenda mesmo quando no modo avião.

3. **Install Prompt**:
   O `script.js` escuta o evento `beforeinstallprompt` (apenas em Android/Chrome majoritários). Ele impede as barras de informação feias e agressivas e aciona um *banner de instalação local* amigável feito sob medida, mantendo um armazenamento via `sessionStorage` caso o usuário não decida instalar ali.
