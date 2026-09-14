import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useScratchCard } from "../hooks/useScratchCard";
import { weddingConfig } from "../config";

gsap.registerPlugin(ScrollTrigger);

export function ScratchCard({ isNested = false }) {
  const sectionRef = useRef(null);
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
    brushSize: isNested ? 15 : 22,
    revealThreshold: 55,
    onRevealComplete: handleRevealComplete
  });

  useEffect(() => {
    if (isNested) return;

    const anim = gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
    };
  }, [isNested]);

  const triggerFlowerBurst = () => {
    const container = particleContainerRef.current;
    if (!container) return;

    const colors = ["#D1B46A", "#B8A369", "#8A6D27", "#F5F0E1", "#FCF9F2"];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.style.position = "absolute";
      particle.style.left = "50%";
      particle.style.top = "50%";
      particle.style.width = `${gsap.utils.random(6, 12)}px`;
      particle.style.height = `${gsap.utils.random(6, 12)}px`;
      particle.style.backgroundColor = gsap.utils.random(colors);
      
      if (Math.random() > 0.5) {
        particle.style.borderRadius = "50% 0 50% 0";
      } else {
        particle.style.borderRadius = "50%";
      }
      
      particle.style.transform = "translate(-50%, -50%)";
      container.appendChild(particle);

      gsap.to(particle, {
        x: gsap.utils.random(-120, 120),
        y: gsap.utils.random(-150, 80),
        rotation: gsap.utils.random(0, 360),
        scale: gsap.utils.random(0.3, 1.2),
        opacity: 0,
        duration: gsap.utils.random(1.0, 1.8),
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

  const cardContent = (
    <div
      ref={cardRef}
      className={`relative w-full border border-gold-500/50 rounded-2xl bg-gold-100 shadow-xl overflow-hidden flex flex-col justify-center items-center ${
        isNested ? "min-h-[135px] max-w-[240px] mx-auto" : "min-h-[260px]"
      }`}
    >
      <div className="absolute top-1.5 left-1.5 right-1.5 bottom-1.5 border border-dashed border-gold-500/40 rounded-xl pointer-events-none" />

      {/* Hidden Content */}
      <div className={`w-full text-center flex flex-col items-center z-10 ${isNested ? "py-3 px-2" : "py-8 px-6"}`}>
        <p className="font-sans text-[8px] sm:text-[11px] uppercase tracking-widest text-gold-600 mb-0.5">
          And Celebration Of
        </p>
        <h2 className={`font-serif text-gold-700 font-medium mb-1 ${isNested ? "text-sm" : "text-3xl"}`}>
          The Reception
        </h2>

        <div className={`flex flex-col items-start mx-auto text-left ${isNested ? "gap-2 max-w-[210px]" : "gap-2.5 max-w-[240px]"}`}>
          <div className="flex gap-2 items-center">
            <Calendar size={isNested ? 11 : 13} className="text-gold-700 shrink-0" />
            <p className={`${isNested ? "text-[10px]" : "text-xs"} text-[#3A3626] font-semibold`}>
              {weddingConfig.receptionDateFormatted}
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <Clock size={isNested ? 11 : 14} className="text-gold-700 shrink-0" />
            <p className={`${isNested ? "text-[10px]" : "text-xs"} text-[#3A3626]`}>
              {weddingConfig.receptionTimeFormatted}
            </p>
          </div>

          <div className="flex gap-2 items-start">
            <MapPin size={isNested ? 11 : 14} className="text-gold-700 mt-0.5 shrink-0" />
            <div>
              <p className={`${isNested ? "text-[10px]" : "text-xs"} text-[#3A3626] font-semibold leading-tight`}>
                {weddingConfig.receptionVenue}
              </p>
              <p className={`${isNested ? "text-[9px]" : "text-[11px]"} text-[#666150] mt-0.5 leading-tight`}>
                {weddingConfig.receptionAddress}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Canvas Overlay */}
      {!isFullyRevealed && (
        <canvas
          ref={canvasRef}
          {...handlers}
          onMouseDown={handleStartInteraction}
          onTouchStart={handleStartInteraction}
          className="absolute inset-0 w-full h-full rounded-2xl cursor-crosshair touch-none z-20"
        />
      )}

      {/* Scratch Prompt */}
      {!hasStartedScratching && !isFullyRevealed && (
        <div className="absolute z-30 pointer-events-none flex flex-col items-center gap-1">
          <p className="text-gold-700 font-sans text-xs tracking-widest uppercase bg-gold-100 px-3.5 py-1.5 rounded-full border border-gold-500 shadow-md animate-pulse">
            Scratch to Reveal
          </p>
        </div>
      )}

      {/* Celebration burst container */}
      <div ref={particleContainerRef} className="absolute inset-0 w-full h-full pointer-events-none z-40" />
    </div>
  );

  if (isNested) {
    return <div className="w-full mt-6">{cardContent}</div>;
  }

  return (
    <section ref={sectionRef} className="py-12 px-6">
      {cardContent}
    </section>
  );
}

export default ScratchCard;
