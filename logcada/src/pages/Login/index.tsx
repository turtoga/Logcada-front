import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Input from '../../components/Input'
import './Login.scss'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import axios from 'axios'
import { useAuth } from '../../Context/Auth'

function Login() {

  const[login,setLogin] = useState("");
  const[senha,setSenha] = useState("");
  const navigate = useNavigate();
  const { login: loginContext , token} = useAuth(); 



  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const loginData = { login, senha }

    try{
      const response = await api.post('/auth/login', loginData)
      const { token } = response.data
      loginContext(token)
      navigate('/empresas')
    } catch (error) {
      if(axios.isAxiosError(error)) {
        if(error.response?.status === 401){
          alert("Usuário ou senha inválidos")
        } else {
          alert("Erro ao fazer login")
        }
      }
    }
  }

  useEffect(() =>{
    if (token) {
      loginContext(token);
      navigate('/empresas');
    }
  }, [])

  return (
    <main className='login'>
      
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <Input value={login} onChange={(e) => setLogin(e.target.value)} type="email" label="Email Institucional" />
        <Input value={senha} onChange={(e) => setSenha(e.target.value)} type="password" label="Senha" />
        <div className='center-div'>
          <Button type='submit' tipo='normal'>Entrar</Button>
          <Link to='/redefinir'>Esqueceu a senha?</Link>
        </div>
        
      </form>
    </main>
    
  )
}

export default Login