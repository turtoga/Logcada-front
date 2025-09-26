import TableItem from "./TableItem";
import Decorator from '../../assets/decorator.png'
import"./Tables.scss"
interface TableProps {
  title?: string,
  headers: string[],
  campos: string[],
  itens?: Record<string, any>[];
}

function Table({title, itens, headers, campos}: TableProps) {
  return (
    <section className='table'>
      <div className='title'>
        <div className="linha">
          <h2>{title}</h2>
          <div>
            <p>+ Novo</p>
          </div>
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
            <TableItem item={item} campos={campos}/>            
          </div>
        ))}
      </div>

      

    </section>
  )
}

export default Table