import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact Sai Saranya Enterprises | Kundrathur, Chennai | Get a Quote",
  description: "Get in touch with Sai Saranya Enterprises for inquiries, product support, and quotes. Located in Kundrathur, Chennai, we serve all your construction material needs.",
  keywords: ["SSE", "contact", "support", "inquiry", "Chennai", "Kundrathur"],
  alternates: {
    canonical: "https://saisaranyaenterprises.com/contact",
  },
  openGraph: {
    title: "Contact Sai Saranya Enterprises | Kundrathur, Chennai",
    description: "Get in touch with SSE for inquiries and support for building and industrial materials.",
    url: "https://saisaranyaenterprises.com/contact",
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
    title: "Contact Sai Saranya Enterprises | Chennai",
    description: "Connect with Sai Saranya Enterprises for product inquiries and manufacturing support.",
    images: ["https://saisaranyaenterprises.com/favicon.ico"],
  },
};

export default function Contact() {
  return <ContactClient />;
}
