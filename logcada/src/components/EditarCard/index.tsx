import React, { useState, useEffect } from 'react'
import Input from '../../components/Input'
import './EditarCard.scss'
import Button from '../../components/Button'
import RoleInput from '../../components/RoleInput'
import CloseIcon from '../../assets/icon/closeIcon.png'
import { useAuth } from '../../Context/Auth'

interface Campo {
  nome: string;
  label: string;
  tipo?: string;
}

interface EditarCardProps {
  campos: Campo[],
  titulo: string,
  dadosIniciais: Record<string, any>, 
  onClose: () => void,
  onSubmit: (id: string, dados: Record<string, any>) => void,
  roleVe?: boolean
}



function EditarCard({campos, titulo, dadosIniciais, onClose, onSubmit, roleVe = false}: EditarCardProps) {
  const [dados, setDados] = useState<Record<string, string>>({});
  const [funcionarios, setFuncionarios] = useState<Record<string, any>[]>([]);
  const [tipo, setTipo] = useState(dadosIniciais.tipo);

    const { sub } = useAuth();

  useEffect(() => {
    const { funcionarios: funcs, ...resto } = dadosIniciais;
    setDados(resto || {});
    if (funcs) {
      try {
        setFuncionarios(typeof funcs === 'string' ? JSON.parse(funcs) : funcs);
      } catch {
        setFuncionarios([]);
      }
    }
  }, [dadosIniciais]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setDados(prev => ({ ...prev, [name]: value }));
  }

  function handleFuncionarioChange(index: number, e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFuncionarios(prev => {
      const novos = [...prev];
      novos[index] = { ...novos[index], [name]: value };
      return novos;
    });
  }

  function adicionarFuncionario() {
    setFuncionarios(prev => [...prev, {}]);
  }

  function removerFuncionario(index: number) {
  setFuncionarios(prev => {
    const novos = [...prev];
    novos[index] = {
      ...novos[index],
      ativo: false,
    };
    return novos;
  });
}


  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(dados);
    const dadosComFuncionarios = {
      ...dados,
      ...(funcionarios ? { funcionarios: JSON.stringify(funcionarios) } : {}),
      ...(roleVe ? { tipo: tipo } : {tipo: dados.tipo})
    };
    console.log(dadosComFuncionarios);
    onSubmit(dadosIniciais.id, dadosComFuncionarios);
  }


  return (
    <section className="novo-card">
      <div className="card-content">
        <div className="card-header">
          <h2>{titulo}</h2>
          <Button
            tipo="quadrado"
            aria-label="Fechar"
            type="button"
            onClick={onClose}
          >
            <img src={CloseIcon} alt="Fechar" className='icon-close'/>
          </Button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={`form-grid ${campos.length > 4 ? 'duas-colunas' : ''}`}>
            {campos
            .filter(campo => campo.nome !== 'senha' && campo.nome !== 'id')
            .map(campo => (
              <Input
                key={campo.nome}
                label={campo.label}
                name={campo.nome}
                type={campo.tipo || 'text'}
                value={dados[campo.nome] || ''}
                onChange={handleChange}

              />
            ))
          }

            {roleVe && sub !== dadosIniciais.emailInstitucional && <RoleInput value={tipo} onChange={(e) => setTipo(e.target.value)}/>}

            {funcionarios.filter(func => func.ativo !== false).map((func, index) => (
              <div key={index} className="funcionario-section">
                <div className="funcionario-header">
                  <Button
                    type="button"
                    tipo="quadrado"
                    onClick={() => removerFuncionario(index)}
                    aria-label={`Remover funcionário ${index + 1}`}
                  >
                    <img src={CloseIcon} alt="Fechar" className='icon-close'/>
                  </Button>
                  <h4>Funcionário {index + 1}</h4>
                </div>
                <Input
                  label="Nome"
                  name="nome"
                  value={func.nome || ''}
                  onChange={(e) => handleFuncionarioChange(index, e)}
                />
                <Input
                  label="Cargo"
                  name="cargo"
                  value={func.cargo || ''}
                  onChange={(e) => handleFuncionarioChange(index, e)}
                />
                <Input
                  label="Email"
                  name="emailFuncionario"
                  value={func.emailFuncionario || ''}
                  onChange={(e) => handleFuncionarioChange(index, e)}
                />
                <Input
                  label="Linkedin"
                  name="linkedinFuncionario"
                  value={func.linkedinFuncionario || ''}
                  onChange={(e) => handleFuncionarioChange(index, e)}
                />
                <Input
                  label="Telefone Funcionário"
                  name="telefoneFuncionario"
                  value={func.telefoneFuncionario || ''}
                  onChange={(e) => handleFuncionarioChange(index, e)}
                />
              </div>
            ))}
          </div>

          {!roleVe && (
            <button type="button" onClick={adicionarFuncionario} className="btn-adicionar">
              Adicionar Novo Funcionário
            </button>
          )}

          <div className="form-buttons">
            <Button tipo="normal">Salvar Alterações</Button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default EditarCard;
