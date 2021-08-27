import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Input, Button } from '../../components/index'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import { validationEmail, validationLogin, validationPassword } from '../../utils/validation'
import './auth.scss'

interface Props { }

const AuthView = (props: Props) => {
  const [reg, setReg] = useState(false)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [loginError, setLoginError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')
  const nodeRef = React.useRef(null)
  const history = useHistory()

  const validation = () => {
    setEmailError(validationEmail(email))
    setLoginError(validationLogin(login))
    setPasswordError(validationPassword(password))
  }

  const resetFormState = () => {
    setLogin('')
    setPassword('')
    setEmail('')
    setEmailError('')
    setLoginError('')
    setPasswordError('')
  }

  return (
    <div className='auth-view'>
      <div className='auth-view__content'>
        <SwitchTransition mode='out-in'>
          <CSSTransition
            key={Number(reg)}
            nodeRef={nodeRef} in timeout={250}
            classNames="fade"
          >
            <div ref={nodeRef} >
              <div className='auth-view__title'>{!reg ? 'Вход' : 'Регистрация'}</div>
              <Input
                orderId={1}
                calssName={`auth-view__input_${!loginError ? 'default' : 'error'}`}
                placeholder='Введите имя'
                value={login}
                error={loginError}
                onChange={(value) => {
                  setLogin(value)
                  setLoginError('')
                }}
              />
              <Input
                orderId={2}
                calssName={`auth-view__input_${!passwordError ? 'default' : 'error'}`}
                placeholder='Введите пароль'
                value={password}
                error={passwordError}
                onChange={(value) => {
                  setPassword(value)
                  setPasswordError('')
                }}
              />
              {reg && (
                <Input
                  orderId={3}
                  calssName={`auth-view__input_${!emailError ? 'default' : 'error'}`}
                  placeholder='Введите почту'
                  value={email}
                  error={emailError}
                  onChange={(value) => {
                    setEmail(value)
                    setEmailError('')
                  }}
                />
              )}

              <Button
                title='Войти'
                onClick={() =>
                  validation()
                  // history.push('/main')
                }
              />
              <Button
                title={!reg ? 'Зарегистрироваться' : 'Уже есть аккаунт'}
                type='secondary'
                onClick={() => {
                  setReg(!reg)
                  resetFormState()
                }}
              />
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  )
}

export default AuthView
