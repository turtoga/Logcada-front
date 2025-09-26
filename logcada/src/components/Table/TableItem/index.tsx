import React from 'react'
import"./TableItem.scss"

interface TableItemProps {
  item: Record<string, any>,
  campos: string[],
}

function TableItem({item, campos}: TableItemProps) {
  return (
    <div className='table-item' style={{ gridTemplateColumns: `repeat(${campos.length}, 1fr)` }}>
      {campos.map((campo, index) => (
        <div key={index}>{item[campo]}</div>
      ))}
    </div>
  )
}

export default TableItem