import './DetalharCard.scss'
import Button from '../../components/Button'
import TrashIcon from '../../assets/icon/trashIcon.png'
import PencilIcon from '../../assets/icon/pencilIcon.png'
import { use, useState } from 'react'
import DeletarCard from '../DeletarCard'
import CloseIcon from '../../assets/icon/closeIcon.png'
import api from '../../services/api'
import { useAuth } from '../../Context/Auth'

interface Funcionario {
  nome?: string
  email?: string
  cargo?: string
  telefoneFuncionario?: string
  linkedinFuncionario?: string
}

interface DetalharCardProps {
  titulo: string;
  dados: Record<string, any>;
  funcionarios?: Funcionario[];
  onClose: () => void;
  onEdit?: () => void; 
  tipo?: string;
}

function formatarTitulo(campo: string) {
  const formatado = campo.replace(/([A-Z])/g, ' $1');
  
  return formatado.charAt(0).toUpperCase() + formatado.slice(1);
}

function DetalharCard({ titulo, tipo,dados, funcionarios = [], onClose, onEdit }: DetalharCardProps) {
  const [deletarCard, setDeletarCard] = useState(false);

  const { sub } = useAuth();

  const onDelete = () => {
    setDeletarCard(true);
  }

  const deletarItem = async () => {
    try {
    const endpoint = tipo === 'Usuário' ? 'user' : 'empresa';
    await api.delete(`/${endpoint}/${dados.id}`);
    alert("Item deletado com sucesso");
    onClose();
    } catch (error) {
      alert("Erro ao deletar item");
      console.error(error);
    } finally {
      setDeletarCard(false);
    }
  }
  
  return (
    <section className="detalhar-card">
      <div className="card-content">
        <div className="card-header">
          <h2>{titulo}</h2>
          
          <div className='botoes-header'>

            {sub !== dados.emailInstitucional && (
              <Button
                tipo="quadrado"
                aria-label="Deletar"
                onClick={onDelete}
              >
                <img src={TrashIcon} alt="Deletar" className='icon-lixo'/>
              </Button>
            )}
            
            <Button
              tipo="quadrado"
              aria-label="Editar"
              onClick={onEdit}
            >
              <img src={PencilIcon} alt="Editar" className='icon-lapis'/>
            </Button>

          <Button
            tipo="quadrado"
            aria-label="Fechar"
            onClick={onClose}
          >
            <img src={CloseIcon} alt="Fechar" className='icon-close'/>
          </Button>
          </div>
          
        </div>

        <div className="detalhes">
          {Object.entries(dados).filter(([chave]) => chave !== 'id'  && chave !== 'ativo').map(([chave, valor]) => {
            if (chave === "funcionarios" || chave === "nomeFuncionario" || chave === "emailFuncionario") return null;
            return (
              <div key={chave} className="detalhe-item">
                <strong>{formatarTitulo(chave)}:</strong> <span>{String(valor)}</span>
              </div>
            );
          })}



            {funcionarios.length > 0 && (
              <div className="funcionarios-section">
                {funcionarios.map((func, index) => (
                  <div key={index} className="funcionario-item">
                    <h4>Funcionário {index+1}</h4>
                    <div className='detalhes-funcionario'>
                      {Object.entries(func).filter(([chave]) => chave !== 'id'  && chave !== 'ativo').map(([chave, valor]) => (
                      
                      <div key={chave} className="detalhe-item">
                        <strong>{formatarTitulo(chave)}:</strong> 
                        <span>{valor}</span>
                      </div>
                    ))}
                    </div>
                    
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
      {deletarCard && 
        <div className='card-background'>
          <DeletarCard type={tipo} onCancel={() => setDeletarCard(false)} onConfirm={deletarItem} />
        </div>    
      }
    </section>
  )
}

export default DetalharCard
