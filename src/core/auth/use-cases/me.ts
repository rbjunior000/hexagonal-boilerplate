import { z } from 'zod'

import { createUseCase } from '@/support'
import { IUseCaseExecute } from '@/core/shared/types'
import { User } from '@/core/user/entities'

export const UserMe = z.object({
  Authorization: z.string()
})

export type MeInput = z.infer<typeof UserMe>
export type MeOutput = Promise<User>

const execute: IUseCaseExecute<MeInput, MeOutput> =
  ({ jwt, Repositories }) =>
  async ({ Authorization }: MeInput) => {
    const userPayload = jwt.decode(Authorization) as any
    console.log({userPayload})
    const user = Repositories.user.findById(userPayload.id)
    return user
  }

export const me = createUseCase(UserMe, execute)
