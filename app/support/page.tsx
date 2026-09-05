import type { Metadata } from "next";
import Link from "next/link";
import { SupportForm } from "@/components/support/support-form";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Поддержка",
  description:
    "Создайте тикет: выберите категорию, укажите номер заказа и опишите проблему. Отвечаем в течение часа.",
};

export default function SupportPage() {
  return (
    <>
      <PageHeader
        title="Поддержка"
        lead="Опишите, что произошло. Если вопрос про конкретный заказ — укажите его номер, так разберёмся быстрее."
      />

      <section className="py-12 sm:py-14">
        <Container className="grid gap-8 lg:grid-cols-[1fr_300px] lg:gap-10">
          <SupportForm />

          <aside className="space-y-4">
            <div className="rounded-card border border-line bg-slab p-6">
              <p className="text-[15px] font-medium text-ink">Сначала загляните в FAQ</p>
              <p className="mt-2.5 text-[14px] leading-relaxed text-mute">
                Задержка выдачи, статусы заказа и условия возврата разобраны там подробно.
              </p>
              <Link
                href="/faq"
                className="mt-4 inline-block text-[14px] text-sky transition-colors duration-200 hover:text-ink"
              >
                Открыть FAQ
              </Link>
            </div>

            <div className="rounded-card border border-line bg-slab p-6">
              <p className="text-[15px] font-medium text-ink">Время ответа</p>
              <p className="mt-2.5 text-[14px] leading-relaxed text-mute">
                В среднем 40 минут, ночью — до трёх часов. Заказы в статусе «Выполняется» дольше
                часа разбираем вне очереди.
              </p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
