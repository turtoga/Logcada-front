import React from 'react'
import './Button.scss'

interface ButtonProps {
  children?: React.ReactNode;
  type?: "redondo" | "normal";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Button({children, type, onClick}: ButtonProps) {
  return (
    <button className={`button ${type}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button