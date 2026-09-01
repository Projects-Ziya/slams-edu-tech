import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const siteUrl = "https://slamstech.com";
const rootDir = resolve(process.cwd());

const routeFiles = [
  ["src/data/projects.ts", "/project/"],
  ["src/data/service.ts", "/service/"],
  ["src/data/internship.ts", "/internship/"],
  ["src/data/openings.ts", "/careers/"],
];

const staticRoutes = ["/", "/service", "/works", "/careers"];
const dynamicRoutes = routeFiles.flatMap(([file, prefix]) => {
  const source = readFileSync(resolve(rootDir, file), "utf8");
  const ids = [...source.matchAll(/\bid:\s*["']([^"']+)["']/g)].map((match) => match[1]);
  return ids.map((id) => `${prefix}${id}`);
});

const routes = [...new Set([...staticRoutes, ...dynamicRoutes])];
const escapeXml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&apos;");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${escapeXml(`${siteUrl}${route}`)}</loc></url>`).join("\n")}
</urlset>
`;

writeFileSync(resolve(rootDir, "public/sitemap.xml"), sitemap);
console.log(`Generated sitemap.xml with ${routes.length} URLs.`);