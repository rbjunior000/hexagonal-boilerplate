import { ICache } from '@/ports/cache';

import { IRepositories } from './modules';

export { IRepositories };

export type IRepositoriesOpts = {
  Cache: ICache;
};

export type ISession = {
  value: unknown;
  commit(): Promise<void>;
  rollback(): Promise<void>;
};

export type IDatabaseOptions = {
  session?: unknown;
};

export type IDatabase = {
  connect(): Promise<void>;
  createSession(): Promise<ISession>;
  Repositories(opts: IRepositoriesOpts): IRepositories;
};
