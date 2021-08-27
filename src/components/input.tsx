import React, { useState } from 'react'
import './input.scss'

interface Props {
  placeholder?: string
  orderId?: number
  value?: string
  onChange?: (value: string) => void
  error?: string
  calssName?: string
  type?: 'password' | 'text'
}

const Input = ({ value, onChange, placeholder, orderId = 1, error, calssName, type = 'text' }: Props) => {
  const [focus, setFocus] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const id = `input ${orderId}`

  const onFocus = () => setFocus(true)
  const onBlur = () => setFocus(false)

  const filledCSS = !!value ? 'input__placeholder_filled' : ''
  const focusCSS = focus ? 'input__placeholder_focus' : ''
  const ErrorCSS = !!error ? 'input__placeholder_error' : ''

  return (
    <div className={calssName}>
      <div onBlur={onBlur} className={`input ${focus ? 'input_focus' : ''}`}>
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
          className={`input_custom ${!!error ? 'input_error' : ''}`}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value)}
          onFocus={onFocus}
          type={type === 'password' && !showPass ? 'password' : 'text'}
        />
        {!!value && type === 'password' && (
          <label
            htmlFor={id}
            className='input__postfix'
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? 'Скрыть' : 'Показать' }
          </label>
        )}
      </div>
      {!!error && <div className='input__error'>{error}</div>}
    </div>
  )
}

export default Input