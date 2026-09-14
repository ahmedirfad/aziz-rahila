import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Sparkles } from "lucide-react";
import { weddingConfig } from "../config";
import couplePhoto from "../assets/WhatsApp Image 2026-09-06 at 21.17.05.jpeg";

gsap.registerPlugin(ScrollTrigger);

export function StorySection() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const anim = gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 82%",
          toggleActions: "play none none none"
        }
      }
    );

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
    };
  }, []);

  return (
    <section id="our-story" ref={containerRef} className="py-12 px-4 sm:px-6 relative text-center">
      <div
        ref={cardRef}
        className="relative max-w-lg mx-auto bg-[#FAF7F2] border border-[#D3C1AA]/70 rounded-3xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(84,55,31,0.08)] overflow-hidden"
      >
        {/* Subtle Decorative Fillet */}
        <div className="absolute top-2.5 bottom-2.5 left-2.5 right-2.5 border border-dashed border-[#BA9974]/30 rounded-2xl pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 mb-6">
          <div className="flex items-center justify-center gap-2 mb-2 text-[#BA9974]">
            <span className="h-px w-8 bg-[#BA9974]/40" />
            <Sparkles size={16} />
            <span className="h-px w-8 bg-[#BA9974]/40" />
          </div>
          <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8C6540] font-semibold">
            Our Story
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#54371F] font-bold mt-1">
            Moments of Grace
          </h2>
        </div>

        {/* Classic Archival Luxury Photo Frame */}
        <div className="relative w-full max-w-[320px] mx-auto mb-7">
          {/* Shadow & Outer Border */}
          <div className="relative rounded-2xl p-2.5 bg-gradient-to-b from-[#FAF7F2] to-[#F3ECE1] border-2 border-[#D3C1AA] shadow-xl">
            {/* Inner Gold Inset Frame */}
            <div className="relative rounded-xl overflow-hidden border border-[#BA9974]/40 bg-[#54371F]/5 aspect-[4/5]">
              <img
                src={couplePhoto}
                alt="Abdul Aziz KM & Mariyamath Raahila"
                className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 hover:scale-105"
              />
              {/* Subtle Warm Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#382212]/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none px-3">
                <span className="inline-block px-3 py-1 rounded-full bg-[#FAF7F2]/90 backdrop-blur-xs border border-[#BA9974]/40 text-[11px] font-serif italic text-[#54371F] shadow-xs">
                  Abdul Aziz & Mariyamath Raahila
                </span>
              </div>
            </div>

            {/* Ornamental Gold Corner Accents */}
            <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#BA9974]" />
            <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#BA9974]" />
            <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#BA9974]" />
            <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#BA9974]" />
          </div>
        </div>

        {/* Blessing & Couple's Note */}
        <div className="relative z-10">
          {/* Islamic Du'a */}
          <p
            dir="rtl"
            className="font-arabic text-xl sm:text-2xl text-[#54371F] font-bold leading-relaxed mb-2"
          >
            اللَّهُمَّ بَارِكْ لَهُمَا وَبَارِكْ عَلَيْهِمَا وَاجْمَعْ بَيْنَهُمَا فِي خَيْرٍ
          </p>
          <p className="font-serif italic text-xs sm:text-sm text-[#8C6540] max-w-sm mx-auto leading-relaxed mb-4">
            "O Allah, bless them and shower Your blessings upon them, and unite them in goodness."
          </p>

          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#BA9974]/60 to-transparent mx-auto mb-4" />

          <p className="text-xs sm:text-sm text-[#54371F] leading-relaxed max-w-sm mx-auto mb-4">
            From this day forward, hand in hand and heart to heart, we step into a lifetime of shared dreams, prayer, and endless love. We are blessed to share this joyous milestone with you.
          </p>

          <div className="inline-flex items-center justify-center gap-1.5 text-[#8C6540]">
            <Heart size={14} fill="currentColor" className="text-[#BA9974]" />
            <span className="font-serif italic text-xs">Forever & Always</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StorySection;
