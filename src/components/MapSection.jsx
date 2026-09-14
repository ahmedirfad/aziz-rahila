import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Navigation, Copy, Check } from "lucide-react";
import { weddingConfig } from "../config";
import mapImage from "../assets/8646e85e-3bfb-436f-9fed-7aa9b8cc1896.jpeg";

gsap.registerPlugin(ScrollTrigger);

export function MapSection() {
  const containerRef = useRef(null);
  const mapWrapperRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const anim = gsap.fromTo(
      mapWrapperRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
    };
  }, []);

  const handleCopyAddress = () => {
    const fullAddress = "Grand Auditorium, Hosangadi, Manjeshwar, Kasaragod, Kerala - 671323";
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="map-section" ref={containerRef} className="py-10 px-4 sm:px-6">
      <div
        ref={mapWrapperRef}
        className="relative max-w-lg mx-auto overflow-hidden rounded-3xl border border-[#D3C1AA]/80 shadow-[0_15px_45px_rgba(84,55,31,0.07)] p-6 sm:p-8 bg-[#FAF7F2]"
      >
        {/* Decorative Inner Fillet */}
        <div className="absolute top-2.5 bottom-2.5 left-2.5 right-2.5 border border-dashed border-[#BA9974]/30 rounded-2xl pointer-events-none" />

        <div className="relative z-10 text-center">
          <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#8C6540] font-semibold mb-1">
            Travel &amp; Directions
          </p>
          <h3 className="font-serif text-3xl font-bold text-[#54371F] mb-4">
            Venue Location
          </h3>

          {/* Venue Card Details */}
          <div className="bg-[#F3ECE1]/80 rounded-2xl p-4 mb-5 border border-[#BA9974]/30 text-left">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#54371F] text-[#FAF7F2] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <MapPin size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-serif font-bold text-lg text-[#54371F] leading-tight">
                  {weddingConfig.invitation.venueName}
                </h4>
                <p className="text-xs text-[#6E5647] font-sans mt-0.5 leading-relaxed">
                  Hosangadi, Manjeshwar, Kasaragod District, Kerala - 671323
                </p>
              </div>
            </div>
          </div>

          {/* Map Preview Image */}
          <div
            onClick={() => window.open(weddingConfig.googleMapsLink, "_blank")}
            className="group relative w-full rounded-2xl overflow-hidden border border-[#D3C1AA] bg-[#F3ECE1] cursor-pointer shadow-sm transition-shadow hover:shadow-md"
            title="Click to open venue location in Google Maps"
          >
            <img
              src={mapImage}
              alt="Grand Auditorium Venue Illustration"
              className="w-full h-auto object-cover block transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>

          {/* Action Buttons: Open Maps & Copy Address */}
          <div className="grid grid-cols-2 gap-2 mt-5">
            <a
              href={weddingConfig.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-xl bg-[#54371F] text-[#FAF7F2] font-sans text-xs font-semibold py-3 px-4 transition-all hover:bg-[#382212] shadow-md no-underline active:scale-95"
            >
              <Navigation size={13} />
              Get Directions
            </a>

            <button
              onClick={handleCopyAddress}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-[#F3ECE1] text-[#54371F] font-sans text-xs font-semibold py-3 px-4 transition-all hover:bg-[#E5DACB] border border-[#BA9974]/40 shadow-xs cursor-pointer active:scale-95"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-700" />
                  <span className="text-emerald-800">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MapSection;

