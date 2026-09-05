import { cn } from "@/lib/cn";

/**
 * Монета номинала. Рисуем свою, а не копируем знак Robux: блочный квадрат под
 * наклоном внутри круга перекликается со знаком RBXDrop и не тащит чужой
 * товарный знак в самый заметный элемент страницы.
 */
export function RobuxCoin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("shrink-0", className)}>
      <defs>
        <linearGradient id="rbx-coin" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7DB1FF" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#rbx-coin)" />
      <path
        d="M12 6.4 17.6 12 12 17.6 6.4 12 12 6.4Z"
        fill="#060A12"
        fillOpacity="0.55"
      />
      <path d="M12 9.6 14.4 12 12 14.4 9.6 12 12 9.6Z" fill="#DBEAFE" fillOpacity="0.9" />
    </svg>
  );
}

/** Иконка стороннего бренда через CSS-маску: файл монохромный, цвет берём из currentColor */
export function BrandIcon({ name, className }: { name: string; className?: string }) {
  return (
    <span
      role="img"
      aria-label={name}
      className={cn("inline-block bg-current", className)}
      style={{
        maskImage: `url(/brand/third-party/${name}.svg)`,
        WebkitMaskImage: `url(/brand/third-party/${name}.svg)`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
