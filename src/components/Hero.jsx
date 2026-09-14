import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Calendar, MapPin, Send } from "lucide-react";
import { weddingConfig } from "../config";
import heroBannerImg from "../assets/download (9).jpeg";

export function Hero({ isCurtainOpened }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const borderRef = useRef(null);

  useEffect(() => {
    if (!isCurtainOpened) return;

    const tl = gsap.timeline({ delay: 0.1 });

    tl.fromTo(
      borderRef.current,
      { opacity: 0, scale: 0.97 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
    );

    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
      "-=0.8"
    );

    return () => {
      tl.kill();
    };
  }, [isCurtainOpened]);

  const { groom, bride } = weddingConfig.invitation;

  // Generate Google Calendar Link
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "Wedding: Abdul Aziz KM & Mariyamath Raahila"
  )}&dates=20261012T053000Z/20261012T093000Z&details=${encodeURIComponent(
    "Nikah at 11:00 AM, Reception after Nikah at Grand Auditorium Hosangadi."
  )}&location=${encodeURIComponent(
    "Grand Auditorium, Hosangadi, Manjeshwar, Kasaragod, Kerala"
  )}`;

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-svh flex flex-col items-center justify-center p-4 sm:p-6 text-center bg-[#1F130E] overflow-hidden select-none"
    >
      {/* Full Background Floral Photo */}
      <img
        src={heroBannerImg}
        alt="Wedding Floral Background"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />

      {/* Subtle Vignette to accentuate center typography while keeping flowers clear */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/45 z-0 pointer-events-none" />

      {/* Luxury Gold Double Border Frame */}
      <div
        ref={borderRef}
        className="absolute top-3.5 bottom-3.5 left-3.5 right-3.5 sm:top-5 sm:bottom-5 sm:left-5 sm:right-5 border border-[#D3C1AA]/45 rounded-3xl pointer-events-none opacity-0 box-border z-[1]"
      >
        <div className="absolute top-2 bottom-2 left-2 right-2 border border-dashed border-[#D3C1AA]/25 rounded-2xl" />
        <div className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-[#D3C1AA]" />
        <div className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-[#D3C1AA]" />
        <div className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-[#D3C1AA]" />
        <div className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-[#D3C1AA]" />
      </div>

      {/* Floating Center Content — No Opaque Card Overriding Background */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-[360px] mx-auto py-6 px-4 flex flex-col items-center opacity-0"
      >
        {/* Monogram Crest */}
        <div className="w-18 h-18 rounded-full border border-[#D3C1AA]/70 bg-black/20 backdrop-blur-xs flex items-center justify-center mb-3 shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
          <div className="w-15 h-15 rounded-full border border-dashed border-[#D3C1AA]/40 flex items-center justify-center">
            <span className="font-serif font-bold text-2xl text-[#FAF7F2] tracking-widest drop-shadow-md">
              AR
            </span>
          </div>
        </div>

        {/* Subtitle */}
        <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-[#E8D7B8] font-semibold mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          The Wedding Celebration Of
        </p>

        {/* Couple Names */}
        <h1 className="font-allura text-4xl sm:text-5xl font-normal leading-tight text-[#FAF7F2] my-1 drop-shadow-[0_3px_16px_rgba(0,0,0,0.95)]">
          <span className="block">{groom}</span>
          <span className="block font-serif italic text-2xl text-[#D3C1AA] my-0.5">&amp;</span>
          <span className="block">{bride}</span>
        </h1>

        <div className="w-16 h-px bg-[#D3C1AA]/50 my-3 shadow-sm" />

        {/* Translucent Frosted Glass Event Capsule */}
        <div className="w-full bg-black/35 backdrop-blur-md rounded-2xl p-3.5 my-2 border border-[#D3C1AA]/35 shadow-[0_8px_25px_rgba(0,0,0,0.5)] flex flex-col gap-1.5 text-center">
          <div className="flex items-center justify-center gap-1.5 text-[#FAF7F2] text-xs font-semibold drop-shadow-sm">
            <Calendar size={13} className="text-[#E8D7B8]" />
            <span>Monday, 12th October 2026</span>
          </div>
          <div className="text-[11px] text-[#E8D7B8] font-sans drop-shadow-sm">
            Chand 1 Jumada al avval 1448 • Nikah at 11:00 AM
          </div>
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#FAF7F2]/90 font-medium pt-1 border-t border-[#D3C1AA]/20">
            <MapPin size={12} className="text-[#E8D7B8]" />
            <span>Grand Auditorium, Hosangadi</span>
          </div>
        </div>

        {/* Translucent Action Buttons */}
        <div className="w-full grid grid-cols-2 gap-2.5 mt-3">
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#FAF7F2]/90 text-[#35251B] text-xs font-sans font-bold tracking-wide shadow-md transition-all hover:bg-white active:scale-95 no-underline"
          >
            <Calendar size={13} />
            <span>Save Date</span>
          </a>

          <button
            onClick={() => scrollToSection("rsvp-section")}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-black/40 backdrop-blur-md text-[#FAF7F2] text-xs font-sans font-semibold tracking-wide border border-[#D3C1AA]/60 shadow-md transition-all hover:bg-black/60 active:scale-95 cursor-pointer"
          >
            <Send size={13} />
            <span>RSVP Now</span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => scrollToSection("verse-section")}
          className="mt-6 flex flex-col items-center gap-0.5 text-[#E8D7B8] text-[10px] font-sans uppercase tracking-[0.25em] font-semibold transition-colors hover:text-white cursor-pointer drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
        >
          <span>Scroll Down</span>
          <span className="animate-bounce text-xs mt-0.5">↓</span>
        </button>
      </div>
    </section>
  );
}

export default Hero;



