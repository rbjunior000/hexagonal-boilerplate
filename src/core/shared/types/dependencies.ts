import { IRepositories } from '@/ports/database';
import { ICache } from '@/ports/cache';
import { JWT } from '@/ports/jwt';
import { ICrypt } from '@/ports/crypt';

export type IDependencies = {
  Repositories: IRepositories;
  // Database: Pick<IDatabase, 'createSession'>
  Cache: ICache;
  jwt: JWT;
  crypt: ICrypt;
};
