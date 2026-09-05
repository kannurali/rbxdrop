import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

export function PageHeader({
  title,
  lead,
  aside,
}: {
  title: string;
  lead?: string;
  aside?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-[20%] h-[380px] w-[380px] rounded-full opacity-25 blur-[110px]"
        style={{ background: "radial-gradient(circle, #1D4ED8 0%, transparent 70%)" }}
      />
      <Container className="relative flex flex-col gap-6 py-12 sm:flex-row sm:items-end sm:justify-between sm:py-16">
        <div>
          <h1 className="text-[34px] sm:text-[44px]">{title}</h1>
          {lead ? (
            <p className="mt-4 max-w-[62ch] text-[16px] leading-relaxed text-mute">{lead}</p>
          ) : null}
        </div>
        {aside}
      </Container>
    </div>
  );
}
