import './Header.scss'
import logoFatec from '../../assets/logo-fatec.png'
import logoCps from '../../assets/logo-cps.png'

function Header() {
  return (
    <header className="header">
      <div className='logos'>
        <img src={logoFatec} alt="Fatec Zona Leste Logo" />
        <img src={logoCps} alt="Centro Paula souza logo" />
      </div>
      <h1>Cadastro de Empresas Logística</h1>
    </header>
  )
}

export default Header