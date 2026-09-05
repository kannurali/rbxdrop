import type { DeliveryMethod, RobuxPack } from "./types";

/**
 * Вся арифметика денег живёт здесь и только здесь.
 *
 * В МАКЕТЕ это считается в браузере — так можно, потому что покупки нет.
 * В БОЕВОЙ ВЕРСИИ этот модуль целиком переезжает на сервер, а клиент получает
 * готовую цену по id номинала и id способа. Если оставить расчёт на клиенте и
 * принимать цену из тела запроса, любой покупатель оформит 10 000 Robux за один
 * цент. Вёрстку при переезде править не придётся: компоненты зовут только эти
 * функции.
 */

/** Цена за один Robux при вводе произвольного количества */
export const RATE_PER_ROBUX = 0.0085;

export const MIN_CUSTOM_ROBUX = 100;
export const MAX_CUSTOM_ROBUX = 100000;

export function basePriceFor(amount: number): number {
  return round2(amount * RATE_PER_ROBUX);
}

export function feeAmount(base: number, method: Pick<DeliveryMethod, "fee">): number {
  return round2(base * method.fee);
}

export function totalFor(base: number, method: Pick<DeliveryMethod, "fee">): number {
  return round2(base + feeAmount(base, method));
}

export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

export function formatRobux(amount: number): string {
  return amount.toLocaleString("ru-RU");
}

/** Скидка относительно цены «было», в целых процентах */
export function discountPercent(pack: RobuxPack): number | null {
  if (!pack.was || pack.was <= pack.base) return null;
  return Math.round((1 - pack.base / pack.was) * 100);
}

export function clampCustomAmount(value: number): number {
  if (Number.isNaN(value)) return MIN_CUSTOM_ROBUX;
  return Math.min(MAX_CUSTOM_ROBUX, Math.max(MIN_CUSTOM_ROBUX, Math.round(value)));
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
