# Pantheon — O que jogar hoje?

Painel interativo de descoberta de jogos e gestão de backlog com a API pública [RAWG](https://rawg.io/apidocs).

## Planejamento
Problemática → descobrir o que jogar entre milhares de títulos. Usuário → jogador com backlog grande e pouco tempo.
Requisitos → buscar, filtrar (Solo/Co-op/Multiplayer, gênero, tempo médio de jogo), sortear e salvar.
API → RAWG (`/games`, chave gratuita). Dados → nome, capa, Metacritic, plataformas, gêneros, lançamento, `playtime`.

## Funcionalidades
Busca com debounce · filtros por modo, gênero e duração · ordenação · sorteador (D20) · Alforje (favoritos com status de backlog, salvo em `localStorage`) · paginação · estados de carregamento, erro e vazio.

## Rodar
```bash
npm install
cp .env.example .env   # cole sua chave gratuita de https://rawg.io/apidocs
npm run dev
```
Deploy (Vercel/Netlify): defina `VITE_RAWG_KEY` no painel; build `npm run build`, saída `dist`.

## Decisões
- A RAWG não filtra por duração: o filtro é aplicado no cliente sobre os jogos carregados (jogos sem dado de tempo ficam fora das faixas).
- Solo/Co-op/Multiplayer usam as tags oficiais `singleplayer`, `co-op` e `multiplayer`.
- Em apps sem backend a chave fica visível no bundle; use a chave gratuita.

## Uso de IA
Complete aqui: a base do projeto (estrutura, componentes e CSS) foi gerada com o Claude a partir do guia de identidade visual. Descreva o que você revisou, alterou e entendeu.

## Créditos
Dados: [RAWG Video Games Database API](https://rawg.io/apidocs).
