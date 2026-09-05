import Link from "next/link";
import { cn } from "@/lib/cn";

/** Знак: капля, собранная из блочной геометрии Roblox — «дроп» из названия */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("shrink-0", className)}>
      <defs>
        <linearGradient id="rbxdrop-mark" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60A5FA" />
          <stop offset="0.55" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      <path
        d="M16 2.2 27 15.1c1.2 1.4 1.9 3.2 1.9 5.1 0 5-4.4 8.9-9.9 8.9h-6c-5.5 0-9.9-3.9-9.9-8.9 0-1.9.7-3.7 1.9-5.1L16 2.2Z"
        fill="url(#rbxdrop-mark)"
      />
      <path
        d="M16 10.6 21.4 17c.4.5.6 1.1.6 1.7 0 1.7-1.5 3.1-3.4 3.1h-5.2c-1.9 0-3.4-1.4-3.4-3.1 0-.6.2-1.2.6-1.7L16 10.6Z"
        fill="#060A12"
        fillOpacity="0.35"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 transition-opacity duration-200 hover:opacity-90",
        className,
      )}
    >
      <LogoMark className="h-7 w-7" />
      <span className="font-display text-[19px] font-extrabold tracking-[-0.04em] text-ink">
        RBXDrop
      </span>
    </Link>
  );
}
