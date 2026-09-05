import type { DeliveryMethod, MethodId } from "../types";

/** Способы получения из ТЗ п.5. Комиссия и доступность правятся в админке */
export const methods: DeliveryMethod[] = [
  {
    id: "rbxplus",
    name: "RBX Plus",
    tagline: "Нужен только ник",
    description:
      "Начисляем на аккаунт через партнёрскую площадку. Ничего настраивать не нужно — достаточно ника в Roblox.",
    fee: 0,
    eta: "2–10 минут",
    recommended: true,
  },
  {
    id: "gamepass",
    name: "Game Pass",
    tagline: "Через свой игровой пропуск",
    description:
      "Вы создаёте Game Pass в своей игре и присылаете ссылку, мы его покупаем. Roblox удерживает свою долю — она уже в комиссии.",
    fee: 0.29,
    eta: "5–20 минут",
    extraField: {
      label: "Ссылка на Game Pass",
      placeholder: "https://www.roblox.com/game-pass/…",
      hint: "Пропуск должен быть выставлен на нужную сумму и доступен для покупки.",
    },
  },
  {
    id: "code",
    name: "Code",
    tagline: "Код на пополнение",
    description:
      "Присылаем код Roblox Gift Card на почту. Активируете сами в любой момент — аккаунт нам не нужен.",
    fee: 0.07,
    eta: "мгновенно",
  },
];

export function methodById(id: MethodId): DeliveryMethod {
  const found = methods.find((m) => m.id === id);
  if (!found) throw new Error(`Unknown delivery method: ${id}`);
  return found;
}
