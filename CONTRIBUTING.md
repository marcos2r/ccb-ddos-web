# Guia de Contribuição (Contributing)

Entendendo que o projeto pode crescer devido às movimentações contínuas nas aberturas e horários das igrejas, nós possuímos diretrizes fáceis para a irmandade/desenvolvedores submeterem atualizações no código central.

## Submetendo Sugestões Simples ou Erros
Se observar que algum bairro trocou o horário do culto, o pino do Google do GPS está errado, abriu uma nova congregação (Ex: Distrito de Carapã), basta abrir uma [Issue](https://github.com/SeuUsuario/ccb-ddos-web/issues) explicando:
1. Qual casa de oração
2. O que alterou (dias/horários/tipo de culto)
3. Qual é o Link de Pin do GPS correto no mapa.

Isso nos dará o necessário para validar a informação.

## Submetendo Códigos / Atualizando o Código via Pull Request
Para programadores interessados em submeter atualizações diretas na `main`:

1. **Faça um Fork** deste repositório na sua conta.
2. Inicie sua branch a partir da `main`. Tente criá-la detalhando a função:
   `git checkout -b feature/atualiza-horario-bororo`
3. Execute o setup e rodadas locais garantindo que você não causou falhas nos Filtros no Script Principal.
   * Modifique somente o estritamente necessário (geralmente `js/data.js` para coisas triviais e dados de Igreja).
4. Faça Commits expressos aderindo aos Padrões de Conventional Commits:
   Exemplos aceitáveis:
   - `feat(data): adiciona nova aldeia aos sabados`
   - `fix(filters): contorno de quebra de tag ao isolar highlights`
   - `docs: criando roteiros explicativos da aplicacao`
5. **Faça o Push e Abra um Pull Request**: O título de sua submissão deve sintetizar a melhoria, apontando referências e caso altere visualizações (UI), se possível poste "Gifs" ou Imagens do antes e depois em mobile e o link de homologação.

## Recomendações e Estilo
* Não instale dezenas de bibliotecas (Tailwind, Axios). Somos focados na flexibilidade e num setup ultra leve e ágil de HTML/CSS/JS puros.
* Priorize os padrões e cores da identidade visual CCB. Em caso de dúvidas, baseiese na `style.css` e não introduza dark mode caso isso cause incompatibilidades técnicas com os requisitos normativos.

Que Deus venha sempre abençoar a equipe e o trabalho técnico disposto na seara!
