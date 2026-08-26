import { Pause, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import heroGifUrl from "../../assets/video/hero-placeholder.gif";

type HeroGifProps = { className?: string };

// Nutzt den nativen GIF-Decoder des Browsers statt manuellem Frame-Decoding
// (vorher: gifuct-js dekodierte alle Frames synchron im Hauptthread, bevor
// überhaupt etwas sichtbar wurde -- das war die eigentliche Ladezeit-Bremse).
// Pause friert den aktuell sichtbaren Frame per Canvas-Snapshot ein, statt
// die GIF-Wiedergabe selbst zu steuern.
export default function HeroGif({ className = "" }: HeroGifProps) {
  const [playing, setPlaying] = useState(true);
  const [ready, setReady] = useState(false);
  const [frozenFrame, setFrozenFrame] = useState<string | null>(null);

  const imgRef = useRef<HTMLImageElement>(null);

  const togglePlay = () => {
    if (playing) {
      const img = imgRef.current;
      if (img) {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        canvas.getContext("2d")?.drawImage(img, 0, 0);
        setFrozenFrame(canvas.toDataURL());
      }
      setPlaying(false);
    } else {
      setFrozenFrame(null);
      setPlaying(true);
    }
  };

  return (
    <motion.div
      className={`relative overflow-hidden rounded-[32px] bg-[#d9d9d9] ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: ready ? 1 : 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <img
        ref={imgRef}
        src={heroGifUrl}
        alt=""
        loading="eager"
        decoding="async"
        // @ts-expect-error -- fetchpriority ist noch nicht in den React-DOM-Typen
        fetchpriority="high"
        onLoad={() => setReady(true)}
        className="size-full object-cover"
      />

      {frozenFrame && (
        <img
          src={frozenFrame}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover"
        />
      )}

      <button
        type="button"
        onClick={togglePlay}
        disabled={!ready}
        aria-label={playing ? "Video pausieren" : "Video abspielen"}
        className="absolute bottom-6 left-1/2 flex size-16 -translate-x-1/2 items-center justify-center rounded-full bg-arctis-white text-royal-blue transition-[filter,transform] duration-100 active:brightness-[0.84] active:scale-[0.98] lg:bottom-8 lg:left-8 lg:translate-x-0"
      >
        {playing ? (
          <Pause className="h-6 w-6" aria-hidden="true" fill="currentColor" />
        ) : (
          <Play className="h-6 w-6" aria-hidden="true" fill="currentColor" />
        )}
      </button>
    </motion.div>
  );
}
