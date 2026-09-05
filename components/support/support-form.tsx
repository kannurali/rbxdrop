"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const categories = [
  "Проблема с заказом",
  "Оплата",
  "Получение товара",
  "Возврат",
  "Аккаунт",
  "Другое",
];

export function SupportForm() {
  const [category, setCategory] = useState(categories[0]);
  const [orderId, setOrderId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [ticket, setTicket] = useState<string | null>(null);

  if (ticket) {
    return (
      <div className="rounded-card border border-line bg-slab p-8 text-center">
        <CheckCircle2 size={32} className="mx-auto text-mint" />
        <h2 className="mt-5 text-[24px]">Тикет {ticket} создан</h2>
        <p className="mx-auto mt-3 max-w-[46ch] text-[15px] leading-relaxed text-mute">
          Ответ придёт на вашу почту и появится в личном кабинете. Обычно отвечаем в течение часа.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/account" size="md">
            Перейти в кабинет
          </ButtonLink>
          <Button
            variant="outline"
            size="md"
            onClick={() => {
              setTicket(null);
              setMessage("");
              setOrderId("");
            }}
          >
            Создать ещё один
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (message.trim().length < 20) {
          setError("Опишите проблему подробнее — минимум 20 символов");
          return;
        }
        setError(null);
        setTicket(`T-${Math.floor(2100 + Math.random() * 800)}`);
      }}
      className="rounded-card border border-line bg-slab p-6 sm:p-7"
    >
      <label className="block">
        <span className="text-[14px] text-ink">Категория</span>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={cn(
                "rounded-full border px-4 py-2 text-[14px] transition-colors duration-200",
                category === c
                  ? "border-sky/60 bg-blue/15 text-ink"
                  : "border-line text-mute hover:border-line-soft hover:text-ink",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </label>

      <label className="mt-7 block">
        <span className="text-[14px] text-ink">Номер заказа</span>
        <input
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="RBX-48213"
          className="num mt-2.5 h-12 w-full rounded-2xl border border-line bg-void px-4 text-[15px] text-ink outline-none transition-colors duration-200 placeholder:text-faint focus:border-sky/60 sm:max-w-[260px]"
        />
        <span className="mt-2 block text-[13px] text-faint">
          Необязательно, но с номером разберёмся быстрее.
        </span>
      </label>

      <label className="mt-6 block">
        <span className="text-[14px] text-ink">Сообщение</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          placeholder="Оплатил 1 700 Robux через Game Pass, статус висит на «Выполняется» второй час."
          className={cn(
            "mt-2.5 w-full resize-y rounded-2xl border bg-void p-4 text-[15px] leading-relaxed text-ink outline-none transition-colors duration-200 placeholder:text-faint",
            error ? "border-rose/70 focus:border-rose" : "border-line focus:border-sky/60",
          )}
        />
        <span className={cn("mt-2 block text-[13px]", error ? "text-rose" : "text-faint")}>
          {error ?? "Чем подробнее опишете, тем меньше уточняющих вопросов."}
        </span>
      </label>

      <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto">
        Создать тикет
      </Button>
    </form>
  );
}
