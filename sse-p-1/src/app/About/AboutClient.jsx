"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WhyChoose from "../Components/WhyChoose";
import FlowingMenu from "../Components/FlowingMenu";
import Faq from "../Components/Faq";

gsap.registerPlugin(ScrollTrigger);

const STRAPI_URL = "http://localhost:1337";

export default function AboutClient() {
  const [about, setAbout] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const menuRef = useRef([]);

  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const historyRef = useRef(null);
  const workRef = useRef(null);

  /* ================= FETCH ABOUT ================= */
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch(`${STRAPI_URL}/api/abouts?populate=*`);
        const json = await res.json();
        if (!json?.data?.length) return;

        const d = json.data[0];

        setAbout({
          heroTitle: d.title,
          heroDescription: d.description,
          aboutTitle: d.AboutTitle,
          aboutDescription: d.AboutDescription,
          Aboutlist: d.Aboutlist || [],
          commitmentTitle: d.OurCommitmentTitle,
          commitmentDesc: d.OurCommitmentDesc,
          heroImages: d.Images || [],
          aboutBanner: d.AboutBanner?.[0] || null, // First image as main
          aboutBannerSecondary: d.AboutBanner?.[1] || null,
          commitmentImages: d.OurCommitmentImages || [],
          WhyChooseUs: d.WhyChooseUs || [],
          faqs: d.FAQs || [],
        });
      } catch (err) {
        console.error("About fetch error:", err);
      }
    };

    fetchAbout();
  }, []);

  /* ================= CAROUSEL ================= */
  const nextSlide = () => {
    if (!about?.commitmentImages?.length) return;
    setCurrentSlide((p) => (p + 1) % about.commitmentImages.length);
  };

  const prevSlide = () => {
    if (!about?.commitmentImages?.length) return;
    setCurrentSlide(
      (p) => (p - 1 + about.commitmentImages.length) % about.commitmentImages.length
    );
  };

  /* ================= GSAP ================= */
  useGSAP(
    () => {
      if (!about) return;

      ScrollTrigger.getAll().forEach((t) => t.kill());

      /* HERO */
      gsap
        .timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=100%",
            pin: true,
            pinSpacing: false,
            scrub: 1,
          },
        })
        .to(heroRef.current, { opacity: 0, scale: 0.95 });

      /* HISTORY */
      gsap
        .timeline({
          scrollTrigger: {
            trigger: historyRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            pinSpacing: false,
            scrub: 1,
          },
        })
        .fromTo(
          historyRef.current,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)" }
        )
        .to(historyRef.current, { opacity: 0, scale: 0.95 }, "+=0.4");

      gsap.fromTo(
        containerRef.current.querySelector(".history-image-main"),
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: historyRef.current,
            start: "top 60%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        containerRef.current.querySelector(".history-image-secondary"),
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: historyRef.current,
            start: "top 60%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        containerRef.current.querySelector(".history-content"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: historyRef.current,
            start: "top 50%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );

      /* WORK */
      gsap
        .timeline({
          scrollTrigger: {
            trigger: workRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            pinSpacing: true,
            scrub: 1,
          },
        })
        .fromTo(
          workRef.current,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)" }
        )
        .to(workRef.current, { opacity: 0, scale: 0.95 }, "+=0.4");

      gsap.fromTo(
        containerRef.current.querySelector(".carousel-container"),
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: containerRef.current.querySelector(".carousel-container"),
            start: "top 70%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );

      ScrollTrigger.refresh();
    },
    { scope: containerRef, dependencies: [about] }
  );

  if (!about) {
    return <p style={{ padding: "3rem", textAlign: "center" }}>Loading...</p>;
  }

  return (
    <div className="about-page" ref={containerRef}>
      {/* HERO */}
      <section ref={heroRef} className="hero-section">
        <h1 className="hero-title">
          {about.heroTitle?.split(",")[0]},
          <span className="hero-title-light">
            {about.heroTitle?.split(",")[1]}
          </span>
        </h1>
        <p className="hero-description">{about.heroDescription}</p>

        <div className="hero-images">
          {about.heroImages?.map((img, i) => (
            <div key={img.id || i} className={`hero-image hero-image-${i}`}>
              <img src={`${STRAPI_URL}${img.url}`} alt={img.alternativeText || `Hero image ${i + 1}`} />
            </div>
          ))}
        </div>

      </section>

      {/* HISTORY */}
      <section ref={historyRef} className="history-section">
        <div className="history-container">
          <div className="history-images">
            {about.aboutBanner && (
              <div className="history-image-main">
                <img
                  src={STRAPI_URL + about.aboutBanner.url}
                  alt="About banner main"
                />
              </div>
            )}
            {about.aboutBannerSecondary && (
              <div className="history-image-secondary">
                <img
                  src={STRAPI_URL + about.aboutBannerSecondary.url}
                  alt="About banner secondary"
                />
              </div>
            )}
          </div>
          <div className="history-content">
            <h2 className="history-title">{about.aboutTitle}</h2>
            <p className="history-description">{about.aboutDescription}</p>
            <div className="history-points">
              {about.Aboutlist?.map((block, blockIdx) =>
                block.children?.map((listItem, itemIdx) =>
                  listItem.children?.map((child, childIdx) => (
                    <div
                      key={`${blockIdx}-${itemIdx}-${childIdx}`}
                      className="history-point"
                    >
                      <div className="point-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M9 12l2 2 4-4" />
                          <circle cx="12" cy="12" r="9" />
                        </svg>
                      </div>
                      <span>{child.text}</span>
                    </div>
                  ))
                )
              )}
            </div>    </div>
        </div>
      </section>

      {/* WORK */}
      <section ref={workRef} className="work-section section-3">
        <h2 className="work-title">{about.commitmentTitle}</h2>
        <p className="work-description">{about.commitmentDesc}</p>

        <div className="carousel-container">
          <div className="carousel">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {about.commitmentImages.map((img, i) => (
                <div key={i} className="carousel-slide">
                  <img src={STRAPI_URL + img.url} alt="" />
                </div>
              ))}
            </div>
            <button className="carousel-button carousel-button-prev" onClick={prevSlide}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="carousel-button carousel-button-next" onClick={nextSlide}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <WhyChoose data={about.WhyChooseUs} />
      {/* FAQ */}
      <Faq items={about.faqs} />
    </div>
  );
}
