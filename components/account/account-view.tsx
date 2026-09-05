"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { StatusPill } from "@/components/ui/status-pill";
import { orders as mockOrders, tickets } from "@/lib/mock/orders";
import { readPlacedOrders } from "@/lib/order-draft";
import { formatPrice } from "@/lib/pricing";
import type { Order } from "@/lib/types";
import { cn } from "@/lib/cn";

const tabs = [
  { id: "orders", label: "Мои заказы" },
  { id: "profile", label: "Профиль" },
  { id: "support", label: "Поддержка" },
] as const;

type Tab = (typeof tabs)[number]["id"];

export function AccountView() {
  const [tab, setTab] = useState<Tab>("orders");
  const [list, setList] = useState<Order[]>(mockOrders);

  useEffect(() => {
    const placed = readPlacedOrders();
    // Заказы этой сессии живут в sessionStorage, дочитываем их после монтирования.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (placed.length > 0) setList([...placed, ...mockOrders]);
  }, []);

  return (
    <Container className="py-10 sm:py-14">
      <h1 className="text-[32px] sm:text-[40px]">Личный кабинет</h1>

      <div className="mt-8 flex gap-1.5 border-b border-line">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "-mb-px border-b-2 px-4 py-3 text-[15px] transition-colors duration-200",
              tab === t.id
                ? "border-sky text-ink"
                : "border-transparent text-mute hover:text-ink",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "orders" ? <OrdersTable list={list} /> : null}
      {tab === "profile" ? <Profile /> : null}
      {tab === "support" ? <Tickets /> : null}
    </Container>
  );
}

function OrdersTable({ list }: { list: Order[] }) {
  if (list.length === 0) {
    return (
      <div className="mt-10 rounded-card border border-dashed border-line p-12 text-center">
        <p className="text-[17px] text-ink">Заказов пока нет</p>
        <p className="mx-auto mt-2 max-w-[40ch] text-[14px] text-mute">
          Здесь появятся все покупки — Robux и аккаунты, с номером и статусом.
        </p>
        <ButtonLink href="/rbx" size="md" className="mt-6">
          Купить Robux
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full min-w-[680px] border-collapse text-left">
        <thead>
          <tr className="border-b border-line text-[13px] text-faint">
            <th className="py-3 pr-4 font-normal">Номер</th>
            <th className="py-3 pr-4 font-normal">Товар</th>
            <th className="py-3 pr-4 font-normal">Сумма</th>
            <th className="py-3 pr-4 font-normal">Статус</th>
            <th className="py-3 pr-4 font-normal">Дата</th>
            <th className="py-3" />
          </tr>
        </thead>
        <tbody>
          {list.map((order) => (
            <tr
              key={order.id}
              className="border-b border-line/70 transition-colors duration-200 hover:bg-slab"
            >
              <td className="num py-4 pr-4 text-[14px] text-ink">{order.id}</td>
              <td className="num py-4 pr-4 text-[14px] text-mute">{order.item}</td>
              <td className="num py-4 pr-4 text-[14px] text-ink">{formatPrice(order.total)}</td>
              <td className="py-4 pr-4">
                <StatusPill status={order.status} />
              </td>
              <td className="num py-4 pr-4 text-[14px] text-mute">
                {new Date(order.createdAt).toLocaleDateString("ru-RU", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                })}
              </td>
              <td className="py-4 text-right">
                <Link
                  href={`/order/${order.id}`}
                  className="inline-flex items-center gap-1.5 text-[14px] text-sky transition-colors duration-200 hover:text-ink"
                >
                  Открыть
                  <ArrowRight size={14} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Profile() {
  const rows = [
    { label: "Email", value: "nurali@example.com" },
    { label: "Ник в Roblox", value: "nur_builds" },
    { label: "Дата регистрации", value: "14 марта 2026" },
    { label: "Всего заказов", value: "5" },
  ];

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      <div className="rounded-card border border-line bg-slab p-6">
        <h2 className="text-[19px]">Профиль</h2>
        <dl className="mt-6 space-y-4 text-[15px]">
          {rows.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-6">
              <dt className="text-mute">{row.label}</dt>
              <dd className="num text-right text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="rounded-card border border-line bg-slab p-6">
        <h2 className="text-[19px]">Безопасность</h2>
        <p className="mt-4 text-[14px] leading-relaxed text-mute">
          Почта подтверждена. Пароль от Roblox мы не храним — для выдачи он не нужен ни при одном
          способе получения.
        </p>
        <button
          type="button"
          className="mt-6 rounded-full border border-line px-5 py-2.5 text-[14px] text-ink transition-colors duration-200 hover:border-sky/60"
        >
          Сменить пароль
        </button>
      </div>
    </div>
  );
}

function Tickets() {
  return (
    <div className="mt-8">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line text-[13px] text-faint">
              <th className="py-3 pr-4 font-normal">Тикет</th>
              <th className="py-3 pr-4 font-normal">Тема</th>
              <th className="py-3 pr-4 font-normal">Заказ</th>
              <th className="py-3 font-normal">Обновлён</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border-b border-line/70">
                <td className="num py-4 pr-4 text-[14px] text-ink">{ticket.id}</td>
                <td className="py-4 pr-4 text-[14px] text-mute">{ticket.subject}</td>
                <td className="num py-4 pr-4 text-[14px] text-mute">{ticket.orderId ?? "—"}</td>
                <td className="num py-4 text-[14px] text-mute">
                  {new Date(ticket.updatedAt).toLocaleDateString("ru-RU")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ButtonLink href="/support" size="md" className="mt-7">
        Создать тикет
      </ButtonLink>
    </div>
  );
}
