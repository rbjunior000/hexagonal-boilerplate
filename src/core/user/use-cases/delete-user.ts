import { z } from 'zod'

import { createUseCase } from '@/support'
import { IUseCaseExecute } from '@/core/shared/types'
import { User, UserSchema } from '@/core/user/entities'

export const DeleteUser = UserSchema.pick({
  id: true,
})

export type DeleteUserInput = z.infer<typeof DeleteUser>
export type DeleteUserOutput = Promise<User>

const execute: IUseCaseExecute<DeleteUserInput, DeleteUserOutput> =
  ({ Repositories }) =>
  async ({ id }: DeleteUserInput) => {
    try {
      const user = await Repositories.user.destroyUser(id)
      return user
    } catch(err) {
      throw err
    }

  }

export const destroyUser = createUseCase(DeleteUser, execute)
