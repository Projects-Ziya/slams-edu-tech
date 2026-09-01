import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const siteUrl = "https://slamstech.com";
const rootDir = resolve(process.cwd());
const distDir = resolve(rootDir, "dist");
const template = readFileSync(resolve(distDir, "index.html"), "utf8");
const sitemap = readFileSync(resolve(rootDir, "public/sitemap.xml"), "utf8");
const routes = [...sitemap.matchAll(/<loc>https:\/\/slamstech\.com([^<]*)<\/loc>/g)]
  .map((match) => match[1] || "/");

const pageMetadata = {
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

const escapeHtml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll('"', "&quot;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

const humanize = (value) => value
  .split("/")
  .filter(Boolean)
  .at(-1)
  .split(/[-_]/g)
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  .join(" ");

const getMetadata = (route) => pageMetadata[route] || {
  title: `${humanize(route)} | Slams Tech`,
  description: `Learn more about ${humanize(route)} from Slams Tech, a software development company in Kochi.`,
  keywords: `${humanize(route)}, Slams Tech, software development company Kochi`,
};

const createPage = (route) => {
  const metadata = getMetadata(route);
  const canonicalUrl = `${siteUrl}${route === "/" ? "/" : route}`;
  const headTags = `
    <meta name="description" content="${escapeHtml(metadata.description)}" />
    <meta name="keywords" content="${escapeHtml(metadata.keywords)}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:title" content="${escapeHtml(metadata.title)}" />
    <meta property="og:description" content="${escapeHtml(metadata.description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${siteUrl}/logoblk.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(metadata.title)}" />
    <meta name="twitter:description" content="${escapeHtml(metadata.description)}" />
    <meta name="twitter:image" content="${siteUrl}/logoblk.png" />`;

  return template
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(metadata.title)}</title>`)
    .replace(/\s*<meta\s+name="description"[\s\S]*?\/>/, "")
    .replace(/\s*<meta name="robots"[^>]*\/>/, "")
    .replace("</head>", `${headTags}\n  </head>`);
};

for (const route of routes) {
  const outputPath = resolve(distDir, `.${route}`, "index.html");
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, createPage(route));
}

console.log(`Prerendered SEO HTML for ${routes.length} routes.`);