import { ICrypt } from "@/ports/crypt";
import { hashSync, compareSync } from "bcrypt";

export const Bcrypt: ICrypt = {
  syncHash: (value, number) => hashSync(value, number),
  compareHash: (value, valueToCompare) => compareSync(value, valueToCompare)
}