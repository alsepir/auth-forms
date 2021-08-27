import { createStore, combineReducers } from 'redux'
import auth from './reducers/auth'
import user from './reducers/user'
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({
  auth,
  user,
})

const store = createStore(
  rootReducer,
  composeWithDevTools()
)

export type RootState = ReturnType<typeof rootReducer>

export default store

