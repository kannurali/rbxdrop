import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// При output: "export" метаданные-роуты обязаны быть статическими
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Личные и одноразовые страницы в индексе не нужны
      disallow: ["/checkout", "/order/", "/account", "/login", "/register"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
