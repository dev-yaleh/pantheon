import { PLAYTIME_RANGES } from '../../utils/playtime'

const MODES = [{ id: '', label: 'Todos' }, { id: 'solo', label: 'Solo' }, { id: 'coop', label: 'Co-op' }, { id: 'multi', label: 'Multiplayer' }]
const GENRES = [['', 'Todos os gêneros'], ['action', 'Ação'], ['role-playing-games-rpg', 'RPG'], ['shooter', 'Tiro'],
  ['adventure', 'Aventura'], ['strategy', 'Estratégia'], ['puzzle', 'Puzzle'], ['racing', 'Corrida'], ['sports', 'Esportes'], ['indie', 'Indie']]
const ORDER = [['-added', 'Mais populares'], ['-metacritic', 'Melhor avaliados'], ['-released', 'Lançamentos recentes'], ['name', 'A–Z']]

export default function FilterPanel({ filters, onChange, onReset, onRoll, canRoll }) {
  return (
    <section className="filters" aria-label="Filtros">
      <h1 className="filters__title">O que jogar hoje?</h1>
      <input className="field" type="search" placeholder="Buscar jogo pelo nome" value={filters.search}
        onChange={(e) => onChange({ search: e.target.value })} aria-label="Buscar jogo" />
      <div className="filters__modes" role="group" aria-label="Modo de jogo">
        {MODES.map((m) => (
          <button key={m.id} className={`chip ${filters.mode === m.id ? 'chip--on' : ''}`} aria-pressed={filters.mode === m.id}
            onClick={() => onChange({ mode: m.id })}>{m.label}</button>
        ))}
      </div>
      <div className="filters__row">
        <select className="field" value={filters.genre} onChange={(e) => onChange({ genre: e.target.value })} aria-label="Gênero">
          {GENRES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <select className="field" value={filters.playtime} onChange={(e) => onChange({ playtime: e.target.value })} aria-label="Tempo médio de jogo">
          {PLAYTIME_RANGES.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
        </select>
        <select className="field" value={filters.ordering} onChange={(e) => onChange({ ordering: e.target.value })} aria-label="Ordenar por">
          {ORDER.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </div>
      <div className="filters__actions">
        <button className="btn" onClick={onRoll} disabled={!canRoll}>Sortear um jogo</button>
        <button className="btn btn--ghost" onClick={onReset}>Limpar filtros</button>
      </div>
    </section>
  )
}
