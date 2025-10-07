import Table from '../../components/Table';
import './Usuarios.scss'
import NovoCard from "../../components/NovoCard"
import EditarCard from '../../components/EditarCard';
import DetalharCard from '../../components/DetalharCard';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import axios from 'axios'

const headers = ["Nome Completo", "Email Institucional", "Tipo"]
const camposList = ["nomeCompleto", "emailInstitucional", "tipo"]

const camposFormularioUsuario = [
  { nome: "nomeCompleto", label: "Nome Completo" },
  { nome: "emailInstitucional", label: "Email Institucional", tipo: "email" },
  { nome: "senha", label: "Senha", tipo: "password" }
];

interface Usuario {
  id: string,
  nomeCompleto: string,
  emailInstitucional: string,
  tipo: string
}





function Usuarios() {
  const [itens, setItens] = useState<Usuario[]>([]);
  const [mostrarNovo, setMostrarNovo] = useState(false)
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null)
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null)
  
  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const response = await api.get('/user');
        setItens(response.data.content || []);
      } catch (error) {
        console.error('Erro ao carregar usuários', error);
      }
    }
    if (usuarioSelecionado === null) {
    fetchUsuarios();
    }
  }, [usuarioSelecionado, usuarioEditando]);


   const handleNovoUsuario = async (dados: Record<string, string>) => {
    const novoUsuario = {
      nomeCompleto: dados.nomeCompleto || '',
      emailInstitucional: dados.emailInstitucional || '',
      senha: dados.senha || '',
      tipo: dados.tipo || 'PADRAO'
    };

    try {
      const response = await api.post('/user', novoUsuario);
      setItens(prev => [...prev, response.data]);
      alert("Usuário criado com sucesso");
      setMostrarNovo(false); 
    } catch (error) {
      if(axios.isAxiosError(error)) {
        if(error.response?.status === 400){
          alert(error.response.data)
        } else {
          alert("Erro ao criar usuário")
          setMostrarNovo(false);
        }
      } else {
        alert("Erro ao criar usuário")
        setMostrarNovo(false);
      }
    } 
  };

  const handleEditarUsuario = async (id: string, dadosAtualizados: Record<string, string>) => {
    const editarUsuario = {
      nomeCompleto: dadosAtualizados.nomeCompleto || '',
      emailInstitucional: dadosAtualizados.emailInstitucional || '',
      tipo: dadosAtualizados.role || 'PADRAO'
    };
    
    try {
      const response = await api.put(`/user/${id}`, editarUsuario);
      setItens(prev => [...prev, response.data]);
      setUsuarioEditando(null);
      alert("Usuário editado com sucesso");

    } catch (error) {
      if(axios.isAxiosError(error)) {
        if(error.response?.status === 400){
          alert(error.response.data)
        } else {
          alert("Erro ao editar usuário")
        }
      } else {
        alert("Erro ao editar usuário")
      }
    }
  };

  const onNovoClick =() => {
    setMostrarNovo(true)
  }

  const itensTable = itens.map(item=> ({
    ...item
  }));

  return (
    <main className='usuarios'>
      <Table onItemClick={(usuario) => setUsuarioSelecionado(usuario as Usuario)} headers={headers} title={"Usuários"} itens={itensTable} campos={camposList} onNovoClick={onNovoClick}/>
      {mostrarNovo && (
        <div className="card-background">
          <NovoCard
            roleVe
            titulo="Novo Usuário"
            campos={camposFormularioUsuario}
            onClose={() => setMostrarNovo(false)}
            onSubmit={handleNovoUsuario}
          />
        </div>
      )}
      {usuarioSelecionado && (
        <div className="card-background">
          <DetalharCard
            tipo='Usuário'
            titulo="Detalhes do Usuário"
            dados={usuarioSelecionado} 
            onClose={() => setUsuarioSelecionado(null)}
            onEdit={() => {
              setUsuarioEditando(usuarioSelecionado);
              setUsuarioSelecionado(null); 
            }}
          />
        </div>
      )}
      {usuarioEditando && (
        <div className="card-background">
          <EditarCard
          
            roleVe
            titulo="Editar Usuário"
            dadosIniciais={usuarioEditando}
            campos={camposFormularioUsuario}
            onClose={() => setUsuarioEditando(null)}
            onSubmit={handleEditarUsuario}
          />
        </div>
     )}
    </main>
  )
}

export default Usuarios