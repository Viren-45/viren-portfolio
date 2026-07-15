// src/components/skills/Certifications.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ExternalLink, Star, Calendar } from "lucide-react";

const certificates = [
  {
    id: 1,
    name: "CompTIA Security+",
    issuer: "CompTIA",
    date: "October 2024",
    image: "/images/certificates/comptia-security-plus.png",
    verifyUrl:
      "https://www.credly.com/badges/b7de1f29-a6da-46f5-8ee4-0afe39292239/public_url",
    color: "#ef4444",
    bgColor: "rgba(239,68,68,0.08)",
    borderColor: "rgba(239,68,68,0.25)",
  },
  {
    id: 2,
    name: "Google Cybersecurity Certificate",
    issuer: "Coursera",
    date: "October 2024",
    image: "/images/certificates/google-cybersecurity.png",
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/professional-cert/KVT65XSTELZ3?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=pdf_header_button&utm_product=prof",
    color: "#60a5fa",
    bgColor: "rgba(96,165,250,0.08)",
    borderColor: "rgba(96,165,250,0.25)",
  },
  {
    id: 3,
    name: "CompTIA CySA+",
    issuer: "CompTIA",
    date: "October 2025",
    image: "/images/certificates/comptia-cysa-plus.png",
    verifyUrl:
      "https://www.credly.com/earner/earned/badge/bd90e900-b943-4673-a378-fd365675b1b6",
    color: "#f97316",
    bgColor: "rgba(249,115,22,0.08)",
    borderColor: "rgba(249,115,22,0.25)",
  },
  {
    id: 4,
    name: "Frontend Engineering Intern",
    issuer: "8 Time Coding",
    date: "January 2024",
    image: "/images/certificates/frontend-intern.png",
    verifyUrl:
      "https://drive.google.com/file/d/1ed7cnavD4N_5Hiq5iIyEoWwPPDbB--5K/view?usp=sharing",
    color: "#C9A84C",
    bgColor: "rgba(201,168,76,0.08)",
    borderColor: "rgba(201,168,76,0.25)",
  },
  {
    id: 5,
    name: "Google Linux & SQL",
    issuer: "Coursera",
    date: "August 2024",
    image: "/images/certificates/google-linux-sql.png",
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/verify/DSLAMGXMSKKA",
    color: "#4ade80",
    bgColor: "rgba(74,222,128,0.08)",
    borderColor: "rgba(74,222,128,0.25)",
  },
];

