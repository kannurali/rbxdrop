import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutRoute } from "@/components/checkout/checkout-route";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Оформление заказа",
  description: "Проверьте состав заказа и оставьте данные для выдачи.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutSkeleton />}>
      <CheckoutRoute />
    </Suspense>
  );
}

function CheckoutSkeleton() {
  return (
    <Container className="py-10 sm:py-14">
      <div className="h-10 w-72 animate-pulse rounded-2xl bg-slab" />
      <div className="mt-9 grid gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="h-[420px] animate-pulse rounded-card bg-slab" />
        <div className="h-[420px] animate-pulse rounded-card bg-slab" />
      </div>
    </Container>
  );
}
