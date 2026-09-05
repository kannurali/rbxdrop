"use client";

import { useSearchParams } from "next/navigation";
import { Checkout } from "@/components/checkout/checkout";
import { accountById } from "@/lib/mock/accounts";

/**
 * Чтение ?account=<id> вынесено на клиент: при статическом экспорте серверный
 * searchParams делает страницу динамической, а такую Pages отдать не может.
 */
export function CheckoutRoute() {
  const params = useSearchParams();
  const accountId = params.get("account");
  const account = accountId ? (accountById(accountId) ?? null) : null;

  return <Checkout account={account} />;
}
