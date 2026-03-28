import ProductsClient from "./ProductsClient";

export const metadata = {
  title: "Building Materials & Industrial Products | Sai Saranya Enterprises",
  description: "Browse our extensive collection of high-quality construction materials, hardware, and industrial products in Chennai. SSE is your trusted partner for quality supply.",
  keywords: ["SSE", "construction materials", "building materials", "industrial products", "hardware Chennai"],
  alternates: {
    canonical: "https://saisaranyaenterprises.com/Products",
  },
  openGraph: {
    title: "Building Materials & Industrial Products | Sai Saranya Enterprises",
    description: "Browse our extensive collection of high-quality construction materials and industrial products at Sai Saranya Enterprises.",
    url: "https://saisaranyaenterprises.com/Products",
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
    title: "Building Materials & Products | Sai Saranya Enterprises",
    description: "Explore the wide range of industrial and construction products offered by Sai Saranya Enterprises.",
    images: ["https://saisaranyaenterprises.com/favicon.ico"],
  },
};

export default function Products() {
  return <ProductsClient />;
}
