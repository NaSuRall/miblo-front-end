import React from 'react'

function Button({children, onClick, className}) {
  return (
    <button 
    className={className}
    style={{color: "var(--color-gray)"}}
    onClick={onClick}>{children}</button>
  )
}

export default Button
