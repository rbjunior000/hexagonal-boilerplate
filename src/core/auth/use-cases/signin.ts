import { z } from 'zod'

import { createUseCase } from '@/support'
import { IUseCaseExecute } from '@/core/shared/types'
import { AuthError } from '@/support/error'

export const Auth = z.object({
  email: z.string(),
  password: z.string(),
})

export type SignInInput = z.infer<typeof Auth>
export type SignInOutput = Promise<{ hash: string }>

const execute: IUseCaseExecute<SignInInput, SignInOutput> =
  ({ jwt, Repositories, crypt }) =>
  async ({ email, password }: SignInInput) => {
    const user = await Repositories.user.findByEmail(email)
    if (!user) {
      throw new AuthError('aopkdsoa')
    }
    if (!crypt.compareHash(password, user.password)) {
      throw new AuthError('apodskpaodk')
    }
    return {
      hash: jwt.generate({ id: user.id }, { expiresIn: '7d' })
    }
  }

export const signIn = createUseCase(Auth, execute)
