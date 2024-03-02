import { z } from 'zod'

import { createUseCase } from '@/support'
import { IUseCaseExecute } from '@/core/shared/types'
import { User, UserSchema } from '@/core/user/entities'

export const EditUser = UserSchema.pick({
  id: true,
  name: true,
})

export type EditUserInput = z.infer<typeof EditUser>
export type EditUserOutput = Promise<User>

const execute: IUseCaseExecute<EditUserInput, EditUserOutput> =
  ({ Repositories }) =>
  async ({ name, id }: EditUserInput) => {
    try {
      const user = await Repositories.user.updateById(id, { name })
      return user
    } catch(err) {
      throw err
    }

  }

export const editUser = createUseCase(EditUser, execute)
