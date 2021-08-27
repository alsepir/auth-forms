import React, { useState } from 'react'
import './input.scss'

interface Props {
  placeholder?: string
  orderId?: number
  value?: string
  onChange?: (value: string) => void
  error?: string
  calssName?: string
}

const Input = ({ value, onChange, placeholder, orderId = 1, error, calssName }: Props) => {
  const [focus, setFocus] = useState(false)
  const id = `input ${orderId}`

  const onClick = () => setFocus(true)
  const onBlur = () => setFocus(false)

  const filledCSS = !!value ? 'input__placeholder_filled' : ''
  const focusCSS =  focus ? 'input__placeholder_focus' : ''
  const ErrorCSS =  !!error ? 'input__placeholder_error' : ''

  return (
    <div className={calssName}>
      <div onBlur={onBlur} className={`input ${focus ? 'input_focus' : ''} ${!!error ? 'input_error' : ''}`}>
        {!!placeholder && (
          <label
            htmlFor={id}
            className={`input__placeholder ${filledCSS} ${focusCSS} ${ErrorCSS}`}
          >
            {placeholder}
          </label>
        )}
        <input
          id={id}
          className='input_custom'
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value)}
          onClick={onClick}
        />
      </div>
      {!!error && <div className='input__error'>{error}</div>}
    </div>
  )
}

export default Input