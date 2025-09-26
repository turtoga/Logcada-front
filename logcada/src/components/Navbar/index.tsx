import './Navbar.scss'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='navbar'>
      <ul>
        <NavLink 
          to='https://fateczl.cps.sp.gov.br/' 
          className={({ isActive }) => isActive ? 'active' : ''}
          end
        >
          <li>Inicio</li>
        </NavLink>

        <div className='menu-items'>
          <NavLink 
            to='/empresas' 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <li>Empresas</li>
          </NavLink>

          <NavLink 
            to='/usuarios' 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <li>Usuários</li>
          </NavLink>
          <NavLink 
            to='/' 
          >
            <li>Sair</li>
          </NavLink>
        </div>
      </ul>
    </nav>
  )
}

export default Navbar
