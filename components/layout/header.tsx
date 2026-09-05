"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/rbx", label: "Robux" },
  { href: "/accounts", label: "Аккаунты" },
  { href: "/faq", label: "FAQ" },
  { href: "/support", label: "Поддержка" },
];

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Позиция прокрутки — внешний источник: читаем через useSyncExternalStore,
  // чтобы страница, открытая уже прокрученной, сразу получила фон шапки.
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 8,
    () => false,
  );

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-line bg-void/85 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <Container className="flex h-16 items-center gap-8">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-[15px] transition-colors duration-200",
                  active ? "text-ink" : "text-mute hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <ButtonLink href="/login" variant="ghost" size="sm">
            Войти
          </ButtonLink>
          <ButtonLink href="/register" variant="outline" size="sm">
            Регистрация
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          className="ml-auto grid h-10 w-10 place-items-center rounded-full border border-line text-ink md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </Container>

      {/* Меню закрывается по клику внутри него, а не эффектом на смену маршрута:
          так оно закроется и при повторном клике на текущий раздел */}
      {open ? (
        <div className="border-t border-line bg-void md:hidden" onClick={() => setOpen(false)}>
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl px-4 py-3.5 text-[17px] text-ink transition-colors duration-200 hover:bg-slab"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <ButtonLink href="/login" variant="outline" size="md">
                Войти
              </ButtonLink>
              <ButtonLink href="/register" size="md">
                Регистрация
              </ButtonLink>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
