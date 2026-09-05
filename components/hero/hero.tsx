import { ArrowRight } from "lucide-react";
import { BuyCard } from "@/components/hero/buy-card";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const facts = [
  { value: "2 мин", label: "средняя выдача" },
  { value: "3 способа", label: "получения на выбор" },
  { value: "0 паролей", label: "от вашего Roblox" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-14 sm:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[620px] w-[620px] rounded-full opacity-40 blur-[130px]"
        style={{ background: "radial-gradient(circle, #1D4ED8 0%, transparent 70%)" }}
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <h1 className="max-w-[15ch] text-[38px] leading-[1.02] sm:text-[52px] lg:text-[60px]">
              RBXDrop — твой самый быстрый способ купить Robux.
            </h1>

            <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-mute">
              Выбирай нужное количество Robux, способ получения и оформляй заказ в несколько шагов.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="#buy" size="lg">
                Купить Robux
                <ArrowRight size={18} />
              </ButtonLink>
              <ButtonLink href="#how" variant="outline" size="lg">
                Как это работает
              </ButtonLink>
            </div>

            <dl className="mt-12 grid max-w-[520px] grid-cols-3 gap-4 border-t border-line pt-7 sm:gap-5">
              {facts.map((fact) => (
                <div key={fact.value}>
                  <dt className="num whitespace-nowrap font-display text-[17px] font-extrabold tracking-[-0.03em] text-ink sm:text-[22px]">
                    {fact.value}
                  </dt>
                  <dd className="mt-1.5 text-[12px] leading-snug text-mute sm:text-[13px]">
                    {fact.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <BuyCard />
        </div>
      </Container>
    </section>
  );
}
