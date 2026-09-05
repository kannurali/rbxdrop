import type { Metadata } from "next";
import { Checkout } from "@/components/checkout/checkout";
import { accountById } from "@/lib/mock/accounts";

export const metadata: Metadata = {
  title: "Оформление заказа",
  description: "Проверьте состав заказа и оставьте данные для выдачи.",
  robots: { index: false, follow: false },
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ account?: string }>;
}) {
  const { account: accountId } = await searchParams;
  const account = accountId ? (accountById(accountId) ?? null) : null;

  return <Checkout account={account} />;
}
