import { statusLabels } from "@/lib/mock/orders";
import type { OrderStatus } from "@/lib/types";
import { cn } from "@/lib/cn";

const tones: Record<OrderStatus, string> = {
  pending: "bg-amber/12 text-amber",
  paid: "bg-sky/12 text-sky",
  processing: "bg-sky/12 text-sky",
  completed: "bg-mint/12 text-mint",
  cancelled: "bg-line text-mute",
  refunded: "bg-rose/12 text-rose",
};

export function StatusPill({
  status,
  className,
}: {
  status: OrderStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-medium",
        tones[status],
        className,
      )}
    >
      {status === "processing" ? (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
        </span>
      ) : (
        <span className="h-2 w-2 rounded-full bg-current" />
      )}
      {statusLabels[status]}
    </span>
  );
}
