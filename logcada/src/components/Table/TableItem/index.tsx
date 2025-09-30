import"./TableItem.scss"

interface TableItemProps {
  item: Record<string, any>,
  campos: string[],
  onClick?: () => void
}

function TableItem({item, campos, onClick}: TableItemProps) {
  return (
    <div className='table-item' onClick={onClick} style={{ gridTemplateColumns: `repeat(${campos.length}, 1fr)` }}>
      {campos.map((campo, index) => (
        <div key={index}>{item[campo]}</div>
      ))}
    </div>
  )
}

export default TableItem