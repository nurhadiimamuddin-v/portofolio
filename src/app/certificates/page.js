"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { certifications } from "@/data/certifications";

export default function CertificatesPage() {
  const [modalCert, setModalCert] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Navbar />
      <main
        style={{
          paddingTop: "120px",
          paddingBottom: "100px",
          minHeight: "100vh",
          backgroundColor: "var(--color-light)",
        }}
      >
        <div className="container">
          <div style={{ marginBottom: "60px" }}>
            <Link
              href="/#experience"
              style={{
                display: "inline-block",
                marginBottom: "20px",
                textDecoration: "none",
                color: "rgba(28,29,32,0.5)",
                fontSize: "14px",
              }}
            >
              ← Back to Home
            </Link>
            <h1
              style={{
                fontSize: "clamp(40px, 5vw, 60px)",
                fontWeight: 400,
                color: "#232323",
              }}
            >
              Certificates
            </h1>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "30px",
            }}
          >
            {certifications.map((cert) => (
              <div
                key={cert.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.05)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                }}
              >
                {/* Image Section */}
                <div
                  style={{
                    background: "#f9f9f9",
                    padding: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                      objectFit: "contain",
                      border: "1px solid rgba(0,0,0,0.05)",
                    }}
                  />
                </div>

                {/* Text Content */}
                <div
                  style={{
                    padding: "30px",
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "15px",
                    }}
                  >
                    <span
                      style={{
                        background: "rgba(0,0,0,0.05)",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#232323",
                      }}
                    >
                      {cert.org}
                    </span>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        fontSize: "14px",
                        color: "rgba(28,29,32,0.5)",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      {cert.year}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#232323",
                      marginBottom: "30px",
                      lineHeight: "1.4",
                    }}
                  >
                    {cert.title}
                  </h3>

                  <div style={{ marginTop: "auto" }}>
                    <button
                      onClick={() => setModalCert(cert)}
                      style={{
                        width: "100%",
                        padding: "12px",
                        background: "transparent",
                        border: "1px solid rgba(0,0,0,0.1)",
                        borderRadius: "8px",
                        fontSize: "15px",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "all 0.3s",
                        color: "#232323",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = "var(--color-dark)";
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#232323";
                      }}
                    >
                      View Certificate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer component assuming it's available, if not, remove it or use the standard footer */}
      <Footer />

      {/* Modal */}
      {mounted &&
        modalCert &&
        createPortal(
          <div
            className="pdf-modal-overlay"
            onClick={() => setModalCert(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh",
              background: "rgba(0,0,0,0.8)",
              zIndex: 9999,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <div
              className="pdf-modal-content"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: "1000px",
                background: "#fff",
                borderRadius: "16px",
                display: "flex",
                overflow: "hidden",
                position: "relative",
                flexDirection: "row",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              }}
            >
              <button
                onClick={() => setModalCert(null)}
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  background: "rgba(0,0,0,0.05)",
                  border: "none",
                  color: "#232323",
                  fontSize: "20px",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                }}
              >
                ✕
              </button>

              {/* Left side: Image */}
              <div
                style={{
                  flex: "1 1 60%",
                  background: "#f4f4f4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "40px",
                }}
              >
                <a
                  href={modalCert.image}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "block", width: "100%" }}
                >
                  <img
                    src={modalCert.image}
                    alt={modalCert.title}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                      objectFit: "contain",
                      maxHeight: "70vh",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    }}
                  />
                </a>
              </div>

              {/* Right side: Details */}
              <div
                style={{
                  flex: "1 1 40%",
                  padding: "50px 40px",
                  display: "flex",
                  flexDirection: "column",
                  color: "#232323",
                }}
              >
                <h3
                  style={{
                    fontSize: "28px",
                    fontWeight: "600",
                    marginBottom: "15px",
                    lineHeight: "1.3",
                  }}
                >
                  {modalCert.title}
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    color: "rgba(28,29,32,0.7)",
                    marginBottom: "30px",
                    lineHeight: "1.5",
                  }}
                >
                  {modalCert.org}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "40px",
                    color: "rgba(28,29,32,0.5)",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span style={{ fontSize: "16px", fontWeight: "500" }}>
                    Issued: {modalCert.year}
                  </span>
                </div>

                <a
                  href={modalCert.image}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    background: "var(--color-dark)",
                    color: "#fff",
                    padding: "14px 28px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: "500",
                    fontSize: "16px",
                    transition: "opacity 0.3s",
                    alignSelf: "flex-start",
                  }}
                >
                  View Credential
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
