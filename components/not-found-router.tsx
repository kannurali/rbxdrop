"use client";

import { useSyncExternalStore } from "react";
import { OrderView } from "@/components/order/order-view";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LogoMark } from "@/components/brand/logo";
import { stripBasePath } from "@/lib/site";

const ORDER_PATH = /^\/order\/([^/]+)\/?$/;

// Подписки нет: адрес страницы за её жизнь не меняется.
const noSubscribe = () => () => {};

/**
 * GitHub Pages отдаёт 404.html на любой неизвестный путь. Заказы, оформленные
 * в браузере, получают случайный номер, поэтому их страницы в статике нет —
 * разбираем адрес здесь и показываем заказ вместо «страница не найдена».
 *
 * Адрес читаем через useSyncExternalStore: на сервере снимок пустой, после
 * гидратации приходит настоящий путь, и рассинхрона разметки не возникает.
 */
export function NotFoundRouter() {
  const pathname = useSyncExternalStore(
    noSubscribe,
    () => window.location.pathname,
    () => "",
  );

  const orderId = ORDER_PATH.exec(stripBasePath(pathname))?.[1];
  if (orderId) return <OrderView id={decodeURIComponent(orderId)} />;

  return <NotFoundContent />;
}

function NotFoundContent() {
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
