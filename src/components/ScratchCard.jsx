import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { Calendar, Clock, MapPin, Sparkles } from "lucide-react";
import { useScratchCard } from "../hooks/useScratchCard";
import { weddingConfig } from "../config";

export function ScratchCard({ isHero = true }) {
  const cardRef = useRef(null);
  const canvasRef = useRef(null);
  const particleContainerRef = useRef(null);
  const [hasStartedScratching, setHasStartedScratching] = useState(false);
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);

  const handleRevealComplete = () => {
    if (canvasRef.current) {
      gsap.to(canvasRef.current, {
        opacity: 0,
        duration: 0.6,
        onComplete: () => {
          setIsFullyRevealed(true);
          triggerFlowerBurst();
        }
      });
    }
  };

  const { isScratched, scratchPercent, handlers } = useScratchCard(canvasRef, {
    brushSize: 22,
    revealThreshold: 40,
    theme: "dark",
    onRevealComplete: handleRevealComplete
  });

  const triggerFlowerBurst = () => {
    const container = particleContainerRef.current;
    if (!container) return;

    const colors = ["#FAF7F2", "#E8D7B8", "#D3C1AA", "#BA9974", "#8C6540", "#FFE4C4"];
    const particleCount = 35;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.style.position = "absolute";
      particle.style.left = "50%";
      particle.style.top = "50%";
      particle.style.width = `${gsap.utils.random(5, 11)}px`;
      particle.style.height = `${gsap.utils.random(5, 11)}px`;
      particle.style.backgroundColor = gsap.utils.random(colors);

      if (Math.random() > 0.5) {
        particle.style.borderRadius = "50% 0 50% 0";
      } else {
        particle.style.borderRadius = "50%";
      }

      particle.style.transform = "translate(-50%, -50%)";
      container.appendChild(particle);

      gsap.to(particle, {
        x: gsap.utils.random(-130, 130),
        y: gsap.utils.random(-140, 90),
        rotation: gsap.utils.random(0, 360),
        scale: gsap.utils.random(0.4, 1.3),
        opacity: 0,
        duration: gsap.utils.random(1.1, 1.9),
        ease: "power2.out",
        onComplete: () => {
          particle.remove();
        }
      });
    }
  };

  const handleStartInteraction = (e) => {
    setHasStartedScratching(true);
    if (handlers.onMouseDown && e.type === "mousedown") {
      handlers.onMouseDown(e);
    } else if (handlers.onTouchStart && e.type === "touchstart") {
      handlers.onTouchStart(e);
    }
  };

  const invite = weddingConfig.invitation;

  return (
    <div
      ref={cardRef}
      className="relative w-full max-w-[340px] mx-auto min-h-[145px] rounded-2xl bg-black/40 backdrop-blur-md border border-[#D3C1AA]/45 shadow-[0_10px_30px_rgba(0,0,0,0.55)] overflow-hidden flex flex-col justify-center items-center my-2 select-none"
    >
      {/* Inner Decorative Dashed Border */}
      <div className="absolute top-1.5 left-1.5 right-1.5 bottom-1.5 border border-dashed border-[#D3C1AA]/25 rounded-xl pointer-events-none" />

      {/* Gold Corner L-Accents */}
      <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#D3C1AA]/70 pointer-events-none" />
      <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#D3C1AA]/70 pointer-events-none" />
      <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#D3C1AA]/70 pointer-events-none" />
      <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#D3C1AA]/70 pointer-events-none" />

      {/* Revealed Hidden Event Content */}
      <div className="w-full text-center flex flex-col items-center z-10 py-3.5 px-4">
        {/* Subtle Badge */}
        <div className="flex items-center justify-center gap-1 text-[9px] uppercase tracking-[0.25em] text-[#E8D7B8] font-bold mb-1 drop-shadow-sm">
          <Sparkles size={11} className="text-[#E8D7B8]" />
          <span>Save The Date &amp; Venue</span>
          <Sparkles size={11} className="text-[#E8D7B8]" />
        </div>

        {/* Date in Bold Serif Gold/Cream */}
        <div className="flex items-center justify-center gap-1.5 text-[#FAF7F2] text-sm sm:text-base font-serif font-bold drop-shadow-md">
          <Calendar size={14} className="text-[#E8D7B8] shrink-0" />
          <span>{invite.dateFormatted || "Monday, 12th October 2026"}</span>
        </div>

        {/* Islamic Date & Nikah Timing */}
        <div className="text-[11px] text-[#E8D7B8] font-sans drop-shadow-sm mt-0.5">
          {invite.dateHijri} • Nikah at {invite.nikahTime}
        </div>

        {/* Reception & Venue */}
        <div className="w-full max-w-[280px] flex items-center justify-center gap-1.5 text-[11px] text-[#FAF7F2]/95 font-medium pt-1.5 mt-1.5 border-t border-[#D3C1AA]/25 drop-shadow-sm">
          <MapPin size={12} className="text-[#E8D7B8] shrink-0" />
          <span className="truncate">{invite.venueFull || "Grand Auditorium Hosangadi"}</span>
        </div>
      </div>

      {/* Canvas Overlay for Scratch Interaction */}
      {!isFullyRevealed && (
        <canvas
          ref={canvasRef}
          {...handlers}
          onMouseDown={handleStartInteraction}
          onTouchStart={handleStartInteraction}
          className="absolute inset-0 w-full h-full rounded-2xl cursor-crosshair touch-none z-20"
        />
      )}

      {/* Floating Call-to-Action Badge */}
      {!hasStartedScratching && !isFullyRevealed && (
        <div className="absolute z-30 pointer-events-none flex flex-col items-center gap-1 px-2">
          <div className="flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D3C1AA]/70 shadow-[0_4px_15px_rgba(0,0,0,0.7)] animate-pulse">
            <Sparkles size={12} className="text-[#E8D7B8]" />
            <span className="text-[#FAF7F2] font-sans text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-bold">
              Scratch to Reveal Date
            </span>
          </div>
        </div>
      )}

      {/* Celebration burst container */}
      <div ref={particleContainerRef} className="absolute inset-0 w-full h-full pointer-events-none z-40" />
    </div>
  );
}

export default ScratchCard;
