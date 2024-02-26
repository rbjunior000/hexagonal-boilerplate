export type JWT = {
  generate: (
    value: string | object,
    options?: { expiresIn?: string },
  ) => string;
  decode: <T>(value: string) => T;
};
