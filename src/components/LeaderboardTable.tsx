import React, { useState } from 'react';
import { Team } from '../types';
import { Crown, Medal, Award, Search, Sparkles, AlertCircle } from 'lucide-react';

interface LeaderboardTableProps {
  teams: Team[];
  lastUpdated?: Date;
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ teams, lastUpdated }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  // Formatting points with commas for readability
  const formatPoints = (pts: number) => {
    return new Intl.NumberFormat('en-IN').format(pts);
  };

  return (
    <div className="w-full">
      {/* Search and Quick Overview bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search team name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/50 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400 self-end sm:self-center font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            Total Teams: <strong className="text-white font-bold">{teams.length}</strong>
          </span>
          {lastUpdated && (
            <span className="hidden sm:inline-block text-slate-500">
              Updated: {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          )}
        </div>
      </div>

      {/* Empty State */}
      {teams.length === 0 ? (
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-12 text-center shadow-xl backdrop-blur-sm">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400 border border-slate-700">
            <AlertCircle className="w-7 h-7 text-indigo-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-200 mb-1">No teams have been added yet.</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            The leaderboard will automatically populate and rank teams once the event administrator adds teams and scores.
          </p>
        </div>
      ) : filteredTeams.length === 0 ? (
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-10 text-center shadow-xl backdrop-blur-sm">
          <p className="text-sm text-slate-400">
            No teams found matching "<span className="text-white font-semibold">{searchTerm}</span>".
          </p>
          <button
            onClick={() => setSearchTerm('')}
            className="mt-3 px-4 py-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 bg-indigo-950/40 border border-indigo-800/40 rounded-lg"
          >
            Clear Search
          </button>
        </div>
      ) : (
        /* Leaderboard Table Container */
        <div className="relative overflow-hidden rounded-2xl border border-slate-800/90 bg-gradient-to-b from-[#0c122e]/90 via-[#0a0f26]/90 to-[#080d20]/90 shadow-2xl shadow-indigo-950/20 backdrop-blur-md">
          {/* Subtle top glowing accent strip */}
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-80"></div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              {/* Exactly requested columns: Rank | Team Name | Points */}
              <thead>
                <tr className="border-b border-slate-800/80 bg-slate-950/60 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <th scope="col" className="py-4 px-4 sm:px-6 w-24 sm:w-28 text-center">
                    Rank
                  </th>
                  <th scope="col" className="py-4 px-4 sm:px-6">
                    Team Name
                  </th>
                  <th scope="col" className="py-4 px-4 sm:px-6 text-right w-36 sm:w-44">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-sm">
                {filteredTeams.map((team) => {
                  const rank = team.rank ?? 0;
                  const isGold = rank === 1;
                  const isSilver = rank === 2;
                  const isBronze = rank === 3;

                  // Distinctive, elegant treatment for Top 3
                  let rowClasses = 'transition-all duration-200 group ';
                  let rankBadgeClasses = '';
                  let rankIcon = null;

                  if (isGold) {
                    rowClasses +=
                      'bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent hover:from-amber-500/15 hover:via-yellow-500/10 border-l-4 border-amber-400';
                    rankBadgeClasses =
                      'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black shadow-md shadow-amber-500/30';
                    rankIcon = <Crown className="w-4 h-4 text-amber-300 drop-shadow animate-pulse" />;
                  } else if (isSilver) {
                    rowClasses +=
                      'bg-gradient-to-r from-slate-300/10 via-slate-400/5 to-transparent hover:from-slate-300/15 hover:via-slate-400/10 border-l-4 border-slate-300';
                    rankBadgeClasses =
                      'bg-gradient-to-r from-slate-200 to-slate-400 text-slate-950 font-black shadow-md shadow-slate-400/30';
                    rankIcon = <Medal className="w-4 h-4 text-slate-300" />;
                  } else if (isBronze) {
                    rowClasses +=
                      'bg-gradient-to-r from-amber-700/15 via-orange-800/5 to-transparent hover:from-amber-700/20 hover:via-orange-800/10 border-l-4 border-amber-600';
                    rankBadgeClasses =
                      'bg-gradient-to-r from-amber-600 to-amber-700 text-white font-black shadow-md shadow-amber-700/30';
                    rankIcon = <Award className="w-4 h-4 text-amber-500" />;
                  } else {
                    rowClasses +=
                      'hover:bg-slate-800/40 border-l-4 border-transparent';
                    rankBadgeClasses =
                      'bg-slate-800/90 text-slate-300 font-semibold border border-slate-700/60';
                  }

                  return (
                    <tr key={team.id} className={rowClasses}>
                      {/* Rank Column */}
                      <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {rankIcon}
                          <span
                            className={`inline-flex items-center justify-center min-w-9 h-8 px-2.5 rounded-lg text-xs md:text-sm tracking-wide ${rankBadgeClasses}`}
                          >
                            #{rank}
                          </span>
                        </div>
                      </td>

                      {/* Team Name Column */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div>
                            <span
                              className={`font-semibold tracking-wide text-base md:text-lg block transition-colors ${
                                isGold
                                  ? 'text-amber-200 font-bold group-hover:text-amber-100'
                                  : isSilver
                                  ? 'text-slate-100 font-bold group-hover:text-white'
                                  : isBronze
                                  ? 'text-orange-200 font-bold group-hover:text-orange-100'
                                  : 'text-slate-200 group-hover:text-white'
                              }`}
                            >
                              {team.name}
                            </span>
                            {isGold && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-400 mt-0.5">
                                <Sparkles className="w-3 h-3" /> Event Leader
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Points Column */}
                      <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-right">
                        <div className="inline-flex items-baseline justify-end gap-1.5">
                          <span
                            className={`font-extrabold tabular-nums tracking-tight ${
                              isGold
                                ? 'text-amber-300 text-xl md:text-2xl drop-shadow-[0_2px_10px_rgba(251,191,36,0.3)]'
                                : isSilver
                                ? 'text-slate-200 text-lg md:text-xl'
                                : isBronze
                                ? 'text-orange-300 text-lg md:text-xl'
                                : 'text-indigo-300 text-lg md:text-xl'
                            }`}
                          >
                            {formatPoints(team.points)}
                          </span>
                          <span className="text-xs text-slate-400 font-medium lowercase">pts</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer info */}
          <div className="py-3 px-6 bg-slate-950/70 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <span>
              Showing {filteredTeams.length} of {teams.length} teams
            </span>
            <span className="text-slate-500">
              * Rankings automatically update in real-time as scores are recorded
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
