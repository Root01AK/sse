import AboutClient from "./AboutClient";

export const metadata = {
  title: "About Sai Saranya Enterprises | Our Commitment to Quality & Excellence",
  description: "Learn more about Sai Saranya Enterprises, our history, commitment to quality, and why we are the preferred choice for construction and industrial materials in Chennai.",
  keywords: ["SSE", "about us", "Sai Saranya Enterprises", "quality", "construction materials", "Chennai"],
  alternates: {
    canonical: "https://saisaranyaenterprises.com/About",
  },
  openGraph: {
    title: "About Sai Saranya Enterprises | Our Commitment to Quality & Excellence",
    description: "Learn more about Sai Saranya Enterprises, our history, and our commitment to excellence in the building materials industry.",
    url: "https://saisaranyaenterprises.com/About",
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
    title: "About Sai Saranya Enterprises | Chennai",
    description: "Learn more about Sai Saranya Enterprises and our journey in quality supply chains.",
    images: ["https://saisaranyaenterprises.com/favicon.ico"],
  },
};

export default function About() {
  return <AboutClient />;
}
