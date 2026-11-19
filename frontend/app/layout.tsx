import type { Metadata } from "next";
import Script from "next/script";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SocialLinksProvider } from "@/lib/socialLinksContext";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

type SeoIntegrations = {
  ga4_measurement_id?: string | null;
  gtm_container_id?: string | null;
  google_site_verification?: string | null;
  bing_site_verification?: string | null;
  facebook_pixel_id?: string | null;
  linkedin_partner_id?: string | null;
  hotjar_site_id?: string | null;
  default_og_image_url?: string | null;
  facebook_url?: string | null;
  instagram_url?: string | null;
  linkedin_url?: string | null;
  twitter_url?: string | null;
  youtube_url?: string | null;
  whatsapp_number?: string | null;
  google_business_profile_url?: string | null;
};

async function getSeoIntegrations(): Promise<SeoIntegrations> {
  try {
    const res = await fetch(`${API}/api/seo-integrations`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return {};
    return await res.json();
  } catch {
    return {};
  }
}

export const metadata: Metadata = {
  metadataBase: new URL("https://mangrovesglobal.com"),
  title: {
    default: "Mangroves Global",
    template: "%s | Mangroves Global",
  },
  description:
    "Mangroves Global Trading FZ LLC — UAE-based business group operating across trading, logistics and creative business services.",
  openGraph: {
    siteName: "Mangroves Global",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  // Verification codes — env var takes priority, DB value is fallback
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { "msvalidate.01": [process.env.NEXT_PUBLIC_BING_VERIFICATION] }
      : undefined,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const db = await getSeoIntegrations();

  // Env vars take priority; DB values are the fallback
  const GTM_ID    = process.env.NEXT_PUBLIC_GTM_ID    || db.gtm_container_id    || null;
  const GA4_ID    = process.env.NEXT_PUBLIC_GA4_ID    || db.ga4_measurement_id  || null;
  const FB_PIXEL  = db.facebook_pixel_id  || null;
  const LI_PARTNER = db.linkedin_partner_id || null;
  const HJ_ID     = db.hotjar_site_id     || null;

  // Organisation Schema — built from DB social profiles
  const sameAs = [
    db.facebook_url, db.instagram_url, db.linkedin_url,
    db.twitter_url,  db.youtube_url,   db.google_business_profile_url,
  ].filter(Boolean);

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Mangroves Global Trading FZ LLC",
    url: "https://mangrovesglobal.com",
    ...(db.default_og_image_url ? { logo: db.default_og_image_url } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <html lang="en" className={`${plusJakarta.variable} ${poppins.variable}`}>
      <head>
        {/* Organisation Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="font-sans antialiased">
        {/* GTM noscript fallback — must be first inside <body> */}
        {GTM_ID && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
        )}

        <SocialLinksProvider links={{
          facebook_url:     db.facebook_url,
          instagram_url:    db.instagram_url,
          linkedin_url:     db.linkedin_url,
          twitter_url:      db.twitter_url,
          youtube_url:      db.youtube_url,
          whatsapp_number:  db.whatsapp_number,
        }}>
          {children}
        </SocialLinksProvider>
      </body>

      {/* Google Tag Manager */}
      {GTM_ID && (
        <Script id="gtm" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}</Script>
      )}

      {/* Google Analytics 4 (only when NOT using GTM) */}
      {GA4_ID && !GTM_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">{`
            window.dataLayer=window.dataLayer||[];
            function gtag(){dataLayer.push(arguments)}
            gtag('js',new Date());
            gtag('config','${GA4_ID}');
          `}</Script>
        </>
      )}

      {/* Meta (Facebook) Pixel */}
      {FB_PIXEL && (
        <Script id="fb-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
          document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','${FB_PIXEL}');fbq('track','PageView');
        `}</Script>
      )}

      {/* LinkedIn Insight Tag */}
      {LI_PARTNER && (
        <Script id="linkedin-insight" strategy="afterInteractive">{`
          _linkedin_partner_id="${LI_PARTNER}";
          window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          (function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};
          window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];
          var b=document.createElement("script");b.type="text/javascript";b.async=true;
          b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";
          s.parentNode.insertBefore(b,s)})(window.lintrk);
        `}</Script>
      )}

      {/* Hotjar */}
      {HJ_ID && (
        <Script id="hotjar" strategy="afterInteractive">{`
          (function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:${HJ_ID},hjsv:6};a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r)})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}</Script>
      )}
    </html>
  );
}
