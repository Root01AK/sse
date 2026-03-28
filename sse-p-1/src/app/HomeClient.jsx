"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Products from "./Components/Products";
import BannerSection from "./Components/Bannersection";
import CTA from "./Components/CTA";
import HomeAbout from "./Components/HomeAbout";
import Testimonials from "./Components/Testimonials";
import Serving from "./Components/Serving";
import OurValues from "./Components/OurValues";

gsap.registerPlugin(ScrollTrigger);

export default function HomeClient() {
  const productImageRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPos = (clientX / innerWidth - 0.5) * 30;
      const yPos = (clientY / innerHeight - 0.5) * 30;

      if (productImageRef.current) {
        gsap.to(productImageRef.current, {
          x: xPos,
          y: yPos,
          duration: 0.5,
          ease: "power2.out",
        });
      }

      gsap.to(".floating-element-1", {
        x: xPos * 0.5,
        y: yPos * 0.5,
        duration: 0.8,
      });

      gsap.to(".floating-element-2", {
        x: xPos * -0.3,
        y: yPos * -0.3,
        duration: 0.6,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="page-container">

      {/* HERO BANNER (Pinned inside component) */}
      <BannerSection />

      {/* ABOUT (Overlay target) */}
      <div className="about-section-trigger">
        <HomeAbout />
      </div>

      {/* SERVICES SECTION */}
      <OurValues />

      <Products />
      <CTA />
      <Testimonials />
      <Serving />

    </div>
  );
}
