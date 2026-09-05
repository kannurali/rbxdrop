import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BadgeCheck, Check, ShieldCheck } from "lucide-react";
import { AccountCard } from "@/components/accounts/account-card";
import { RobuxCoin } from "@/components/brand/robux";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { accountById, accounts } from "@/lib/mock/accounts";
import { formatPrice, formatRobux } from "@/lib/pricing";

export function generateStaticParams() {
  return accounts.map((a) => ({ id: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const account = accountById(id);
  if (!account) return { title: "Аккаунт не найден" };
  return {
    title: account.title,
    description: `Аккаунт Roblox ${account.level} уровня: ${account.items} предметов, ${account.limiteds} limiteds, возраст ${account.ageYears} лет. Цена ${formatPrice(account.price)}.`,
  };
}

export default async function AccountPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const account = accountById(id);
  if (!account) notFound();

  const others = accounts.filter((a) => a.id !== account.id && !a.sold).slice(0, 3);

  const specs = [
    { label: "Уровень", value: String(account.level) },
    { label: "Предметы", value: formatRobux(account.items) },
    { label: "Limiteds", value: String(account.limiteds) },
    { label: "Возраст аккаунта", value: `${account.ageYears} лет` },
    { label: "Robux на балансе", value: formatRobux(account.balance) },
    { label: "Проверка", value: account.verified ? "пройдена" : "не проводилась" },
  ];

  return (
    <>
      <Container className="pt-10">
        <Link
          href="/accounts"
          className="inline-flex items-center gap-2 text-[14px] text-mute transition-colors duration-200 hover:text-ink"
        >
          <ArrowLeft size={15} />
          Все аккаунты
        </Link>
      </Container>

      <section className="py-8 sm:py-10">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_368px] lg:gap-10">
            <div>
              <div
                className="relative h-56 overflow-hidden rounded-card sm:h-72"
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
                    backgroundSize: "28px 28px",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/25 to-transparent" />
                <div className="absolute bottom-6 left-6 flex items-end gap-3">
                  <span className="num font-display text-[64px] font-extrabold leading-none tracking-[-0.05em] text-ink sm:text-[84px]">
                    {account.level}
                  </span>
                  <span className="mb-3 text-[15px] text-ink/75">уровень</span>
                </div>
              </div>

              <h1 className="num mt-8 text-[32px] sm:text-[40px]">{account.title}</h1>

              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-7 sm:grid-cols-3">
                {specs.map((spec) => (
                  <div key={spec.label}>
                    <dt className="text-[13px] text-faint">{spec.label}</dt>
                    <dd className="num mt-1.5 text-[18px] text-ink">{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <h2 className="mt-10 text-[22px]">Что входит</h2>
              <ul className="mt-4 space-y-2.5">
                {account.highlights.map((line) => (
                  <li key={line} className="flex items-start gap-3 text-[15px] text-mute">
                    <Check size={17} className="mt-0.5 shrink-0 text-mint" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="hairline rounded-card border border-line bg-slab p-6">
                <div className="flex items-center justify-between">
                  <span
                    className={
                      account.sold
                        ? "rounded-full bg-line px-3 py-1 text-[12px] text-mute"
                        : "inline-flex items-center gap-1.5 rounded-full bg-mint/12 px-3 py-1 text-[12px] font-medium text-mint"
                    }
                  >
                    {account.sold ? (
                      "Продан"
                    ) : (
                      <>
                        <BadgeCheck size={13} />В наличии
                      </>
                    )}
                  </span>
                  {account.balance > 0 ? (
                    <span className="inline-flex items-center gap-1.5 text-[13px] text-mute">
                      <RobuxCoin className="h-4 w-4" />
                      <span className="num">{formatRobux(account.balance)}</span>
                    </span>
                  ) : null}
                </div>

                <p className="num mt-6 font-display text-[44px] font-extrabold leading-none tracking-[-0.05em] text-ink">
                  {formatPrice(account.price)}
                </p>
                <p className="mt-2.5 text-[14px] text-mute">
                  Данные аккаунта приходят на почту сразу после оплаты.
                </p>

                {account.sold ? (
                  <ButtonLink href="/accounts" variant="outline" size="lg" className="mt-6 w-full">
                    Смотреть похожие
                  </ButtonLink>
                ) : (
                  <ButtonLink
                    href={`/checkout?account=${account.id}`}
                    size="lg"
                    className="mt-6 w-full"
                  >
                    Купить аккаунт
                  </ButtonLink>
                )}

                <p className="mt-5 flex items-start gap-2.5 border-t border-line pt-5 text-[13px] leading-relaxed text-faint">
                  <ShieldCheck size={15} className="mt-0.5 shrink-0" />
                  Почту и пароль от аккаунта меняете сами при первом входе. Если данные не подошли —
                  возврат в течение суток.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {others.length > 0 ? (
        <section className="py-14">
          <Container>
            <h2 className="mb-7 text-[26px]">Похожие аккаунты</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((a) => (
                <AccountCard key={a.id} account={a} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
