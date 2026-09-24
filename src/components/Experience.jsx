"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import Magnetic from "./Magnetic";
import { certifications } from "@/data/certifications";

const career = [
  {
    year: "2025",
    title:
      "An Undergraduate Internship Program as part of the University Academic Curriculum",
    org: "PT Telkom Akses Malang Region",
    image: "/images/telkom.png",
  },
];

function ExpBlock({ categoryTitle, items, delay, onOpenModal, style }) {
  return (
    <div style={style}>
      <ScrollReveal delay={delay}>
        <h3
          style={{
            fontSize: "11px",
            textTransform: "uppercase",
            color: "rgba(28,29,32,0.5)",
            marginBottom: "40px",
          }}
        >
          {categoryTitle}
        </h3>
      </ScrollReveal>
      {items.map((item, i) => (
        <ScrollReveal delay={delay + i * 0.1} key={i}>
          <div className="services-row" style={{ alignItems: "center", borderTop: "none", paddingTop: 0, borderBottom: "1px solid rgba(28,29,32,0.1)", paddingBottom: "40px" }}>
            <div
              className="services-title"
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <h3
                style={{
                  fontSize: "clamp(24px, 2.5vw, 32px)",
                  fontWeight: 400,
                }}
              >
                {item.year}
              </h3>
            </div>
            <div className="services-content">
              <h4
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {item.title}
                {item.pdf && (
                  <span
                    style={{
                      display: "inline-flex",
                      cursor: "pointer",
                      color: "var(--color-blue)",
                    }}
                    onClick={() => onOpenModal(item.pdf)}
                    title="View Certificate"
                  >
                    <svg
                      width="1.2em"
                      height="1.2em"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </span>
                )}
              </h4>
              <p style={{ margin: 0, display: "flex", alignItems: "center", gap: "4px" }}>
                {item.org}
                {item.image && (
                  <span 
                    style={{ 
                      fontSize: "12px", 
                      lineHeight: 1, 
                      cursor: "pointer", 
                      color: "#fff",
                      backgroundColor: "var(--color-blue)",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: "4px"
                    }} 
                    onClick={() => onOpenModal(item.image)}
                    title="View Image"
                  >
                    ↗
                  </span>
                )}
              </p>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

export default function Experience() {
  const [mounted, setMounted] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const marqueeStyle = `
    @keyframes marquee-scroll {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
    .cert-marquee-container {
      position: relative;
      width: 100%;
      overflow: hidden;
      padding: 40px 0;
      margin-top: 20px;
    }
    .cert-marquee-track {
      display: flex;
      width: max-content;
      animation: marquee-scroll 45s linear infinite;
    }
    .cert-marquee-track:hover {
      animation-play-state: paused;
    }
    .cert-card {
      flex-shrink: 0;
      width: 200px;
      height: 283px;
      margin: 0 40px;
      border-radius: 0px;
      overflow: hidden;
      border: 1px solid rgba(0,0,0,0.1);
      background: #f9f9f9;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .grad-overlay-top, .grad-overlay-bottom {
      position: absolute;
      left: 0;
      right: 0;
      height: 120px;
      z-index: 10;
      pointer-events: none;
    }
    .grad-overlay-top {
      top: 0;
      background: linear-gradient(to bottom, var(--color-light) 0%, transparent 100%);
    }
    .grad-overlay-bottom {
      bottom: 0;
      background: linear-gradient(to top, var(--color-light) 0%, transparent 100%);
    }
    .grad-overlay-left, .grad-overlay-right {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 150px;
      z-index: 10;
      pointer-events: none;
    }
    .grad-overlay-left {
      left: 0;
      background: linear-gradient(to right, var(--color-light) 0%, transparent 100%);
    }
    .grad-overlay-right {
      right: 0;
      background: linear-gradient(to left, var(--color-light) 0%, transparent 100%);
    }
  `;

  return (
    <section
      className="section"
      id="experience"
      style={{ paddingBottom: "0", paddingTop: "2em" }}
    >
      <div className="container">
        <div style={{ display: "flex", flexDirection: "column", gap: "160px" }}>
          <ExpBlock
            categoryTitle="Career"
            items={career}
            delay={0}
            onOpenModal={setModalImage}
          />

          <div style={{ position: "relative" }}>
            <style>{marqueeStyle}</style>
            <ScrollReveal delay={0.15}>
              <h3
                style={{
                  fontSize: "11px",
                  textTransform: "uppercase",
                  color: "rgba(28,29,32,0.5)",
                  marginBottom: "0px",
                }}
              >
                Certifications
              </h3>
            </ScrollReveal>

            <div
              className="cert-grid-responsive"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "24px",
                marginTop: "24px",
              }}
            >
              {certifications.map((cert, i) => {
                return (
                  <div
                    key={`${cert.id}-${i}`}
                    onClick={() => setModalImage(cert.image)}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="cert-card-responsive"
                      style={{
                        borderRadius: "16px",
                        padding: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: "24px",
                        height: "240px",
                        backgroundColor: "#455ce9",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: "160px",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={cert.image}
                          alt={cert.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            transform: cert.id === 1 ? "scale(1.0)" : "none",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        <h4
                          style={{
                            fontSize: "20px",
                            fontWeight: 600,
                            color: "var(--color-white)",
                            fontFamily: '"Inter", "Neue Montreal", sans-serif',
                            margin: 0,
                          }}
                        >
                          {cert.title}
                        </h4>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "rgba(255, 255, 255, 0.8)",
                            fontFamily: '"Inter", "Neue Montreal", sans-serif',
                            margin: 0,
                            lineHeight: 1.5,
                          }}
                        >
                          {cert.org}
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            color: "rgba(255, 255, 255, 0.85)",
                            fontFamily: '"Inter", "Neue Montreal", sans-serif',
                            margin: 0,
                          }}
                        >
                          {cert.year}
                        </p>
                        <p
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "14px",
                            color: "var(--color-white)",
                            fontFamily: '"Inter", "Neue Montreal", sans-serif',
                            margin: "8px 0 0 0",
                            fontWeight: 500,
                          }}
                        >
                          View Certification{" "}
                          <span style={{ fontSize: "16px", lineHeight: 1 }}>
                            ↗
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>


      </div>

      {mounted &&
        modalImage &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              zIndex: 99999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setModalImage(null)}
          >
            <div
              style={{
                position: "relative",
                backgroundColor: "white",
                padding: "24px",
                borderRadius: "16px",
                maxWidth: "90vw",
                maxHeight: "90vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalImage(null)}
                style={{
                  position: "absolute",
                  top: "-16px",
                  right: "-16px",
                  backgroundColor: "white",
                  border: "none",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  color: "#000",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <img
                src={modalImage}
                alt="Certificate"
                style={{
                  maxWidth: "100%",
                  maxHeight: "calc(90vh - 48px)",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
