import React from 'react'
import './Button.scss'

interface ButtonProps {
  children?: React.ReactNode;
  tipo?: "redondo" | "normal" | "quadrado" | "small";
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  color?: "cinza"
  type?: "button" | "submit" | "reset"; 
}

function Button({children, tipo, onClick, color, type}: ButtonProps) {
  return (
    <button className={`button ${tipo} ${color}`} onClick={onClick} type={type}>
      {children}
    </button>
  )
}

export default Button