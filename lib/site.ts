/**
 * Полный адрес сайта — для metadataBase, sitemap и robots.
 *
 * На Vercel переменная VERCEL_PROJECT_PRODUCTION_URL приходит сама, поэтому
 * задавать NEXT_PUBLIC_SITE_URL вручную нужно только под свой домен.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
