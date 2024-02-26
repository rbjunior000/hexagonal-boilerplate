import { User } from '@/core/user/entities';
import { IDatabaseOptions } from '@/ports/database';
import { PaginateOutput } from '@/ports/database/support';
import { PaginationInput } from '@/support';

export type FindInput = Partial<Pick<User, 'name' | 'email' | 'status'>>;
export type PaginateInput = PaginationInput & FindInput;

export type IUserRepository = {
  find(data: FindInput): Promise<User[]>;
  paginate(data: PaginateInput): Promise<PaginateOutput<User>>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(data: User, opts?: IDatabaseOptions): Promise<User>;
  updateById(
    id: string,
    data: Partial<User>,
    opts?: IDatabaseOptions,
  ): Promise<User>;
};
