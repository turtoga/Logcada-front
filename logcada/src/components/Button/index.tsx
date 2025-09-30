import React from 'react'
import './Button.scss'

interface ButtonProps {
  children?: React.ReactNode;
  type?: "redondo" | "normal" | "quadrado" | "small";
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  color?: "cinza"
}

function Button({children, type, onClick, color}: ButtonProps) {
  return (
    <button className={`button ${type} ${color}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button