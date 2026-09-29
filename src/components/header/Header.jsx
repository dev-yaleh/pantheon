import logo from '../../assets/logo-pantheon.png'
import './Header.css'

export default function Header({ count, onOpen }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Pantheon" />
      <button className="header__bag" onClick={onOpen} aria-label={`Abrir Alforje, ${count} jogos salvos`}>
        <span>Mochila</span>
        <span className="header__count">{count}</span>
      </button>
    </header>
  )
}
