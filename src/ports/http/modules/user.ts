import { IDependencies } from '@/core/shared/types'
import { IRoute } from '..'
import { CreateUserInput, CreateUserOutput, createUser } from '@/core/user/use-cases/create-user'
import { EditUserInput, EditUserOutput, editUser } from '@/core/user/use-cases/edit-user'
import { DeleteUserInput, DeleteUserOutput, destroyUser } from '@/core/user/use-cases/delete-user'
// import { ListUserInput, ListUserOutput, listUser } from '@/core/user/use-cases/list-users'

export type IUserRouter = {
  createUser: IRoute<null, null, CreateUserInput, { token: string }, CreateUserOutput>
  editUser: IRoute<null, { id: string }, Pick<EditUserInput, 'name'>, { token: string }, EditUserOutput>
  destroyUser: IRoute<null, DeleteUserInput, null, { token: string }, DeleteUserOutput>
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
  editUser: {
    path: '/users/:id',
    method: 'PUT',
    execute: async ({ body, params }, context) => {
      return editUser(dependencies, context)({ id: params.id, name: body.name })
    },
    statusResponseCode: 200,
  },
  destroyUser: {
    path: '/users/:id',
    method: 'DELETE',
    execute: async ({ params }, context) => {
      return destroyUser(dependencies, context)({ id: params.id })
    },
    statusResponseCode: 200,
  }
})
