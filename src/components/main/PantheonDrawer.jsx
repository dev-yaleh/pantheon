export const STATUSES = [
  ['wishlist', 'Quero jogar', 'var(--st-wishlist)'], ['playing', 'Jogando', 'var(--st-playing)'],
  ['done', 'Zerado', 'var(--st-done)'], ['backlog', 'Guardado', 'var(--st-backlog)'], ['dropped', 'Abandonado', 'var(--st-dropped)'],
]

export default function PantheonDrawer({ open, items, onClose, onStatus, onRemove }) {
  return (
    <>
      {open && <div className="overlay" onClick={onClose} />}
      <aside className={`drawer ${open ? 'drawer--open' : ''}`} aria-hidden={!open} aria-label="Alforje">
        <div className="drawer__head"><h2>Pantheon</h2><button className="btn btn--ghost" onClick={onClose}>Fechar</button></div>
        {items.length === 0 && <p className="notice">Seu Pantheon está vazio. Toque na estrela de um jogo para salvá-lo.</p>}
        <ul className="drawer__list">
          {items.map(({ game, status }) => (
            <li key={game.id} className="drawer__item" style={{ '--st': STATUSES.find((s) => s[0] === status)[2] }}>
              {game.image ? <img src={game.image} alt="" /> : <span />}
              <div>
                <strong>{game.name}</strong>
                <select className="field" value={status} onChange={(e) => onStatus(game.id, e.target.value)} aria-label={`Status de ${game.name}`}>
                  {STATUSES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              <button className="drawer__rm" onClick={() => onRemove(game.id)} aria-label={`Remover ${game.name}`}>×</button>
            </li>
          ))}
        </ul>
      </aside>
    </>
  )
}
