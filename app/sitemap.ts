import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://styles-bazar.vercel.app",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://styles-bazar.vercel.app/about",
      lastModified: new Date(),
    },
    {
      url: "https://styles-bazar.vercel.app/contact",
      lastModified: new Date(),
    },
    {
      url: "https://styles-bazar.vercel.app/cart",
      lastModified: new Date(),
    },
  ];
}