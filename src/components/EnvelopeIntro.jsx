import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { Mail } from "lucide-react";
import couplePhoto from "../assets/WhatsApp Image 2026-09-06 at 21.17.05.jpeg";

export function EnvelopeIntro({ onOpen, onComplete, audioRef }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const sealRef = useRef(null);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenInvite = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Play background music
    if (audioRef && audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.log("Audio autoplay loop blocked on transition:", err);
      });
    }

    // Sound effect if available
    try {
      const rustle = new Audio("/paper-rustle.mp3");
      rustle.volume = 0.5;
      rustle.play().catch((err) => console.log("Sound play prevented:", err));
    } catch (e) { }

    // Animate opening transition
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        if (onOpen) onOpen();
        if (onComplete) onComplete();
      }
    });

    tl.to(sealRef.current, {
      scale: 1.4,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    });

    tl.to(contentRef.current, {
      scale: 1.05,
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut"
    }, "-=0.2");

    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut"
    }, "-=0.4");
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 w-full h-dvh overflow-hidden select-none bg-[#1A110C] flex items-center justify-center cursor-pointer"
      style={{ WebkitTapHighlightColor: "transparent" }}
      onClick={handleOpenInvite}
    >
      {/* Couple Fullscreen Background Photo */}
      <img
        src={couplePhoto}
        alt="Aziz & Raahila"
        className="absolute inset-0 w-full h-full object-cover object-[center_15%] z-0"
      />

      {/* Warm Cinematic Sepia / Dark Overlay for Luxury Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-[#2C1910]/55 to-black/65 z-[1] pointer-events-none" />

      {/* Gold Corner L-Brackets */}
      <div className="absolute top-5 left-5 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-l-2 border-[#D3C1AA]/80 pointer-events-none z-10" />
      <div className="absolute top-5 right-5 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-r-2 border-[#D3C1AA]/80 pointer-events-none z-10" />
      <div className="absolute bottom-5 left-5 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-l-2 border-[#D3C1AA]/80 pointer-events-none z-10" />
      <div className="absolute bottom-5 right-5 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-r-2 border-[#D3C1AA]/80 pointer-events-none z-10" />

      {/* Center Opening Typography & Seal */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-[360px] mx-auto px-6 py-10 flex flex-col items-center text-center"
      >
        {/* Bismillah Calligraphy */}
        <p className="font-arabic text-2xl sm:text-3xl text-[#F2E6D0] mb-2 font-bold dir-rtl tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>

        {/* Delicate Diamond Divider */}
        <div className="text-[#D3C1AA] text-xs mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          ◆
        </div>

        {/* Subtitle */}
        <p className="font-sans text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#E8D7B8] font-semibold mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          WEDDING INVITATION
        </p>

        {/* Couple Names in Elegant Calligraphy */}
        <h1 className="font-allura text-4xl sm:text-5xl text-[#FAF7F2] font-normal leading-tight mb-3 drop-shadow-[0_3px_15px_rgba(0,0,0,0.95)]">
          Aziz <span className="font-serif italic text-2xl sm:text-3xl text-[#D3C1AA] mx-1">&amp;</span> Raahila
        </h1>

        {/* Date */}
        <p className="font-sans text-xs sm:text-sm tracking-[0.35em] text-[#E8D7B8] font-medium mb-12 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          12 · 10 · 2026
        </p>

        {/* Circular Wax Seal Envelope Button */}
        <div
          ref={sealRef}
          className="mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-[#E5DACB] via-[#BA9974] to-[#6D4B2D] border-2 border-[#FAF7F2] shadow-[0_10px_30px_rgba(0,0,0,0.7)] flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        >
          <div className="w-13 h-13 rounded-full border border-dashed border-[#FAF7F2]/80 flex items-center justify-center bg-[#35251B]/30">
            <Mail size={22} className="text-[#FAF7F2] drop-shadow-sm" />
          </div>
        </div>

        {/* Tap to Open CTA */}
        <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-[#F2E6D0] font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] animate-pulse mt-2">
          TAP TO OPEN INVITATION
        </p>
      </div>
    </div>
  );
}

export default EnvelopeIntro;