import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function AudioToggle({ audioRef }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // Sync initial state
    setIsPlaying(!audio.paused);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [audioRef]);

  const handleToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => {
        console.error("Audio playback failed:", err);
      });
    }
  };

  return (
    <button
      onClick={handleToggle}
      aria-label="Toggle background music"
      className="fixed bottom-5 right-5 z-[999] w-11 h-11 flex items-center justify-center transition-transform duration-300 hover:scale-110 cursor-pointer"
    >
      {isPlaying && (
        <span className="absolute inset-0 rounded-full border-2 border-gold-400 animate-ping" />
      )}
      <span className="relative w-11 h-11 rounded-full flex items-center justify-center bg-gold-700 text-gold-50 border border-gold-400 shadow-[0_4px_10px_rgba(58,54,38,0.25)]">
        {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </span>
    </button>
  );
}

export default AudioToggle;