"use client";

import Link from "next/link";
import { useState } from "react";
import { LogoMark } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const isLogin = mode === "login";
  const [sent, setSent] = useState(false);

  return (
    <Container className="flex min-h-[calc(100vh-16rem)] max-w-[440px] flex-col justify-center py-16">
      <div className="hairline rounded-card border border-line bg-slab p-7 sm:p-8">
        <LogoMark className="h-9 w-9" />
        <h1 className="mt-5 text-[27px]">{isLogin ? "Вход" : "Регистрация"}</h1>
        <p className="mt-2.5 text-[14px] leading-relaxed text-mute">
          {isLogin
            ? "Войдите, чтобы видеть свои заказы и тикеты."
            : "После регистрации подтвердите почту — на неё приходят заказы и чеки."}
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="mt-7 space-y-4"
        >
          <label className="block">
            <span className="text-[14px] text-ink">Email</span>
            <input
              type="email"
              required
              placeholder="you@example.com"
              autoComplete="email"
              className="mt-2.5 h-12 w-full rounded-2xl border border-line bg-void px-4 text-[15px] text-ink outline-none transition-colors duration-200 placeholder:text-faint focus:border-sky/60"
            />
          </label>

          <label className="block">
            <span className="text-[14px] text-ink">Пароль</span>
            <input
              type="password"
              required
              minLength={8}
              placeholder="Минимум 8 символов"
              autoComplete={isLogin ? "current-password" : "new-password"}
              className="mt-2.5 h-12 w-full rounded-2xl border border-line bg-void px-4 text-[15px] text-ink outline-none transition-colors duration-200 placeholder:text-faint focus:border-sky/60"
            />
            <span className="mt-2 block text-[13px] text-faint">
              Это пароль от RBXDrop, а не от Roblox — свой мы не спрашиваем никогда.
            </span>
          </label>

          <Button type="submit" size="lg" className="w-full">
            {isLogin ? "Войти" : "Создать аккаунт"}
          </Button>

          {sent ? (
            <p className="rounded-2xl border border-line bg-void/60 p-4 text-[13px] leading-relaxed text-mute">
              Это макет — авторизации ещё нет. Форма проверяет поля, но никуда не отправляет данные.
            </p>
          ) : null}
        </form>

        <p className="mt-7 border-t border-line pt-6 text-[14px] text-mute">
          {isLogin ? "Ещё нет аккаунта? " : "Уже зарегистрированы? "}
          <Link
            href={isLogin ? "/register" : "/login"}
            className="text-sky transition-colors duration-200 hover:text-ink"
          >
            {isLogin ? "Зарегистрируйтесь" : "Войдите"}
          </Link>
        </p>
      </div>
    </Container>
  );
}
