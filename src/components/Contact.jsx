"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import Magnetic from "./Magnetic";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [statusMsg, setStatusMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setStatusMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section
      className="contact-section"
      id="contact"
      style={{
        backgroundColor: "transparent",
        color: "#232323",
        paddingTop: "10em",
        paddingBottom: "2em",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "40px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <ScrollReveal>
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <div
                  style={{
                    width: "clamp(80px, 10vw, 140px)",
                    height: "clamp(80px, 10vw, 140px)",
                    borderRadius: "50%",
                    overflow: "hidden",
                    position: "relative",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src="/images/adi.png"
                    alt="Nur Hadi Imamuddin"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                  />
                </div>
                <h2
                  style={{
                    fontSize: "clamp(50px, 8vw, 120px)",
                    fontWeight: 400,
                    margin: 0,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  Let<span style={{ color: "var(--color-blue)" }}>&apos;</span>s work
                </h2>
              </div>
              <h2
                style={{
                  fontSize: "clamp(50px, 8vw, 120px)",
                  fontWeight: 400,
                  margin: 0,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                together
              </h2>
            </ScrollReveal>
          </div>
        </div>

        <div
          style={{
            marginTop: "100px",
            borderTop: "1px solid rgba(0,0,0,0.2)",
            paddingTop: "40px",
            position: "relative",
          }}
        >
          <div
            className="contact-layout"
            style={{
              marginTop: 0,
              borderTop: "none",
              paddingTop: 0,
              gridTemplateColumns: "1fr 2fr",
              gap: "10vw",
            }}
          >
            <ScrollReveal delay={0.1}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <a
                  href="mailto:nurhadiimamuddin@gmail.com"
                  className="nav-link-inline-dark contact-link"
                  style={{
                    fontSize: "clamp(18px, 1.5vw, 24px)",
                    textDecoration: "none",
                    width: "fit-content",
                    paddingBottom: "4px",
                  }}
                >
                  Email
                </a>
                <a
                  href="https://www.linkedin.com/in/nur-hadi-imamuddin-0b2b85377/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link-inline-dark contact-link"
                  style={{
                    fontSize: "clamp(18px, 1.5vw, 24px)",
                    textDecoration: "none",
                    width: "fit-content",
                    paddingBottom: "4px",
                  }}
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/NurHadiImamuddin18/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link-inline-dark contact-link"
                  style={{
                    fontSize: "clamp(18px, 1.5vw, 24px)",
                    textDecoration: "none",
                    width: "fit-content",
                    paddingBottom: "4px",
                  }}
                >
                  GitHub
                </a>
                <a
                  href="https://www.instagram.com/hyadiv_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link-inline-dark contact-link"
                  style={{
                    fontSize: "clamp(18px, 1.5vw, 24px)",
                    textDecoration: "none",
                    width: "fit-content",
                    paddingBottom: "4px",
                  }}
                >
                  Instagram
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div
                className="contact-form"
                style={{ maxWidth: "600px", marginLeft: "auto", width: "100%" }}
              >
                <form onSubmit={handleSubmit}>
                  <div
                    className="input-group"
                    style={{
                      borderBottom: "1px solid rgba(0,0,0,0.2)",
                      paddingBottom: "15px",
                      marginBottom: "30px",
                    }}
                  >
                    <label style={{ display: "none" }} htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      suppressHydrationWarning
                    />
                  </div>
                  <div
                    className="input-group"
                    style={{
                      borderBottom: "1px solid rgba(0,0,0,0.2)",
                      paddingBottom: "15px",
                      marginBottom: "30px",
                    }}
                  >
                    <label style={{ display: "none" }} htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      suppressHydrationWarning
                    />
                  </div>

                  <div
                    className="input-group"
                    style={{
                      borderBottom: "1px solid rgba(0,0,0,0.2)",
                      paddingBottom: "15px",
                      marginBottom: "30px",
                    }}
                  >
                    <label style={{ display: "none" }} htmlFor="message">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      placeholder="Your Message"
                      rows="2"
                      value={formData.message}
                      onChange={handleChange}
                      suppressHydrationWarning
                    />
                  </div>

                  {/* Send Message Button */}
                  <div
                    style={{
                      marginTop: "40px",
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    <Magnetic>
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        suppressHydrationWarning
                        style={{
                          padding: "18px 40px",
                          borderRadius: "50px",
                          border: "none",
                          backgroundColor:
                            status === "loading"
                              ? "rgba(0,0,0,0.6)"
                              : "#232323",
                          color: "#fff",
                          fontSize: "16px",
                          fontWeight: 500,
                          cursor:
                            status === "loading" ? "not-allowed" : "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "10px",
                          transition: "background-color 0.3s ease",
                        }}
                      >
                        {status === "loading" && (
                          <>
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              style={{ animation: "spin 1s linear infinite" }}
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="#fff"
                                strokeWidth="2"
                                strokeDasharray="31.4"
                                strokeDashoffset="10"
                                strokeLinecap="round"
                              />
                            </svg>
                            Sending...
                          </>
                        )}
                        {status === "success" && "Success"}
                        {status === "error" && "Failed"}
                        {status === "idle" && "Send Message"}
                      </button>
                    </Magnetic>
                  </div>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
