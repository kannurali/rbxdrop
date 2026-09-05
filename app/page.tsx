import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AccountCard } from "@/components/accounts/account-card";
import { BrandIntro } from "@/components/hero/brand-intro";
import { Hero } from "@/components/hero/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { AmountTiles } from "@/components/rbx/amount-tiles";
import { MethodPanels } from "@/components/rbx/method-panels";
import { OrderBar } from "@/components/rbx/order-bar";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { Container, SectionHead } from "@/components/ui/container";
import { accounts } from "@/lib/mock/accounts";
import { faq } from "@/lib/mock/faq";

export default function HomePage() {
  return (
    <>
      <BrandIntro />
      <Hero />

      <section id="buy" className="scroll-mt-24 py-16 sm:py-20">
        <Container>
          <SectionHead
            title="Купить Robux"
            lead="Выберите готовый номинал или введите своё количество."
            action={
              <ButtonLink href="/rbx" variant="ghost" size="sm">
                Все номиналы
                <ArrowRight size={16} />
              </ButtonLink>
            }
          />
          <AmountTiles />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHead
            title="Способ получения"
            lead="Комиссия и итоговая цена пересчитываются сразу — до перехода к оплате."
          />
          <MethodPanels />
          <div className="mt-6">
            <OrderBar />
          </div>
        </Container>
      </section>

      <HowItWorks />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHead
            title="Аккаунты Roblox"
            lead="Готовые аккаунты с инвентарём и историей. Каждый проверен вручную перед публикацией."
            action={
              <ButtonLink href="/accounts" variant="outline" size="sm">
                Смотреть все
                <ArrowRight size={16} />
              </ButtonLink>
            }
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {accounts
              .filter((a) => !a.sold)
              .slice(0, 3)
              .map((account) => (
                <AccountCard key={account.id} account={account} />
              ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHead title="Частые вопросы" />
          <Accordion items={faq.slice(0, 4)} />
          <Link
            href="/faq"
            className="mt-8 inline-flex items-center gap-2 text-[15px] text-sky transition-colors duration-200 hover:text-ink"
          >
            Все вопросы
            <ArrowRight size={16} />
          </Link>
        </Container>
      </section>
    </>
  );
}
