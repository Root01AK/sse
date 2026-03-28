"use client";
import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [headerData, setHeaderData] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [visibleSliderCount, setVisibleSliderCount] = useState(3);

  const cardsRef = useRef(null);

  const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  /* ---------------- FETCH FROM STRAPI ---------------- */
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(
          `${STRAPI_URL}/api/homes?populate[Testimonials][populate]=*`
        );
        const json = await res.json();

        const testimonialSection = json?.data?.[0]?.Testimonials?.[0];

        if (testimonialSection) {
          setHeaderData({
            title: testimonialSection.title,
            quote: testimonialSection.quote,
            description: testimonialSection.description,
          });

          const formattedCards = testimonialSection.testi_cards.map(
            (item) => ({
              name: item.name,
              role: item.profession,
              text: item.reviews.replace(/"/g, ""), // remove extra quotes
              rating: 5, // default rating (you can add rating field in Strapi later)
            })
          );

          setTestimonials(formattedCards);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  /* ---------------- RESPONSIVE COUNT ---------------- */
  useEffect(() => {
    const handleResize = () => {
      setVisibleSliderCount(window.innerWidth < 700 ? 1 : 3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxSliderIndex = testimonials.length - visibleSliderCount;
  const showTestimonials = testimonials.slice(
    startIndex,
    startIndex + visibleSliderCount
  );

  /* ---------------- GSAP ANIMATION ---------------- */
  useEffect(() => {
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.14,
          ease: "power2.out",
        }
      );
    }
  }, [startIndex, visibleSliderCount]);

  const handlePrev = () =>
    setStartIndex(Math.max(0, startIndex - visibleSliderCount));

  const handleNext = () =>
    setStartIndex(Math.min(maxSliderIndex, startIndex + visibleSliderCount));

  if (!headerData) return null;

  return (
    <section id="Testimonials">
      <div className="testimonial-section">
        {/* HEADER */}
        <div className="testimonial-header">
          <div>
            <span className="testimonial-title-sub">
              {headerData.title}
            </span>
            <span className="testimonial-title-main">
              {headerData.quote}
            </span>
          </div>
          <div className="testimonial-header-desc">
            {headerData.description}
          </div>
        </div>

        {/* CARDS */}
        <div className="testimonial-carousel" ref={cardsRef}>
          {showTestimonials.map((t, idx) => (
            <div className="testimonial-card" key={t.name + idx}>
              <StarRating count={t.rating} />
              <div className="testimonial-text">
                "{t.text}"
              </div>
              <div className="testimonial-user">
                <Avatar name={t.name} />
                <div>
                  <span className="testimonial-user-name">
                    {t.name}
                  </span>
                  <span className="testimonial-user-role">
                    {t.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* NAVIGATION */}
        <div className="testimonial-nav">
          <button
            className="testimonial-nav-btn"
            onClick={handlePrev}
            disabled={startIndex === 0}
          >
            ◀
          </button>
          <button
            className="testimonial-nav-btn"
            onClick={handleNext}
            disabled={startIndex >= maxSliderIndex}
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SUB COMPONENTS ---------------- */

function Avatar({ name }) {
  const firstLetter = name ? name.trim()[0].toUpperCase() : "?";
  return (
    <span className="testimonial-avatar-fallback">
      {firstLetter}
    </span>
  );
}

function StarRating({ count }) {
  return (
    <span>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          style={{
            color: "#b0be7c",
            fontSize: "1.15rem",
            marginRight: "2px",
          }}
        >
          ★
        </span>
      ))}
      {Array.from({ length: 5 - count }, (_, i) => (
        <span
          key={i + count}
          style={{
            color: "#e0e0e0",
            fontSize: "1.15rem",
            marginRight: "2px",
          }}
        >
          ★
        </span>
      ))}
    </span>
  );
}