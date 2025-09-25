import React from 'react'
import './Button.scss'

interface ButtonProps {
  children?: React.ReactNode;
}

function Button({children}: ButtonProps) {
  return (
    <button className='button'>
      {children}
    </button>
  )
}

export default Button