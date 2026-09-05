"use client";

import { ArrowRight } from "lucide-react";
import { RobuxCoin } from "@/components/brand/robux";
import { ButtonLink } from "@/components/ui/button";
import { methodById } from "@/lib/mock/methods";
import { useOrderDraft } from "@/lib/order-draft";
import { formatPrice, formatRobux } from "@/lib/pricing";
import { useAnimatedNumber } from "@/lib/use-animated-number";

/** Итог выбора перед переходом на checkout */
export function OrderBar() {
  const { draft, total } = useOrderDraft();
  const method = methodById(draft.methodId);
  const animated = useAnimatedNumber(total);

  return (
    <div className="hairline flex flex-col gap-5 rounded-card border border-line bg-slab p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <div className="flex items-center gap-2.5">
          <RobuxCoin className="h-6 w-6" />
          <span className="num font-display text-[26px] font-extrabold tracking-[-0.04em] text-ink">
            {formatRobux(draft.amount)}
          </span>
        </div>
        <div>
          <p className="text-[13px] text-faint">Способ</p>
          <p className="mt-0.5 text-[15px] text-ink">{method.name}</p>
        </div>
        <div>
          <p className="text-[13px] text-faint">К оплате</p>
          <p className="num mt-0.5 text-[15px] font-semibold text-ink">{formatPrice(animated)}</p>
        </div>
      </div>

      <ButtonLink href="/checkout" size="lg" className="w-full sm:w-auto">
        Перейти к оформлению
        <ArrowRight size={18} />
      </ButtonLink>
    </div>
  );
}
