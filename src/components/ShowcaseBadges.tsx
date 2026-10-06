import React from 'react';

/**
 * Glowing Winner Trophy Badge matching Badges.jpeg
 * Features crisp golden cup with glossy bevels, radiating burst arcs (( 🏆 )),
 * sparkle dots, and smooth up-and-down & to-and-fro floating motion.
 */
export const GlowingWinnerTrophyBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Background warm golden radial pulsing aura */}
      <div className="absolute inset-0 bg-amber-500/40 rounded-full blur-2xl pointer-events-none scale-150 animate-badge-aura"></div>
      <div className="absolute w-24 h-24 bg-yellow-400/25 rounded-full blur-xl pointer-events-none"></div>

      {/* Animated container with up-and-down & to-and-fro floating sway */}
      <div className="relative z-10 animate-badge-winner transform-gpu">
        <svg
          viewBox="0 0 130 115"
          className="w-22 h-22 sm:w-26 sm:h-26 md:w-30 md:h-30 overflow-visible drop-shadow-[0_0_24px_rgba(251,191,36,0.85)] filter"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Vivid Metallic Gold Gradients */}
            <linearGradient id="goldTrophyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="20%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="80%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>

            <linearGradient id="goldHighlightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#fef08a" stopOpacity="0.1" />
            </linearGradient>

            <linearGradient id="goldBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#854d0e" />
            </linearGradient>

            <radialGradient id="goldBurstGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fde047" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Radial soft background aura behind the cup */}
          <circle cx="65" cy="55" r="45" fill="url(#goldBurstGlow)" />

          {/* Celebratory Radiation Arcs & Dots on Left (( */}
          <g stroke="#fde047" strokeWidth="2.8" strokeLinecap="round" opacity="0.95">
            {/* Inner left arc */}
            <path d="M 32 44 C 25 53, 25 67, 32 76" className="drop-shadow-[0_0_8px_rgba(250,204,21,0.9)]" />
            {/* Outer left arc */}
            <path d="M 23 37 C 14 50, 14 70, 23 83" strokeWidth="2.2" opacity="0.8" />
            {/* Sparkle dots left */}
            <circle cx="32" cy="30" r="2.2" fill="#fffbeb" />
            <circle cx="18" cy="60" r="2" fill="#fde047" />
            <circle cx="28" cy="88" r="1.8" fill="#fde047" />
          </g>

          {/* Celebratory Radiation Arcs & Dots on Right )) */}
          <g stroke="#fde047" strokeWidth="2.8" strokeLinecap="round" opacity="0.95">
            {/* Inner right arc */}
            <path d="M 98 44 C 105 53, 105 67, 98 76" className="drop-shadow-[0_0_8px_rgba(250,204,21,0.9)]" />
            {/* Outer right arc */}
            <path d="M 107 37 C 116 50, 116 70, 107 83" strokeWidth="2.2" opacity="0.8" />
            {/* Sparkle dots right */}
            <circle cx="98" cy="30" r="2.2" fill="#fffbeb" />
            <circle cx="112" cy="60" r="2" fill="#fde047" />
            <circle cx="102" cy="88" r="1.8" fill="#fde047" />
          </g>

          {/* Sparkle Stars floating above */}
          <g fill="#ffffff" opacity="0.95" className="drop-shadow-[0_0_6px_rgba(254,240,138,1)]">
            {/* Top center 4-pointed star */}
            <path d="M 65 10 L 67.5 17 L 74 19 L 67.5 21 L 65 28 L 62.5 21 L 56 19 L 62.5 17 Z" />
            {/* Top right small star */}
            <path d="M 90 16 L 91.5 20 L 96 21.5 L 91.5 23 L 90 27 L 88.5 23 L 84 21.5 L 88.5 20 Z" opacity="0.85" />
            {/* Top left mini sparkle */}
            <circle cx="42" cy="22" r="1.5" fill="#ffffff" />
          </g>

          {/* Trophy Cup Body & Handles */}
          <g>
            {/* Left Handle */}
            <path
              d="M 48 42 C 34 42, 34 64, 50 68"
              stroke="url(#goldTrophyGrad)"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
              className="drop-shadow-[0_0_6px_rgba(234,179,8,0.7)]"
            />
            <path
              d="M 48 44 C 37 44, 37 62, 50 66"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />

            {/* Right Handle */}
            <path
              d="M 82 42 C 96 42, 96 64, 80 68"
              stroke="url(#goldTrophyGrad)"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
              className="drop-shadow-[0_0_6px_rgba(234,179,8,0.7)]"
            />
            <path
              d="M 82 44 C 93 44, 93 62, 80 66"
              stroke="#ca8a04"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />

            {/* Trophy Cup Main Body */}
            <path
              d="M 46 34 
                 L 84 34 
                 L 80 66 
                 C 78 75, 69 79, 65 79 
                 C 61 79, 52 75, 50 66 
                 Z"
              fill="url(#goldTrophyGrad)"
              stroke="#ca8a04"
              strokeWidth="1.8"
            />

            {/* Cup Rim with highlight ellipse */}
            <ellipse cx="65" cy="34" rx="19" ry="4.5" fill="url(#goldTrophyGrad)" stroke="#ca8a04" strokeWidth="1.5" />
            <ellipse cx="65" cy="33.5" rx="16.5" ry="3" fill="url(#goldHighlightGrad)" />

            {/* Specular curved gloss reflection on cup left side */}
            <path
              d="M 52 40 L 56 40 L 54 66 C 53 64, 52 61, 52 58 Z"
              fill="#ffffff"
              opacity="0.75"
            />

            {/* Cup center star emblem */}
            <path
              d="M 65 48 L 66.5 53 L 71 54 L 67 57 L 68 62 L 65 59 L 62 62 L 63 57 L 59 54 L 63.5 53 Z"
              fill="#ffffff"
              opacity="0.9"
            />

            {/* Trophy Stem */}
            <path
              d="M 62 79 L 68 79 L 67 87 L 63 87 Z"
              fill="url(#goldTrophyGrad)"
              stroke="#ca8a04"
              strokeWidth="1"
            />

            {/* Trophy Pedestal Base */}
            <path
              d="M 55 87 L 75 87 L 79 97 L 51 97 Z"
              fill="url(#goldBaseGrad)"
              stroke="#ca8a04"
              strokeWidth="1.5"
            />
            {/* Base bottom golden plinth */}
            <rect x="48" y="96" width="34" height="4.5" rx="1.5" fill="url(#goldTrophyGrad)" stroke="#ca8a04" strokeWidth="1" />
            <line x1="50" y1="97" x2="80" y2="97" stroke="#ffffff" strokeWidth="1" opacity="0.8" />
          </g>
        </svg>
      </div>
    </div>
  );
};

