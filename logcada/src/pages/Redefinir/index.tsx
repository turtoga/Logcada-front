import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Input from '../../components/Input'

import './Redefinir.scss'
import { useEffect } from 'react'
import { useAuth } from '../../Context/Auth'


function Redefinir() {
  const { login: loginContext } = useAuth(); 
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() =>{
      if (token) {
        loginContext(token);
        navigate('/empresas');
      }
    }, []) 
  return (
    <main className='redefinir'>
      <h2>Redefinir Senha</h2>
      <form>
        <Input type="email" label='Email Institucional' />
        <div className='center-div'>
          <Button tipo='normal' type='submit'>Redefinir</Button>
          <Link to='/'>Fazer login</Link>
        </div>
        
      </form>
    </main>
  )
}

export default Redefinir