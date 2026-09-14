import { useState, useRef, useEffect } from "react";
import EnvelopeIntro from "./components/EnvelopeIntro";
import Hero from "./components/Hero";
import VerseSection from "./components/VerseSection";
import DetailsCard from "./components/DetailsCard";
import MapSection from "./components/MapSection";
import RSVPForm from "./components/RSVPForm";
import Gallery from "./components/Gallery";
import StorySection from "./components/StorySection";
import ClosingScreen from "./components/ClosingScreen";
import AudioToggle from "./components/AudioToggle";
import { weddingConfig } from "./config";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [isCurtainOpened, setIsCurtainOpened] = useState(false);
  const [isIntroAlive, setIsIntroAlive] = useState(true);
  const audioRef = useRef(null);
  const wasPlayingRef = useRef(false);

  // Auto-pause and resume music when switching browser tabs
  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio || !isCurtainOpened) return;

      if (document.hidden) {
        if (!audio.paused) {
          wasPlayingRef.current = true;
          audio.pause();
        }
      } else {
        if (wasPlayingRef.current) {
          wasPlayingRef.current = false;
          audio.play().catch((err) => {
            console.log("Audio play resume prevented on tab focus:", err);
          });
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isCurtainOpened]);

  const handleCurtainOpen = () => {
    setIsCurtainOpened(true);
  };

  // Auto-animate sections on scroll
  useEffect(() => {
    if (!isCurtainOpened) return;

    const elements = document.querySelectorAll(".scroll-animate-section");
    const anims = [];

    elements.forEach((el) => {
      const anim = gsap.fromTo(
        el,
        { opacity: 0, y: 35, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            toggleActions: "play none none none"
          }
        }
      );
      anims.push(anim);
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);

    return () => {
      clearTimeout(refreshTimer);
      anims.forEach((a) => {
        if (a.scrollTrigger) a.scrollTrigger.kill();
        a.kill();
      });
    };
  }, [isCurtainOpened, isIntroAlive]);

  return (
    <>
      {/* Background looping audio element */}
      <audio
        ref={audioRef}
        src={weddingConfig.audioTrack}
        loop
        preload="auto"
      />

      {/* Main Wedding Invitation Experience */}
      <div className="relative w-full overflow-x-clip bg-[#FAF7F2]">
        {/* 1. Cinematic Opening Intro Panel */}
        {isIntroAlive && (
          <EnvelopeIntro
            onOpen={handleCurtainOpen}
            onComplete={() => setIsIntroAlive(false)}
            audioRef={audioRef}
          />
        )}

        {isCurtainOpened && (
          <div className="flex flex-col gap-2">
            {/* 1. Modern Editorial Hero Portal */}
            <Hero isCurtainOpened={isCurtainOpened} />

            {/* 2. Classic Quranic Verse, Blessing & Live Countdown */}
            <div className="scroll-animate-section">
              <VerseSection />
            </div>

            {/* 3. Wedding Itinerary, Timeline & Reception Scratch Feature */}
            <div className="scroll-animate-section">
              <DetailsCard />
            </div>

            {/* 4. Interactive Official Stationery Portfolio */}
            <div className="scroll-animate-section">
              <Gallery />
            </div>

            {/* 5. Venue Travel Guide & Directions Suite */}
            <div className="scroll-animate-section">
              <MapSection />
            </div>

            {/* 6. RSVP & Blessings Form */}
            <div className="scroll-animate-section">
              <RSVPForm />
            </div>

            {/* 7. Our Story / Captured Moments */}
            <div className="scroll-animate-section">
              <StorySection />
            </div>

            {/* 8. Closing Screen & Thank You */}
            <div className="scroll-animate-section">
              <ClosingScreen />
            </div>

            {/* Floating Audio Controller */}
            <AudioToggle audioRef={audioRef} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;