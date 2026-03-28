"use client";
import React, { useEffect, useState } from "react";

const STRAPI_URL = "http://localhost:1337"; // move to .env later

export default function CTA() {
  const phoneNumber = "+91 8047650170";
  const [ctaData, setCtaData] = useState(null);

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber.replace(/\s/g, "")}`;
  };

  // ✅ Fetch CTA
  useEffect(() => {
    const fetchCTA = async () => {
      try {
        const res = await fetch(
          `${STRAPI_URL}/api/homes?populate[CTA][populate]=*`
        );
        const data = await res.json();
        setCtaData(data?.data[0]?.CTA[0]);
      } catch (error) {
        console.error("Error fetching CTA:", error);
      }
    };

    fetchCTA();
  }, []);

  if (!ctaData) return <p>Loading...</p>;

  // ✅ Get image (prefer large → medium → small)
  const imageObj = ctaData.images?.[0];
  const imageUrl =
    imageObj?.formats?.large?.url ||
    imageObj?.formats?.medium?.url ||
    imageObj?.formats?.small?.url ||
    imageObj?.url;

  return (
    <div className="cta-container">
      <div className="cta-wrapper">
        <div className="image-section">
          <div className="image-wrapper">
            {imageUrl && (
              <img
                src={`${STRAPI_URL}${imageUrl}`}
                alt={ctaData.title}
                className="cta-image"
              />
            )}
          </div>
        </div>

        <div className="content-section">
          <div className="content-wrapper">
            <h1 className="main-heading">{ctaData.title}</h1>

            <p className="description">
              {ctaData.description}
            </p>

            <button className="phone-button" onClick={handlePhoneClick}>
              <span className="button-text">{phoneNumber}</span>

              <div className="button-icon">
                <svg
                  className="phone-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}