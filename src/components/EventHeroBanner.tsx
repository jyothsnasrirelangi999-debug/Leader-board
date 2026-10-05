import React, { useRef } from 'react';
import { Zap } from 'lucide-react';
import { useLeaderboard } from '../context/LeaderboardContext';
import aikyamLogo from '../assets/aikyam-logo.jpg';

export const EventHeroBanner: React.FC = () => {
  const { customLogo, updateCustomLogo, isAdmin } = useLeaderboard();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          updateCustomLogo(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          updateCustomLogo(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const currentLogoSrc = customLogo || aikyamLogo || '/aikyam-logo.jpg';

  return (
    <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-[#070d24] via-[#091133] to-[#070b1e] p-6 sm:p-8 md:p-10 lg:p-12 mb-10 shadow-2xl shadow-indigo-950/60 backdrop-blur-xl">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Grid Layout: Left Content & Right Logo */}
      <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left Side: Information & Branding */}
        <div className="flex-1 text-center lg:text-left space-y-4 sm:space-y-5">
          {/* Main Huge Title: AIKYAM 2K26 */}
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase">
              AIKYAM <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500">2K26</span>
            </h1>

            {/* Tagline: LEARN • PLAY • WIN */}
            <div className="mt-3 flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3 text-cyan-400 font-black tracking-[0.25em] text-lg sm:text-xl md:text-2xl uppercase">
              <span className="drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]">LEARN</span>
              <span className="text-cyan-600 font-extrabold">•</span>
              <span className="drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]">PLAY</span>
              <span className="text-cyan-600 font-extrabold">•</span>
              <span className="drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]">WIN</span>
            </div>
          </div>

          {/* Subtext: Leaderboard & College Info */}
          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm text-slate-300">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/50 border border-indigo-500/30 text-indigo-300 font-semibold">
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              SRKR Engineering College
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Automatic Scoreboard
            </span>
          </div>
        </div>

        {/* Right Side: AIKYAM Official Logo with concentric glowing rings */}
        <div className="shrink-0 relative flex flex-col items-center justify-center py-4 lg:py-0">
          {/* Hidden File Input for uploading exact photo */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {/* Outer concentric radar rings */}
          <div className="absolute w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full border border-indigo-500/15 pointer-events-none animate-[spin_40s_linear_infinite]"></div>
          <div className="absolute w-60 h-60 sm:w-68 sm:h-68 md:w-80 md:h-80 rounded-full border border-cyan-500/20 pointer-events-none"></div>
          <div className="absolute w-52 h-52 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full border border-purple-500/25 pointer-events-none"></div>

          {/* Glow backdrop */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 via-indigo-600/35 to-purple-600/35 rounded-full blur-2xl opacity-80 group-hover:opacity-100 transition-opacity"></div>

          {/* Interactive Logo Frame with subtle hover scale */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full p-2 bg-black border-2 border-cyan-400/50 shadow-2xl shadow-cyan-900/40 flex items-center justify-center group cursor-pointer transition-transform hover:scale-105"
            title="AIKYAM 2K26 Official Emblem"
          >
            <img
              src={currentLogoSrc}
              alt="AIKYAM 2K26 Official Emblem"
              className="w-full h-full object-contain rounded-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
