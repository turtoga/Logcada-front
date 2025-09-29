import React, { useState } from 'react'
import Table from '../../components/Table'
import"./Empresas.scss"
import { formataData } from '../../util/Formatar'
import NovoCard from '../../components/NovoCard'

const headers = ["Nome", "Email", "Telefone", "Nome Funcionário", "Email Funcionário", "Atualizado"]

const camposList = ["nomeEmpresa", "emailEmpresa", "telefoneEmpresa", "nomeFuncionario", "emailFuncionario", "edicao"]
const camposFormularioEmpresa = [
  { nome: "nomeEmpresa", label: "Nome da Empresa"},
  { nome: "tipo", label: "Tipo" },
  { nome: "emailEmpresa", label: "Email da Empresa", tipo:"email" },
  { nome: "telefoneEmpresa", label: "Telefone da Empresa", tipo:"tel"},
  { nome: "endereco", label:"Endereço" },
  { nome:"cep", label:"CEP", tipo:"number" },
  { nome: "site", label:"Site"}

]


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

  const [mostrarNovo, setMostrarNovo] = useState(false)

  const handleNovaEmpresa= (novoUsuario: Usuario) => {
    setMostrarNovo(false);
  };

  const onNovoClick =() => {
    setMostrarNovo(true)
    console.log("click")
  }


  const itensTable = itens.map(empresa => ({
    ...empresa,
    edicao: formataData(empresa.ultimaEdicao),
    nomeFuncionario: empresa.funcionarios[0]?.nome || "",
    emailFuncionario: empresa.funcionarios[0]?.email || ""
  }));

  return (
    <main className='empresas'>
      <Table headers={headers} title={"Empresas"} itens={itensTable} campos={camposList}  onNovoClick={onNovoClick}/>
      {mostrarNovo && (
        <div className="card-background">
          <NovoCard
            titulo="Nova Empresa"
            campos={camposFormularioEmpresa}
            onClose={() => setMostrarNovo(false)}
            onSubmit={handleNovaEmpresa}
          />
        </div>
        
      )}
    </main>
  )
}

export default Empresas