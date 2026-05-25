import { MetadataRoute } from "next";

export default function Robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/contact", "/api/"] },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/terms-and-conditions/", "/privacy-policy/"],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
  };
}
