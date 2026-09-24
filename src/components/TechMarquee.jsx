"use client";

import { useRef } from "react";

const row1 = [
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  {
    name: "PHP",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  },
  {
    name: "C++",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  },
  {
    name: "Golang",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
  },
  {
    name: "Laravel",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Word",
    icon: "https://img.icons8.com/color/96/microsoft-word-2019.png",
  },
  {
    name: "Excel",
    icon: "https://img.icons8.com/color/96/microsoft-excel-2019.png",
  },
];

const row2 = [
  {
    name: "CodeIgniter",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/codeigniter/codeigniter-plain.svg",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  },
  {
    name: "Svelte",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg",
  },
  {
    name: "MySQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  },
  {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  },
  {
    name: "Vercel",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
  },
  {
    name: "PowerPoint",
    icon: "https://img.icons8.com/color/96/microsoft-powerpoint-2019.png",
  },
  { name: "PDF", icon: "https://img.icons8.com/color/96/pdf-2.png" },
];

const MarqueeRow = ({ items, reverse = false }) => {
  const trackRef = useRef(null);

  const handleMouseEnter = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
  };
  const handleMouseLeave = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running";
  };

  return (
    <div
      className="marquee-tech-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={trackRef}
        className={`marquee-tech-track ${reverse ? "marquee-reverse" : "marquee-forward"}`}
      >
        {[...items, ...items, ...items].map((tech, i) => (
          <div key={`${tech.name}-${i}`} className="tech-item">
            <div className="tech-icon-wrap">
              <img src={tech.icon} alt={tech.name} className="tech-icon" />
            </div>
            <span className="tech-name">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function TechMarquee() {
  return (
    <section
      className="section"
      style={{
        padding: "1.5em 0 0em 0",
        backgroundColor: "#fff",
        color: "#232323",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes scrollTech {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }

        .marquee-tech-wrapper {
          overflow: hidden;
          display: flex;
          width: 100%;
          padding: 12px 0;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }

        .marquee-tech-track {
          display: flex;
          gap: 50px;
          padding-right: 50px;
          will-change: transform;
        }

        .marquee-forward {
          animation: scrollTech 50s linear infinite normal;
        }

        .marquee-reverse {
          animation: scrollTech 50s linear infinite reverse;
        }

        .tech-item {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .tech-item:hover {
          transform: scale(1.1);
        }

        .tech-icon-wrap {
          width: 30px;
          height: 30px;
          position: relative;
          flex-shrink: 0;
        }

        .tech-icon {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: grayscale(100%) opacity(0.5);
          transition: filter 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .tech-item:hover .tech-icon {
          filter: grayscale(0%) opacity(1);
        }

        .tech-name {
          font-size: 18px;
          font-weight: 500;
          color: #666;
          white-space: nowrap;
          transition: color 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .tech-item:hover .tech-name {
          color: #232323;
        }
      `,
        }}
      />
      <div className="container">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse={true} />

        {/* Two Col Cards */}
        <div
          className="edu-grid-responsive"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "24px",
            marginTop: "140px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              border: "1px solid #eaeaea",
              borderRadius: "16px",
              padding: "32px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "24px",
              boxShadow: "none",
              backgroundColor: "transparent",
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: "80px",
                height: "80px",
                position: "relative",
              }}
            >
              <img
                src="/images/polije.png"
                alt="Polije"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: 600,
                  marginBottom: "0px",
                  color: "var(--color-dark)",
                  fontFamily: '"Inter", "Neue Montreal", sans-serif',
                }}
              >
                Computer Engineering
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  color: "rgba(28, 29, 32, 0.7)",
                  lineHeight: 1.3,
                  fontFamily: '"Inter", "Neue Montreal", sans-serif',
                  margin: 0,
                }}
              >
                State Polytechnic of Jember
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(28, 29, 32, 0.5)",
                  lineHeight: 1.8,
                  fontFamily: '"Inter", "Neue Montreal", sans-serif',
                  margin: "0",
                }}
              >
                2023 - 2026
              </p>
            </div>
          </div>
          <div
            style={{
              border: "1px solid #eaeaea",
              borderRadius: "16px",
              padding: "32px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "24px",
              boxShadow: "none",
              backgroundColor: "transparent",
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: "80px",
                height: "80px",
                position: "relative",
              }}
            >
              <img
                src="/images/smk.webp"
                alt="SMK"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: 600,
                  marginBottom: "0px",
                  color: "var(--color-dark)",
                  fontFamily: '"Inter", "Neue Montreal", sans-serif',
                }}
              >
                Software Engineering
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  color: "rgba(28, 29, 32, 0.7)",
                  lineHeight: 1.3,
                  fontFamily: '"Inter", "Neue Montreal", sans-serif',
                  margin: 0,
                }}
              >
                Vocational High School of Darul Lughah Wal Karomah
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(28, 29, 32, 0.5)",
                  lineHeight: 1.8,
                  fontFamily: '"Inter", "Neue Montreal", sans-serif',
                  margin: "0",
                }}
              >
                2020 - 2023
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
