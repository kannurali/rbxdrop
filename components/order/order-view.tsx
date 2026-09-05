"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Copy, LifeBuoy } from "lucide-react";
import { RobuxCoin } from "@/components/brand/robux";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { StatusPill } from "@/components/ui/status-pill";
import { methodById } from "@/lib/mock/methods";
import { orderById, statusFlow, statusLabels } from "@/lib/mock/orders";
import { readPlacedOrders } from "@/lib/order-draft";
import { formatPrice } from "@/lib/pricing";
import type { Order, OrderStatus } from "@/lib/types";
import { cn } from "@/lib/cn";

const allStatuses: OrderStatus[] = [
  "pending",
  "paid",
  "processing",
  "completed",
  "cancelled",
  "refunded",
];

export function OrderView({ id }: { id: string }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState<OrderStatus>("processing");
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fromSession = readPlacedOrders().find(
      (o) => o.id.toLowerCase() === id.toLowerCase(),
    );
    const found = fromSession ?? orderById(id) ?? null;
    // Заказы этой сессии лежат в sessionStorage — на сервере их не прочитать.
    /* eslint-disable react-hooks/set-state-in-effect */
    setOrder(found);
    if (found) setStatus(found.status);
    setLoaded(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [id]);

  if (!loaded) {
    return (
      <Container className="py-16">
        <div className="h-8 w-56 animate-pulse rounded-full bg-slab" />
        <div className="mt-8 h-64 animate-pulse rounded-card bg-slab" />
      </Container>
    );
  }

  if (!order) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-[30px]">Заказ не найден</h1>
        <p className="mx-auto mt-4 max-w-[46ch] text-[15px] leading-relaxed text-mute">
          Проверьте номер — он выглядит как RBX-48213. Если заказ оформлен в другой сессии, откройте
          его по ссылке из письма.
        </p>
        <ButtonLink href="/account" variant="outline" size="md" className="mt-7">
          Мои заказы
        </ButtonLink>
      </Container>
    );
  }

  const method = methodById(order.method);
  const activeIndex = statusFlow.indexOf(status);
  const terminated = status === "cancelled" || status === "refunded";

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(order.id);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // буфер обмена недоступен — номер и так виден на экране
    }
  };

  return (
    <Container className="py-10 sm:py-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="num text-[30px] sm:text-[38px]">Заказ {order.id}</h1>
          <button
            type="button"
            onClick={copyId}
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-mute transition-colors duration-200 hover:border-sky/60 hover:text-ink"
            aria-label="Скопировать номер заказа"
          >
            <Copy size={15} />
          </button>
          {copied ? <span className="text-[13px] text-mint">Скопировано</span> : null}
        </div>
        <StatusPill status={status} />
      </div>

      <div className="mt-9 grid items-start gap-6 lg:grid-cols-[1fr_360px] lg:gap-8">
        <div className="hairline rounded-card border border-line bg-slab p-6 sm:p-7">
          {!terminated ? (
            <ol className="grid gap-3 sm:grid-cols-4">
              {statusFlow.map((step, i) => {
                const done = i <= activeIndex;
                return (
                  <li key={step} className="flex items-center gap-3 sm:block">
                    <span
                      className={cn(
                        "block h-1 w-full rounded-full transition-colors duration-300 max-sm:h-8 max-sm:w-1",
                        done ? "bg-sky" : "bg-line",
                      )}
                    />
                    <span
                      className={cn(
                        "mt-3 block text-[13px] transition-colors duration-300",
                        done ? "text-ink" : "text-faint",
                      )}
                    >
                      {statusLabels[step]}
                    </span>
                  </li>
                );
              })}
            </ol>
          ) : (
            <p className="rounded-2xl border border-line bg-void/60 p-4 text-[14px] leading-relaxed text-mute">
              {status === "cancelled"
                ? "Заказ отменён. Деньги, если они были списаны, вернутся на исходный способ оплаты."
                : "Возврат оформлен. Деньги придут на способ оплаты в течение 3–5 рабочих дней."}
            </p>
          )}

          <dl className="mt-8 space-y-4 border-t border-line pt-7 text-[15px]">
            <Row label="Товар">
              <span className="inline-flex items-center gap-2">
                {order.amount ? <RobuxCoin className="h-4 w-4" /> : null}
                <span className="num">{order.item}</span>
              </span>
            </Row>
            <Row label="Способ получения">{method.name}</Row>
            <Row label="Ник в Roblox">
              <span className="num">{order.robloxUsername}</span>
            </Row>
            <Row label="Email">{order.email}</Row>
            <Row label="Создан">
              <span className="num">
                {new Date(order.createdAt).toLocaleString("ru-RU", {
                  day: "2-digit",
                  month: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </Row>
            <Row label="Стоимость">
              <span className="num font-display text-[22px] font-extrabold tracking-[-0.03em]">
                {formatPrice(order.total)}
              </span>
            </Row>
          </dl>
        </div>

        <aside className="space-y-4">
          <div className="rounded-card border border-line bg-slab p-6">
            <p className="text-[15px] font-medium text-ink">Что дальше</p>
            <p className="mt-2.5 text-[14px] leading-relaxed text-mute">
              {status === "completed"
                ? "Robux зачислены. Проверьте баланс в Roblox — иногда он обновляется с задержкой в минуту."
                : `Выдача занимает ${method.eta}. Страницу можно закрыть — ссылка на заказ есть в письме.`}
            </p>
            <Link
              href="/support"
              className="mt-5 inline-flex items-center gap-2 text-[14px] text-sky transition-colors duration-200 hover:text-ink"
            >
              <LifeBuoy size={15} />
              Что-то пошло не так
            </Link>
          </div>

          {/* Только для макета: в боевой версии статус меняет сервер по webhook (ТЗ п.20) */}
          <div className="rounded-card border border-dashed border-line p-6">
            <p className="text-[13px] font-medium text-mute">Демонстрация статусов</p>
            <p className="mt-2 text-[13px] leading-relaxed text-faint">
              Переключатель есть только в макете. На боевом сайте статус меняет платёжный webhook и
              админ, а не покупатель.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {allStatuses.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-[12px] transition-colors duration-200",
                    status === s
                      ? "border-sky/60 bg-blue/15 text-ink"
                      : "border-line text-mute hover:text-ink",
                  )}
                >
                  {statusLabels[s]}
                </button>
              ))}
            </div>
          </div>

          <ButtonLink href="/rbx" variant="outline" size="md" className="w-full">
            Купить ещё Robux
            <ArrowRight size={16} />
          </ButtonLink>
        </aside>
      </div>
    </Container>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-6">
      <dt className="text-mute">{label}</dt>
      <dd className="text-right text-ink">{children}</dd>
    </div>
  );
}
