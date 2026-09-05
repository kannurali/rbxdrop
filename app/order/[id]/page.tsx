import type { Metadata } from "next";
import { OrderView } from "@/components/order/order-view";
import { orders } from "@/lib/mock/orders";

/** Демонстрационные заказы предсобираем, остальные номера рендерятся по запросу */
export function generateStaticParams() {
  return orders.map((order) => ({ id: order.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Заказ ${id.toUpperCase()}`,
    robots: { index: false, follow: false },
  };
}

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <OrderView id={id} />;
}
