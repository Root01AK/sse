"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomeAbout() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const imageRef = useRef(null);
  const rightRef = useRef(null);

  const [aboutData, setAboutData] = useState(null);

  const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  /* ---------------- FETCH FROM STRAPI ---------------- */
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch(
          `${STRAPI_URL}/api/homes`
        );
        const json = await res.json();
        const home = json?.data?.[0];

        setAboutData(home);
      } catch (error) {
        console.error("Error fetching About section:", error);
      }
    };

    fetchAbout();
  }, []);

  /* ---------------- GSAP ANIMATION ---------------- */
  useEffect(() => {
    if (!aboutData) return;

    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        opacity: 0,
        x: -60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(rightRef.current, {
        opacity: 0,
        x: 60,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [aboutData]);

  if (!aboutData) {
    return <div style={{ height: "400px" }}>Loading...</div>;
  }

  return (
    <section ref={sectionRef} className="about-section">
      <div className="about-container">
        {/* LEFT SIDE */}
        <div ref={leftRef} className="about-left">
          <h5 className="about-subtitle">
            [{aboutData.About_title}]
          </h5>
          <h1 className="about-title">
            {aboutData.About_quote?.split(" ").map((word, index) => (
              <span key={index}>
                {word} <br />
              </span>
            ))}
          </h1>
        </div>

        {/* CENTER IMAGE */}
        <div ref={imageRef} className="about-image">
          <img src="/maps.png" alt="About Us" />
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div ref={rightRef} className="about-right">
          <p className="about-text">
            {aboutData.About_description}
          </p>

          <a href="/about" className="about-btn">
            WHO WE ARE <span className="arrow">↗</span>
          </a>

          <div className="about-stats">
            <div className="stat">
              <h2>{aboutData.about_exp_num}</h2>
              <p>{aboutData.about_exp_decs}</p>
            </div>
            <div className="stat">
              <h2>{aboutData.about_exp_num_1}</h2>
              <p>{aboutData.about_exp_decs_1}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}