"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroBannerCenterFixed() {
  const bannerRef = useRef(null);
  const pinRef = useRef(null);
  const slideRefs = useRef([]);
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  /* ---------------- FETCH FROM STRAPI ---------------- */
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch(
          `${STRAPI_URL}/api/homes?populate[Banner][populate]=BannerImage`
        );
        const json = await res.json();

        const bannerData = json?.data?.[0]?.Banner || [];

        const formattedSlides = bannerData.map((item) => {
          const image = item.BannerImage?.[0];

          const imageUrl =
            image?.formats?.large?.url ||
            image?.formats?.medium?.url ||
            image?.formats?.small?.url ||
            image?.url;

          return {
            subtitle: item.Banner_title,
            title: item.Banner_cta,
            description: item.Banner_description,
            bg: imageUrl ? `${STRAPI_URL}${imageUrl}` : "",
          };
        });

        setSlides(formattedSlides);
      } catch (error) {
        console.error("Error fetching banner:", error);
      }
    };

    fetchBanner();
  }, []);

  /* ---------------- MOBILE DETECTION ---------------- */
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* ---------------- GSAP DESKTOP TIMELINE ---------------- */
  useEffect(() => {
    if (!slides.length || isMobile) return;

    const ctx = gsap.context(() => {
      gsap.set(slideRefs.current, {
        autoAlpha: 0,
        scale: 0.97,
      });

      gsap.set(slideRefs.current[0], {
        autoAlpha: 1,
        scale: 1,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "center center",
          end: "+=300%", // Extended for overlay
          scrub: true,
          pin: pinRef.current,
        },
      });

      /* Slide transitions */
      slides.forEach((_, i) => {
        if (i < slides.length - 1) {
          tl.to(
            slideRefs.current[i],
            { autoAlpha: 0, scale: 0.96, duration: 0.5 },
            i * 0.6
          ).to(
            slideRefs.current[i + 1],
            { autoAlpha: 1, scale: 1, duration: 0.5 },
            i * 0.6
          );
        }
      });

      /* Slight fade/scale of last slide */
      tl.to(
        slideRefs.current[slides.length - 1],
        { scale: 0.95, autoAlpha: 0.85, duration: 0.5 },
        slides.length * 0.6
      );

      /* 🔥 ABOUT OVERLAY ANIMATION */
      tl.fromTo(
        ".about-section-trigger",
        { y: "100%" },
        {
          y: "0%",
          duration: 1,
        },
        slides.length * 0.6 + 0.3
      );
    }, bannerRef);

    return () => ctx.revert();
  }, [slides, isMobile]);

  if (!slides.length) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  /* ---------------- MOBILE VIEW ---------------- */
  if (isMobile) {
    return (
      <div className="hero-banner mobile-carousel">
        <div className="pin-container">
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                className="slide"
                style={{
                  backgroundImage: `url(${slide.bg})`,
                }}
              >
                <div className="overlay" />
                <div className="hero-subtitle">{slide.subtitle}</div>
                <h1 className="banner-title">{slide.title}</h1>
                <div className="description-container">
                  <div className="description-text">
                    {slide.description}
                  </div>
                  <button
                    className="explore-button"
                    onClick={() => (window.location.href = "/Products")}
                  >
                    Explore Products
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${
                  currentSlide === index ? "active" : ""
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- DESKTOP VIEW ---------------- */
  return (
    <div ref={bannerRef} className="hero-banner">
      <div ref={pinRef} className="pin-container">
        {slides.map((slide, i) => (
          <div
            key={i}
            ref={(el) => (slideRefs.current[i] = el)}
            className="slide"
            style={{
              backgroundImage: `url(${slide.bg})`,
            }}
          >
            <div className="overlay" />
            <div className="hero-subtitle">{slide.subtitle}</div>
            <h1 className="banner-title">{slide.title}</h1>
            <div className="description-container">
              <div className="description-text">
                {slide.description}
              </div>
              <button
                className="explore-button"
                onClick={() => (window.location.href = "/Products")}
              >
                Explore Products
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}