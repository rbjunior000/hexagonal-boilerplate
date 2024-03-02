import { z } from 'zod'

export enum UserStatusEnum {
  'ACTIVE' = 'ACTIVE',
  'INACTIVE' = 'INACTIVE',
  'DELETED' = 'DELETED'
}

export const UserStatus = z.nativeEnum(UserStatusEnum)

const ID = z.string().uuid()

const Name = z.string().min(1)

const Password = z.string()

const Email = z.string().email()

const DeletedAt = z.date().nullish()

const CreatedAt = z.date().nullish()

const UpdatedAt = z.date().nullish()

export const UserSchema = z.object({
  id: ID,
  name: Name,
  email: Email,
  password: Password,
  deletedAt: DeletedAt,
  createdAt: CreatedAt,
  updatedAt: UpdatedAt
})
type UserEntity = z.infer<typeof UserSchema>

export class User {
  id!: string
  name!: string
  email!: string
  password!: string
  status!: UserStatusEnum
  deletedAt?: Date
  createdAt?: Date
  updatedAt?: Date

  constructor(user: Omit<UserEntity, 'id'>) {
    Object.assign(this, UserSchema.parse(user))
  }

  isActive() {
    return this.status === UserStatusEnum.ACTIVE
  }

  isInactive() {
    return this.status === UserStatusEnum.INACTIVE
  }

  isDeleted() {
    return this.status === UserStatusEnum.DELETED
  }

  setActive() {
    this.status = UserStatusEnum.ACTIVE
  }

  setInactive() {
    this.status = UserStatusEnum.INACTIVE
  }

  setDeleted() {
    this.deletedAt = new Date()
    this.status = UserStatusEnum.DELETED
  }
}
