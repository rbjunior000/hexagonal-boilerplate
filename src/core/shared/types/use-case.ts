import { IDependencies, IContext } from '@/core/shared/types';

export type IUseCaseExecute<T, P> = (
  dependencies: IDependencies,
  context: IContext,
) => (input: T) => P;
