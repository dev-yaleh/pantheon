import { useEffect, useState } from 'react'

export default function RandomizerModal({ pool, saved, onToggle, onClose }) {
  const [pick, setPick] = useState(null)
  const [done, setDone] = useState(false)

  const roll = () => {
    setDone(false)
    let i = 0
    const t = setInterval(() => {
      setPick(pool[Math.floor(Math.random() * pool.length)])
      if (++i >= 14) { clearInterval(t); setDone(true) }
    }, 90)
    return t
  }
  useEffect(() => { const t = roll(); return () => clearInterval(t) }, []) // eslint-disable-line
  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', esc); return () => window.removeEventListener('keydown', esc)
  }, [onClose])

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label="Jogo sorteado" onClick={(e) => e.stopPropagation()}>
        <div className={`modal__die ${done ? '' : 'modal__die--spin'}`}>D20</div>
        {pick?.image && <img className="modal__img" src={pick.image} alt="" />}
        <h2 className="modal__name" aria-live="polite">{pick?.name}</h2>
        <div className="filters__actions">
          <button className="btn" onClick={roll} disabled={!done}>Sortear de novo</button>
          {done && <button className="btn btn--ghost" onClick={() => onToggle(pick)}>{saved.has(pick.id) ? 'Remover do Alforje' : 'Salvar no Alforje'}</button>}
        </div>
        <button className="modal__close" onClick={onClose} aria-label="Fechar">×</button>
      </div>
    </div>
  )
}
