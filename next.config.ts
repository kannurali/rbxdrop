import type { NextConfig } from "next";

/**
 * Сайт публикуется на GitHub Pages статикой, поэтому серверных возможностей
 * в проекте быть не должно: ни Server Actions, ни route handlers с чтением
 * запроса, ни редиректов из конфига. Динамические маршруты обязаны иметь
 * generateStaticParams.
 *
 * На Pages проект живёт в подкаталоге /rbxdrop, локально — в корне, поэтому
 * префикс приходит переменной окружения из workflow.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Pages отдаёт каталоги: /rbx/ → /rbx/index.html
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
