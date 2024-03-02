import { IRepositories, IRepositoriesOpts } from '@/ports/database'
import { user } from './user.prisma'

export const Repositories = (opts: IRepositoriesOpts): IRepositories => ({
  user: user(opts),
})
