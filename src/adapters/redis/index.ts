import { createClient } from 'redis';

import { env } from '@/config';
import { ICache, CacheSetOptions } from '@/ports/cache';

const REDIS_URL = env('CACHE_URL');

const client = createClient({
  url: REDIS_URL,
});

const connect = async () => {
  return client
    .connect()
    .then(() => console.log(`Connected on Redis ${REDIS_URL}`));
};

const get = async <T>(key: string): Promise<T | undefined> => {
  const value = await client.get(key);

  if (!value) {
    return;
  }

  return JSON.parse(value);
};

const set = async (key: string, value: unknown, options: CacheSetOptions) => {
  await client.set(key, JSON.stringify(value), { EX: options?.expiresIn });
};

const exists = async (key: string): Promise<boolean> => {
  const value = await client.exists(key);
  return !!value;
};

const del = async (key: string) => {
  await client.del(key);
};

export const Cache: ICache = {
  connect,
  get,
  set,
  exists,
  delete: del,
};
