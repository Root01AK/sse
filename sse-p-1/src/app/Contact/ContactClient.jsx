"use client";

import React, { useState, useEffect } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import Faq from "../Components/Faq";
import { useToast } from "../Components/Toast";

const STRAPI_URL = "http://localhost:1337";

export default function ContactClient() {
  const { showToast } = useToast();
  const [contactData, setContactData] = useState(null);

  // FORM STATE
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch Contact Info
  useEffect(() => {
    async function fetchContact() {
      try {
        const res = await fetch(`${STRAPI_URL}/api/contacts`);
        const json = await res.json();
        setContactData(json?.data?.[0] || null);
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    }

    fetchContact();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${STRAPI_URL}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            FirstName: formData.firstName,
            LastName: formData.lastName,
            Email: formData.email,
            Message: formData.message,
          },
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error?.message || "Something went wrong");
      }

      console.log("Saved to Strapi:", result);
      showToast("Message sent successfully! We will get back to you soon.");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });

    } catch (error) {
      console.error("Error submitting form:", error);
      showToast(error.message || "Error sending message. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* LEFT SIDE */}
        <div className="contact-info-section">
          <div className="contact-info-content">
            <h1 className="main-title">
              {contactData?.title}
            </h1>

            <p className="description">
              {contactData?.description}
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-label">
                  {contactData?.contact_label_Address}:
                </span>
                <span className="contact-value">
                  {contactData?.contact_label_Name}
                </span>
                <p className="availability">
                  {contactData?.contact_label_Location}
                </p>
              </div>

              <div className="contact-item">
                <span className="contact-label">
                  {contactData?.contact_label_Email_Title}:
                </span>
                <a
                  href={`mailto:${contactData?.contact_label_Email}`}
                  className="contact-value"
                >
                  {contactData?.contact_label_Email}
                </a>
              </div>

              <div className="contact-item">
                <span className="contact-label">
                  {contactData?.contact_label_Phone_Title}:
                </span>
                <a
                  href={`tel:${contactData?.contact_label_Phone}`}
                  className="contact-value"
                >
                  {contactData?.contact_label_Phone}
                </a>
              </div>

              <div className="contact-item">
                <span className="contact-label">
                  {contactData?.contact_label_Whatsapp_Title}:
                </span>
                <a
                  href={`tel:${contactData?.contact_label_Whatsapp}`}
                  className="contact-value"
                >
                  {contactData?.contact_label_Whatsapp}
                </a>
              </div>

              <p className="availability">
                <strong>
                  {contactData?.contact_label_BusinessHours_Title}
                </strong>
                <br />
                {contactData?.contact_label_BusinessHours_desc}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-section">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name..."
                  className={`form-input ${errors.firstName ? 'error' : ''}`}
                />
                {errors.firstName && (
                  <span className="error-message">{errors.firstName}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name..."
                  className={`form-input ${errors.lastName ? 'error' : ''}`}
                />
                {errors.lastName && (
                  <span className="error-message">{errors.lastName}</span>
                )}
              </div>
            </div>
            <div className="form-group full-width">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address..."
                className={`form-input ${errors.email ? 'error' : ''}`}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>
            <div className="form-group full-width">
              <label htmlFor="message" className="form-label">
                How can we help you?
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Enter your message..."
                rows="6"
                className={`form-textarea ${errors.message ? 'error' : ''}`}
              />
              {errors.message && (
                <span className="error-message">{errors.message}</span>
              )}
            </div>
            <button className="contact-btn" disabled={isSubmitting}>
              <span className="button-text">Submit</span>
              <div className="button-icon">
                <FaArrowTrendUp className="phone-icon" />
              </div>
            </button>
          </form>
        </div>
      </div>
      <Faq />
    </div>
  );
}
