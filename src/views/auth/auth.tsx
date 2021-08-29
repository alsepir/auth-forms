import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Button } from '../../components/index'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import { validationEmail, validationLogin, validationPassword } from '../../utils/validation'
import { postSignIn, postRegistration } from '../../api'
import { requestAuthAction, setAuthAction } from '../../store/reducers/auth'
import { setUserAction, setUserErrorAction, resetUserErrorAction } from '../../store/reducers/user'
import { RootState } from '../../store'
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
  const dispatch = useDispatch()
  const userLogin = useSelector((state: RootState) => state.user.login)
  const errorMessage = useSelector((state: RootState) => state.user.message)

  useEffect(() => {
    if (!!userLogin) {
      history.replace('/main')
    }
  }, [userLogin, history])

  const validation = (): boolean => {
    const loginError = validationLogin(login)
    const passwordError = validationPassword(password)
    const emailError = validationEmail(email)

    setEmailError(emailError)
    setLoginError(loginError)
    setPasswordError(passwordError)

    if (reg) return !loginError && !passwordError && !emailError
    return !loginError && !passwordError
  }

  const sendForm = async () => {
    const isValid = validation()
    if (isValid) {
      dispatch(requestAuthAction())
      const res = reg
        ? await postRegistration({ login, password, email })
        : await postSignIn({ login, password })
      dispatch(setAuthAction())
      if (!!res.login) dispatch(setUserAction(res.login))
      if (!!res.message) dispatch(setUserErrorAction(res.message))
    }
  }

  const resetFormState = () => {
    setLogin('')
    setPassword('')
    setEmail('')
    setEmailError('')
    setLoginError('')
    setPasswordError('')
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendForm()
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
            <form ref={nodeRef} onSubmit={(e) => onSubmit(e)}>
              <input className='auth-view__submit' type='submit' value='' />
              <div className='auth-view__title'>{!reg ? 'Вход' : 'Регистрация'}</div>
              {errorMessage && <div className='auth-view__error-message'>{errorMessage}</div>}
              <Input
                orderId={1}
                calssName={`auth-view__input_${!loginError ? 'default' : 'error'}`}
                placeholder='Введите имя'
                value={login}
                error={loginError}
                onChange={(value) => {
                  setLogin(value)
                  setLoginError('')
                  if (!!errorMessage) dispatch(resetUserErrorAction())
                }}
              />
              <Input
                orderId={2}
                calssName={`auth-view__input_${!passwordError ? 'default' : 'error'}`}
                placeholder='Введите пароль'
                type='password'
                value={password}
                error={passwordError}
                onChange={(value) => {
                  setPassword(value)
                  setPasswordError('')
                  if (!!errorMessage) dispatch(resetUserErrorAction())
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
                    if (!!errorMessage) dispatch(resetUserErrorAction())
                  }}
                />
              )}

              <Button
                title={!reg ? 'Войти' : 'Отправить'}
                onClick={sendForm}
              />
              <Button
                title={!reg ? 'Зарегистрироваться' : 'Уже есть аккаунт'}
                type='secondary'
                onClick={() => {
                  setReg(!reg)
                  resetFormState()
                  if (!!errorMessage) dispatch(resetUserErrorAction())
                }}
              />
            </form>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  )
}

export default AuthView
