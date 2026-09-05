import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";

export interface LegalSection {
  h: string;
  p: string[];
}

export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHeader title={title} lead={`Редакция от ${updated}.`} />

      <section className="py-12 sm:py-16">
        <Container className="max-w-[74ch]">
          {sections.map((section, i) => (
            <div key={section.h} className={i > 0 ? "mt-10" : undefined}>
              <h2 className="text-[22px]">{section.h}</h2>
              {section.p.map((text) => (
                <p key={text} className="mt-4 text-[16px] leading-[1.75] text-mute">
                  {text}
                </p>
              ))}
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
