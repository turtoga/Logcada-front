import { useEffect, useState } from 'react'
import Table from '../../components/Table'
import"./Empresas.scss"
import { formataData } from '../../util/Formatar'
import NovoCard from '../../components/NovoCard'
import DetalharCard from '../../components/DetalharCard'
import EditarCard from '../../components/EditarCard'
import api from '../../services/api';
import axios from 'axios'
import { useAuth } from '../../Context/Auth'


const headers = ["Nome", "Email", "Telefone", "Nome Funcionário", "Email Funcionário", "Atualizado"]

const camposList = ["nomeEmpresa", "emailEmpresa", "telefoneEmpresa", "nomeFuncionario", "emailFuncionario", "ultimaEdicao"]
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
const {sub} = useAuth();
  const [itens, setItens] = useState<Empresa[]>([]);

  const [mostrarNovo, setMostrarNovo] = useState(false)
  const [empresaSelecionada, setEmpresaSelecionada] = useState<Empresa | null>(null) 
  const [empresaEditando, setEmpresaEditando] = useState<Empresa | null>(null);

  useEffect(() => {
    async function fetchEmpresas() {
      try {
        const response = await api.get('/empresa');
        setItens(response.data.content || []);
      } catch (error) {
        console.error('Erro ao carregar empresas', error);
      }
    }
    fetchEmpresas();
  }, [empresaSelecionada, empresaEditando]);


  const handleEditarEmpresa = async (id: string, dadosAtualizados: Record<string, string>) => {
  

    const funcionarios = dadosAtualizados.funcionarios
        ? JSON.parse(dadosAtualizados.funcionarios)
        : [];
    
    console.log(funcionarios)
      const empresaEditada = {
      nomeEmpresa: dadosAtualizados.nomeEmpresa || '',
      tipo: dadosAtualizados.tipo || '',
      emailEmpresa: dadosAtualizados.emailEmpresa || '',
      telefoneEmpresa: dadosAtualizados.telefoneEmpresa || '',
      endereco: dadosAtualizados.endereco || '',
      cep: dadosAtualizados.cep || '',
      site: dadosAtualizados.site || '',
      funcionarios: funcionarios
    };

    try {
      const response = await api.put(`/empresa/${id}`, empresaEditada);
      alert("Empresa editada com sucesso!");
      setEmpresaEditando(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          alert(error.response.data);
        } else {
          alert("Erro ao editar empresa");
        }
      } else {
        alert("Erro inesperado ao editar empresa");
      }
    }
  };


  const handleNovaEmpresa = async (dados: Record<string, string>) => {
    try {
      const funcionarios = dados.funcionarios
        ? JSON.parse(dados.funcionarios)
        : [];

      console.log(dados.tipo)

      const novaEmpresa = {
        emailCriador: sub,
        nomeEmpresa: dados.nomeEmpresa || '',
        tipo: dados.tipo || '',
        emailEmpresa: dados.emailEmpresa || '',
        telefoneEmpresa: dados.telefoneEmpresa || '',
        endereco: dados.endereco || '',
        cep: dados.cep || '',
        site: dados.site || '',
        funcionarios: funcionarios
      };

      const response = await api.post('/empresa', novaEmpresa);
      setItens(prev => [...prev, response.data]);
      alert("Empresa criada com sucesso!");
      setMostrarNovo(false);
    } catch (error) {
      console.error('Erro ao criar empresa:', error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          alert(error.response.data);
        } else {
          alert("Erro ao criar empresa");
        }
      } else {
        alert("Erro inesperado ao criar empresa");
      }

      setMostrarNovo(false);
    }
  };



  const onNovoClick =() => {
    setMostrarNovo(true)
  }


  const itensTable = itens.map(empresa => ({
    ...empresa,
    ultimaEdicao: formataData(empresa.ultimaEdicao),
    dataAdicionado: formataData(empresa.dataAdicionado),
    nomeFuncionario: empresa.funcionarios[0]?.nome || "N/A",
    emailFuncionario: empresa.funcionarios[0]?.emailFuncionario || "N/A"
  }));

  return (
    <main className='empresas'>
      <Table headers={headers} onItemClick={(empresa) => setEmpresaSelecionada(empresa)} title={"Empresas"} itens={itensTable} campos={camposList}  onNovoClick={onNovoClick}/>
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
      {empresaSelecionada && (
        <div className="card-background">
          <DetalharCard 
            tipo='Empresa'
            titulo="Detalhes da Empresa"
            dados={empresaSelecionada}
            funcionarios={empresaSelecionada.funcionarios}
            onClose={() => setEmpresaSelecionada(null)}
            onEdit={() => {
              setEmpresaEditando(empresaSelecionada);
              setEmpresaSelecionada(null); 
            }}
          />
        </div>
      )}
      {empresaEditando && (
        <div className="card-background">
          <EditarCard
            titulo="Editar Empresa"
            dadosIniciais={empresaEditando}
            campos={camposFormularioEmpresa}
            onClose={() => setEmpresaEditando(null)}
            onSubmit={handleEditarEmpresa}
          />
        </div>
     )}



    </main>
  )
}

export default Empresas