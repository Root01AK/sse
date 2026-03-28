import HomeClient from "./HomeClient";

export const metadata = {
  title: "Sai Saranya Enterprises | Premium Building Materials & Industrial Solutions Chennai",
  description: "Welcome to SSE – your premier source for high-quality building materials and industrial solutions in Chennai.",
  keywords: ["SSE", "Sai Saranya Enterprises", "building materials", "industrial solutions", "Chennai"],
  alternates: {
    canonical: "https://saisaranyaenterprises.com/",
  },
  openGraph: {
    title: "Sai Saranya Enterprises | Premium Building Materials & Industrial Solutions Chennai",
    description: "Welcome to SSE – your premier source for high-quality building materials and industrial solutions in Chennai.",
    url: "https://saisaranyaenterprises.com/",
    siteName: "Sai Saranya Enterprises",
    images: [
      {
        url: "https://saisaranyaenterprises.com/favicon.ico",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Saranya Enterprises | Premium Building Materials & Industrial Solutions Chennai",
    description: "Welcome to SSE – your premier source for high-quality building materials and industrial solutions in Chennai.",
    images: ["https://saisaranyaenterprises.com/favicon.ico"],
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Sai Saranya Enterprises",
    "image": "https://saisaranyaenterprises.com/logo.png",
    "@id": "https://saisaranyaenterprises.com",
    "url": "https://saisaranyaenterprises.com",
    "telephone": "+919176332159",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nandambakkam Main Rd, Kundrathur",
      "addressLocality": "Chennai",
      "postalCode": "600069",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 12.9814,
      "longitude": 80.1415
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/saisaranyaenterprises",
      "https://www.instagram.com/saisaranyaenterprises"
    ],
    "description": "Premium source for high-quality building materials and industrial solutions in Chennai, including Bricks, Sand, Cement, and Paver Blocks."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}