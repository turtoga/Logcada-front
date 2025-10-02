import React, { useState, useEffect } from 'react'
import Input from '../../components/Input'
import './EditarCard.scss'
import Button from '../../components/Button'
import RoleInput from '../../components/RoleInput'

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
  onSubmit: (dados: Record<string, any>) => void,
  roleVe?: boolean
}

function EditarCard({campos, titulo, dadosIniciais, onClose, onSubmit, roleVe = false}: EditarCardProps) {
  const [dados, setDados] = useState<Record<string, string>>({});
  const [funcionarios, setFuncionarios] = useState<Record<string, string>[]>([]);

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
    setFuncionarios(prev => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const dadosComFuncionarios = {
      ...dados,
      funcionarios: JSON.stringify(funcionarios),
    };
    onSubmit(dadosComFuncionarios);
  }

  return (
    <section className="novo-card">
      <div className="card-content">
        <div className="card-header">
          <h2>{titulo}</h2>
          <button
            className="btn-close"
            type="button"
            aria-label="Fechar"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={`form-grid ${campos.length > 4 ? 'duas-colunas' : ''}`}>
            {campos
            .filter(campo => campo.nome !== 'senha') 
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

            {roleVe && <RoleInput />}

            {funcionarios.map((func, index) => (
              <div key={index} className="funcionario-section">
                <div className="funcionario-header">
                  <button
                    type="button"
                    className="btn-remover-funcionario"
                    onClick={() => removerFuncionario(index)}
                    aria-label={`Remover funcionário ${index + 1}`}
                  >
                    &times;
                  </button>
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
