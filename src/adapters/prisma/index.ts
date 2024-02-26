import { env } from '@/config';
import { PrismaClient } from '@prisma/client';
import { Repositories } from './modules';
import { IDatabase } from '@/ports/database';

const prisma = new PrismaClient();

// const POSTGRES_URL = env('DATABASE_URL')

const connect = async () =>
  prisma
    .$connect()
    .then(() => console.log('connected'))
    .catch((err) => console.log('error', err));

const createSession = async () => {
  let state: any = [];
  const transaction = prisma.$transaction;

  return {
    value: transaction as never,
    add: (body: any) => state.push(body),
    commit: async () => {
      try {
        await prisma.$transaction(state.map((fn: any) => fn()));
      } catch {}
    },

    rollback: async () => {
      state = [];
    },
  };
};
export const Database: IDatabase = {
  Repositories,
  connect,
  createSession,
};
