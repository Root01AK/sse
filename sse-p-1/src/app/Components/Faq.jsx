"use client";

import React, { useEffect, useState } from "react";

const STRAPI_URL = "http://localhost:1337";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqData, setFaqData] = useState(null);

  /* ---------- FETCH FAQ FROM STRAPI ---------- */
  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const res = await fetch(
          `${STRAPI_URL}/api/abouts?populate[FAQs][populate]=*`
        );
        const json = await res.json();

        const faqFromApi = json?.data?.[0]?.FAQs?.[0];

        if (faqFromApi) {
          setFaqData(faqFromApi);
        }
      } catch (err) {
        console.error("FAQ fetch error:", err);
      }
    };

    fetchFAQ();
  }, []);

  const handleToggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  if (!faqData) return <p>Loading...</p>;

  return (
    <section id="faq">
      <div className="faq-container">

        {/* Title Section */}
        <div className="faq-title">
          <h1>{faqData.title}</h1>
          <p>{faqData.description}</p>
        </div>

        {/* FAQ List */}
        <div className="faq-list">
          {faqData.Faq_list?.map((item, idx) => (
            <div className="faq-item" key={item.id}>
              <div
                className="faq-list-question"
                onClick={() => handleToggle(idx)}
              >
                {item.Question}
                <span className="faq-arrow">
                  {openIndex === idx ? "↑" : "↓"}
                </span>
              </div>

              {openIndex === idx && (
                <div className="faq-list-answer">
                  {item.Answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}