# Changelog

Todas as mudanças notáveis para o projeto **CCB Dourados - Agenda** serão documentadas de forma sucinta neste arquivo.

## [Unreleased]
### Added
- Documentação técnica e arquitetural completa do projeto (`README.md`, `CONTRIBUTING.md`, e pasta `docs/` com detalhamentos de `DATA` e `ARCHITECTURE`).

## [1.1.0] - 2026-03-19
### Added
- Cadastro em banco local `data.js` da Casa de Oração **Distrito de Carapã** contendo sua rota geográfica e coordenada (`-22.441832, -55.017601`) listado ativamente aos finais de semana (Sábado - 19:30 hs).
- Injeção da Casa de Oração **Laguna Carapã** com sua rota de link exata unida ao Google Maps (`-22.560514, -55.153515`) abrindo cultos de Domingos as 19:30 hs e Quartas-feiras no mesmo horário.

### Fixed
- **Filtro de Rotas DOM (Bugfix Crítico)**: Correção na rotina interativa de filtragem rápida e Busca Textual ("Fuzzy Search") para impedir que as âncoras html contendo a rota geográfica do Maps sumissem e fossem convertidos para texto puro (`element.innerHTML = ''`). A função nativa agora manipula apenas o `.textContent` mantendo o objeto Link e DOM intocados e íntegros.

## [1.0.0] - Lançamento Base (Release)
### Added
- Divisão escalonável do front-end (`script.js`) separado dos repositórios (`data.js`).
- Renderização limpa da *Agenda Semanal* e dias de relatórios com Highlights para destacar o card pertinente ao "dia atual" usando Auto-Scroll.
- Input de busca dinâmica textual em toda as listas (Live Search Highlights).
- Filtros segmentados por "Todos", "RJM", "Oficial", "Ensaio" ou "Reunião de Jovens e Menores".
- Arquitetura Progressive Web App (`manifest.json` e Service Worker em `sw.js`). Exibindo banner de alerta e "Apego à Tela Inicial" nativo para iOS e Android.
- Distância matemática ("Culto mais Próximo") processando Latitudes e Longitudes do usuário extraídos da API *Navigator* vs Dados do mapa com Formula Haversine e entrega do quilometro aproximado exato de viagem.
- Rodapé dinâmico atrelando links da Intranet Oficial (SIGA e Webmail corporativo), além de formulário de alteração de credenciais e Download estático de PDF local atualizado (Listas de batismo/Calendário).
- Scroll de Back-to-Top para fluidez.
