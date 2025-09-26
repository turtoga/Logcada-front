import TableItem from "./TableItem";

interface TableProps {
  title?: string,
  headers: string[],
  itens?: Record<string, any>[];
}

function Table({title, itens, headers}: TableProps) {
  return (
    <section className='table'>
      <div className='title'>
        <h2>{title}</h2>
        <img src='' alt='Decora título'/>
      </div>
      <div className="cabecalho">
        {headers.map((header , index) => (
          <div key={index}>{header}</div>
        ))}
      </div>
      <div className="itens">
        {itens?.map((item, index) => (
          <div className="bord" key={index}>
            <TableItem item={item} headers={headers}/>            
          </div>
        ))}
      </div>

      

    </section>
  )
}

export default Table