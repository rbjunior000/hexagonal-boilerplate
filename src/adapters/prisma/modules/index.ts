import { IRepositories, IRepositoriesOpts } from '@/ports/database'
import { user } from './user'

export const Repositories = (opts: IRepositoriesOpts): IRepositories => ({
  user: user(opts),
})
