"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { certifications } from "@/data/certifications";

export default function CertificateDetailPage({ params }) {
  const certId = parseInt(params.id);
  const cert = certifications.find((c) => c.id === certId);

  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!cert) {
    return (
      <>
        <Navbar />
        <main
          style={{
            paddingTop: "120px",
            paddingBottom: "100px",
            minHeight: "100vh",
          }}
        >
          <div className="container">
            <p>Certificate not found.</p>
            <Link href="/#experience" style={{ color: "var(--color-blue)" }}>
              ← Back to Home
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main
        style={{
          paddingTop: "120px",
          paddingBottom: "100px",
          minHeight: "100vh",
        }}
      >
        <div className="container">
          {/* Back link */}
          <Link
            href="/#experience"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "40px",
              textDecoration: "none",
              color: "rgba(28,29,32,0.5)",
              fontSize: "14px",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Back to Home
          </Link>

          {/* Certificate detail layout */}
          <div
            style={{
              display: "flex",
              gap: "60px",
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {/* Left: Image */}
            <div
              style={{
                flex: "1 1 55%",
                minWidth: "300px",
                background: "#fff",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.05)",
                padding: "30px",
              }}
            >
              <img
                src={cert.image}
                alt={cert.title}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: "8px",
                }}
              />
            </div>

            {/* Right: Details */}
            <div
              style={{ flex: "1 1 35%", minWidth: "280px", paddingTop: "10px" }}
            >
              <h1
                style={{
                  fontSize: "clamp(28px, 3vw, 40px)",
                  fontWeight: 600,
                  lineHeight: 1.3,
                  marginBottom: "15px",
                  color: "#232323",
                }}
              >
                {cert.title}
              </h1>

              <p
                style={{
                  fontSize: "16px",
                  color: "rgba(28,29,32,0.6)",
                  marginBottom: "30px",
                  lineHeight: 1.6,
                }}
              >
                {cert.org}
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
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span style={{ fontSize: "16px", fontWeight: 500 }}>
                  Issued: {cert.year}
                </span>
              </div>

              <button
                onClick={() => setModalOpen(true)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  background: "var(--color-dark)",
                  color: "#fff",
                  padding: "16px 32px",
                  borderRadius: "8px",
                  border: "none",
                  fontWeight: 500,
                  fontSize: "16px",
                  cursor: "pointer",
                  transition: "opacity 0.3s",
                }}
              >
                View Certificate
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
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Modal for viewing the certificate PDF */}
      {mounted &&
        modalOpen &&
        createPortal(
          <div
            className="pdf-modal-overlay"
            onClick={() => setModalOpen(false)}
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
            }}
          >
            <div
              className="pdf-modal-content"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "80%",
                height: "80%",
                background: "#fff",
                position: "relative",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setModalOpen(false)}
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
              <iframe
                src={cert.pdf}
                style={{ width: "100%", height: "100%", border: "none" }}
                title="Certificate PDF"
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
