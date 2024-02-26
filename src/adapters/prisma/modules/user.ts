import { IRepositoriesOpts } from '@/ports/database';
import { IUserRepository } from '@/ports/database/modules/user';
import { PrismaClient } from '@prisma/client';
import { User } from '@/core/user/entities';
import { PaginateInput, FindInput } from '@/ports/database/modules/user';
import { calculateSkip } from '@/ports/database/support';

const prisma = new PrismaClient();

export const user = (args: IRepositoriesOpts): IUserRepository => ({
  async create(data: User) {
    const model = await prisma.user.create({ data });
    const user = new User(model);
    return user;
  },
  async find(data: FindInput) {
    const list = await prisma.user.findMany({
      where: {
        name: data.name,
      },
    });
    return list.map((user) => new User(user));
  },
  async paginate(data: PaginateInput) {
    const list = await prisma.$transaction([
      prisma.user.count(),
      prisma.user.findMany({
        take: data.pageSize,
        skip: calculateSkip(data.page, data.pageSize),
      }),
    ]);
    const docs = list[1].map((user) => new User(user));
    return {
      docs,
      limit: data.pageSize,
      page: data.page,
      total: list[0],
    };
  },
  async findById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error('Usuario não existe');
    }
    return new User(user);
  },
  async updateById(id: string, data: Partial<User>) {
    const user = await prisma.user.update({ where: { id }, data });
    return new User(user);
  },
  async findByEmail(email: string) {
    const user = await prisma.user.findFirstOrThrow({ where: { email } });
    console.log({ adpkoapdskapo: user });
    return new User(user);
  },
});
