import React from 'react';
import { Team } from '../types';
import { Crown, Medal, Sparkles, Trophy } from 'lucide-react';

interface WinnerRunnerUpShowcaseProps {
  teams: Team[];
}

export const WinnerRunnerUpShowcase: React.FC<WinnerRunnerUpShowcaseProps> = ({ teams }) => {
  if (teams.length < 1) return null;

  const winner = teams[0];
  const runnerUp = teams.length > 1 ? teams[1] : null;

  const formatPoints = (pts: number) => new Intl.NumberFormat('en-IN').format(pts);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
      {/* 1st Place - WINNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950/40 via-yellow-950/20 to-slate-900/90 border-2 border-amber-500/60 p-6 md:p-7 shadow-2xl shadow-amber-500/10 backdrop-blur-md flex flex-col justify-between group hover:border-amber-400 transition-all duration-300">
        {/* Ambient gold glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/30 transition-all"></div>
        <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-yellow-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div>
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-lg shadow-amber-500/30 uppercase tracking-wider">
              <Crown className="w-4 h-4 text-slate-950 fill-slate-950" />
              #1 Winner
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" /> Event Champion
            </span>
          </div>

          <p className="text-xs uppercase tracking-widest text-amber-300/80 font-semibold mb-1">
            Top Leaderboard Team
          </p>
          <h3
            className="text-2xl sm:text-3xl font-black text-amber-100 tracking-tight leading-tight group-hover:text-white transition-colors break-words"
            title={winner.name}
          >
            {winner.name}
          </h3>
        </div>

        <div className="mt-6 pt-4 border-t border-amber-500/25 flex items-baseline justify-between">
          <span className="text-xs text-amber-300/90 font-bold uppercase tracking-wider">
            Total Points
          </span>
          <div className="text-right">
            <span className="text-3xl sm:text-4xl font-black text-amber-300 tabular-nums drop-shadow-[0_2px_12px_rgba(251,191,36,0.4)]">
              {formatPoints(winner.points)}
            </span>
            <span className="text-sm text-amber-400 ml-1.5 font-bold uppercase">pts</span>
          </div>
        </div>
      </div>

      {/* 2nd Place - RUNNER UP */}
      {runnerUp ? (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/70 via-slate-900/85 to-[#0b122c] border-2 border-slate-600/70 p-6 md:p-7 shadow-xl shadow-slate-900/50 backdrop-blur-md flex flex-col justify-between group hover:border-slate-400 transition-all duration-300">
          {/* Ambient silver glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-slate-300/10 rounded-full blur-3xl pointer-events-none group-hover:bg-slate-300/20 transition-all"></div>
          <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none"></div>

          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-slate-200 to-slate-400 text-slate-950 shadow-md shadow-slate-400/25 uppercase tracking-wider">
                <Medal className="w-4 h-4 text-slate-950 fill-slate-950" />
                #2 Runner Up
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 uppercase tracking-widest bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                <Trophy className="w-3.5 h-3.5 text-slate-300" /> 2nd Position
              </span>
            </div>

            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">
              Second Place Contender
            </p>
            <h3
              className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight leading-tight group-hover:text-white transition-colors break-words"
              title={runnerUp.name}
            >
              {runnerUp.name}
            </h3>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-baseline justify-between">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Total Points
            </span>
            <div className="text-right">
              <span className="text-3xl sm:text-4xl font-black text-slate-200 tabular-nums">
                {formatPoints(runnerUp.points)}
              </span>
              <span className="text-sm text-slate-400 ml-1.5 font-bold uppercase">pts</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 p-6 flex flex-col items-center justify-center text-center">
          <Medal className="w-8 h-8 text-slate-600 mb-2" />
          <p className="text-sm font-semibold text-slate-400">Awaiting Runner Up</p>
          <p className="text-xs text-slate-500 mt-1">
            Second place will be revealed once additional teams compete.
          </p>
        </div>
      )}
    </div>
  );
};
