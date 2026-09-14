import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCountdown } from "../hooks/useCountdown";
import { weddingConfig } from "../config";

gsap.registerPlugin(ScrollTrigger);

export function Countdown() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const timeLeft = useCountdown(weddingConfig.ceremonyDate);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    if (cards.length === 0) return;

    const st = gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    return () => {
      if (st.scrollTrigger) st.scrollTrigger.kill();
      st.kill();
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  const timerItems = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds }
  ];

  return (
    <section ref={containerRef} className="py-12 px-6 relative text-center">
      <div className="relative bg-gold-50 border border-gold-500/50 rounded-2xl p-6 shadow-xl overflow-hidden text-[#3A3626]">
        <div className="absolute top-1.5 left-1.5 right-1.5 bottom-1.5 border border-dashed border-gold-500/40 rounded-xl pointer-events-none" />

        <p className="font-serif text-2xl text-gold-700 italic mb-6 font-normal">
          Counting Down to the Big Day
        </p>

        <div className="grid grid-cols-4 gap-2 mt-4">
          {timerItems.map((item, idx) => (
            <div
              key={idx}
              ref={addToRefs}
              className="bg-gold-500/10 rounded-lg py-4 px-1 flex flex-col items-center border border-gold-500/20 shadow-sm"
            >
              <span className="font-serif text-2xl font-normal text-gold-700 leading-none">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-gold-600 mt-1 font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Countdown;
