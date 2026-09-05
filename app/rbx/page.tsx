import type { Metadata } from "next";
import { AmountTiles } from "@/components/rbx/amount-tiles";
import { MethodPanels } from "@/components/rbx/method-panels";
import { OrderBar } from "@/components/rbx/order-bar";
import { Container, SectionHead } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Купить Robux",
  description:
    "Номиналы Robux от 400 до 10 000 и своё количество. Три способа получения, комиссия и итоговая цена видны до оплаты.",
};

export default function RbxPage() {
  return (
    <>
      <PageHeader
        title="Robux"
        lead="Выберите номинал, затем способ получения. Итоговая сумма считается сразу — на оплату вы уходите, уже зная цену."
      />

      <section className="py-14 sm:py-16">
        <Container>
          <SectionHead title="Количество" />
          <AmountTiles />
        </Container>
      </section>

      <section className="pb-14 sm:pb-16">
        <Container>
          <SectionHead title="Способ получения" />
          <MethodPanels />
          <div className="mt-6">
            <OrderBar />
          </div>
        </Container>
      </section>
    </>
  );
}
