// src/components/hero/TypewriterTitle.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const titles = [
  "Full Stack Developer",
  "Backend Engineer",
  "Cybersecurity Analyst",
];

export default function TypewriterTitle() {
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let currentIndex = 0;
      let currentText = "";
      let isDeleting = false;
      let timeoutId: ReturnType<typeof setTimeout>;

      const tick = () => {
        const fullTitle = titles[currentIndex];

        if (isDeleting) {
          // Remove last character
          currentText = fullTitle.substring(0, currentText.length - 1);
        } else {
          // Add next character
          currentText = fullTitle.substring(0, currentText.length + 1);
        }

        if (textRef.current) {
          textRef.current.textContent = currentText;
        }

        let delay = isDeleting ? 80 : 150;

        if (!isDeleting && currentText === fullTitle) {
          // Finished typing — pause then start deleting
          delay = 1800;
          isDeleting = true;
        } else if (isDeleting && currentText === "") {
          // Finished deleting — move to next title
          isDeleting = false;
          currentIndex = (currentIndex + 1) % titles.length;
          delay = 400;
        }

        timeoutId = setTimeout(tick, delay);
      };

      tick();

      // Blinking cursor
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });

      return () => clearTimeout(timeoutId);
    });

    return () => ctx.revert();
  }, []);

  return (
    <h2
      className="text-3xl md:text-5xl font-normal text-[#E8E8E8] mb-6 flex items-center gap-1 min-h-10 md:min-h-14"
      style={{ fontFamily: "var(--font-cormorant)" }}
    >
      <span ref={textRef} />
      <span
        ref={cursorRef}
        className="inline-block w-0.5 h-10 bg-[#C9A84C] ml-1 align-middle"
      />
    </h2>
  );
}
