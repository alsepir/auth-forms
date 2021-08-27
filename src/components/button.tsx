import React from 'react'
import './button.scss'

interface Props {
  title: string
  onClick: () => void
  type?: 'primary' | 'secondary'
}

const Button = ({ title, onClick, type = 'primary' }: Props) => {
  return (
    <div
      className={`btn btn_${type}`}
      onClick={onClick}
    >
      <span>{title}</span>
    </div>
  )
}

export default Button