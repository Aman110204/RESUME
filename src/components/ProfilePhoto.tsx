import { useState } from "react";

export default function ProfilePhoto() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="shrink-0">
      <button
        onClick={() => setFlipped((f) => !f)}
        className="group relative w-36 h-36 sm:w-44 sm:h-44 lg:w-56 lg:h-56 [perspective:1200px]"
        aria-label="Flip profile photo"
      >
        <div
          className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]"
          style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          <div className="absolute inset-0 rounded-lg border border-line overflow-hidden [backface-visibility:hidden] shadow-lg shadow-black/30">
            <img src="/profile.jpg" alt="Aman Kumar" className="w-full h-full object-cover" />
            <div className="absolute top-2 left-2 rounded border border-signal/30 bg-base/80 backdrop-blur px-2 py-0.5 font-mono text-[10px] text-signal">
              200 OK
            </div>
          </div>
          <div
            className="absolute inset-0 rounded-lg border border-line overflow-hidden [backface-visibility:hidden] shadow-lg shadow-black/30"
            style={{ transform: "rotateY(180deg)" }}
          >
            <img src="/profile-alt.jpg" alt="Aman Kumar, illustrated" className="w-full h-full object-cover" />
            <div className="absolute top-2 left-2 rounded border border-wire/30 bg-base/80 backdrop-blur px-2 py-0.5 font-mono text-[10px] text-wire2">
              cached
            </div>
          </div>
        </div>
      </button>
      <p className="mt-2 text-center font-mono text-[10px] text-faint">tap to flip</p>
    </div>
  );
}
