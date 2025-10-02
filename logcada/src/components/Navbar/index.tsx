
import './Navbar.scss'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../Context/Auth';

function Navbar() {

  const { token, role, logout } = useAuth();
  

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
          {role && (
            <NavLink 
              to='/empresas' 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              <li>Empresas</li>
            </NavLink>
          )}

        {role === 'ADMIN' && (
          <NavLink 
            to='/usuarios' 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <li>Usuários</li>
          </NavLink>
        )}

          {token && (
            <button
              onClick={logout}
              className="sair-button" 
            >
              <li>Sair</li>
            </button>
          )}
        </div>
      </ul>
    </nav>
  )
}

export default Navbar
