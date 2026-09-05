import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto w-full max-w-[1180px] px-5 sm:px-8", className)}>{children}</div>;
}

export function SectionHead({
  title,
  lead,
  action,
}: {
  title: string;
  lead?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-[46ch]">
        <h2 className="text-[28px] sm:text-[36px]">{title}</h2>
        {lead ? <p className="mt-3 text-[15px] leading-relaxed text-mute">{lead}</p> : null}
      </div>
      {action}
    </div>
  );
}
