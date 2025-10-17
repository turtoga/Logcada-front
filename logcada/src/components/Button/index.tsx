import React from 'react'
import './Button.scss'

interface ButtonProps {
  children?: React.ReactNode;
  tipo?: "redondo" | "normal" | "quadrado" | "small";
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  color?: "cinza"
  type?: "button" | "submit" | "reset"; 
  disabled?: boolean
}

function Button({disabled,children, tipo, onClick, color, type}: ButtonProps) {
  return (
    <button disabled={disabled} className={`button ${tipo} ${color}`} onClick={onClick} type={type}>
      {children}
    </button>
  )
}

export default Button