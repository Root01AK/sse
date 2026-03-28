'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const LocationSVG = () => (
  <svg
    height="20"
    width="20"
    viewBox="0 0 20 20"
    fill="#ef5350"
    style={{ marginRight: 8, verticalAlign: "middle" }}
  >
    <circle cx="10" cy="10" r="8" fill="#ef5350" />
    <circle cx="10" cy="10" r="3" fill="#fff" />
  </svg>
);

export default function Serving() {
  const imgRef = useRef();
  const gridRef = useRef();
  const paraRef = useRef();

  const [servingData, setServingData] = useState(null);

  // ✅ Fetch from Strapi
  useEffect(() => {
    const fetchServing = async () => {
      try {
        const res = await fetch(
          "http://localhost:1337/api/homes?populate[Serving_Area][populate]=*"
        );
        const data = await res.json();
        setServingData(data?.data[0]?.Serving_Area[0]);
      } catch (error) {
        console.error("Error fetching Serving Area:", error);
      }
    };

    fetchServing();
  }, []);

  // ✅ GSAP Animations
  useGSAP(() => {
    if (!servingData) return;

    gsap.from(imgRef.current, {
      x: -80,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: imgRef.current,
        start: "top 80%",
      }
    });

    gsap.from(gridRef.current.children, {
      y: 50,
      opacity: 0,
      stagger: 0.15,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 85%",
      }
    });

    gsap.from(paraRef.current, {
      y: 30,
      opacity: 0,
      duration: 1.1,
      scrollTrigger: {
        trigger: paraRef.current,
        start: "top 95%",
      }
    });
  }, [servingData]);

  if (!servingData) return <p>Loading...</p>;

  return (
    <div className="serving-container">
      <h2 className="serving-heading">{servingData.title}</h2>

      <div className="serving-content">
        <div className="serving-image-card">
          <img
            src="/maps.png"
            alt="Serving Map"
            className="serving-image"
            ref={imgRef}
          />
        </div>

        <div className="serving-details">
          <div className="serving-grid" ref={gridRef}>
            {servingData.location.map((loc) => (
              <div key={loc.id} className="serving-grid-item">
                <LocationSVG />
                <span className="location-name">{loc.title}</span>
              </div>
            ))}
          </div>

          <p className="serving-para" ref={paraRef}>
            {servingData.description}
          </p>
        </div>
      </div>
    </div>
  );
}