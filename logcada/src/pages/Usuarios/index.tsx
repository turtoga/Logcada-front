import React, { useState } from 'react'
import Table from '../../components/Table';
import './Usuarios.scss'

const headers = ["Nome", "Email", "Tipo"]

const campos = ["nome", "emailInstitucional", "tipo"]

interface Usuario {
  nome: string,
  emailInstitucional: string,
  tipo: string
}



function Usuarios() {

  const [itens, setItens] = useState<Usuario[]>([
    {
      nome: "gaga",
      emailInstitucional: "a@a.com",
      tipo: "adm"
    },
    {
      nome: "gaga",
      emailInstitucional: "a@a.com",
      tipo: "adm"
    },
    {
      nome: "gaga",
      emailInstitucional: "a@a.com",
      tipo: "adm"
    },
    {
      nome: "gaga",
      emailInstitucional: "a@a.com",
      tipo: "adm"
    }
    
    
  ]);

  const itensTable = itens.map(item=> ({
    ...item
  }));

  return (
    <main className='usuarios'>
      <Table headers={headers} title={"Usuários"} itens={itensTable} campos={campos}/>
    </main>
  )
}

export default Usuarios