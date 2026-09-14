import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";
import { weddingConfig } from "../config";
import { useCountdown } from "../hooks/useCountdown";

gsap.registerPlugin(ScrollTrigger);

export function VerseSection() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const timeLeft = useCountdown(weddingConfig.ceremonyDate);

  useEffect(() => {
    const anim = gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
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

  const timerItems = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds }
  ];

  return (
    <section id="verse-section" ref={containerRef} className="py-12 px-4 sm:px-6 relative text-center">
      <div
        ref={cardRef}
        className="relative max-w-lg mx-auto bg-[#FAF7F2] border border-[#D3C1AA]/70 rounded-3xl p-7 sm:p-9 shadow-[0_15px_40px_rgba(84,55,31,0.08)] overflow-hidden"
      >
        {/* Subtle Decorative Fillet */}
        <div className="absolute top-2.5 bottom-2.5 left-2.5 right-2.5 border border-dashed border-[#BA9974]/30 rounded-2xl pointer-events-none" />

        {/* Classic Header Ornament */}
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4 text-[#BA9974]">
            <span className="h-px w-8 bg-[#BA9974]/40" />
            <Sparkles size={16} />
            <span className="h-px w-8 bg-[#BA9974]/40" />
          </div>

          {/* Bismillah */}
          <p
            dir="rtl"
            className="font-arabic text-xl sm:text-2xl text-[#8C6540] font-medium leading-relaxed mb-4"
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>

          {/* Arabic Calligraphy Verse */}
          <p
            dir="rtl"
            className="font-arabic text-2xl sm:text-3xl text-[#54371F] font-bold leading-relaxed mb-4 max-w-md mx-auto"
          >
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </p>

          <p className="font-serif italic text-sm sm:text-base text-[#8C6540] max-w-sm mx-auto leading-relaxed mb-2">
            "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy."
          </p>
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#BA9974] font-semibold mb-6">
            — Surah Ar-Rum 30:21 —
          </p>

          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#BA9974]/60 to-transparent mx-auto mb-6" />

          <p className="text-xs sm:text-sm text-[#54371F] leading-relaxed max-w-sm mx-auto mb-7">
            With immense joy and gratitude to Allah (SWT), we invite you to be part of our special celebration as we begin our blessed journey together.
          </p>

          {/* Integrated Live Countdown Timer */}
          <div className="bg-[#F3ECE1]/70 rounded-2xl p-4 border border-[#BA9974]/30 shadow-inner">
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#8C6540] font-semibold mb-3">
              Counting Down To The Big Day
            </p>
            <div className="grid grid-cols-4 gap-2">
              {timerItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF7F2] rounded-xl py-2.5 px-1 border border-[#D3C1AA]/60 shadow-xs flex flex-col items-center"
                >
                  <span className="font-serif text-xl sm:text-2xl font-bold text-[#54371F] leading-none">
                    {String(item.value).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-[9px] uppercase tracking-wider text-[#8C6540] mt-1 font-semibold">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VerseSection;