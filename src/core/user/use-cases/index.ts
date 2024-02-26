import { z } from 'zod';

import { createUseCase } from '@/support';
import { IUseCaseExecute } from '@/core/shared/types';
import { User, UserSchema } from '@/core/user/entities';

export const CreateUser = UserSchema.pick({
  name: true,
  email: true,
  password: true,
});

export type CreateUserInput = z.infer<typeof CreateUser>;
export type CreateUserOutput = Promise<User>;

const execute: IUseCaseExecute<CreateUserInput, CreateUserOutput> =
  ({ Repositories, crypt }) =>
  async ({ name, email, password }: CreateUserInput) => {
    const userEntity = new User({
      email,
      name,
      password: crypt.syncHash(password, 10),
    });

    try {
      const user = await Repositories.user.create(userEntity);
      return user;
    } catch (err) {
      throw err;
    }
  };

export const createUser = createUseCase(CreateUser, execute);
