import React, { useState } from 'react'
import Table from '../../components/Table'

const headers = ["Nome", "Email", "Telefone", "Nome Fincionário", "Email Funcionário", "Atualizado"]

interface Funcionario {
  nome: string;
  email: string;
}
interface Empresa {
  id: string;
  nomeEmpresa: string;
  emailEmpresa: string;
  telefoneEmpresa: string;
  ultimaEdicao: string; 
  funcionarios: Funcionario[];
}



function Empresas() {

  const [itens, setItens] = useState<Empresa[]>([
    {
      id: "1",
      nomeEmpresa: "Acme Corp",
      emailEmpresa: "contato@acme.com",
      telefoneEmpresa: "11 99999-9999",
      ultimaEdicao: "2025-09-25T12:34:56",
      funcionarios: [
        { nome: "João Silva", email: "joao@acme.com" },
        { nome: "Maria Souza", email: "maria@acme.com" }
      ]
    },
    {
      id: "2",
      nomeEmpresa: "BetaTech",
      emailEmpresa: "suporte@betatech.com",
      telefoneEmpresa: "21 98888-7777",
      ultimaEdicao: "2025-09-24T09:00:00",
      funcionarios: [
        { nome: "Carlos Lima", email: "carlos@betatech.com" }
      ]
    },
    {
      id: "3",
      nomeEmpresa: "Logix Ltda",
      emailEmpresa: "admin@logix.com.br",
      telefoneEmpresa: "31 97777-6666",
      ultimaEdicao: "2025-09-23T15:20:00",
      funcionarios: [] 
    }
  ]);

  return (
    <main className='empresas'>
      <Table headers={headers} itens={itens}/>
    </main>
  )
}

export default Empresas