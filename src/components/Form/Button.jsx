import React from 'react'
import PropTypes from "prop-types";

function Button({children, onClick, className}) {
  return (
    <button 
    className={className}
    style={{color: "var(--color-gray)"}}
    onClick={onClick}>{children}</button>
  )
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string
}
export default Button
