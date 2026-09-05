import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Личные и одноразовые страницы в индексе не нужны
      disallow: ["/checkout", "/order/", "/account", "/login", "/register"],
    },
    sitemap: "https://rbxdrop.com/sitemap.xml",
  };
}
