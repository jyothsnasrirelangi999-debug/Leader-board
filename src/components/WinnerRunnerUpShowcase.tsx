import React from 'react';
import { Team } from '../types';
import { Trophy, Star, Medal } from 'lucide-react';

interface WinnerRunnerUpShowcaseProps {
  teams: Team[];
}

export const WinnerRunnerUpShowcase: React.FC<WinnerRunnerUpShowcaseProps> = ({ teams }) => {
  if (teams.length < 1) return null;

  const winner = teams[0];
  const runnerUp = teams.length > 1 ? teams[1] : null;

  const formatPoints = (pts: number) => new Intl.NumberFormat('en-IN').format(pts);

  return (
    <div className="pt-2 sm:pt-4 pb-4 mb-8">
      {/* 2-Column Responsive Grid with Elevation Offset */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 items-end">
        {/* 1st Place - WINNER BOX (Elevated higher) */}
        <div className="relative z-20 md:-translate-y-4 lg:-translate-y-6 transition-transform duration-300">
          {/* Winner Card Container */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1c1404] via-[#120e03] to-[#0a0f26] border-2 border-amber-400 p-7 sm:p-8 shadow-2xl animate-gold-glow backdrop-blur-md flex flex-col justify-between group hover:border-amber-300 transition-all duration-300">
            {/* Ambient gold glow reflections */}
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-500/25 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/35 transition-all"></div>
            <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-yellow-400/15 rounded-full blur-2xl pointer-events-none"></div>

            {/* Shimmering diagonal gold highlight */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-80"></div>

            <div>
              {/* Header inside card */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-950/80 text-amber-300 border border-amber-500/40 uppercase tracking-widest">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  CHAMPION
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  Leading Rank #1
                </span>
              </div>

              <p className="text-xs uppercase tracking-widest text-amber-300/80 font-semibold mb-1.5">
                Top Event Team
              </p>

              {/* Winner Team Name */}
              <h3
                className="text-2xl sm:text-3xl md:text-4xl font-black text-amber-100 tracking-tight leading-tight group-hover:text-white transition-colors break-words drop-shadow-[0_2px_12px_rgba(251,191,36,0.4)]"
                title={winner.name}
              >
                {winner.name}
              </h3>
            </div>

            {/* Score Footer */}
            <div className="mt-7 pt-5 border-t border-amber-500/30 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-amber-300/90 font-bold uppercase tracking-wider block">
                  Winner Score
                </span>
                <span className="text-[11px] text-amber-400/70">Highest Competition Points</span>
              </div>
              <div className="text-right">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-amber-300 tabular-nums drop-shadow-[0_2px_16px_rgba(251,191,36,0.6)]">
                  {formatPoints(winner.points)}
                </span>
                <span className="text-sm sm:text-base text-amber-400 ml-1.5 font-bold uppercase">
                  pts
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2nd Place - RUNNER UP BOX (Positioned lower) */}
        {runnerUp ? (
          <div className="relative z-10 md:translate-y-2 lg:translate-y-3 transition-transform duration-300">
            {/* Runner Up Card Container */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e172e] via-[#0a1024] to-[#070b1e] border-2 border-slate-400/80 p-7 sm:p-8 shadow-xl animate-silver-glow backdrop-blur-md flex flex-col justify-between group hover:border-slate-300 transition-all duration-300">
              {/* Ambient silver glow reflections */}
              <div className="absolute -top-16 -right-16 w-56 h-56 bg-slate-300/15 rounded-full blur-3xl pointer-events-none group-hover:bg-slate-300/25 transition-all"></div>
              <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none"></div>

              {/* Shimmering top line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent opacity-70"></div>

              <div>
                {/* Header inside card */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-slate-800/90 text-slate-200 border border-slate-600 uppercase tracking-widest">
                    <Medal className="w-3.5 h-3.5 text-slate-300" />
                    RUNNER UP
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-slate-400">
                    Rank #2
                  </span>
                </div>

                <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1.5">
                  Second Place Contender
                </p>

                {/* Runner Up Team Name */}
                <h3
                  className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-100 tracking-tight leading-tight group-hover:text-white transition-colors break-words"
                  title={runnerUp.name}
                >
                  {runnerUp.name}
                </h3>
              </div>

              {/* Score Footer */}
              <div className="mt-7 pt-5 border-t border-slate-700/60 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
                    Runner Up Score
                  </span>
                  <span className="text-[11px] text-slate-500">2nd Position Standing</span>
                </div>
                <div className="text-right">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-200 tabular-nums">
                    {formatPoints(runnerUp.points)}
                  </span>
                  <span className="text-sm sm:text-base text-slate-400 ml-1.5 font-bold uppercase">
                    pts
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative z-10 md:translate-y-2 lg:translate-y-3 rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 p-8 flex flex-col items-center justify-center text-center">
            <Medal className="w-10 h-10 text-slate-600 mb-2" />
            <p className="text-base font-semibold text-slate-300">Awaiting Runner Up</p>
            <p className="text-xs text-slate-500 mt-1">
              Second place will unlock automatically once additional teams are recorded.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
