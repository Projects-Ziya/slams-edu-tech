import { Helmet } from "react-helmet-async";

type SEOProps = {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  noindex?: boolean;
};

const SEO = ({ title, description, keywords, image = "/logoblk.png", noindex = false }: SEOProps) => {
  const siteUrl = import.meta.env.VITE_SITE_URL || "https://slamstech.com";
  const canonicalUrl = `${siteUrl}${window.location.pathname}`;
  const imageUrl = new URL(image, siteUrl).toString();

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noindex ? "noindex, follow" : "index, follow"} />

      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph (for social sharing) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "Slams Tech",
              url: siteUrl,
              logo: imageUrl,
              sameAs: [
                "https://www.instagram.com/slams.tech",
                "https://www.facebook.com/profile.php?id=61586783287019",
                "https://www.linkedin.com/company/slams-edutech-private-limited/",
              ],
            },
            {
              "@type": "WebSite",
              name: "Slams Tech",
              url: siteUrl,
              description,
            },
          ],
        })}
      </script>
    </Helmet>
  );
};

export default SEO; 