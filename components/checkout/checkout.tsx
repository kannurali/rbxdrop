"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lock, ShieldCheck } from "lucide-react";
import { BrandIcon, RobuxCoin } from "@/components/brand/robux";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { methodById, methods } from "@/lib/mock/methods";
import { savePlacedOrder, useOrderDraft } from "@/lib/order-draft";
import { feeAmount, formatPrice, formatRobux } from "@/lib/pricing";
import { useAnimatedNumber } from "@/lib/use-animated-number";
import type { RobloxAccount } from "@/lib/types";
import { cn } from "@/lib/cn";

interface Errors {
  username?: string;
  email?: string;
  extra?: string;
}

export function Checkout({ account }: { account: RobloxAccount | null }) {
  const router = useRouter();
  const { draft, base, total, setMethod, placeOrder } = useOrderDraft();
  const method = methodById(draft.methodId);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [extra, setExtra] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const isAccountOrder = account !== null;
  const payable = isAccountOrder ? account.price : total;
  const animated = useAnimatedNumber(payable);

  function validate(): Errors {
    const next: Errors = {};
    if (!isAccountOrder) {
      if (username.trim().length < 3) next.username = "Ник в Roblox — от 3 символов";
      else if (!/^[A-Za-z0-9_]+$/.test(username.trim()))
        next.username = "Только латиница, цифры и подчёркивание";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      next.email = "Проверьте адрес почты — на неё придёт заказ";
    if (!isAccountOrder && method.extraField && extra.trim().length < 8)
      next.extra = "Вставьте ссылку целиком";
    return next;
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);

    // В макете оплаты нет: заказ создаётся сразу. В боевой версии здесь
    // создаётся платёж, а статус Paid ставит webhook платёжной системы,
    // а не возврат пользователя на сайт (ТЗ п.20).
    const order = isAccountOrder
      ? savePlacedOrder({
          id: `RBX-${Math.floor(10000 + Math.random() * 89999)}`,
          createdAt: new Date().toISOString(),
          item: account.title,
          method: "code",
          total: account.price,
          status: "processing",
          robloxUsername: "—",
          email: email.trim(),
        })
      : placeOrder({ robloxUsername: username.trim(), email: email.trim() });

    router.push(`/order/${order.id}`);
  }

  return (
    <Container className="py-10 sm:py-14">
      <h1 className="text-[32px] sm:text-[40px]">Оформление заказа</h1>
      <p className="mt-3 text-[15px] text-mute">
        Проверьте состав заказа и оставьте данные для выдачи.
      </p>

      <form onSubmit={submit} className="mt-9 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
        {/* Заказ. На телефоне идёт первым — человек должен видеть, за что платит,
            до того как начнёт заполнять поля */}
        <section>
          <div className="hairline rounded-card border border-line bg-slab p-6">
            <h2 className="text-[20px]">Заказ</h2>

            <div className="mt-6 flex items-center gap-4 border-b border-line pb-6">
              {isAccountOrder ? (
                <span
                  className="h-14 w-14 shrink-0 rounded-2xl"
                  style={{
                    background: `linear-gradient(140deg, hsl(${account.hue} 72% 42%), hsl(${
                      account.hue + 35
                    } 65% 16%))`,
                  }}
                />
              ) : (
                <RobuxCoin className="h-11 w-11 shrink-0" />
              )}
              <div>
                <p className="num text-[17px] font-medium text-ink">
                  {isAccountOrder ? account.title : `${formatRobux(draft.amount)} Robux`}
                </p>
                <p className="mt-1 text-[14px] text-mute">
                  {isAccountOrder
                    ? `${account.level} уровень · ${account.items} предметов`
                    : `Выдача ${method.eta}`}
                </p>
              </div>
            </div>

            {!isAccountOrder ? (
              <div className="border-b border-line py-6">
                <p className="text-[13px] text-mute">Способ получения</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {methods.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMethod(m.id)}
                      aria-pressed={draft.methodId === m.id}
                      className={cn(
                        "rounded-xl border px-2 py-2.5 text-[13px] transition-colors duration-200",
                        draft.methodId === m.id
                          ? "border-sky/60 bg-blue/15 text-ink"
                          : "border-line text-mute hover:border-line-soft hover:text-ink",
                      )}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <dl className="space-y-2.5 pt-6 text-[14px]">
              <div className="flex justify-between">
                <dt className="text-mute">Цена</dt>
                <dd className="num text-ink">
                  {formatPrice(isAccountOrder ? account.price : base)}
                </dd>
              </div>
              {!isAccountOrder ? (
                <div className="flex justify-between">
                  <dt className="text-mute">
                    Комиссия {method.fee > 0 ? `${Math.round(method.fee * 100)}%` : ""}
                  </dt>
                  <dd className="num text-ink">
                    {method.fee === 0 ? "нет" : formatPrice(feeAmount(base, method))}
                  </dd>
                </div>
              ) : null}
              <div className="flex items-baseline justify-between border-t border-line pt-4">
                <dt className="text-[15px] text-ink">Итого</dt>
                <dd className="num font-display text-[30px] font-extrabold tracking-[-0.04em] text-ink">
                  {formatPrice(animated)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-4 flex items-center gap-4 px-2 text-faint">
            <span className="text-[13px]">Оплата:</span>
            <BrandIcon name="visa" className="h-5 w-9" />
            <BrandIcon name="mastercard" className="h-5 w-8" />
            <BrandIcon name="bitcoin" className="h-4 w-4" />
            <BrandIcon name="tether" className="h-4 w-4" />
          </div>
        </section>

        {/* Данные покупателя */}
        <section>
          <div className="rounded-card border border-line bg-slab p-6">
            <h2 className="text-[20px]">Данные покупателя</h2>

            <div className="mt-6 space-y-5">
              {!isAccountOrder ? (
                <Field
                  label="Ник в Roblox"
                  hint="Точно как в профиле — на него придёт начисление."
                  error={errors.username}
                >
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="nur_builds"
                    autoComplete="username"
                    className={inputClass(!!errors.username)}
                  />
                </Field>
              ) : null}

              <Field
                label="Email"
                hint="Сюда придёт ссылка на заказ и чек."
                error={errors.email}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={inputClass(!!errors.email)}
                />
              </Field>

              {!isAccountOrder && method.extraField ? (
                <Field
                  label={method.extraField.label}
                  hint={method.extraField.hint}
                  error={errors.extra}
                >
                  <input
                    value={extra}
                    onChange={(e) => setExtra(e.target.value)}
                    placeholder={method.extraField.placeholder}
                    className={inputClass(!!errors.extra)}
                  />
                </Field>
              ) : null}
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-line bg-void/60 p-4">
              <Lock size={16} className="mt-0.5 shrink-0 text-mint" />
              <p className="text-[13px] leading-relaxed text-mute">
                Пароль от Roblox мы не запрашиваем и не храним. Если его просят от имени RBXDrop —
                это мошенники.
              </p>
            </div>

            <Button type="submit" size="lg" disabled={submitting} className="mt-6 w-full">
              {submitting ? "Создаём заказ…" : `Оплатить ${formatPrice(payable)}`}
            </Button>

            <p className="mt-4 flex items-center justify-center gap-2 text-[13px] text-faint">
              <ShieldCheck size={14} />
              Оформляя заказ, вы принимаете условия возврата
            </p>
          </div>
        </section>
      </form>
    </Container>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[14px] text-ink">{label}</span>
      {children}
      <span className={cn("mt-2 block text-[13px]", error ? "text-rose" : "text-faint")}>
        {error ?? hint}
      </span>
    </label>
  );
}

function inputClass(hasError: boolean): string {
  return cn(
    "mt-2.5 h-12 w-full rounded-2xl border bg-void px-4 text-[15px] text-ink outline-none",
    "transition-colors duration-200 placeholder:text-faint",
    hasError ? "border-rose/70 focus:border-rose" : "border-line focus:border-sky/60",
  );
}
