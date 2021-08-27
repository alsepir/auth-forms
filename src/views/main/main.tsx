import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { RootState } from '../../store'

interface Props { }

const Main = (props: Props) => {
  const history = useHistory()
  const userLogin = useSelector((state: RootState) => state.user.login)

  useEffect(() => {
    if (!userLogin) {
      history.replace('/')
    }
  }, [userLogin, history])

  return (
    <div>
      {`Привет, ${userLogin}`}
    </div>
  )
}

export default Main