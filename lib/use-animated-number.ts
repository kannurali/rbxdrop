"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Плавный пересчёт числа (ТЗ п.16 «плавное изменение цены»).
 * При prefers-reduced-motion значение ставится сразу, без анимации.
 */
export function useAnimatedNumber(target: number, duration = 280): number {
  const [value, setValue] = useState(target);
  const current = useRef(target);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // В скрытой вкладке requestAnimationFrame не вызывается — без этой ветки
    // цена зависла бы на прошлом значении до возвращения на вкладку.
    if (reduced || duration <= 0 || document.hidden) {
      current.current = target;
      // Анимации не будет — значение выставляем сразу, каскада рендеров нет.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(target);
      return;
    }

    const from = current.current;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      current.current = from + (target - from) * eased;
      setValue(current.current);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}
