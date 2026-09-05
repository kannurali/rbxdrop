import type { Metadata } from "next";
import { OrderView } from "@/components/order/order-view";
import { orders } from "@/lib/mock/orders";

/**
 * При статическом экспорте предсобрать можно только известные номера — это
 * демонстрационные заказы из моков. Заказы, оформленные прямо в браузере,
 * получают случайный номер, страницы под него в сборке нет, и Pages отдаёт
 * 404.html. Его not-found разбирает адрес и показывает нужный заказ.
 */
export function generateStaticParams() {
  return orders.map((order) => ({ id: order.id }));
}

export const dynamicParams = false;

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
