import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Input from '../../components/Input'
import './Login.scss'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import axios from 'axios'
import { useAuth } from '../../Context/Auth'
import type { DecodedToken } from '../../Context/AuthContext'
import { jwtDecode } from 'jwt-decode'

function Login() {

  const[login,setLogin] = useState("");
  const[senha,setSenha] = useState("");
  const navigate = useNavigate();
  const { login: loginContext, token, logout } = useAuth();



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

  useEffect(() => {
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        const now = Date.now() / 1000;
        if (decoded.exp < now) {
          logout();
        } else {
          navigate('/empresas');
        }
      } catch (err) {
        logout();
      }
    }
  }, [token]);

  return (
    <main className='login'>
      
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div className='input-separator'>
          <Input value={login} onChange={(e) => setLogin(e.target.value)} type="email" label="Email Institucional" />
        <Input value={senha} onChange={(e) => setSenha(e.target.value)} type="password" label="Senha" />
        </div>
        
        <div className='center-div'>
          <Button type='submit' tipo='normal'>Entrar</Button>
          <Link to='/redefinir'>Esqueceu a senha?</Link>
        </div>
        
      </form>
    </main>
    
  )
}

export default Login