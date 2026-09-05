export type MethodId = "rbxplus" | "gamepass" | "code";

export interface DeliveryMethod {
  id: MethodId;
  name: string;
  tagline: string;
  description: string;
  /** Комиссия в долях: 0.06 = 6% */
  fee: number;
  /** Сколько занимает выдача, для карточки способа */
  eta: string;
  /** Что попросим у покупателя на checkout сверх username и email */
  extraField?: { label: string; placeholder: string; hint: string };
  recommended?: boolean;
}

export interface RobuxPack {
  id: string;
  amount: number;
  /** Базовая цена в USD до комиссии способа получения */
  base: number;
  /** Зачёркнутая цена «было», если у номинала есть выгода */
  was?: number;
  popular?: boolean;
  bestValue?: boolean;
}

export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "completed"
  | "cancelled"
  | "refunded";

export interface Order {
  id: string;
  createdAt: string;
  item: string;
  amount?: number;
  method: MethodId;
  total: number;
  status: OrderStatus;
  robloxUsername: string;
  email: string;
}

export interface RobloxAccount {
  id: string;
  title: string;
  level: number;
  items: number;
  limiteds: number;
  /** Возраст аккаунта в годах */
  ageYears: number;
  price: number;
  /** Robux на балансе аккаунта */
  balance: number;
  verified: boolean;
  sold: boolean;
  highlights: string[];
  hue: number;
}

export type TicketStatus = "open" | "answered" | "closed";

export interface Ticket {
  id: string;
  subject: string;
  category: string;
  orderId?: string;
  status: TicketStatus;
  updatedAt: string;
}
