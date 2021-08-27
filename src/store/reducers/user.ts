import { IReduxAction } from '../types'

interface UserState {
  readonly login: string
  readonly fetching: boolean
}

const initialState: UserState = {
  login: '',
  fetching: false
}

type AuthAction =
  | IReduxAction<typeof REQUEST_USER>
  | IReduxAction<typeof SET_USER, string>
  | IReduxAction<typeof SET_USER_ERROR>

// types
const REQUEST_USER = 'REQUEST_USER'
const SET_USER = 'SET_USER'
const SET_USER_ERROR = 'SET_USER_ERROR'

// actions
export const requestUserAction = () => ({ type: REQUEST_USER, })
export const setUserAction = (login: string) => ({ type: SET_USER, payload: login })
export const setUserErrorAction = () => ({ type: SET_USER_ERROR, })

// reducer
const userReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case REQUEST_USER:
      return { ...state, fetching: true }
    case SET_USER:
      return { ...state, fetching: false, login: action.payload }
    case SET_USER_ERROR:
      return { ...state, fetching: false, login: '' }
    default:
      return state
  }
}

export default userReducer
