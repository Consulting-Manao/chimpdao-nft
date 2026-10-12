import { useState } from 'react';

interface FlipCardProps {
  front?: string;
  back?: string;
  alt: string;
}

/**
 * A card with a printed reverse. Without a `back` it is a plain image. The card art is
 * landscape (about 1.58:1), so the frame follows the front rather than cropping to a square.
 */
export function FlipCard({ front, back, alt }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  if (!front) {
    return (
      <div className="aspect-[2022/1276] flex items-center justify-center bg-[hsl(30_15%_28%/0.6)] rounded-3xl" aria-hidden="true">
        <span className="text-white/50">No image</span>
      </div>
    );
  }

  if (!back) {
    return <img src={front} alt={alt} className="w-full rounded-3xl" />;
  }

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={flipped ? `${alt}, back. Show front` : `${alt}, front. Show back`}
      className="block w-full text-left [perspective:1200px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70 rounded-3xl"
    >
      <div
        className="relative aspect-[2022/1276] transition-transform duration-700 motion-reduce:duration-0 [transform-style:preserve-3d]"
        style={{ transform: flipped ? 'rotateY(180deg)' : 'none' }}
      >
        <img
          src={front}
          alt=""
          className="absolute inset-0 w-full h-full rounded-3xl [backface-visibility:hidden]"
        />
        <img
          src={back}
          alt=""
          className="absolute inset-0 w-full h-full rounded-3xl [backface-visibility:hidden] [transform:rotateY(180deg)]"
        />
      </div>
      <span className="mt-3 block text-center text-xs text-white/50">
        Tap the card to see the {flipped ? 'front' : 'back'}
      </span>
    </button>
  );
}
