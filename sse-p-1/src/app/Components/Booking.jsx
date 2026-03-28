"use client";

import React, { useState, useEffect } from "react";
import { useToast } from "./Toast";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default function BookingModal({ closeForm, bookingMaterial }) {
  const { showToast } = useToast();
  const [bookingData, setBookingData] = useState({
    fullName: "",
    email: "",
    phone: "",
    pincode: "",
    material: bookingMaterial || "",
    quantity: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBookingData((prev) => ({
      ...prev,
      material: bookingMaterial || "",
    }));
  }, [bookingMaterial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${STRAPI_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            fullName: bookingData.fullName,
            email: bookingData.email,
            phone: bookingData.phone,
            pincode: bookingData.pincode,
            material: bookingData.material,
            quantity: bookingData.quantity,
          },
        }),
      });

      const responseData = await res.json();
      console.log("Response:", responseData);

      if (!res.ok) {
        throw new Error(responseData?.error?.message || "Submission failed");
      }

      showToast(`Booking submitted successfully for ${bookingData.material}!`);
      closeForm();
    } catch (error) {
      console.error("Error:", error);
      showToast(error.message || "Submission failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-modal-overlay" onClick={closeForm}>
      <div
        className="product-modal new-form"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={closeForm}>
          ×
        </button>

        <div className="form-header">
          <h2>
            Take Action Now <br />
            <span className="highlight">Book Your Material!</span>
          </h2>
          <p>Fill out the form below.</p>
        </div>

        <form className="booking-form-grid" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={bookingData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={bookingData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={bookingData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pin code"
              value={bookingData.pincode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row single">
            <input
              type="text"
              name="material"
              value={bookingData.material}
              readOnly
            />
          </div>

          <div className="form-row single">
            <input
              type="text"
              name="quantity"
              placeholder="Quantity"
              value={bookingData.quantity}
              onChange={handleChange}
              required
            />
          </div>
           <p className="note">
          <strong>NOTE:</strong> Our team will contact you to confirm your booking
          and provide details shortly.
        </p>

          <button type="submit" className="next-btn" disabled={loading}>
            {loading ? "Submitting..." : "Book"}
          </button>
        </form>
      </div>
    </div>
  );
}