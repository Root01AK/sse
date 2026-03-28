"use client";

import React, {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
} from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BookingModal from "../Components/Booking";

gsap.registerPlugin(ScrollTrigger);

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_MEDIA = process.env.NEXT_PUBLIC_STRAPI_MEDIA;

export default function ProductsClient() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

  const [productSections, setProductSections] = useState([]);
  const [loading, setLoading] = useState(true);

  const [circleActionsIdx, setCircleActionsIdx] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingMaterial, setBookingMaterial] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  /* ------------------------------------
     FETCH FROM STRAPI
  ------------------------------------ */
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${STRAPI_URL}/api/product-categories?populate[products][populate][image]=true&populate[products][populate][specs]=true&populate[hero_image]=true&populate[sample_image]=true&sort=order`,
          { cache: "no-store" }
        );

        const json = await res.json();

        const mapped = json.data.map((item) => ({
          id: item.id,
          category: item.category_name,
          sectionId: item.slug,
          heroImage: item.hero_image
            ? STRAPI_MEDIA + item.hero_image.url
            : "",
          sampleImage: item.sample_image
            ? STRAPI_MEDIA + item.sample_image.url
            : "",
          products: (item.products || []).map((p) => ({
            id: p.id,
            title: p.title,
            image: p.image ? STRAPI_MEDIA + p.image.url : "",
            isFeatured: p.is_featured,
            specs: {
              thickness: p.specs?.thickness || "",
              sizes: normalizeSizes(p.specs?.sizes),
            },
          })),
        }));

        setProductSections(mapped);
      } catch (err) {
        console.error("Strapi fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  /* ------------------------------------
     FILTER LOGIC
  ------------------------------------ */
  const filteredSections = productSections
    .filter((section) =>
      selectedCategoryId ? section.id === selectedCategoryId : true
    )
    .map((section) => ({
      ...section,
      products: section.products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((section) => section.products.length > 0);

  useLayoutEffect(() => {
    sectionsRef.current.length = filteredSections.length;
  }, [filteredSections]);

  /* ------------------------------------
     GSAP PIN STACK
  ------------------------------------ */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const sections = sectionsRef.current;

      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      mm.add("(min-width: 1024px)", () => {
        sections.forEach((section, index) => {
          if (!section || index === sections.length - 1) return;

          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: () => `+=${section.offsetHeight}`,
            pin: true,
            pinSpacing: false,
            scrub: true,
          });

          gsap.to(section, {
            scale: 0.9,
            opacity: 1,
            scrollTrigger: {
              trigger: sections[index + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
        });
      });

      return () => {
        mm.revert();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: containerRef, dependencies: [filteredSections] }
  );

  const normalizeSizes = (sizes) => {
    if (!sizes) return [];
    if (typeof sizes === 'string') {
      return sizes.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
    }
    if (Array.isArray(sizes)) return sizes;
    return [];
  };

  /* ------------------------------------
     ACTION HANDLERS
  ------------------------------------ */
  function handleCircleClick(key, e) {
    e.stopPropagation();
    setCircleActionsIdx(circleActionsIdx === key ? null : key);
  }

  function handleBook(material, e) {
    e.stopPropagation();
    setBookingMaterial(material);
    setShowBookingForm(true);
    setCircleActionsIdx(null);
  }

  function closeForm() {
    setShowBookingForm(false);
    setBookingMaterial("");
  }

  if (loading) {
    return <p style={{ padding: "3rem", textAlign: "center" }}>Loading...</p>;
  }

  return (
    <div className="products-page" ref={containerRef}>
      {/* ---------------- TOP BAR ---------------- */}
      <div
        className="top-bar"
        style={{
          width: "90%",
          margin: "20px auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 1rem",
          flexWrap: "wrap",
        }}
      >
        <div
          className="category-list"
          style={{
            display: "flex",
            gap: "1rem",
            overflowX: "auto",
            flexWrap: "wrap",
            flex: "1 1 auto",
            minWidth: "200px",
          }}
        >
          {productSections.map((section) => (
            <button
              key={section.id}
              onClick={() =>
                setSelectedCategoryId(
                  selectedCategoryId === section.id ? null : section.id
                )
              }
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                border: selectedCategoryId === section.id
                  ? "2px solid var(--primary)"
                  : "1px solid #ccc",
                background: selectedCategoryId === section.id
                  ? "var(--primary)"
                  : "white",
                color: selectedCategoryId === section.id ? "white" : "black",
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontWeight: selectedCategoryId === section.id ? "bold" : "normal",
              }}
            >
              {section.category}
            </button>
          ))}
        </div>

        <div
          className="search-bar"
          style={{ flex: "0 0 250px", marginTop: "0.5rem" }}
        >
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem 1rem",
              borderRadius: "20px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
        </div>
      </div>

      {/* ---------------- SECTIONS ---------------- */}
      <div className="stack-container" key={filteredSections.map((s) => s.id).join("-")}>
        {filteredSections.length === 0 && (
          <p style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
            No products found.
          </p>
        )}
        {filteredSections.map((section, sectionIdx) => (
          <section
            key={section.id}
            ref={(el) => (sectionsRef.current[sectionIdx] = el)}
            id={section.sectionId}
            className="stack-section"
          >
            {/* HERO SECTION */}
            <div className="section-hero">
              <div className="hero-background">
                <Image
                  src={section.heroImage}
                  alt={`${section.category} Background`}
                  fill
                  className="hero-bg-image"
                  priority={sectionIdx === 0}
                />
              </div>
              <div className="product-page-content">
                <div className="hero-flex">
                  <div className="hero-sample-card">
                    <Image
                      src={section.sampleImage}
                      alt={`${section.category} Sample`}
                      width={300}
                      height={200}
                      className="sample-image"
                    />
                  </div>
                  <div className="hero-text">
                    <p className="category-label">{section.category}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* PRODUCTS GRID */}
            <div className="products-section">
              <div className="products-grid">
                {section.products.map((product, idx) => {
                  const cardKey = `${section.id}-${idx}`;
                  const isFeatured = product.isFeatured;

                  return (
                    <div key={product.id} className="product-card" style={{ position: "relative" }}>
                      {/* Featured Badge */}
                      {isFeatured && <span className="featured-badge">Featured</span>}

                      <div className="product-image-wrapper">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="product-image"
                        />
                      </div>

                      <div className="product-details">
                        <h2 className="product-title">{product.title}</h2>
                        <div className="product-specs">
                          <p className="thickness">
                            Thickness : {product.specs.thickness}
                          </p>
                          {product.specs.sizes.length > 0 && (
                            <div className="sizes">
                              {product.specs.sizes.map((size, i) => (
                                <span key={i} className="size-item">
                                  {size}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* CIRCLE ACTIONS */}
                      <div
                        className="product-card-circle-icon"
                        onClick={(e) => handleCircleClick(cardKey, e)}
                      >
                        <svg
                          width="25"
                          height="25"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#29ae65"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.78 19.78 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.78 19.78 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1.21.3 2.4.54 3.56a2 2 0 0 1-.45 1.95L8.09 10.91a16 16 0 0 0 6 6l1.68-1.68a2 2 0 0 1 1.95-.45c1.16.24 2.35.41 3.56.54A2 2 0 0 1 22 16.92z" />
                        </svg>
                        {circleActionsIdx === cardKey && (
                          <div
                            className="circle-actions-popup"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              className="circle-popup-btn"
                              onClick={() => window.open("tel:+919999999999")}
                            >
                              Call
                            </button>
                            <button
                              className="circle-popup-btn"
                              onClick={(e) => handleBook(product.title, e)}
                            >
                              Book
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ---------------- BOOKING FORM MODAL ---------------- */}
      {showBookingForm && (
        <BookingModal
          closeForm={closeForm}
          bookingMaterial={bookingMaterial}
        />
      )}
    </div>
  );
}
