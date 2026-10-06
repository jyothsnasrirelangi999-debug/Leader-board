import React from 'react';
import { Team } from '../types';
import { Trophy, Star } from 'lucide-react';
import { GlowingWinnerTrophyBadge, GlowingRunnerMedalBadge } from './ShowcaseBadges';

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
      {/* 2-Column Responsive Grid matching Badges.jpeg */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 items-stretch">
        {/* 1st Place - WINNER / CHAMPION BOX */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#181103] via-[#100c02] to-[#080d22] border-2 border-amber-500/80 p-6 sm:p-7 shadow-[0_0_30px_rgba(245,158,11,0.25)] backdrop-blur-md flex flex-col justify-between group hover:border-amber-400 transition-all duration-300">
          {/* Ambient gold glow reflections */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/30 transition-all"></div>
          <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none"></div>

          <div>
            {/* Top row: CHAMPION badge & Leading Rank #1 */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-950/70 text-amber-300 border border-amber-500/50 uppercase tracking-widest">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                CHAMPION
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                Leading Rank #1
              </span>
            </div>

            {/* Middle row: Team Name on Left & Glowing Trophy Badge on Right */}
            <div className="flex items-center justify-between gap-4 my-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs uppercase tracking-widest text-amber-300/80 font-bold mb-1">
                  TOP EVENT TEAM
                </p>
                <h3
                  className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight group-hover:text-amber-100 transition-colors break-words drop-shadow-[0_2px_10px_rgba(251,191,36,0.3)]"
                  title={winner.name}
                >
                  {winner.name}
                </h3>
              </div>

              {/* Glowing Golden Trophy Badge matching Badges.jpeg */}
              <div className="shrink-0 -my-2">
                <GlowingWinnerTrophyBadge />
              </div>
            </div>
          </div>

          {/* Bottom row: WINNER SCORE on Left & PTS on Right */}
          <div className="mt-6 pt-4 border-t border-amber-500/25 flex items-end justify-between gap-4">
            <div>
              <span className="text-xs text-amber-300/90 font-bold uppercase tracking-wider block">
                WINNER SCORE
              </span>
              <span className="text-[11px] text-amber-400/70 font-medium">
                Highest Competition Points
              </span>
            </div>
            <div className="text-right">
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-amber-400 tabular-nums drop-shadow-[0_2px_14px_rgba(251,191,36,0.5)]">
                {formatPoints(winner.points)}
              </span>
              <span className="text-sm sm:text-base text-amber-400 ml-1.5 font-bold uppercase">
                PTS
              </span>
            </div>
          </div>
        </div>

        {/* 2nd Place - RUNNER UP BOX */}
        {runnerUp ? (
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#071329] via-[#050e20] to-[#060a1c] border-2 border-cyan-500/80 p-6 sm:p-7 shadow-[0_0_30px_rgba(6,182,212,0.25)] backdrop-blur-md flex flex-col justify-between group hover:border-cyan-400 transition-all duration-300">
            {/* Ambient cyan glow reflections */}
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/30 transition-all"></div>
            <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              {/* Top row: RUNNER UP badge & Rank #2 */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-cyan-950/70 text-cyan-300 border border-cyan-500/50 uppercase tracking-widest">
                  <Trophy className="w-3.5 h-3.5 text-cyan-400" />
                  RUNNER UP
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-slate-300">
                  Rank #2
                </span>
              </div>

              {/* Middle row: Team Name on Left & Glowing Medal Badge on Right */}
              <div className="flex items-center justify-between gap-4 my-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs uppercase tracking-widest text-cyan-300/80 font-bold mb-1">
                    SECOND PLACE CONTENDER
                  </p>
                  <h3
                    className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight group-hover:text-cyan-100 transition-colors break-words drop-shadow-[0_2px_10px_rgba(56,189,248,0.3)]"
                    title={runnerUp.name}
                  >
                    {runnerUp.name}
                  </h3>
                </div>

                {/* Glowing Silver Medal Badge with "2" & Blue Ribbon matching Badges.jpeg */}
                <div className="shrink-0 -my-2">
                  <GlowingRunnerMedalBadge />
                </div>
              </div>
            </div>

            {/* Bottom row: RUNNER UP SCORE on Left & PTS on Right */}
            <div className="mt-6 pt-4 border-t border-cyan-500/25 flex items-end justify-between gap-4">
              <div>
                <span className="text-xs text-cyan-300/90 font-bold uppercase tracking-wider block">
                  RUNNER UP SCORE
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  2nd Position Standing
                </span>
              </div>
              <div className="text-right">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-cyan-400 tabular-nums drop-shadow-[0_2px_14px_rgba(56,189,248,0.5)]">
                  {formatPoints(runnerUp.points)}
                </span>
                <span className="text-sm sm:text-base text-cyan-400 ml-1.5 font-bold uppercase">
                  PTS
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 p-8 flex flex-col items-center justify-center text-center">
            <Trophy className="w-10 h-10 text-slate-600 mb-2" />
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
