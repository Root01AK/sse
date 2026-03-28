"use client";

import React from "react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-container sse-footer">
      <div className="footer-inner">
        <div className="footer-logo-section">
          <div className="logo-wrapper">
            <img src="/logo.png" alt="SSE Logo" className="logo-image" />
          </div>
        </div>
        <nav className="footer-navigation">
          <a href="/">Home</a>
          <a href="/Products">Products</a>
          <a href="/About">About Us</a>
          <a href="/Contact">Contact Us</a>
        </nav>

        <div className="footer-credit">
          <p>
            Designed & Developed by{" "}
            <a
              href="https://www.vcraftyucompany.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="developer-link"
            >
              Vcraftyu Company
            </a>
          </p>
        </div>

        {/* Pp & Back to Top */}
        <div className="footer-bottom-row">
          <a href="/Privacy" className="privacy-link">
            Privacy Policy
          </a>
          <a href="/Terms" className="terms-link">
            Terms & Conditions
          </a>
          <button className="back-to-top" onClick={scrollToTop}>
            Back to top
            <svg className="arrow-up" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 15l-6-6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}