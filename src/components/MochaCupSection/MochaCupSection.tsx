import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MochaCup } from "@/icons/MochaCup";
import {
  DEFAULT_LINE_X1,
  DEFAULT_LINE_X2,
  DEFAULT_TEXT_X,
  DEFAULT_TEXT_Y_OFFSET,
  LABELS,
} from "./labelConfig";
import { cn } from "@/utils/styles/cn";
import "@/styles/mochaCup.css";

gsap.registerPlugin(ScrollTrigger);

const MochaCupSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useLayoutEffect(() => {
    if (!containerRef.current || !svgRef.current) return;

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set("#whipped", { y: -140, opacity: 0 });
      gsap.set("#milk", { y: -80, opacity: 0 });
      gsap.set("#chocolate", { y: 80, opacity: 0 });
      gsap.set("#espresso", { y: 140, opacity: 0 });

      // ClipPath para revelar el contorno progresivamente
      gsap.set("#cup-clip-rect", { attr: { y: 480, height: 0 } });

      // Hide labels and guide lines initially
      gsap.set(".label-line", { opacity: 0 });
      gsap.set(".label-text", { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1800",
          scrub: true,
          pin: true,
          pinSpacing: true,
        },
      });

      // Animation: movement Y + appearance with opacity
      tl.to("#whipped", { y: 0, opacity: 1 })
        .to("#milk", { y: 0, opacity: 1 }, "<")
        .to("#chocolate", { y: 0, opacity: 1 }, "<")
        .to("#espresso", { y: 0, opacity: 1 }, "<")
        .to("#cup-clip-rect", { attr: { y: -200, height: 700 } })
        .to(".label-line", { opacity: 1, duration: 0.5 }, "-=0.3")
        .to(".label-text", { opacity: 1, duration: 0.5 }, "<");
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <div ref={containerRef} className="w-full pt-20">
      <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-accent cursor-default text-center relative">
        ¿Cómo es un mocha perfecto?
      </h2>
      <div
        className={cn(
          "w-full",
          isMobile ? "max-w-[360px]" : "max-w-[480px] mx-auto",
        )}
      >
        <svg
          ref={svgRef}
          className="mocha-cup-svg"
          viewBox="0 -175 550 700"
          preserveAspectRatio="xMidYMid meet"
        >
          <MochaCup />

          <g id="labels">
            {LABELS.map((label, index) => {
              const lineX1 = label.lineX1 ?? DEFAULT_LINE_X1;
              const lineX2 = DEFAULT_LINE_X2;
              const textX = DEFAULT_TEXT_X;
              const textY =
                label.y + (label.textYOffset ?? DEFAULT_TEXT_Y_OFFSET);

              const words = label.text.split(" ");
              const isMultiLine = words.length > 1;

              return (
                <g key={index}>
                  <line
                    className="label-line"
                    x1={lineX1}
                    y1={label.y}
                    x2={lineX2}
                    y2={label.y}
                  />
                  <text className="label-text" x={textX} y={textY}>
                    {isMultiLine && isMobile
                      ? words.map((word, i) => (
                          <tspan key={i} x={textX} dy={i === 0 ? 0 : "1.2em"}>
                            {word}
                          </tspan>
                        ))
                      : label.text}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
};

export { MochaCupSection };
