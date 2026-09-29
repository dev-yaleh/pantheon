import { useEffect, useMemo, useState } from 'react'
import Header from '../header/Header.jsx'
import FilterPanel from './FilterPanel.jsx'
import GameGrid from './GameGrid.jsx'
import RandomizerModal from './RandomizerModal.jsx'
import AlforjeDrawer from './AlforjeDrawer.jsx'
import Footer from '../footer/Footer.jsx'
import { fetchGames } from '../../utils/api.js'
import { matchesPlaytime } from '../../utils/playtime.js'
import './Main.css'

const INITIAL = { search: '', mode: '', genre: '', playtime: '', ordering: '-added' }

function loadSaved() {
  try { return JSON.parse(localStorage.getItem('pantheon:alforje')) || [] } catch { return [] }
}

export default function App() {
  const [filters, setFilters] = useState(INITIAL)
  const [debounced, setDebounced] = useState('')
  const [page, setPage] = useState(1)
  const [games, setGames] = useState([])
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(loadSaved)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [rolling, setRolling] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setDebounced(filters.search.trim()), 400)
    return () => clearTimeout(t)
  }, [filters.search])

  useEffect(() => { setPage(1) }, [debounced, filters.mode, filters.genre, filters.ordering])

  useEffect(() => {
    const ctrl = new AbortController()
    const loadGames = async () => {
      setStatus('loading')
      try {
        const { games: g, count } = await fetchGames({
          search: debounced,
          mode: filters.mode,
          genre: filters.genre,
          ordering: filters.ordering,
          page,
          signal: ctrl.signal,
        })
        setGames((prev) => (page === 1 ? g : [...prev, ...g]))
        setTotal(count)
        setStatus('ok')
      } catch (e) {
        if (e.name !== 'AbortError') {
          setError(e.message)
          setStatus('error')
        }
      }
    }

    loadGames()
    return () => ctrl.abort()
  }, [debounced, filters.mode, filters.genre, filters.ordering, page])

  useEffect(() => {
    try { localStorage.setItem('pantheon:alforje', JSON.stringify(saved)) } catch { /* storage indisponível */ }
  }, [saved])

  // A RAWG não filtra por duração: esse filtro roda no cliente
  const visible = useMemo(() => games.filter((g) => matchesPlaytime(g.playtime, filters.playtime)), [games, filters.playtime])
  const savedIds = new Set(saved.map((s) => s.game.id))

  const toggleSave = (game) =>
    setSaved((prev) => prev.some((s) => s.game.id === game.id)
      ? prev.filter((s) => s.game.id !== game.id)
      : [...prev, { game, status: 'wishlist' }])
  const setGameStatus = (id, st) => setSaved((prev) => prev.map((s) => (s.game.id === id ? { ...s, status: st } : s)))

  return (
    <>
      <Header count={saved.length} onOpen={() => setDrawerOpen(true)} />
      <main className="main">
        <FilterPanel filters={filters} onChange={(patch) => setFilters((f) => ({ ...f, ...patch }))}
          onReset={() => setFilters(INITIAL)} onRoll={() => setRolling(true)} canRoll={visible.length > 0} />
        <GameGrid games={visible} status={status} error={error} total={total} hasMore={games.length < total}
          savedIds={savedIds} onToggle={toggleSave} onMore={() => setPage((p) => p + 1)} onClear={() => setFilters(INITIAL)} />
      </main>
      <Footer />
      {rolling && <RandomizerModal pool={visible} saved={savedIds} onToggle={toggleSave} onClose={() => setRolling(false)} />}
      <AlforjeDrawer open={drawerOpen} items={saved} onClose={() => setDrawerOpen(false)}
        onStatus={setGameStatus} onRemove={(id) => setSaved((p) => p.filter((s) => s.game.id !== id))} />
    </>
  )
}
