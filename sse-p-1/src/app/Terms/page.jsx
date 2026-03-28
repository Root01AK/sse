import React from "react";

export const metadata = {
  title: "Terms and Conditions | Sai Saranya Enterprises",
  description: "Review the Terms and Conditions governing the use of Sai Saranya Enterprises' website and services. Understanding your rights and responsibilities.",
  keywords: ["SSE", "terms and conditions", "legal", "user agreement", "Sai Saranya Enterprises"],
  alternates: {
    canonical: "https://saisaranyaenterprises.com/Terms",
  },
  openGraph: {
    title: "Terms and Conditions | Sai Saranya Enterprises",
    description: "Review the Terms and Conditions for using Sai Saranya Enterprises' services and website.",
    url: "https://saisaranyaenterprises.com/Terms",
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
    title: "Terms and Conditions | Sai Saranya Enterprises",
    description: "Legal terms and conditions for using Sai Saranya Enterprises.",
    images: ["https://saisaranyaenterprises.com/favicon.ico"],
  },
};

export default function Terms() {
  return (
    <div className="terms-page">
      <div className="terms-header">
        <h1>Terms and Conditions</h1>
        <p>Last updated: November 15, 2025</p>
      </div>

      <div className="terms-content">
        <h2>Interpretation and Definitions</h2>
        <h3>Interpretation</h3>
        <p>
          The words whose initial letters are capitalized have meanings defined under the following conditions.
          The following definitions shall have the same meaning regardless of whether they appear in singular or plural.
        </p>

        <h3>Definitions</h3>
        <p>For the purposes of these Terms and Conditions:</p>
        <ul>
          <li>
            <strong>Affiliate</strong> means an entity that controls, is controlled by, or is under common control with a party...
          </li>
          <li>
            <strong>Country</strong> refers to: Tamil Nadu, India
          </li>
          <li>
            <strong>Company</strong> refers to Sai Saranya Enterprises, No. 3, Murugan Kovil Rd, Devi Nagar, Kundrathur, Chennai, Tamil Nadu 600069.
          </li>
          <li>
            <strong>Device</strong> means any device that can access the Service...
          </li>
          <li>
            <strong>Service</strong> refers to the Website.
          </li>
          <li>
            <strong>Website</strong> refers to SSE, accessible from saisaranyaenterprises.com.
          </li>
          <li>
            <strong>You</strong> means the individual accessing or using the Service...
          </li>
        </ul>

        <h2>Acknowledgment</h2>
        <p>
          These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company.
          Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions.
        </p>

        <h2>Links to Other Websites</h2>
        <p>
          Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.
        </p>

        <h2>Termination</h2>
        <p>
          We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever,
          including without limitation if You breach these Terms and Conditions.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers
          shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything.
        </p>

        <h2>"AS IS" and "AS AVAILABLE" Disclaimer</h2>
        <p>
          The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind.
        </p>

        <h2>Governing Law</h2>
        <p>
          The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service.
        </p>

        <h2>Disputes Resolution</h2>
        <p>
          If You have any concern or dispute about the Service, You agree to first try to resolve it informally by contacting the Company.
        </p>

        <h2>Changes to These Terms</h2>
        <p>
          We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material,
          we will provide notice before the new terms take effect.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about these Terms and Conditions, You can contact us by visiting our website:
          <br />
          <a href="https://www.saisaranyaenterprises.com" target="_blank" rel="noopener noreferrer">
            www.saisaranyaenterprises.com
          </a>
        </p>
      </div>
    </div>
  );
}
