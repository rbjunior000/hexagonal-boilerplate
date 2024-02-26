import { me, MeInput, MeOutput } from '@/core/auth/use-cases/me';
import {
  signIn,
  SignInInput,
  SignInOutput,
} from '@/core/auth/use-cases/signin';
import { IDependencies } from '@/core/shared/types';
import { IRoute, RequiredAuth } from '@/ports/http';

export type IAuthRoute = {
  signIn: IRoute<
    null,
    null,
    SignInInput,
    { Authorization: string },
    SignInOutput
  >;
  me: IRoute<null, null, MeInput, { Authorization: string }, MeOutput>;
};

export const AuthHttp = (dependencies: IDependencies): IAuthRoute => ({
  signIn: {
    path: '/auth/signin',
    method: 'POST',
    execute: async ({ body }, context) => {
      return signIn(dependencies, context)(body);
    },
    statusResponseCode: 200,
  },
  me: {
    path: '/auth/me',
    method: 'POST',
    execute: async ({ headers }, context) => {
      RequiredAuth(headers);
      return me(dependencies, context)(headers);
    },
    statusResponseCode: 200,
  },
});
