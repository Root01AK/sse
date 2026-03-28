"use client";

import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Faq from "../Components/Faq";
import FlowingMenu from "../Components/FlowingMenu";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const demoItems = [
    {
      link: "#",
      text: "Quality First",
      image: "https://picsum.photos/600/400?random=1",
    },
    {
      link: "#",
      text: "On-Time Delivery",
      image: "https://picsum.photos/600/400?random=2",
    },
    {
      link: "#",
      text: "Competitive Pricing",
      image: "https://picsum.photos/600/400?random=3",
    },
    {
      link: "#",
      text: "24/7 Customer Support",
      image: "https://picsum.photos/600/400?random=4",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const carouselImages = [
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=500&fit=crop",
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useGSAP(() => {
    // Clear existing ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    // Hero Section - Pin and fade out
    gsap
      .timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: false,
          scrub: 1,
          markers: false,
        },
      })
      .to(heroRef.current, {
        opacity: 0,
        scale: 0.95,
        ease: "none",
      });

    // History Section - Reveal from bottom, pin, then fade
    gsap
      .timeline({
        scrollTrigger: {
          trigger: historyRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          pinSpacing: false,
          scrub: 1,
          markers: false,
        },
      })
      .fromTo(
        historyRef.current,
        {
          clipPath: "inset(100% 0% 0% 0%)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.3,
          ease: "none",
        }
      )
      .to(
        historyRef.current,
        {
          opacity: 0,
          scale: 0.95,
          ease: "none",
          duration: 0.3,
        },
        "+=0.4"
      );

    // Animate history images on enter
    gsap.fromTo(
      ".history-image-main",
      {
        scale: 0.8,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: historyRef.current,
          start: "top 50%",
          end: "top 20%",
          scrub: 1,
        },
      }
    );

    gsap.fromTo(
      ".history-image-secondary",
      {
        x: 100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: historyRef.current,
          start: "top 50%",
          end: "top 20%",
          scrub: 1,
        },
      }
    );

    // Animate history content
    gsap.fromTo(
      ".history-content",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: historyRef.current,
          start: "top 40%",
          end: "top 10%",
          scrub: 1,
        },
      }
    );

    // Animate history points with stagger
    gsap.fromTo(
      ".history-point",
      {
        x: -50,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".history-points",
          start: "top 70%",
          end: "top 40%",
          scrub: 1,
        },
      }
    );

    // Work Section - Reveal from bottom and pin (LAST PINNED SECTION)
    gsap
      .timeline({
        scrollTrigger: {
          trigger: workRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          pinSpacing: true, // Changed to true for the last section
          scrub: 1,
          markers: false,
        },
      })
      .fromTo(
        workRef.current,
        {
          clipPath: "inset(100% 0% 0% 0%)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.3,
          ease: "none",
        }
      )
      .to(
        workRef.current,
        {
          opacity: 0,
          scale: 0.95,
          ease: "none",
          duration: 0.3,
        },
        "+=0.4"
      );

    // Animate work section elements
    gsap.fromTo(
      ".work-title",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: workRef.current,
          start: "top 50%",
          end: "top 20%",
          scrub: 1,
        },
      }
    );

    gsap.fromTo(
      ".work-description",
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: workRef.current,
          start: "top 40%",
          end: "top 20%",
          scrub: 1,
        },
      }
    );

    gsap.fromTo(
      ".carousel-container",
      {
        scale: 0.9,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ".carousel-container",
          start: "top 70%",
          end: "top 40%",
          scrub: 1,
        },
      }
    );

    ScrollTrigger.refresh();
  }, { scope: containerRef, dependencies: [] });

  return (
    <div className="about-page" ref={containerRef}>
      <section ref={heroRef} className="hero-section">
        <h1 className="hero-title">
          Crafting Spaces,{" "}
          <span className="hero-title-light">Shaping Futures</span>
        </h1>
        <p className="hero-description">
          At Mason, every project begins with purpose and is driven by passion. We don't just construct buildings — we create lasting spaces that reflect our clients' goals and values.
        </p>
        <div className="hero-images">
          <div className="hero-image hero-image-left">
            <img
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300&h=200&fit=crop"
              alt="Construction team"
            />
          </div>
          <div className="hero-image hero-image-center">
            <img
              src="https://thumbs.dreamstime.com/b/house-under-construction-blueprints-building-project-53360048.jpg"
              alt="Construction planning"
            />
          </div>
          <div className="hero-image hero-image-right">
            <img
              src="https://ibmd.tatasteel.com/wp-content/uploads/2023/03/Fly-Ash-Brick.jpeg"
              alt="Building construction"
            />
          </div>
        </div>
      </section>

      <section ref={historyRef} className="history-section">
        <div className="history-container">
          <div className="history-images">
            <div className="history-image-main">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=500&fit=crop"
                alt="Construction workers"
              />
            </div>
            <div className="history-image-secondary">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=500&fit=crop"
                alt="Building project"
              />
            </div>
          </div>
          <div className="history-content">
            <h2 className="history-title">About us</h2>
            <p className="history-description">
              Founded in 2009, Sai Saranya Enterprises is a trusted name in construction materials supply based in Kundrathur, Chennai. For over a decade, we have been supplying Fly Ash Bricks, Solid Blocks, Paver Blocks, M-Sand, P-Sand, and Crusher Dust to residential and commercial projects across Kanchipuram, Poonamallee, Mangadu, and Porur. Our goal is simple — to provide top-quality materials, timely delivery, and transparent pricing
            </p>
            <div className="history-points">
              <div className="history-point">
                <div className="point-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 12l2 2 4-4" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </div>
                <span>Humble Beginnings</span>
              </div>
              <div className="history-point">
                <div className="point-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 12l2 2 4-4" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </div>
                <span>Milestones and Achievements</span>
              </div>
              <div className="history-point">
                <div className="point-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 12l2 2 4-4" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </div>
                <span>Building a Legacy of Trust</span>
              </div>
              <div className="history-point">
                <div className="point-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 12l2 2 4-4" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </div>
                <span>Shaping the Future, Rooted in the Past</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section ref={workRef} id="commitment" className="work-section section-3">
        <h2 className="work-title">Our Commitment</h2>
        <p className="work-description">
          At Sai Saranya Enterprises, every order—big or small—matters equally. We are committed to providing honest pricing, prompt communication, and lasting quality, ensuring that every client builds with confidence and satisfaction.
        </p>
        <div className="carousel-container">
          <div className="carousel">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {carouselImages.map((image, index) => (
                <div key={index} className="carousel-slide">
                  <img src={image} alt={`Work process ${index + 1}`} />
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
          <div className="carousel-indicators">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                className={`carousel-indicator ${index === currentSlide ? "active" : ""}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why choose Section */}
      <div className="why-choose-us">
        <h1 className="heading">Why Choose us</h1>
        <div style={{ height: "600px", position: "relative" }}>
          <FlowingMenu items={demoItems} />
        </div>
      </div>
      <Faq />
    </div>
  );
}
