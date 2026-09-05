import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { OrderDraftProvider } from "@/lib/order-draft";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rbxdrop.com"),
  title: {
    default: "RBXDrop — быстрый способ купить Robux",
    template: "%s — RBXDrop",
  },
  description:
    "Купить Robux за несколько шагов: выберите количество, способ получения и оформите заказ. Выдача от двух минут, пароль от Roblox не нужен.",
  openGraph: {
    type: "website",
    siteName: "RBXDrop",
    locale: "ru_RU",
    title: "RBXDrop — быстрый способ купить Robux",
    description:
      "Выберите количество Robux, способ получения и оформите заказ. Выдача от двух минут.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${manrope.variable}`}>
        <OrderDraftProvider>
          <Header />
          <main className="pt-16">{children}</main>
          <Footer />
        </OrderDraftProvider>
      </body>
    </html>
  );
}
