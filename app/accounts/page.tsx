import type { Metadata } from "next";
import { AccountsBrowser } from "@/components/accounts/accounts-browser";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Аккаунты Roblox",
  description:
    "Готовые аккаунты Roblox с инвентарём, limiteds и историей. Фильтры по цене, уровню, предметам и возрасту аккаунта.",
};

export default function AccountsPage() {
  return (
    <>
      <PageHeader
        title="Аккаунты"
        lead="Каждый аккаунт проверяем вручную: смотрим инвентарь, историю входов и привязки. Проданные позиции остаются в каталоге, чтобы вы видели реальные цены сделок."
      />

      <section className="py-12 sm:py-14">
        <Container>
          <AccountsBrowser />
        </Container>
      </section>
    </>
  );
}
