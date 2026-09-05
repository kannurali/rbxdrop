"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { MethodId, Order } from "./types";
import { methodById } from "./mock/methods";
import { packs } from "./mock/packs";
import { basePriceFor, formatRobux, totalFor } from "./pricing";

/**
 * Черновик заказа: количество Robux и способ получения.
 * В макете живёт в sessionStorage — этого достаточно, чтобы пройти воронку
 * главная → checkout → страница заказа. В боевой версии черновик создаётся на
 * сервере и возвращает свой id, а цена приходит оттуда же.
 */

const DRAFT_KEY = "rbxdrop:draft";
const ORDERS_KEY = "rbxdrop:orders";

export interface Draft {
  packId: string | null;
  amount: number;
  methodId: MethodId;
}

const defaultDraft: Draft = {
  packId: "r1700",
  amount: 1700,
  methodId: "rbxplus",
};

interface DraftContext {
  draft: Draft;
  ready: boolean;
  base: number;
  total: number;
  setPack: (packId: string) => void;
  setCustomAmount: (amount: number) => void;
  setMethod: (methodId: MethodId) => void;
  placeOrder: (buyer: { robloxUsername: string; email: string }) => Order;
}

const Ctx = createContext<DraftContext | null>(null);

export function OrderDraftProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = useState<Draft>(defaultDraft);
  const [ready, setReady] = useState(false);

  // Черновика нет при серверном рендере, поэтому читаем его один раз после
  // монтирования. Правило про setState в эффекте здесь неприменимо: это
  // синхронизация с внешним хранилищем, а не каскад рендеров.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (raw) setDraft({ ...defaultDraft, ...(JSON.parse(raw) as Partial<Draft>) });
    } catch {
      // приватный режим или заблокированное хранилище — работаем со значениями по умолчанию
    }
    setReady(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!ready) return;
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      // не критично: черновик просто не переживёт перезагрузку
    }
  }, [draft, ready]);

  const setPack = useCallback((packId: string) => {
    const pack = packs.find((p) => p.id === packId);
    if (!pack) return;
    setDraft((d) => ({ ...d, packId, amount: pack.amount }));
  }, []);

  const setCustomAmount = useCallback((amount: number) => {
    setDraft((d) => ({ ...d, packId: null, amount }));
  }, []);

  const setMethod = useCallback((methodId: MethodId) => {
    setDraft((d) => ({ ...d, methodId }));
  }, []);

  const pack = draft.packId ? packs.find((p) => p.id === draft.packId) : undefined;
  const base = pack ? pack.base : basePriceFor(draft.amount);
  const total = totalFor(base, methodById(draft.methodId));

  const placeOrder = useCallback(
    (buyer: { robloxUsername: string; email: string }): Order => {
      const currentPack = draft.packId ? packs.find((p) => p.id === draft.packId) : undefined;
      const currentBase = currentPack ? currentPack.base : basePriceFor(draft.amount);
      const order: Order = {
        id: `RBX-${Math.floor(10000 + Math.random() * 89999)}`,
        createdAt: new Date().toISOString(),
        item: `${formatRobux(draft.amount)} Robux`,
        amount: draft.amount,
        method: draft.methodId,
        total: totalFor(currentBase, methodById(draft.methodId)),
        status: "processing",
        robloxUsername: buyer.robloxUsername,
        email: buyer.email,
      };
      try {
        const raw = sessionStorage.getItem(ORDERS_KEY);
        const list = raw ? (JSON.parse(raw) as Order[]) : [];
        sessionStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...list]));
      } catch {
        // страница заказа отработает на моковых данных
      }
      return order;
    },
    [draft],
  );

  const value = useMemo<DraftContext>(
    () => ({ draft, ready, base, total, setPack, setCustomAmount, setMethod, placeOrder }),
    [draft, ready, base, total, setPack, setCustomAmount, setMethod, placeOrder],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useOrderDraft(): DraftContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useOrderDraft must be used inside OrderDraftProvider");
  return ctx;
}

/** Сохранить заказ, собранный вне черновика Robux — например, покупку аккаунта */
export function savePlacedOrder(order: Order): Order {
  try {
    const raw = sessionStorage.getItem(ORDERS_KEY);
    const list = raw ? (JSON.parse(raw) as Order[]) : [];
    sessionStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...list]));
  } catch {
    // страница заказа отработает на моковых данных
  }
  return order;
}

/** Заказы, оформленные в этой сессии макета */
export function readPlacedOrders(): Order[] {
  try {
    const raw = sessionStorage.getItem(ORDERS_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}
