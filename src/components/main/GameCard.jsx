import { formatPlaytime } from '../../utils/playtime'

export default function GameCard({ game, saved, onToggle }) {
  return (
    <article className="card">
      {game.image ? <img className="card__img" src={game.image} alt="" loading="lazy" /> : <div className="card__img" />}
      <div className="card__shade" />
      <button className={`card__fav ${saved ? 'card__fav--on' : ''}`} onClick={() => onToggle(game)}
        aria-pressed={saved} aria-label={saved ? `Remover ${game.name} do Alforje` : `Salvar ${game.name} no Alforje`}>★</button>
      <div className="card__body">
        {game.metacritic && <span className="card__score">{game.metacritic}</span>}
        <h3 className="card__name">{game.name}</h3>
        <p className="card__meta">{game.genres.slice(0, 2).join(', ') || 'Sem gênero'}</p>
        <p className="card__meta mono">{game.released?.slice(0, 4) || 'S/D'} · {formatPlaytime(game.playtime)}</p>
        <ul className="card__platforms">{game.platforms.slice(0, 4).map((p) => <li key={p}>{p}</li>)}</ul>
      </div>
    </article>
  )
}
