import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Input from '../../components/Input'
import './Redefinir.scss'
import { useEffect, useState } from 'react'
import { useAuth } from '../../Context/Auth'
import api from '../../services/api'
import axios from 'axios'

function Redefinir() {
  const { login: loginContext } = useAuth(); 
  const navigate = useNavigate();
  const { token } = useAuth();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // estado de carregamento

  useEffect(() => {
    if (token) {
      loginContext(token);
      navigate('/empresas');
    }
  }, []);

  const handleRedefinir = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return; // evita múltiplos envios
    setLoading(true);
    alert("Enviando e-mail de redefinição...");

    try {
      await api.post(`/api/solicitar-redefinir`, { emailInstitucional: email });
      alert("E-mail de redefinição enviado com sucesso!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          alert("E-mail não encontrado.");
        } else {
          alert("Erro ao enviar o e-mail de redefinição.");
        }
      } else {
        alert("Ocorreu um erro inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='redefinir'>
      <h2>Redefinir Senha</h2>
      <form onSubmit={handleRedefinir}>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          label='Email Institucional'
          disabled={loading}
        />
        <div className='center-div'>
          <Button tipo='normal' type='submit' disabled={loading}>
            {loading ? 'Enviando...' : 'Redefinir'}
          </Button>
          <Link to='/'>Fazer login</Link>
        </div>
      </form>
    </main>
  );
}

export default Redefinir;
