import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart } from "lucide-react";
import { weddingConfig } from "../config";
import footerBg from "../assets/download (10).jpeg";

gsap.registerPlugin(ScrollTrigger);

export function ClosingScreen() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Refresh ScrollTrigger when ClosingScreen mounts
    ScrollTrigger.refresh();
  }, []);

  return (
    <footer
      ref={containerRef}
      style={{
        backgroundImage: `url("${footerBg}")`,
        backgroundColor: "#EBD8C1"
      }}
      className="relative flex flex-col items-center justify-start min-h-[560px] pt-12 pb-24 px-6 overflow-hidden bg-cover bg-bottom bg-no-repeat select-none"
    >
      <div ref={contentRef} className="relative z-10 text-center max-w-md mx-auto w-full">
        {/* Heart Icon */}
        <div className="flex justify-center text-[#8C6540] mb-2">
          <Heart size={24} fill="currentColor" />
        </div>

        {/* Subtitle */}
        <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8C6540] mb-1.5 font-bold">
          With Love &amp; Gratitude
        </p>

        {/* Script Names */}
        <h2 className="font-allura text-5xl sm:text-6xl text-[#54371F] font-normal mb-3 drop-shadow-xs">
          {weddingConfig.coupleShortName || "Aziz & Raahila"}
        </h2>

        {/* Warm Thank You Note */}
        <p className="font-serif text-sm text-[#54371F]/90 max-w-[300px] mx-auto mb-4 leading-relaxed">
          We are truly grateful for your presence, prayers, and blessings as we begin this blessed journey together.
        </p>

        {/* WedStory button & credits */}
        <div className="flex flex-col items-center gap-2 mt-4">
          <div className="flex items-center gap-2.5">
            <a
              href="https://wedstory.live"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#FAF7F2]/80 hover:bg-[#FAF7F2] backdrop-blur-xs border border-[#54371F]/20 text-[11px] text-[#54371F] font-sans font-semibold tracking-wider no-underline transition-all shadow-xs"
            >
              wedstory.live
            </a>

            <a
              href="https://instagram.com/wedstory.live"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="flex items-center justify-center p-1 rounded-full bg-[#FAF7F2]/80 hover:bg-[#FAF7F2] border border-[#54371F]/20 text-[#54371F] transition-transform hover:scale-110 shadow-xs"
            >
              <svg
                viewBox="0 0 24 24"
                width="17"
                height="17"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="block"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>

          <p className="text-[10px] text-[#54371F]/60 tracking-wider font-sans">
            © 2026. Made with love.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default ClosingScreen;