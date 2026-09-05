import { Container, SectionHead } from "@/components/ui/container";

/** Нумерация здесь оправдана: это настоящая последовательность шагов */
const steps = [
  {
    title: "Выбираете количество",
    text: "Готовый номинал или своё число Robux. Цена видна сразу, без калькуляторов и переписки.",
  },
  {
    title: "Указываете способ получения",
    text: "RBX Plus, Game Pass или Code. Комиссия и итоговая сумма пересчитываются на месте.",
  },
  {
    title: "Оплачиваете и следите за статусом",
    text: "После оплаты открывается страница заказа. Статус меняется от «Оплачен» до «Выполнен».",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <SectionHead
          title="Как это работает"
          lead="Три шага от выбора номинала до Robux на аккаунте."
        />

        <ol className="grid gap-4 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="rounded-card border border-line bg-slab p-6">
              <span className="num font-display text-[15px] font-extrabold text-sky">
                {i + 1}
              </span>
              <h3 className="mt-4 text-[19px]">{step.title}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-mute">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
