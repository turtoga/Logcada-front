import './DeletarCard.scss';
import Button from '../Button';

interface DeletarCardProps {
  type?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

function DeletarCard({ type, onCancel, onConfirm }: DeletarCardProps) {
  return (
    <section className="deletar-card">
      <div className="card-content">
        <div className="card-header">
          <h2>Atenção!</h2>
        </div>

        <div className="detalhes">
          <p>Tem certeza que deseja deletar este {type}?</p>
        </div>

        <div className="form-buttons">
          <Button tipo='small'  onClick={onConfirm}>
            Confirmar
          </Button>
          <Button tipo='small' color='cinza' onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </div>
    </section>
  );
}

export default DeletarCard;
