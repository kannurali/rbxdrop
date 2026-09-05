import type { MetadataRoute } from "next";
import { accounts } from "@/lib/mock/accounts";

const base = "https://rbxdrop.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/rbx`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/accounts`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/support`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/refund`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const accountPages: MetadataRoute.Sitemap = accounts
    .filter((a) => !a.sold)
    .map((a) => ({
      url: `${base}/accounts/${a.id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

  return [...pages, ...accountPages];
}
