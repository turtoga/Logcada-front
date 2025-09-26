import React from 'react'

interface TableItemProps {
  item: Record<string, string|number>,
  headers: string[],
}

function TableItem({item, headers}: TableItemProps) {
  return (
    <div className='table-item'>
      {headers.map((header, index) => (
        <div key={index}>{item[header]}</div>
      ))}
    </div>
  )
}

export default TableItem