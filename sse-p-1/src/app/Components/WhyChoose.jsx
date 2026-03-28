"use client";

import React, { useEffect, useState, useMemo } from "react";
import FlowingMenu from "./FlowingMenu";

const STRAPI_URL = "http://localhost:1337";

export default function WhyChoose() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${STRAPI_URL}/api/abouts?populate[WhyChooseUs][populate][List][populate]=images`
        );

        const json = await res.json();

        // Adjust if needed based on your API structure
        const whyChoose = json?.data?.[0]?.WhyChooseUs || [];
        setData(whyChoose);
      } catch (error) {
        console.error("Error fetching WhyChoose:", error);
      }
    }

    fetchData();
  }, []);

  const items = useMemo(() => {
    if (!data) return [];

    return data.flatMap((section) => {
      const list = Array.isArray(section.List) ? section.List : [];

      return list
        .filter((item) => item.title && item.images)
        .map((item) => {
          const imagePath =
            item.images?.formats?.medium?.url ||
            item.images?.url;

          return {
            link: "#",
            text: item.title,
            image: `${STRAPI_URL}${imagePath}`,
          };
        });
    });
  }, [data]);

  if (!items.length) return null;

  return (
    <div className="why-choose-us">
      <h1 className="heading">Why Choose Us</h1>

      <div style={{ height: "600px", position: "relative" }}>
        <FlowingMenu items={items} />
      </div>
    </div>
  );
}