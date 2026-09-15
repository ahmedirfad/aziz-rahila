import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Clock, MapPin, Utensils } from "lucide-react";
import { weddingConfig } from "../config";

gsap.registerPlugin(ScrollTrigger);

export function DetailsCard() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const anim = gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
    };
  }, []);

  const invite = weddingConfig.invitation;

  return (
    <section id="details-section" ref={containerRef} className="py-12 px-4 sm:px-6 relative text-center">
      <div
        ref={cardRef}
        className="relative max-w-lg mx-auto bg-[#FAF7F2] border border-[#D3C1AA]/80 rounded-3xl p-6 sm:p-8 shadow-[0_15px_45px_rgba(84,55,31,0.07)] text-[#35251B]"
      >
        {/* Decorative Corner Fillet */}
        <div className="absolute top-2.5 bottom-2.5 left-2.5 right-2.5 border border-dashed border-[#BA9974]/30 rounded-2xl pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 mb-6">
          <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#8C6540] font-semibold">
            Wedding Itinerary &amp; Details
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl mt-1 text-[#54371F] font-bold">
            The Celebration
          </h2>
          <div className="w-12 h-px bg-[#BA9974]/40 mx-auto mt-2" />
        </div>

        {/* Host & Inviter Card */}
        <div className="relative z-10 bg-[#F3ECE1]/80 rounded-2xl p-4 mb-6 border border-[#BA9974]/30 text-center">
          <p className="font-serif italic text-xs text-[#8C6540] mb-1">
            Cordially Invited By
          </p>
          <h3 className="text-base font-sans font-bold uppercase tracking-wider text-[#54371F]">
            {invite.hosts}
          </h3>
          <p className="text-xs text-[#6E5647] font-sans mt-0.5 leading-relaxed">
            Kundapu house, P.O. Pavoor, Manjeshwar - 671 323
          </p>

          <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-[#BA9974]/20 text-xs font-sans font-medium text-[#54371F]">
            <span className="flex items-center gap-1 font-bold text-[#8C6540]">
              <Phone size={12} /> Contact:
            </span>
            <a
              href="tel:9037301433"
              className="py-1 px-2.5 rounded-lg bg-[#FAF7F2] border border-[#D3C1AA] shadow-xs hover:bg-[#E5DACB] transition-colors"
            >
              90373 01433
            </a>
            <a
              href="tel:9846916224"
              className="py-1 px-2.5 rounded-lg bg-[#FAF7F2] border border-[#D3C1AA] shadow-xs hover:bg-[#E5DACB] transition-colors"
            >
              98469 16224
            </a>
          </div>
        </div>

        {/* Vertical Timeline Journey */}
        <div className="relative z-10 flex flex-col gap-3.5 text-left my-6">
          {/* Step 1: Nikah */}
          <div className="relative flex items-start gap-4 p-4 rounded-2xl bg-[#F3ECE1]/60 border border-[#BA9974]/25 transition-all hover:bg-[#F3ECE1]">
            <div className="w-10 h-10 rounded-xl bg-[#54371F] text-[#FAF7F2] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <Clock size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#BA9974]/20 text-[#54371F]">
                  11:00 AM
                </span>
                <span className="text-[11px] text-[#8C6540] font-medium">Sacred Solemnization</span>
              </div>
              <h4 className="font-serif text-lg font-bold text-[#54371F] mt-1">
                Sacred Nikah Ceremony
              </h4>
              <p className="text-xs text-[#6E5647] mt-0.5">
                Solemnization of marriage following Islamic traditions.
              </p>
            </div>
          </div>

          {/* Step 2: Reception */}
          <div className="relative flex items-start gap-4 p-4 rounded-2xl bg-[#F3ECE1]/60 border border-[#BA9974]/25 transition-all hover:bg-[#F3ECE1]">
            <div className="w-10 h-10 rounded-xl bg-[#BA9974] text-[#FAF7F2] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <Utensils size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#BA9974]/20 text-[#54371F]">
                  After Nikah
                </span>
                <span className="text-[11px] text-[#8C6540] font-medium">Luncheon &amp; Celebrations</span>
              </div>
              <h4 className="font-serif text-lg font-bold text-[#54371F] mt-1">
                Wedding Feast &amp; Reception
              </h4>
              <p className="text-xs text-[#6E5647] mt-0.5">
                Join us for celebratory luncheon and refreshments.
              </p>
            </div>
          </div>

          {/* Step 3: Venue */}
          <div className="relative flex items-start gap-4 p-4 rounded-2xl bg-[#F3ECE1]/60 border border-[#BA9974]/25 transition-all hover:bg-[#F3ECE1]">
            <div className="w-10 h-10 rounded-xl bg-[#8C6540] text-[#FAF7F2] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <MapPin size={18} />
            </div>
            <div>
              <span className="font-sans text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#BA9974]/20 text-[#54371F]">
                Venue Location
              </span>
              <h4 className="font-serif text-lg font-bold text-[#54371F] mt-1">
                Grand Auditorium Hosangadi
              </h4>
              <p className="text-xs text-[#6E5647] mt-0.5">
                Hosangadi, Manjeshwar, Kasaragod, Kerala
              </p>
            </div>
          </div>
        </div>

        {/* Best Compliments */}
        <div className="relative z-10 border-t border-[#BA9974]/30 pt-5 mt-5">
          <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8C6540] font-semibold mb-1">
            Best Compliments From
          </p>
          <p className="text-xs font-serif italic text-[#54371F] leading-relaxed max-w-[320px] mx-auto">
            {invite.compliments}
          </p>
        </div>

        {/* In Sha Allah */}
        <p className="relative z-10 font-sans text-xs uppercase tracking-[0.25em] text-[#54371F] text-center font-bold mt-6">
          IN SHA ALLAH
        </p>
      </div>
    </section>
  );
}

export default DetailsCard;