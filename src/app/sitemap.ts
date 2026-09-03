import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: `${SITE_URL}/trabajo/${project.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