export default function Certifications() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isPaused, setIsPaused] = useState(false);

  const maxIndex = certificates.length - 1;

  const nextSlide = useCallback(
    () => setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1)),
    [maxIndex],
  );

  const prevSlide = useCallback(
    () => setActiveIndex((prev) => (prev <= 0 ? maxIndex : prev - 1)),
    [maxIndex],
  );

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const getCardStyle = (index: number) => {
    const items = certificates.length;
    let rel = index - activeIndex;
    if (rel < -2) rel += items;
    else if (rel > 2) rel -= items;

    const zIndex = 20 - Math.abs(rel) * 5;

    if (rel === 0) {
      return {
        transform: "translateX(0%) scale(1)",
        opacity: 1,
        zIndex,
      };
    } else if (rel === 1) {
      return {
        transform: "translateX(80%) scale(0.85)",
        opacity: 0.85,
        zIndex,
      };
    } else if (rel === -1) {
      return {
        transform: "translateX(-80%) scale(0.85)",
        opacity: 0.85,
        zIndex,
      };
    } else if (rel === 2) {
      return {
        transform: "translateX(150%) scale(0.7)",
        opacity: 0.5,
        zIndex,
      };
    } else if (rel === -2) {
      return {
        transform: "translateX(-150%) scale(0.7)",
        opacity: 0.5,
        zIndex,
      };
    }
    return { transform: "translateX(0) scale(0.5)", opacity: 0, zIndex: 0 };
  };

  return (
    <section className="w-full py-16">
      <div className="max-w-6xl mx-auto px-8 md:px-20 flex flex-col gap-10">
        {/* Section header */}
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
          <span
            className="text-xs tracking-[0.3em] text-[#E8E8E8]/50 uppercase"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Certifications
          </span>
          <div
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(to right, rgba(201,168,76,0.15), rgba(201,168,76,0.4), rgba(201,168,76,0.15))",
              boxShadow: "0 0 8px rgba(201,168,76,0.3)",
            }}
          />
          <div className="relative shrink-0">
            <div
              className="absolute inset-0 rounded-full animate-ping"
              style={{
                backgroundColor: "rgba(201,168,76,0.3)",
                animationDuration: "2s",
              }}
            />
            <Star
              size={12}
              className="relative text-[#C9A84C]"
              fill="#C9A84C"
              style={{ filter: "drop-shadow(0 0 4px #C9A84C)" }}
            />
          </div>
        </div>

        {/* 3D Carousel */}
        <div
          className="relative h-105 flex items-center justify-center overflow-hidden"
          style={{ perspective: "1200px" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {certificates.map((cert, index) => {
            const style = getCardStyle(index);
            return (
              <div
                key={cert.id}
                className="absolute w-75 transition-all duration-700 cursor-pointer"
                style={{
                  transform: style.transform,
                  opacity: style.opacity,
                  zIndex: style.zIndex,
                }}
                onClick={() => setActiveIndex(index)}
              >
                {/* Card */}
                <div
                  className="relative flex flex-col items-center gap-5 p-6 rounded-2xl overflow-hidden"
                  style={{
                    backgroundColor: "rgba(13,17,23,0.95)",
                    border: `1px solid ${cert.borderColor}`,
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    boxShadow: `0 0 40px ${cert.color}20`,
                  }}
                >
                  {/* Corner accents */}
                  {[
                    "top-0 left-0 border-t border-l",
                    "top-0 right-0 border-t border-r",
                    "bottom-0 left-0 border-b border-l",
                    "bottom-0 right-0 border-b border-r",
                  ].map((pos, i) => (
                    <div
                      key={i}
                      className={`absolute w-5 h-5 pointer-events-none ${pos}`}
                      style={{ borderColor: cert.color, opacity: 0.6 }}
                    />
                  ))}

                  {/* Badge — larger, no fallback initial */}
                  <div
                    className="relative w-70 h-45 rounded-xl overflow-hidden"
                    style={{
                      backgroundColor: cert.bgColor,
                      border: `1px solid ${cert.borderColor}`,
                    }}
                  >
                    <Image
                      src={cert.image}
                      alt={cert.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col items-center gap-1.5 text-center">
                    <h3
                      className="text-lg font-light text-[#E8E8E8] leading-tight"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {cert.name}
                    </h3>
                    <p
                      className="text-xs text-[#E8E8E8]/40"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {cert.issuer}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Calendar size={11} style={{ color: cert.color }} />
                      <span
                        className="text-xs"
                        style={{
                          fontFamily: "var(--font-inter)",
                          color: cert.color,
                        }}
                      >
                        {cert.date}
                      </span>
                    </div>
                  </div>

                  {/* Verify button */}
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 px-5 py-2 rounded-full text-xs transition-all duration-200 hover:opacity-80"
                    style={{
                      fontFamily: "var(--font-inter)",
                      backgroundColor: cert.bgColor,
                      border: `1px solid ${cert.borderColor}`,
                      color: cert.color,
                    }}
                  >
                    Verify
                    <ExternalLink size={11} />
                  </a>

                  {/* Bottom glow */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{
                      background: `linear-gradient(to right, transparent, ${cert.color}, transparent)`,
                      boxShadow: `0 0 12px ${cert.color}`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2">
          {certificates.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: activeIndex === index ? "24px" : "8px",
                height: "8px",
                backgroundColor:
                  activeIndex === index ? "#C9A84C" : "rgba(232,232,232,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
