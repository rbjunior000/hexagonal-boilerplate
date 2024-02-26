export type CacheSetOptions = {
  expiresIn?: number
}

export type ICache = {
  connect(): Promise<void>
  get<T>(key: string): Promise<T | undefined>
  set(key: string, value: unknown, options?: CacheSetOptions): Promise<void>
  exists(key: string): Promise<boolean>
  delete(key: string): Promise<void>
}
