import React from 'react'
import './button.style.css'

const Button = ({ children, ring }) => {
  return (
    <button className={`btn ${!ring ? 'btnGetstarted' : 'btnRing'}`}>
      {children}
    </button>
  )
}

export default Button
