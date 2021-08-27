import { IReduxAction } from '../types'

interface AuthState {
  readonly fetching: boolean
}

const initialState: AuthState = {
  fetching: false
}

type AuthAction =
  | IReduxAction<typeof REQUEST_AUTH>
  | IReduxAction<typeof SET_AUTH>
  | IReduxAction<typeof SET_AUTH_ERROR>

// types
const REQUEST_AUTH = 'REQUEST_AUTH'
const SET_AUTH = 'SET_AUTH'
const SET_AUTH_ERROR = 'SET_AUTH_ERROR'

// actions
export const requestAuthAction = () => ({ type: REQUEST_AUTH, })
export const setAuthAction = () => ({ type: SET_AUTH, })
export const setAuthErrorAction = () => ({ type: SET_AUTH_ERROR, })

// reducer
const authReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case REQUEST_AUTH:
      return { ...state, fetching: true }
    case SET_AUTH:
    case SET_AUTH_ERROR:
      return { ...state, fetching: false }
    default:
      return state
  }
}

export default authReducer
