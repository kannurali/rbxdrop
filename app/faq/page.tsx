import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { faq } from "@/lib/mock/faq";

export const metadata: Metadata = {
  title: "Вопросы и ответы",
  description:
    "Как купить Robux, какие есть способы получения, сколько ждать выдачу, как проверить статус заказа и как работает возврат.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        title="Вопросы и ответы"
        lead="Если ответа здесь нет — создайте тикет в поддержке, отвечаем в течение часа."
      />

      <section className="py-14 sm:py-16">
        <Container className="max-w-[860px]">
          <Accordion items={faq} />

          <div className="mt-10 flex flex-col gap-4 rounded-card border border-line bg-slab p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[16px] font-medium text-ink">Остался вопрос?</p>
              <p className="mt-1.5 text-[14px] text-mute">
                Опишите ситуацию и укажите номер заказа, если он есть.
              </p>
            </div>
            <Link
              href="/support"
              className="inline-flex items-center gap-2 text-[15px] text-sky transition-colors duration-200 hover:text-ink"
            >
              Написать в поддержку
              <ArrowRight size={16} />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
