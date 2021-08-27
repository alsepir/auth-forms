export interface IReduxAction<T = any, P = any> {
  type: T
  payload: P
}