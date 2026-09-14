import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingConfig } from "../config";
import aziz1 from "../assets/aziz1.jpeg";
import aziz2 from "../assets/aziz2.jpeg";

gsap.registerPlugin(ScrollTrigger);

export function Gallery() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0); // 0: Cover, 1: Invitation Details

  const cards = [
    { title: "Wedding Crest & Calligraphy", img: aziz1, alt: "Aziz & Raahila Monogram Card" },
    { title: "Formal Invitation Letter", img: aziz2, alt: "Aziz & Raahila Invitation Details" }
  ];

  // Entrance scroll animation
  useEffect(() => {
    const anim = gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
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

  return (
    <section ref={containerRef} className="py-12 px-6 relative text-center">
      <div className="mb-6">
        <p className="font-sans text-xs uppercase tracking-[0.15em] text-gold-600 font-semibold">
          Official Invitation
        </p>
        <h2 className="font-serif text-4xl mt-1 text-[#54371F] font-medium">
          Wedding Cards
        </h2>
      </div>

      {/* Card Tab Switcher */}
      <div className="flex justify-center gap-2 mb-6">
        {cards.map((card, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-2 rounded-full text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 ${
              activeTab === idx
                ? "bg-[#54371F] text-[#FAF7F2] shadow-md border border-[#54371F]"
                : "bg-gold-500/15 text-gold-800 border border-gold-500/30 hover:bg-gold-500/25"
            }`}
          >
            {idx === 0 ? "Cover Crest" : "Invitation Card"}
          </button>
        ))}
      </div>

      {/* Luxury Portrait Frame */}
      <div
        ref={cardRef}
        className="relative w-full max-w-[380px] mx-auto p-4 sm:p-5 flex flex-col items-center bg-[#F3ECE1] border border-gold-500/50 rounded-2xl shadow-xl"
      >
        {/* Dual Border Overlay */}
        <div className="absolute top-1.5 left-1.5 right-1.5 bottom-1.5 border border-dashed border-gold-500/40 rounded-xl pointer-events-none" />

        {/* Ornate Gold Corner Brackets */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gold-500 z-10" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gold-500 z-10" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gold-500 z-10" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gold-500 z-10" />

        {/* Arabic Blessing */}
        <div className="font-arabic text-xl text-[#54371F] mb-3 select-none tracking-normal z-10 font-bold">
          اللَّهُمَّ بَارِكْ
        </div>

        {/* Cardboard Mat border & photo */}
        <div className="relative w-full p-2.5 bg-[#FAF7F2] rounded-lg border border-gold-500/20 shadow-[inset_0_2px_8px_rgba(0,0,0,0.02)]">
          {/* Inner gold fillet border */}
          <div className="relative rounded border border-gold-500/25 overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.15)] bg-white">
            <img
              key={activeTab}
              src={cards[activeTab].img}
              alt={cards[activeTab].alt}
              className="w-full h-auto object-contain block animate-fade-in"
            />
          </div>
        </div>

        {/* Frame Label / Typography */}
        <div className="mt-4 text-center">
          <p className="font-allura text-2xl sm:text-3xl text-[#54371F] mb-1">
            {weddingConfig.groomName} &amp; {weddingConfig.brideName}
          </p>
          <p className="font-sans text-[10px] uppercase tracking-widest text-gold-700 font-semibold">
            {weddingConfig.invitation.dateDay} {weddingConfig.invitation.dateMonth} {weddingConfig.invitation.dateYear} • {weddingConfig.invitation.venueName}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Gallery;