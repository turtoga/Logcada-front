import Table from '../../components/Table';
import './Usuarios.scss'
import NovoCard from "../../components/NovoCard"
import EditarCard from '../../components/EditarCard';
import DetalharCard from '../../components/DetalharCard';
import { useState } from 'react';

const headers = ["Nome Completo", "Email Institucional", "Tipo"]
const camposList = ["nome", "emailInstitucional", "tipo"]

const camposFormularioUsuario = [
  { nome: "nome", label: "Nome Completo" },
  { nome: "emailInstitucional", label: "Email Institucional", tipo: "email" },
  { nome: "senha", label: "Senha", tipo: "password" }
];

interface Usuario {
  id: string,
  nome: string,
  emailInstitucional: string,
  tipo: string
}



function Usuarios() {
  const [itens, setItens] = useState<Usuario[]>([{id:"1",nome: "gaga",emailInstitucional: "a@a.com",tipo: "adm"}]);
  const [mostrarNovo, setMostrarNovo] = useState(false)
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null)
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null)
  
   const handleNovoUsuario = (novoUsuario: Usuario) => {
    setMostrarNovo(false);
  };

  const onNovoClick =() => {
    setMostrarNovo(true)
  }

  const itensTable = itens.map(item=> ({
    ...item
  }));

  return (
    <main className='usuarios'>
      <Table onItemClick={(usuario) => setUsuarioSelecionado(usuario)} headers={headers} title={"Usuários"} itens={itensTable} campos={camposList} onNovoClick={onNovoClick}/>
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
            onSubmit={(dadosAtualizados) => {
              setItens(prev =>
                prev.map(user => user.id === usuarioEditando.id ? { ...user, ...dadosAtualizados } : user)
              );
              setUsuarioEditando(null);
            }}
          />
        </div>
     )}
    </main>
  )
}

export default Usuarios