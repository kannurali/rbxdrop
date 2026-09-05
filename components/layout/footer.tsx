import Link from "next/link";
import { BrandIcon } from "@/components/brand/robux";
import { LogoMark } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";

const columns = [
  {
    title: "Магазин",
    links: [
      { href: "/rbx", label: "Robux" },
      { href: "/accounts", label: "Аккаунты" },
    ],
  },
  {
    title: "Помощь",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/support", label: "Поддержка" },
      { href: "/account", label: "Мои заказы" },
    ],
  },
  {
    title: "Документы",
    links: [
      { href: "/terms", label: "Пользовательское соглашение" },
      { href: "/privacy", label: "Политика конфиденциальности" },
      { href: "/refund", label: "Условия возврата" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-slab/40">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-7 w-7" />
              <span className="font-display text-[19px] font-extrabold tracking-[-0.04em]">
                RBXDrop
              </span>
            </div>
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-mute">
              Robux и аккаунты Roblox с выдачей за минуты. Пароль от вашего аккаунта не нужен ни
              при одном способе получения.
            </p>
            <div className="mt-6 flex items-center gap-4 text-faint">
              <BrandIcon name="visa" className="h-5 w-9" />
              <BrandIcon name="mastercard" className="h-5 w-8" />
              <BrandIcon name="bitcoin" className="h-5 w-5" />
              <BrandIcon name="tether" className="h-5 w-5" />
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-sans text-[13px] font-semibold tracking-normal text-mute">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-ink/85 transition-colors duration-200 hover:text-sky"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 RBXDrop</p>
          <p>Не является продуктом Roblox Corporation.</p>
        </div>
      </Container>
    </footer>
  );
}