/**
 * Glowing Runner-Up Medal Badge matching Badges.jpeg
 * Features circular silver medal embossed with bold "2", vivid cyan ribbon tails,
 * radiating burst arcs (( 🥈 )), and smooth up-and-down & to-and-fro floating motion.
 */
export const GlowingRunnerMedalBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Background cyan/sky radial pulsing aura */}
      <div className="absolute inset-0 bg-cyan-500/40 rounded-full blur-2xl pointer-events-none scale-150 animate-badge-aura"></div>
      <div className="absolute w-24 h-24 bg-sky-400/25 rounded-full blur-xl pointer-events-none"></div>

      {/* Animated container with up-and-down & to-and-fro floating sway */}
      <div className="relative z-10 animate-badge-runner transform-gpu">
        <svg
          viewBox="0 0 130 115"
          className="w-22 h-22 sm:w-26 sm:h-26 md:w-30 md:h-30 overflow-visible drop-shadow-[0_0_24px_rgba(56,189,248,0.85)] filter"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Crisp Silver / Platinum Gradients */}
            <linearGradient id="silverMedalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#f1f5f9" />
              <stop offset="60%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>

            <linearGradient id="silverInnerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            {/* Vibrant Sky Blue Ribbon Gradients */}
            <linearGradient id="blueRibbonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>

            <radialGradient id="cyanBurstGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#0284c7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Radial soft background aura behind the medal */}
          <circle cx="65" cy="55" r="45" fill="url(#cyanBurstGlow)" />

          {/* Cyan Radiation Burst Arcs & Dots on Left (( */}
          <g stroke="#38bdf8" strokeWidth="2.8" strokeLinecap="round" opacity="0.95">
            {/* Inner left arc */}
            <path d="M 32 44 C 25 53, 25 67, 32 76" className="drop-shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
            {/* Outer left arc */}
            <path d="M 23 37 C 14 50, 14 70, 23 83" strokeWidth="2.2" opacity="0.8" />
            {/* Sparkle dots left */}
            <circle cx="32" cy="30" r="2.2" fill="#e0f2fe" />
            <circle cx="18" cy="60" r="2" fill="#38bdf8" />
            <circle cx="28" cy="88" r="1.8" fill="#38bdf8" />
          </g>

          {/* Cyan Radiation Burst Arcs & Dots on Right )) */}
          <g stroke="#38bdf8" strokeWidth="2.8" strokeLinecap="round" opacity="0.95">
            {/* Inner right arc */}
            <path d="M 98 44 C 105 53, 105 67, 98 76" className="drop-shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
            {/* Outer right arc */}
            <path d="M 107 37 C 116 50, 116 70, 107 83" strokeWidth="2.2" opacity="0.8" />
            {/* Sparkle dots right */}
            <circle cx="98" cy="30" r="2.2" fill="#e0f2fe" />
            <circle cx="112" cy="60" r="2" fill="#38bdf8" />
            <circle cx="102" cy="88" r="1.8" fill="#38bdf8" />
          </g>

          {/* Sparkle Stars floating above */}
          <g fill="#ffffff" opacity="0.95" className="drop-shadow-[0_0_6px_rgba(186,230,253,1)]">
            {/* Top center 4-pointed star */}
            <path d="M 65 10 L 67.5 17 L 74 19 L 67.5 21 L 65 28 L 62.5 21 L 56 19 L 62.5 17 Z" />
            {/* Top right small star */}
            <path d="M 90 16 L 91.5 20 L 96 21.5 L 91.5 23 L 90 27 L 88.5 23 L 84 21.5 L 88.5 20 Z" opacity="0.85" />
            {/* Top left mini sparkle */}
            <circle cx="42" cy="22" r="1.5" fill="#ffffff" />
          </g>

          {/* Hanging Blue Ribbon Tails behind the medal */}
          <g>
            {/* Left Ribbon Tail */}
            <path
              d="M 57 66 L 47 98 L 56 91 L 65 98 L 61 66 Z"
              fill="url(#blueRibbonGrad)"
              stroke="#0284c7"
              strokeWidth="1.2"
            />
            <path d="M 50 96 L 56 91" stroke="#ffffff" strokeWidth="0.8" opacity="0.7" />

            {/* Right Ribbon Tail */}
            <path
              d="M 69 66 L 65 98 L 74 91 L 83 98 L 73 66 Z"
              fill="url(#blueRibbonGrad)"
              stroke="#0284c7"
              strokeWidth="1.2"
            />
            <path d="M 68 96 L 74 91" stroke="#ffffff" strokeWidth="0.8" opacity="0.7" />
          </g>

          {/* Circular Silver Medal Body */}
          <g>
            {/* Outer Medal Circle with Bevel */}
            <circle
              cx="65"
              cy="53"
              r="25"
              fill="url(#silverMedalGrad)"
              stroke="#e2e8f0"
              strokeWidth="2.2"
              className="drop-shadow-[0_0_12px_rgba(56,189,248,0.7)]"
            />

            {/* Inner Concentric Circle Ring */}
            <circle
              cx="65"
              cy="53"
              r="20"
              fill="url(#silverInnerGrad)"
              stroke="#38bdf8"
              strokeWidth="1.8"
            />

            {/* Specular White Rim Highlight */}
            <path
              d="M 46 43 C 51 35, 65 31, 76 34"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
            />

            {/* Decorative Laurel / Star nodes */}
            <circle cx="65" cy="37" r="1.8" fill="#38bdf8" />
            <circle cx="65" cy="69" r="1.8" fill="#38bdf8" />

            {/* Bold, Embossed Number "2" in Center matching Badges.jpeg */}
            <text
              x="65"
              y="61"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="23"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              className="drop-shadow-[0_2px_6px_rgba(56,189,248,0.95)]"
            >
              2
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};
