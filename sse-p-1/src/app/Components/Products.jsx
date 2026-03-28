"use client";
import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STRAPI_URL = "http://localhost:1337"; // move to .env later

export default function Products() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [productsData, setProductsData] = useState(null);

  // ✅ Fetch from Strapi
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${STRAPI_URL}/api/homes?populate[Our_Products][populate][cards][populate]=*`
        );
        const data = await res.json();
        setProductsData(data?.data[0]?.Our_Products[0]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // ✅ GSAP Animations
  useGSAP(
    () => {
      if (!productsData) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        cardsRef.current.forEach((card, index) => {
          if (!card) return;

          const rotationY =
            index === 0
              ? 40
              : index === 1
              ? 30
              : index === 2
              ? 0
              : index === 3
              ? -30
              : -40;

          gsap.set(card, {
            rotationY,
            y: 150,
            opacity: 0,
            scale: 0.8,
            transformOrigin: "center center",
            transformStyle: "preserve-3d",
          });
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 70%",
          onEnter: () => {
            gsap.to(cardsRef.current, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              stagger: 0.2,
              ease: "power3.out",
            });
          },
        });
      });

      mm.add("(max-width: 1023px)", () => {
        cardsRef.current.forEach((card) => {
          if (!card) return;

          gsap.set(card, {
            rotationY: 0,
            y: 100,
            opacity: 0,
            scale: 0.9,
          });
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 75%",
          onEnter: () => {
            gsap.to(cardsRef.current, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              stagger: 0.15,
            });
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [productsData] }
  );

  if (!productsData) return <p>Loading...</p>;

  return (
    <section ref={sectionRef} className="home-products-section">
      <div className="products-container">
        <div className="products-title">
          <div className="description-text">
            <p style={{ whiteSpace: "pre-line" }}>
              {productsData.product_description}
            </p>
          </div>
          <h1 className="section-title">
            {productsData.product_title}
          </h1>
        </div>

        <div className="cards-layout">
          {productsData.cards.map((product, index) => {
            const imageObj = product.product_img?.[0];

            // ✅ Prefer medium format if exists
            const imageUrl =
              imageObj?.formats?.medium?.url ||
              imageObj?.formats?.small?.url ||
              imageObj?.url;

            return (
              <div
                key={product.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`home-product-card ${
                  index === 2 ? "center-card" : ""
                }`}
              >
                <div className="card-inner">
                  <div className="product-image">
                    {imageUrl && (
                      <img
                        src={`${STRAPI_URL}${imageUrl}`}
                        alt={product.title}
                      />
                    )}
                  </div>

                  <div className="product-name-overlay">
                    <h3>{product.title}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}