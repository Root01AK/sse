import React from "react";

export const metadata = {
  title: "Privacy Policy | Sai Saranya Enterprises",
  description: "Read the Privacy Policy of Sai Saranya Enterprises to understand how we collect, use, and protect your personal information on our website.",
  keywords: ["SSE", "privacy policy", "data protection", "personal information", "Sai Saranya Enterprises"],
  alternates: {
    canonical: "https://saisaranyaenterprises.com/Privacy",
  },
  openGraph: {
    title: "Privacy Policy | Sai Saranya Enterprises",
    description: "Your privacy is important to us. Learn how Sai Saranya Enterprises handles your data according to global standards.",
    url: "https://saisaranyaenterprises.com/Privacy",
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
    title: "Privacy Policy | Sai Saranya Enterprises",
    description: "General data privacy policy for Sai Saranya Enterprises.",
    images: ["https://saisaranyaenterprises.com/favicon.ico"],
  },
};

export default function Privacy() {
  return (
    <div className="privacy-page">
      <div className="privacy-header">
        <h1>Privacy Policy</h1>
        <p>Last updated: November 18, 2025</p>
      </div>

      <div className="privacy-content">
        <p>
          This Privacy Policy describes Our policies and procedures on the
          collection, use and disclosure of Your information when You use the
          Service and tells You about Your privacy rights and how the law
          protects You.
        </p>

        <p>
          We use Your Personal data to provide and improve the Service. By using
          the Service, You agree to the collection and use of information in
          accordance with this Privacy Policy.
        </p>

        <h2>Interpretation and Definitions</h2>
        <h3>Interpretation</h3>
        <p>
          The words whose initial letters are capitalized have meanings defined
          under the following conditions. The following definitions shall have
          the same meaning regardless of whether they appear in singular or
          plural.
        </p>

        <h3>Definitions</h3>
        <p>For the purposes of this Privacy Policy:</p>
        <ul>
          <li>
            <strong>Account</strong> means a unique account created for You to
            access our Service or parts of our Service.
          </li>
          <li>
            <strong>Affiliate</strong> means an entity that controls, is
            controlled by, or is under common control with a party...
          </li>
          <li>
            <strong>Company</strong> refers to Sai Saranya Enterprises, No. 3,
            Murugan Kovil Rd, Devi Nagar, Kundrathur, Chennai, Tamil Nadu
            600069.
          </li>
          <li>
            <strong>Cookies</strong> are small files placed on Your computer or
            device by a website to store browsing history.
          </li>
          <li>
            <strong>Country</strong> refers to Tamil Nadu, India.
          </li>
          <li>
            <strong>Device</strong> means any device that can access the Service
            such as a computer, phone, or tablet.
          </li>
          <li>
            <strong>Website</strong> refers to SSE, accessible from{" "}
            <a
              href="https://www.saisaranyaenterprises.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.saisaranyaenterprises.com
            </a>
            .
          </li>
        </ul>

        <h2>Collecting and Using Your Personal Data</h2>
        <h3>Types of Data Collected</h3>
        <p>
          While using Our Service, We may ask You to provide certain personally
          identifiable information including email address, name, phone number,
          and address.
        </p>

        <h3>Usage Data</h3>
        <p>
          Usage Data is collected automatically and may include Your IP address,
          browser type, time spent on pages, and other diagnostic data.
        </p>

        <h2>Tracking Technologies and Cookies</h2>
        <p>
          We use Cookies and similar tracking technologies like web beacons and
          tags to improve and analyze Our Service.
        </p>

        <h2>Use of Your Personal Data</h2>
        <p>The Company may use Personal Data for the following purposes:</p>
        <ul>
          <li>To provide and maintain our Service.</li>
          <li>To manage Your Account.</li>
          <li>To perform a contract.</li>
          <li>To contact You and provide updates or information.</li>
          <li>
            To evaluate and improve services, marketing, and customer
            experience.
          </li>
        </ul>

        <h2>Retention of Your Personal Data</h2>
        <p>
          We retain Personal Data only as long as necessary to comply with legal
          obligations, resolve disputes, and enforce policies.
        </p>

        <h2>Transfer of Your Personal Data</h2>
        <p>
          Your information may be transferred to and maintained on computers
          outside Your jurisdiction. We ensure adequate protection during
          transfer.
        </p>

        <h2>Delete Your Personal Data</h2>
        <p>
          You have the right to delete or request deletion of the Personal Data
          We have collected about You.
        </p>

        <h2>Disclosure of Your Personal Data</h2>
        <p>
          We may disclose Your Personal Data under legal obligations or to
          protect our rights, users, or the public.
        </p>

        <h2>Security of Your Personal Data</h2>
        <p>
          We strive to use commercially reasonable means to protect Your
          Personal Data, but no method is 100% secure.
        </p>

        <h2>Children's Privacy</h2>
        <p>
          Our Service does not address anyone under the age of 13. We do not
          knowingly collect personal information from children.
        </p>

        <h2>Links to Other Websites</h2>
        <p>
          Our Service may contain links to other websites. We are not
          responsible for their content or privacy practices.
        </p>

        <h2>Changes to this Privacy Policy</h2>
        <p>
          We may update Our Privacy Policy from time to time. Changes are
          effective when posted on this page with the updated date.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, You can contact
          us by visiting:{" "}
          <a
            href="https://saisaranyaenterprises.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://saisaranyaenterprises.com/
          </a>
        </p>
      </div>
    </div>
  );
}
