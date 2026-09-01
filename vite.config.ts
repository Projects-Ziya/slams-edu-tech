import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

const staticPageMetadata: Record<string, { title: string; description: string; keywords: string }> = {
  "/": {
    title: "Best IT Company in Kochi | Web & App Solutions",
    description: "Slam Tech is a leading IT company in Kochi offering expert software development, web and mobile apps, consulting, and digital solutions for growing businesses.",
    keywords: "Best IT Company in Kochi, software development, web and app solutions",
  },
  "/service": {
    title: "Best Software Development Company | Custom Services",
    description: "Slams Tech delivers custom web, mobile, AI, and business software designed to help startups and growing businesses scale.",
    keywords: "software development company Kochi, web development, mobile app development",
  },
  "/works": {
    title: "Our Works | Slams Tech",
    description: "Explore Slams Tech digital products, websites, mobile apps, and software case studies.",
    keywords: "Slams Tech portfolio, software projects Kochi, web and app development projects",
  },
  "/careers": {
    title: "Careers at Slams Tech | Jobs and Internships",
    description: "Explore software development jobs and internships at Slams Tech and join our team in building reliable digital products.",
    keywords: "Slams Tech careers, software jobs Kochi, developer internships",
  },
};

const escapeHtml = (value: string) => value
  .replaceAll("&", "&amp;")
  .replaceAll('"', "&quot;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

const getDevMetadata = (route: string) => staticPageMetadata[route] || {
  title: `${route.split("/").filter(Boolean).at(-1)?.replaceAll("-", " ") || "Page"} | Slams Tech`,
  description: "Learn more about Slams Tech, a software development company in Kochi.",
  keywords: "Slams Tech, software development company Kochi",
};

const devSeoPlugin = {
  name: "dev-route-seo",
  transformIndexHtml(html: string, context: { originalUrl?: string }) {
    const route = new URL(context.originalUrl || "/", "http://localhost").pathname;
    const metadata = getDevMetadata(route);
    const canonicalUrl = `https://slamstech.com${route}`;
    const tags = `
      <meta name="description" content="${escapeHtml(metadata.description)}" />
      <meta name="keywords" content="${escapeHtml(metadata.keywords)}" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="${canonicalUrl}" />
      <meta property="og:title" content="${escapeHtml(metadata.title)}" />
      <meta property="og:description" content="${escapeHtml(metadata.description)}" />
      <meta property="og:url" content="${canonicalUrl}" />`;

    return html
      .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(metadata.title)}</title>`)
      .replace(/\s*<meta\s+name="description"[\s\S]*?\/>/, "")
      .replace(/\s*<meta\s+name="robots"[^>]*\/>/, "")
      .replace("</head>", `${tags}\n  </head>`);
  },
};

export default defineConfig({
  plugins: [
    react(),
    devSeoPlugin,
    visualizer({
      open: true,
      filename: "dist/stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});