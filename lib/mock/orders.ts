import type { Order, OrderStatus, Ticket } from "../types";

export const statusLabels: Record<OrderStatus, string> = {
  pending: "Ожидает оплаты",
  paid: "Оплачен",
  processing: "Выполняется",
  completed: "Выполнен",
  cancelled: "Отменён",
  refunded: "Возвращён",
};

/** Порядок для полосы прогресса на странице заказа */
export const statusFlow: OrderStatus[] = ["pending", "paid", "processing", "completed"];

export const orders: Order[] = [
  {
    id: "RBX-48213",
    createdAt: "2026-09-05T14:12:00Z",
    item: "1 700 Robux",
    amount: 1700,
    method: "gamepass",
    total: 18.05,
    status: "processing",
    robloxUsername: "nur_builds",
    email: "nurali@example.com",
  },
  {
    id: "RBX-47990",
    createdAt: "2026-09-02T09:40:00Z",
    item: "800 Robux",
    amount: 800,
    method: "rbxplus",
    total: 6.79,
    status: "completed",
    robloxUsername: "nur_builds",
    email: "nurali@example.com",
  },
  {
    id: "RBX-47115",
    createdAt: "2026-08-27T18:03:00Z",
    item: "Account #65818",
    method: "code",
    total: 18.9,
    status: "completed",
    robloxUsername: "nur_builds",
    email: "nurali@example.com",
  },
  {
    id: "RBX-46702",
    createdAt: "2026-08-19T11:25:00Z",
    item: "400 Robux",
    amount: 400,
    method: "code",
    total: 3.73,
    status: "refunded",
    robloxUsername: "nur_builds",
    email: "nurali@example.com",
  },
  {
    id: "RBX-46188",
    createdAt: "2026-08-11T20:47:00Z",
    item: "4 500 Robux",
    amount: 4500,
    method: "rbxplus",
    total: 35.49,
    status: "cancelled",
    robloxUsername: "nur_builds",
    email: "nurali@example.com",
  },
];

export function orderById(id: string): Order | undefined {
  return orders.find((o) => o.id.toLowerCase() === id.toLowerCase());
}

export const tickets: Ticket[] = [
  {
    id: "T-2041",
    subject: "Game Pass не принимает ссылку",
    category: "Получение товара",
    orderId: "RBX-48213",
    status: "answered",
    updatedAt: "2026-09-05T15:02:00Z",
  },
  {
    id: "T-1988",
    subject: "Оплата прошла дважды",
    category: "Оплата",
    orderId: "RBX-46702",
    status: "closed",
    updatedAt: "2026-08-20T08:14:00Z",
  },
];
