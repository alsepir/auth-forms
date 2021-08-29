export const postSignIn = async ({ login, password }: { login: string; password: string })
  : Promise<{ login?: string; message?: string }> => {
  const user = {
    login,
    password,
  }

  const res = await fetch('http://ec2-18-117-84-227.us-east-2.compute.amazonaws.com/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })

  if (res.status === 204) return { login }
  return { message: 'Введен неверный логин или пароль' }
}

export const postRegistration = async ({ login, password, email }: { login: string; password: string, email: string })
  : Promise<{ login?: string; message?: string }> => {
  const user = {
    login,
    password,
    email,
  }

  const res = await fetch('http://ec2-18-117-84-227.us-east-2.compute.amazonaws.com/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })

  if (res.status === 204) return { login }
  return {}
}
