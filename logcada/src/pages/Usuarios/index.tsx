import React, { useState } from 'react'
import Table from '../../components/Table';
import './Usuarios.scss'
import NovoCard from "../../components/NovoCard"

const headers = ["Nome", "Email", "Tipo"]
const camposList = ["nome", "emailInstitucional", "tipo"]

const camposFormularioUsuario = [
  { nome: "nomeCompleto", label: "Nome Completo" },
  { nome: "emailInstitucional", label: "Email Institucional", tipo: "email" },
  { nome: "senha", label: "Senha", tipo: "password" }
];

interface Usuario {
  nome: string,
  emailInstitucional: string,
  tipo: string
}



function Usuarios() {
  const [itens, setItens] = useState<Usuario[]>([{nome: "gaga",emailInstitucional: "a@a.com",tipo: "adm"}]);
  const [mostrarNovo, setMostrarNovo] = useState(false)

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
      <Table headers={headers} title={"Usuários"} itens={itensTable} campos={camposList} onNovoClick={onNovoClick}/>
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
    </main>
  )
}

export default Usuarios