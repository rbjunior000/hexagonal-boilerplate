import { IContext, IDependencies } from '@/core/shared/types'

export type IRoute<T, E, K, P, Q> = {
  path: string
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
  execute: (input: IRouteInput<T, E, K, P>, context: IContext) => Q
  statusResponseCode?: number
}
export type IRouteInput<T, E, K, P> = {
  query: T
  params: E
  body: K
  headers: P
}

export * from './modules'

export type IServer = {
  start(dependencies: IDependencies): Promise<void>
}

export const RequiredAuth = ({ Authorization }: {Authorization: string}) => {
  return !!Authorization
}

