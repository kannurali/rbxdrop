"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { RobuxCoin } from "@/components/brand/robux";
import { packs } from "@/lib/mock/packs";
import { useOrderDraft } from "@/lib/order-draft";
import {
  MAX_CUSTOM_ROBUX,
  MIN_CUSTOM_ROBUX,
  basePriceFor,
  clampCustomAmount,
  discountPercent,
  formatPrice,
  formatRobux,
} from "@/lib/pricing";
import { cn } from "@/lib/cn";

/**
 * Плитки номиналов. Иерархия задаётся размером: популярный номинал физически
 * крупнее остальных, а не подсвечен другим цветом.
 */
export function AmountTiles() {
  const { draft, setPack, setCustomAmount } = useOrderDraft();
  const [customInput, setCustomInput] = useState("");

  const hero = packs.find((p) => p.popular) ?? packs[0];
  const rest = packs.filter((p) => p.id !== hero.id);
  const customActive = draft.packId === null;

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
      <Tile
        pack={hero}
        featured
        selected={draft.packId === hero.id}
        onSelect={() => setPack(hero.id)}
        className="col-span-2 lg:row-span-2"
      />

      {rest.map((pack) => (
        <Tile
          key={pack.id}
          pack={pack}
          selected={draft.packId === pack.id}
          onSelect={() => setPack(pack.id)}
          className="lg:col-span-2"
        />
      ))}

      <div
        className={cn(
          "col-span-2 flex flex-col gap-3 rounded-tile border p-5 transition-colors duration-200 sm:flex-row sm:items-center lg:col-span-6",
          customActive ? "border-sky/50 bg-slab-hi" : "border-line bg-slab",
        )}
      >
        <div className="flex-1">
          <p className="text-[15px] font-medium text-ink">Другое количество</p>
          <p className="mt-1 text-sm text-mute">
            От {formatRobux(MIN_CUSTOM_ROBUX)} до {formatRobux(MAX_CUSTOM_ROBUX)} Robux
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <RobuxCoin className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2" />
            <input
              type="number"
              inputMode="numeric"
              value={customInput}
              min={MIN_CUSTOM_ROBUX}
              max={MAX_CUSTOM_ROBUX}
              placeholder="2500"
              aria-label="Своё количество Robux"
              onChange={(e) => {
                setCustomInput(e.target.value);
                if (e.target.value.trim() === "") return;
                setCustomAmount(clampCustomAmount(Number(e.target.value)));
              }}
              className="num h-11 w-[150px] rounded-full border border-line bg-void pl-11 pr-4 text-[15px] text-ink outline-none transition-colors duration-200 placeholder:text-faint focus:border-sky/60"
            />
          </div>
          <span className="num min-w-[74px] text-right text-[15px] font-medium text-ink">
            {customInput.trim() === ""
              ? "—"
              : formatPrice(basePriceFor(clampCustomAmount(Number(customInput))))}
          </span>
        </div>
      </div>
    </div>
  );
}

function Tile({
  pack,
  selected,
  featured = false,
  onSelect,
  className,
}: {
  pack: (typeof packs)[number];
  selected: boolean;
  featured?: boolean;
  onSelect: () => void;
  className?: string;
}) {
  const off = discountPercent(pack);

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "hairline group relative flex flex-col justify-between rounded-tile border p-5 text-left",
        "transition-[border-color,background-color,box-shadow] duration-200 ease-[var(--ease-soft)]",
        featured ? "min-h-[196px] lg:min-h-[248px]" : "min-h-[124px]",
        selected
          ? "border-sky/60 bg-slab-hi glow-blue"
          : "border-line bg-slab hover:border-line-soft hover:bg-slab-hi",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <RobuxCoin className={featured ? "h-7 w-7" : "h-5 w-5"} />
          {pack.popular ? (
            <span className="rounded-full bg-blue/15 px-2.5 py-1 text-[12px] font-medium text-sky">
              Берут чаще всего
            </span>
          ) : null}
          {pack.bestValue ? (
            <span className="rounded-full bg-mint/12 px-2.5 py-1 text-[12px] font-medium text-mint">
              Лучшая цена за Robux
            </span>
          ) : null}
        </div>
        <span
          className={cn(
            "grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-all duration-200",
            selected ? "border-sky bg-sky text-void" : "border-line text-transparent",
          )}
        >
          <Check size={14} strokeWidth={3} />
        </span>
      </div>

      <div className="mt-6">
        <p
          className={cn(
            "num font-display font-extrabold leading-none tracking-[-0.045em] text-ink",
            featured ? "text-[52px] lg:text-[68px]" : "text-[30px]",
          )}
        >
          {formatRobux(pack.amount)}
        </p>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="num text-[17px] font-semibold text-ink">{formatPrice(pack.base)}</span>
          {pack.was ? (
            <span className="num text-[13px] text-faint line-through">{formatPrice(pack.was)}</span>
          ) : null}
          {off ? <span className="text-[13px] font-medium text-mint">−{off}%</span> : null}
        </div>
      </div>
    </button>
  );
}
