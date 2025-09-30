import TableItem from "./TableItem";
import Decorator from '../../assets/decorator.png'
import"./Tables.scss"
interface TableProps {
  title?: string,
  headers: string[],
  campos: string[],
  itens?: Record<string, any>[],
  onNovoClick?: () => void,
  onItemClick?: (item: Record<string, any> ) => void;
}

function Table({title, itens, headers, campos, onNovoClick, onItemClick}: TableProps) {
  return (
    <section className='table'>
      <div className='title'>
        <div className="linha">
          <h2>{title}</h2>
          <button onClick={onNovoClick}>
            <p>
              + Novo
            </p>
          </button>
        </div>
        
        <img src={Decorator} alt='Decora título'/>
      </div>
      <div className="cabecalho" style={{ gridTemplateColumns: `repeat(${headers.length}, 1fr)` }}>
        {headers.map((header , index) => (
          <div key={index}>{header}</div>
        ))}
      </div>
      <div className="itens">
        {itens?.map((item, index) => (
          <div className="bord" key={index}>
            <TableItem onClick={() => onItemClick?.(item)} item={item} campos={campos}/>            
          </div>
        ))}
      </div>
    </section>
  )
}

export default Table