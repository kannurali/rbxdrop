"use client";

import { ArrowRight, Lock } from "lucide-react";
import { RobuxCoin } from "@/components/brand/robux";
import { ButtonLink } from "@/components/ui/button";
import { methodById, methods } from "@/lib/mock/methods";
import { packs } from "@/lib/mock/packs";
import { useOrderDraft } from "@/lib/order-draft";
import { feeAmount, formatPrice, formatRobux } from "@/lib/pricing";
import { useAnimatedNumber } from "@/lib/use-animated-number";
import { cn } from "@/lib/cn";

/** Живая карточка покупки из ТЗ п.2: количество, цена, способ, кнопка */
export function BuyCard() {
  const { draft, base, total, setPack, setMethod } = useOrderDraft();
  const method = methodById(draft.methodId);
  const animatedTotal = useAnimatedNumber(total);
  const fee = feeAmount(base, method);

  return (
    <div className="hairline relative rounded-card border border-line bg-slab p-6 sm:p-7">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-8 -top-16 h-40 rounded-full opacity-45 blur-[70px]"
        style={{ background: "radial-gradient(ellipse, #1D4ED8 0%, transparent 70%)" }}
      />

      <div className="relative">
        <div className="flex items-center justify-between">
          <p className="text-[15px] font-medium text-ink">Покупка Robux</p>
          <span className="rounded-full border border-line px-3 py-1 text-[12px] text-mute">
            выдача {method.eta}
          </span>
        </div>

        <div className="mt-6 flex items-end gap-3">
          <RobuxCoin className="mb-2 h-9 w-9" />
          <span className="num font-display text-[56px] font-extrabold leading-[0.9] tracking-[-0.05em] text-ink sm:text-[64px]">
            {formatRobux(draft.amount)}
          </span>
          <span className="mb-2.5 text-[15px] text-mute">Robux</span>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {packs.map((pack) => (
            <button
              key={pack.id}
              type="button"
              onClick={() => setPack(pack.id)}
              aria-pressed={draft.packId === pack.id}
              className={cn(
                "num rounded-full border px-3.5 py-2 text-[13px] transition-colors duration-200",
                draft.packId === pack.id
                  ? "border-sky/60 bg-blue/15 text-ink"
                  : "border-line text-mute hover:border-line-soft hover:text-ink",
              )}
            >
              {formatRobux(pack.amount)}
            </button>
          ))}
        </div>

        <p className="mt-7 text-[13px] text-mute">Способ получения</p>
        <div className="mt-2.5 grid grid-cols-3 gap-2">
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

        <dl className="mt-7 space-y-2.5 border-t border-line pt-5 text-[14px]">
          <div className="flex justify-between">
            <dt className="text-mute">Цена</dt>
            <dd className="num text-ink">{formatPrice(base)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-mute">Комиссия способа</dt>
            <dd className="num text-ink">{method.fee === 0 ? "нет" : formatPrice(fee)}</dd>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <dt className="text-[15px] text-ink">Итого</dt>
            <dd className="num font-display text-[30px] font-extrabold tracking-[-0.04em] text-ink">
              {formatPrice(animatedTotal)}
            </dd>
          </div>
        </dl>

        <ButtonLink href="/checkout" size="lg" className="mt-6 w-full">
          Купить Robux
          <ArrowRight size={18} />
        </ButtonLink>

        <p className="mt-4 flex items-center justify-center gap-2 text-[13px] text-faint">
          <Lock size={13} />
          Пароль от Roblox не нужен
        </p>
      </div>
    </div>
  );
}
