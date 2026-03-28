"use client";
import { useEffect, useState } from "react";

const STRAPI_URL = "http://localhost:1337";

export default function OurValues() {
  const [valuesData, setValuesData] = useState(null);

  useEffect(() => {
    const fetchValues = async () => {
      try {
        const res = await fetch(
          `${STRAPI_URL}/api/homes?populate[Our_values][populate][cards]=*`
        );
        const data = await res.json();

        setValuesData(data?.data[0]?.Our_values[0]);
      } catch (error) {
        console.error("Error fetching values:", error);
      }
    };

    fetchValues();
  }, []);

  if (!valuesData) return <p>Loading...</p>;

  return (
    <section id="services" className="next-section">
      <div className="next-content">

        {/* Section Header */}
        <div className="next-hero">
          <h2>{valuesData.Value_title}</h2>
          <p>{valuesData.value_description}</p>
        </div>

        {/* Cards */}
        <div className="services-grid">
          {valuesData.cards?.map((card) => (
            <div key={card.id} className="service-card">
              <div className="service-icon">🏗️</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}