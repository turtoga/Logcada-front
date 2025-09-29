import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import Input from '../../components/Input'
import './Login.scss'

function Login() {
  return (
    <main className='login'>
      
      <h2>Login</h2>

      <form>
        <Input type="email" label="Email Institucional" />
        <Input type="password" label="Senha" />
        <div className='center-div'>
          <Button type='normal'>Entrar</Button>
          <Link to='/redefinir'>Esqueceu a senha?</Link>
        </div>
        
      </form>
    </main>
    
  )
}

export default Login