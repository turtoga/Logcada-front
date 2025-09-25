import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import Input from '../../components/Input'
import './Login.scss'

function Login() {
  return (
    <main className='login'>
      
      <h2>Login</h2>

      <form>
        <Input type="email" placeholder="Email Institucional" />
        <Input type="password" placeholder="Senha" />
        <div className='center-div'>
          <Button>Entrar</Button>
          <Link to='/redefinir'>Esqueceu a senha?</Link>
        </div>
        
      </form>
    </main>
    
  )
}

export default Login