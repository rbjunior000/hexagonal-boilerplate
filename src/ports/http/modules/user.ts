import { IDependencies } from '@/core/shared/types'
import { CreateUserInput, CreateUserOutput, createUser } from '@/core/user/use-cases'
import { IRoute } from '..'

export type IUserRouter = {
  createUser: IRoute<null, null, CreateUserInput, { token: string }, CreateUserOutput>
}

export const UserHttp = (dependencies: IDependencies): IUserRouter => ({
  createUser: {
    path: '/users',
    method: 'POST',
    execute: async ({ body }, context) => {
      return createUser(dependencies, context)(body)
    },
    statusResponseCode: 200
  },
})
