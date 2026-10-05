import React from 'react';
import { Team } from '../types';
import { Crown, Medal, Award, Sparkles } from 'lucide-react';

interface Top3ShowcaseProps {
  teams: Team[];
}

export const Top3Showcase: React.FC<Top3ShowcaseProps> = ({ teams }) => {
  if (teams.length < 3) return null;

  const first = teams[0];
  const second = teams[1];
  const third = teams[2];

  const formatPoints = (pts: number) => new Intl.NumberFormat('en-IN').format(pts);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* 2nd Place (Silver) */}
      <div className="order-2 md:order-1 relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-800/60 to-slate-900/80 border border-slate-700/60 p-5 shadow-lg backdrop-blur-sm flex flex-col justify-between">
        <div className="absolute top-0 right-0 w-28 h-28 bg-slate-400/5 rounded-full blur-2xl pointer-events-none"></div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-300/15 text-slate-200 border border-slate-400/30">
              <Medal className="w-3.5 h-3.5 text-slate-300" />
              #2 Rank
            </span>
            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Silver</span>
          </div>
          <h4 className="text-lg font-bold text-slate-100 truncate" title={second.name}>
            {second.name}
          </h4>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-baseline justify-between">
          <span className="text-xs text-slate-400 font-medium">Score</span>
          <div className="text-right">
            <span className="text-xl font-extrabold text-slate-200 tabular-nums">
              {formatPoints(second.points)}
            </span>
            <span className="text-xs text-slate-400 ml-1">pts</span>
          </div>
        </div>
      </div>

      {/* 1st Place (Gold) - Elevated spotlight */}
      <div className="order-1 md:order-2 relative overflow-hidden rounded-2xl bg-gradient-to-b from-amber-950/40 via-yellow-950/20 to-slate-900/90 border-2 border-amber-500/50 p-6 shadow-xl shadow-amber-500/10 backdrop-blur-md flex flex-col justify-between md:-translate-y-2">
        {/* Glow backdrop */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/30">
              <Crown className="w-3.5 h-3.5 text-slate-950" />
              #1 Champion
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <Sparkles className="w-3 h-3" /> Gold
            </span>
          </div>
          <h4 className="text-xl font-black text-amber-100 truncate" title={first.name}>
            {first.name}
          </h4>
        </div>
        <div className="mt-5 pt-3.5 border-t border-amber-500/20 flex items-baseline justify-between">
          <span className="text-xs text-amber-300/80 font-semibold tracking-wide">Top Score</span>
          <div className="text-right">
            <span className="text-2xl font-black text-amber-300 tabular-nums drop-shadow-[0_2px_8px_rgba(251,191,36,0.35)]">
              {formatPoints(first.points)}
            </span>
            <span className="text-xs text-amber-400 ml-1 font-bold">pts</span>
          </div>
        </div>
      </div>

      {/* 3rd Place (Bronze) */}
      <div className="order-3 relative overflow-hidden rounded-2xl bg-gradient-to-b from-amber-950/25 to-slate-900/80 border border-amber-800/40 p-5 shadow-lg backdrop-blur-sm flex flex-col justify-between">
        <div className="absolute top-0 right-0 w-28 h-28 bg-amber-700/5 rounded-full blur-2xl pointer-events-none"></div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-800/30 text-amber-300 border border-amber-700/40">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              #3 Rank
            </span>
            <span className="text-xs uppercase tracking-widest text-amber-500/80 font-semibold">Bronze</span>
          </div>
          <h4 className="text-lg font-bold text-amber-100/90 truncate" title={third.name}>
            {third.name}
          </h4>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-baseline justify-between">
          <span className="text-xs text-slate-400 font-medium">Score</span>
          <div className="text-right">
            <span className="text-xl font-extrabold text-amber-200 tabular-nums">
              {formatPoints(third.points)}
            </span>
            <span className="text-xs text-slate-400 ml-1">pts</span>
          </div>
        </div>
      </div>
    </div>
  );
};
