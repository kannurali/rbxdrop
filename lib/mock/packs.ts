import type { RobuxPack } from "../types";

/** В боевой версии приезжает из БД и правится в админке (ТЗ п.4, п.12) */
export const packs: RobuxPack[] = [
  { id: "r400", amount: 400, base: 3.49, was: 4.99 },
  { id: "r800", amount: 800, base: 6.79, was: 9.99 },
  { id: "r1700", amount: 1700, base: 13.99, was: 19.99, popular: true },
  { id: "r4500", amount: 4500, base: 35.49, was: 49.99 },
  { id: "r10000", amount: 10000, base: 74.99, was: 99.99, bestValue: true },
];

export function packById(id: string): RobuxPack | undefined {
  return packs.find((p) => p.id === id);
}
