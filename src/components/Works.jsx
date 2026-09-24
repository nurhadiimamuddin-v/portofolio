"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    num: "01",
    role: "A Digital Platform for News and Public Information",
    name: "Omah Berita",
    desc: "A modern digital news platform for local and national coverage.",
    tech: ["React", "Next JS", "Tailwind CSS"],
    image: "/images/omahberita.png",
    link: "https://omahberita.com/",
    year: "2026",
    category: "News Portal",
  },
  {
    num: "02",
    role: "Identification Environment for Trusted Identity Authentication",
    name: "Identia",
    desc: "A Web-Based Application for Monitoring, Managing, and Controlling Rooms and Occupants with Web-Enabled Access Control.",
    tech: ["PHP", "MySQL", "C++"],
    image: "/images/identia.png",
    link: "#",
    year: "2026",
    category: "Access Control",
  },
  {
    num: "03",
    role: "A Unified System for Content Creation and Management",
    name: "Omah Berita CMS",
    desc: "A comprehensive content management system for digital publishing.",
    tech: ["React", "Next JS", "Node.js"],
    image: "/images/cms.png",
    link: "https://omahberita.com/",
    year: "2026",
    category: "Web Application",
  },
  {
    num: "04",
    role: "Evolving Framework for Integrated Infrastructure Data",
    name: "Efidi",
    desc: "An Application for Data Management and Installation Official Reports of New Customers at PT Telkom Akses Malang Region.",
    tech: ["PHP", "MySQL", "Bootstrap", "Python"],
    image: "/images/efidiii.png",
    link: "https://efidi.montaklo.id/",
    year: "2025",
    category: "Web Application",
  },
  {
    num: "05",
    role: "Managing enterprise network integrity and data streams",
    name: "Montaklo",
    desc: "As the core master portal, Montaklo dynamically integrates various independent data monitoring websites",
    tech: ["React", "Next JS"],
    image: "/images/montakloo.png",
    link: "https://montaklo.id/",
    year: "2025",
    category: "Master Portal",
  },
  {
    num: "06",
    role: "IoT-Based Smart Locker Management and Access Control System",
    name: "i-LockGada",
    desc: "A smart lock system integration for secure room access.",
    tech: ["PHP", "MySQL", "C++", "IoT"],
    image: "/images/i-lockgada.png",
    link: "https://i-lockgada.vercel.app/",
    year: "2024",
    category: "Access Control",
  },
];

export default function Works() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="works-section" id="works">
      <div className="container">
        {/* Section Header */}
        <ScrollReveal>
          <div className="works-header">
            <div className="works-header-left">
              <h2 className="works-title">
                Some of my
                <br />
                <span style={{ backgroundColor: "var(--color-blue)", color: "white", padding: "0 12px" }}>favorite</span> projects.
              </h2>
            </div>
            {/* View All Projects button removed as per user request */}
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="works-grid">
          {projects.map((project, i) => (
            <ScrollReveal key={project.num} delay={i * 0.15}>
              <a
                href={project.link !== "#" ? project.link : undefined}
                target={project.link !== "#" ? "_blank" : undefined}
                rel={project.link !== "#" ? "noopener noreferrer" : undefined}
                className="works-card"
                style={{ 
                  position: 'relative',
                  cursor: project.link === "#" ? "default" : "pointer"
                }}
                onClick={(e) => {
                  if (project.link === "#") e.preventDefault();
                }}
              >
                {/* Card Image Area with CSS Gradient Background */}
                <div className="works-card-image-wrapper">
                  {/* Hover View Button */}
                  <div className="works-card-arrow" style={{
                    backgroundColor: project.link === "#" ? "rgba(69, 92, 233, 0.5)" : undefined,
                  }}>
                    View
                  </div>
                  {/* Project Screenshot */}
                  <div className="works-card-image">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>

                {/* Card Info */}
                <div className="works-card-info" style={{ padding: '0.2em 0.15em 0', fontFamily: 'Inter, sans-serif', color: 'var(--color-dark)' }}>
                  <p className="body-text-m" style={{ margin: '0 0 8px', color: 'rgba(28, 29, 32, 0.8)', fontWeight: 500, fontSize: '14px' }}>
                    {project.name} - {project.year}
                  </p>
                  <h3 className="heading-h4" style={{ margin: 0, letterSpacing: '-0.01em', fontSize: 'clamp(18px, 1vw, 22px)' }}>{project.role}</h3>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
