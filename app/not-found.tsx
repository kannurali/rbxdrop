import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LogoMark } from "@/components/brand/logo";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] max-w-[520px] flex-col items-start justify-center py-20">
      <LogoMark className="h-10 w-10" />
      <h1 className="mt-6 text-[34px]">Такой страницы нет</h1>
      <p className="mt-4 text-[16px] leading-relaxed text-mute">
        Ссылка устарела или в адресе опечатка. Номиналы Robux и каталог аккаунтов на месте.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/rbx" size="lg">
          Купить Robux
        </ButtonLink>
        <ButtonLink href="/" variant="outline" size="lg">
          На главную
        </ButtonLink>
      </div>
    </Container>
  );
}
