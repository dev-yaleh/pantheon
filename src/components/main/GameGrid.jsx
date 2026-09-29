import GameCard from './GameCard'

export default function GameGrid({ games, status, error, total, hasMore, savedIds, onToggle, onMore, onClear }) {
  if (status === 'error') return <p className="notice notice--error" role="alert">{error}</p>
  if (status === 'loading' && games.length === 0)
    return <div className="grid" aria-busy="true">{Array.from({ length: 8 }, (_, i) => <div key={i} className="card skeleton" />)}</div>
  if (games.length === 0)
    return <div className="notice"><p>Nenhum jogo encontrado com esses filtros.</p><button className="btn btn--ghost" onClick={onClear}>Limpar filtros</button></div>
  return (
    <>
      <p className="count mono">{total.toLocaleString('pt-BR')} jogos na RAWG</p>
      <div className="grid">{games.map((g) => <GameCard key={g.id} game={g} saved={savedIds.has(g.id)} onToggle={onToggle} />)}</div>
      {hasMore && <button className="btn more" onClick={onMore} disabled={status === 'loading'}>{status === 'loading' ? 'Carregando…' : 'Carregar mais jogos'}</button>}
    </>
  )
}
