import { z } from 'zod'

import { IUseCaseExecute } from '@/core/shared/types'
import { User, UserSchema } from '@/core/user/entities'
import { PaginationInput, createUseCase } from '@/support'
import { PaginateOutput } from '@/ports/database/support'

export const ListUser = UserSchema.pick({
  name: true,
  email: true,
}).partial()

export type ListUserInput = z.infer<typeof ListUser> & PaginationInput
export type ListUserOutput = Promise<PaginateOutput<User>>

const execute: IUseCaseExecute<ListUserInput, ListUserOutput> =
  ({ Repositories }) =>
  async ({ name, email,page, pageSize }: ListUserInput) => {
    return Repositories.user.paginate({
      page,
      pageSize,
      email,
      name,
    })
  }

export const listUser = createUseCase(ListUser, execute)
