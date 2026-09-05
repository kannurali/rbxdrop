/** Подкаталог, в котором живёт сайт. На GitHub Pages — /rbxdrop, локально пусто. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Полный адрес сайта — для metadataBase, sitemap и robots. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/**
 * Префикс для ссылок, которые Next не переписывает сам: url() в стилях,
 * пути в атрибутах вроде mask-image. next/link и next/image basePath
 * подставляют автоматически, им это не нужно.
 */
export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`;
}

/** Обратная операция: убрать префикс из location.pathname. */
export function stripBasePath(pathname: string): string {
  if (BASE_PATH && pathname.startsWith(BASE_PATH)) {
    return pathname.slice(BASE_PATH.length) || "/";
  }
  return pathname;
}
