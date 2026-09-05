"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { LogoMark } from "@/components/brand/logo";

const SEEN_KEY = "rbxdrop:intro-seen";

/**
 * Бренд-анимация из ТЗ п.3: логотип → переход к интерфейсу покупки → слоган.
 * Показывается один раз за сессию, пропускается кликом или любой клавишей и
 * полностью выключается при prefers-reduced-motion — иначе на второй заход
 * она превращается в препятствие между человеком и покупкой.
 */
export function BrandIntro() {
  const [show, setShow] = useState(false);
  const reduced = useReducedMotion();

  const dismiss = useCallback(() => setShow(false), []);

  // Решение «показывать или нет» принимается один раз и сразу помечает сессию.
  useEffect(() => {
    if (reduced) return;
    let seen = true;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) return;

    // Флаг сессии доступен только в браузере — показать интро можно лишь
    // после монтирования, поэтому setState в эффекте здесь осознанный.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShow(true);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // приватный режим: интро покажется ещё раз, не страшно
    }
  }, [reduced]);

  // Таймер закрытия отдельным эффектом: в StrictMode первый проход успевает
  // выставить флаг сессии, и объединённый эффект на втором проходе выходил
  // раньше таймера — интро зависало навсегда.
  useEffect(() => {
    if (!show) return;
    const timer = window.setTimeout(dismiss, 3600);
    return () => window.clearTimeout(timer);
  }, [show, dismiss]);

  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", dismiss);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", dismiss);
    };
  }, [show, dismiss]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="intro"
          onClick={dismiss}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[100] grid cursor-pointer place-items-center bg-void"
          role="presentation"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[120px]"
            style={{ background: "radial-gradient(circle, #1D4ED8 0%, transparent 70%)" }}
          />

          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.6, opacity: 0, y: 12 }}
              animate={{
                scale: [0.6, 1, 1, 0.92],
                opacity: [0, 1, 1, 1],
                y: [12, 0, 0, -8],
              }}
              transition={{ duration: 3.2, times: [0, 0.22, 0.62, 1], ease: [0.22, 1, 0.36, 1] }}
            >
              <LogoMark className="h-20 w-20" />
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 font-display text-[34px] font-extrabold tracking-[-0.05em] text-ink"
            >
              RBXDrop
            </motion.span>

            {/* Переход к интерфейсу покупки: под логотипом собирается силуэт карточки */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.3, height: 0 }}
              animate={{ opacity: [0, 1, 1], scaleX: [0.3, 1, 1], height: [0, 76, 76] }}
              transition={{ delay: 0.9, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 w-[280px] overflow-hidden rounded-2xl border border-line bg-slab"
            >
              <div className="flex h-full items-center justify-between px-5">
                <div className="space-y-2">
                  <div className="h-2.5 w-24 rounded-full bg-line" />
                  <div className="h-4 w-16 rounded-full bg-sky/70" />
                </div>
                <div className="h-9 w-9 rounded-full bg-blue" />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-[24ch] text-center text-[15px] leading-relaxed text-mute"
            >
              Твой самый быстрый способ купить Robux
            </motion.p>
          </div>

          <span className="absolute bottom-8 text-[13px] text-faint">Нажмите, чтобы пропустить</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
