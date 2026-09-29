const BASE = 'https://api.rawg.io/api'
const KEY = import.meta.env.VITE_RAWG_KEY

// Modos de jogo -> tags oficiais da RAWG
export const MODES = { solo: 'singleplayer', coop: 'co-op', multi: 'multiplayer' }

function normalize(g) {
  return {
    id: g.id,
    name: g.name,
    image: g.background_image,
    released: g.released,
    rating: g.rating,
    metacritic: g.metacritic,
    playtime: g.playtime || 0, // horas médias; 0 = sem dado
    platforms: (g.parent_platforms || []).map((p) => p.platform.name),
    genres: (g.genres || []).map((x) => x.name),
  }
}

export async function fetchGames({ search, mode, genre, ordering, page = 1, signal }) {
  if (!KEY) throw new Error('Chave da RAWG ausente. Defina VITE_RAWG_KEY no arquivo .env.')
  const p = new URLSearchParams({ key: KEY, page_size: 24, page, ordering })
  if (search) p.set('search', search)
  if (mode) p.set('tags', MODES[mode])
  if (genre) p.set('genres', genre)
  const res = await fetch(`${BASE}/games?${p}`, { signal })
  if (!res.ok) throw new Error(res.status === 401 ? 'Chave da RAWG inválida.' : `A RAWG respondeu com erro ${res.status}.`)
  const data = await res.json()
  return { count: data.count, games: data.results.map(normalize) }
}
