"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { AccountCard } from "@/components/accounts/account-card";
import { Button } from "@/components/ui/button";
import { accounts } from "@/lib/mock/accounts";
import { formatPrice } from "@/lib/pricing";
import { cn } from "@/lib/cn";

type Sort = "cheap" | "expensive" | "level" | "limiteds";

const sorts: { id: Sort; label: string }[] = [
  { id: "cheap", label: "Сначала дешёвые" },
  { id: "expensive", label: "Сначала дорогие" },
  { id: "level", label: "По уровню" },
  { id: "limiteds", label: "По limiteds" },
];

const MAX_PRICE = 500;

/** Фильтры из ТЗ п.9: цена, level, items, limiteds, возраст */
export function AccountsBrowser() {
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [minLevel, setMinLevel] = useState(0);
  const [minItems, setMinItems] = useState(0);
  const [minLimiteds, setMinLimiteds] = useState(0);
  const [minAge, setMinAge] = useState(0);
  const [hideSold, setHideSold] = useState(true);
  const [sort, setSort] = useState<Sort>("cheap");
  const [openOnMobile, setOpenOnMobile] = useState(false);

  const visible = useMemo(() => {
    const list = accounts.filter(
      (a) =>
        a.price <= maxPrice &&
        a.level >= minLevel &&
        a.items >= minItems &&
        a.limiteds >= minLimiteds &&
        a.ageYears >= minAge &&
        (!hideSold || !a.sold),
    );

    return [...list].sort((a, b) => {
      if (sort === "cheap") return a.price - b.price;
      if (sort === "expensive") return b.price - a.price;
      if (sort === "level") return b.level - a.level;
      return b.limiteds - a.limiteds;
    });
  }, [maxPrice, minLevel, minItems, minLimiteds, minAge, hideSold, sort]);

  const reset = () => {
    setMaxPrice(MAX_PRICE);
    setMinLevel(0);
    setMinItems(0);
    setMinLimiteds(0);
    setMinAge(0);
    setHideSold(true);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[264px_1fr] lg:gap-10">
      <div>
        <button
          type="button"
          onClick={() => setOpenOnMobile((v) => !v)}
          aria-expanded={openOnMobile}
          className="mb-4 inline-flex w-full items-center justify-between rounded-full border border-line bg-slab px-5 py-3 text-[15px] text-ink lg:hidden"
        >
          Фильтры
          <SlidersHorizontal size={16} className="text-mute" />
        </button>

        <aside
          className={cn(
            "rounded-card border border-line bg-slab p-5 lg:sticky lg:top-24 lg:block",
            openOnMobile ? "block" : "hidden",
          )}
        >
          <Range
            label="Цена до"
            value={maxPrice}
            display={formatPrice(maxPrice)}
            min={10}
            max={MAX_PRICE}
            step={10}
            onChange={setMaxPrice}
          />
          <Range
            label="Уровень от"
            value={minLevel}
            display={String(minLevel)}
            min={0}
            max={320}
            step={10}
            onChange={setMinLevel}
          />
          <Range
            label="Предметов от"
            value={minItems}
            display={String(minItems)}
            min={0}
            max={900}
            step={50}
            onChange={setMinItems}
          />
          <Range
            label="Limiteds от"
            value={minLimiteds}
            display={String(minLimiteds)}
            min={0}
            max={40}
            step={1}
            onChange={setMinLimiteds}
          />
          <Range
            label="Возраст от"
            value={minAge}
            display={`${minAge} лет`}
            min={0}
            max={11}
            step={1}
            onChange={setMinAge}
          />

          <label className="mt-6 flex cursor-pointer items-center gap-3 text-[14px] text-mute">
            <input
              type="checkbox"
              checked={hideSold}
              onChange={(e) => setHideSold(e.target.checked)}
              className="h-4 w-4 accent-[var(--color-blue)]"
            />
            Скрыть проданные
          </label>

          <Button variant="outline" size="sm" onClick={reset} className="mt-5 w-full">
            Сбросить фильтры
          </Button>
        </aside>
      </div>

      <div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[14px] text-mute">
            <span className="num text-ink">{visible.length}</span> из{" "}
            <span className="num">{accounts.length}</span> аккаунтов
          </p>
          <div className="flex flex-wrap gap-1.5">
            {sorts.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSort(s.id)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-[13px] transition-colors duration-200",
                  sort === s.id
                    ? "border-sky/60 bg-blue/15 text-ink"
                    : "border-line text-mute hover:text-ink",
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="rounded-card border border-dashed border-line p-12 text-center">
            <p className="text-[16px] text-ink">Под эти фильтры ничего не подошло</p>
            <p className="mx-auto mt-2 max-w-[42ch] text-[14px] text-mute">
              Ослабьте требования — например, поднимите потолок цены или снизьте уровень.
            </p>
            <Button variant="outline" size="sm" onClick={reset} className="mt-5">
              Сбросить фильтры
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Range({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="mb-2.5 flex items-baseline justify-between">
        <span className="text-[13px] text-mute">{label}</span>
        <span className="num text-[14px] text-ink">{display}</span>
      </div>
      <input
        type="range"
        className="range"
        aria-label={label}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
