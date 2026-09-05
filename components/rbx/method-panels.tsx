"use client";

import { Clock, ShieldCheck } from "lucide-react";
import { methods } from "@/lib/mock/methods";
import { useOrderDraft } from "@/lib/order-draft";
import { feeAmount, formatPrice, totalFor } from "@/lib/pricing";
import { cn } from "@/lib/cn";

/** ТЗ п.5: у каждого способа описание, комиссия и итоговая цена */
export function MethodPanels() {
  const { draft, base, setMethod } = useOrderDraft();

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {methods.map((method) => {
        const selected = draft.methodId === method.id;
        const fee = feeAmount(base, method);
        const total = totalFor(base, method);

        return (
          <button
            key={method.id}
            type="button"
            onClick={() => setMethod(method.id)}
            aria-pressed={selected}
            className={cn(
              "hairline flex flex-col rounded-card border p-6 text-left",
              "transition-[border-color,background-color,box-shadow] duration-200 ease-[var(--ease-soft)]",
              selected
                ? "border-sky/60 bg-slab-hi glow-blue"
                : "border-line bg-slab hover:border-line-soft hover:bg-slab-hi",
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-display text-[19px] font-extrabold tracking-[-0.03em] text-ink">
                  {method.name}
                </p>
                <p className="mt-1 text-sm text-mute">{method.tagline}</p>
              </div>
              <span
                className={cn(
                  "mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors duration-200",
                  selected ? "border-sky" : "border-line",
                )}
              >
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition-transform duration-200",
                    selected ? "scale-100 bg-sky" : "scale-0 bg-transparent",
                  )}
                />
              </span>
            </div>

            <p className="mt-4 min-h-[72px] text-[14px] leading-relaxed text-mute">
              {method.description}
            </p>

            <div className="mt-4 flex items-center gap-4 text-[13px] text-faint">
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} />
                {method.eta}
              </span>
              {method.recommended ? (
                <span className="inline-flex items-center gap-1.5 text-mint">
                  <ShieldCheck size={14} />
                  без комиссии
                </span>
              ) : null}
            </div>

            <dl className="mt-5 space-y-2 border-t border-line pt-4 text-[14px]">
              <div className="flex justify-between">
                <dt className="text-mute">Комиссия</dt>
                <dd className="num text-ink">
                  {method.fee === 0 ? "нет" : `${Math.round(method.fee * 100)}% · ${formatPrice(fee)}`}
                </dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-mute">Итого</dt>
                <dd className="num font-display text-[22px] font-extrabold tracking-[-0.03em] text-ink">
                  {formatPrice(total)}
                </dd>
              </div>
            </dl>
          </button>
        );
      })}
    </div>
  );
}
