import { IDependencies } from '@/core/shared/types'
import { IRepositoriesOpts } from '@/ports/database'
import { Database } from './adapters/prisma'
import { Cache } from './adapters/redis'
import { JWT } from './adapters/jwt'
import { Bcrypt } from './adapters/crypt'

const RepositoriesOpts: IRepositoriesOpts = {
  Cache
}

export const Dependencies: IDependencies = {
  Repositories: Database.Repositories(RepositoriesOpts),
  Cache,
  // Database: Database.createSession
  jwt: JWT,
  crypt: Bcrypt,
}

export const bootstrap = async () => {
  await Database.connect()
  await Cache.connect()
}
