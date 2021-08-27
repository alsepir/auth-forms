export const validationLogin = (login: string) => {
  if (login.length < 4) return 'Должно быть не менее 4 символов'
  return ''
}

export const validationPassword = (password: string) => {
  if (password.length < 6) return 'Должно быть не менее 6 символов'
  return ''
}

export const validationEmail = (email: string) => {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const isValid = reg.test(email.toLowerCase())
  if(!isValid) return 'Не валидный email '
  return ''
}
