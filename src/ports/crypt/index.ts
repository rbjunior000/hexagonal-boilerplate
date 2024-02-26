export type ICrypt = {
  syncHash: (value: string, salts: number) => string;
  compareHash: (value: string, valueToCompare: string) => boolean;
};
