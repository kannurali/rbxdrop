import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { RobuxCoin } from "@/components/brand/robux";
import { formatPrice, formatRobux } from "@/lib/pricing";
import type { RobloxAccount } from "@/lib/types";
import { cn } from "@/lib/cn";

/** Карточка аккаунта, ТЗ п.9. Обложка генерится из hue — без стоковых картинок */
export function AccountCard({ account }: { account: RobloxAccount }) {
  return (
    <Link
      href={`/accounts/${account.id}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-card border border-line bg-slab",
        "transition-[border-color,transform] duration-200 ease-[var(--ease-soft)] hover:border-line-soft",
        account.sold && "opacity-60",
      )}
    >
      <div
        className="relative h-32 overflow-hidden"
        style={{
          background: `linear-gradient(140deg, hsl(${account.hue} 72% 42%) 0%, hsl(${
            account.hue + 35
          } 65% 16%) 100%)`,
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6,10,18,.55) 1px, transparent 1px), linear-gradient(90deg, rgba(6,10,18,.55) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slab via-slab/20 to-transparent" />

        <div className="absolute bottom-3 left-5 flex items-baseline gap-2">
          <span className="num font-display text-[40px] font-extrabold leading-none tracking-[-0.05em] text-ink">
            {account.level}
          </span>
          <span className="text-[13px] text-ink/70">уровень</span>
        </div>

        {account.sold ? (
          <span className="absolute right-4 top-4 rounded-full bg-void/80 px-3 py-1 text-[12px] font-medium text-mute">
            Продан
          </span>
        ) : account.verified ? (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-void/70 px-3 py-1 text-[12px] font-medium text-mint">
            <BadgeCheck size={13} />
            Проверен
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="num text-[15px] font-medium text-ink">{account.title}</p>

        <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-line pt-4 text-[13px]">
          <Spec label="Предметы" value={formatRobux(account.items)} />
          <Spec label="Limiteds" value={String(account.limiteds)} />
          <Spec label="Возраст" value={`${account.ageYears} г.`} />
        </dl>

        <div className="mt-5 flex items-end justify-between gap-3 pt-1">
          <div>
            {account.balance > 0 ? (
              <p className="mb-1.5 inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] text-mute">
                <RobuxCoin className="h-3.5 w-3.5" />
                <span className="num">{formatRobux(account.balance)}</span> на балансе
              </p>
            ) : null}
            <p className="num font-display text-[26px] font-extrabold tracking-[-0.04em] text-ink">
              {formatPrice(account.price)}
            </p>
          </div>
          <span className="rounded-full border border-line px-4 py-2 text-[13px] text-mute transition-colors duration-200 group-hover:border-sky/60 group-hover:text-ink">
            Подробнее
          </span>
        </div>
      </div>
    </Link>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-faint">{label}</dt>
      <dd className="num mt-1 text-ink">{value}</dd>
    </div>
  );
}
