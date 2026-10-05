import React, { useState } from 'react';
import { Team } from '../types';
import { Crown, Medal, Search, AlertCircle, Sparkles, Trophy } from 'lucide-react';

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
      {/* Header bar: Title and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400" />
            <span>LEADERBOARD</span>
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search team name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
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

          {/* Quick Counter */}
          <div className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 shrink-0 font-medium">
            <span>Teams:</span>
            <strong className="text-cyan-300 font-bold">{teams.length}</strong>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {teams.length === 0 ? (
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-12 text-center shadow-xl backdrop-blur-sm">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400 border border-slate-700">
            <AlertCircle className="w-8 h-8 text-cyan-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-200 mb-1">No teams have been added yet.</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            The leaderboard will automatically populate and rank teams once the event administrator adds teams and scores.
          </p>
        </div>
      ) : filteredTeams.length === 0 ? (
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-10 text-center shadow-xl backdrop-blur-sm">
          <p className="text-base text-slate-300">
            No teams found matching "<span className="text-white font-bold">{searchTerm}</span>".
          </p>
          <button
            onClick={() => setSearchTerm('')}
            className="mt-4 px-4 py-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 border border-cyan-800/40 rounded-xl"
          >
            Clear Search Filter
          </button>
        </div>
      ) : (
        /* Leaderboard Table Container */
        <div className="relative overflow-hidden rounded-3xl border border-slate-800/90 bg-gradient-to-b from-[#0c122e]/95 via-[#090f26]/95 to-[#070b1e]/95 shadow-2xl shadow-indigo-950/30 backdrop-blur-md">
          {/* Top glowing accent strip */}
          <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500"></div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              {/* Exactly requested columns: Rank | Team Name | Points */}
              <thead>
                <tr className="border-b border-slate-800/90 bg-slate-950/70 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400">
                  <th scope="col" className="py-4.5 px-4 sm:px-6 w-28 sm:w-36 text-center">
                    Rank
                  </th>
                  <th scope="col" className="py-4.5 px-4 sm:px-8">
                    Team Name
                  </th>
                  <th scope="col" className="py-4.5 px-4 sm:px-8 text-right w-40 sm:w-56">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredTeams.map((team) => {
                  const rank = team.rank ?? 0;
                  const isWinner = rank === 1;
                  const isRunnerUp = rank === 2;

                  let rowClasses = 'transition-all duration-200 group ';
                  let rankBadgeClasses = '';
                  let rankIcon = null;

                  if (isWinner) {
                    rowClasses +=
                      'bg-gradient-to-r from-amber-500/15 via-yellow-500/5 to-transparent hover:from-amber-500/20 border-l-4 border-amber-400';
                    rankBadgeClasses =
                      'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black shadow-md shadow-amber-500/30';
                    rankIcon = <Crown className="w-4 h-4 text-amber-300 fill-amber-300" />;
                  } else if (isRunnerUp) {
                    rowClasses +=
                      'bg-gradient-to-r from-slate-400/15 via-slate-300/5 to-transparent hover:from-slate-400/20 border-l-4 border-slate-300';
                    rankBadgeClasses =
                      'bg-gradient-to-r from-slate-200 to-slate-400 text-slate-950 font-black shadow-md shadow-slate-400/30';
                    rankIcon = <Medal className="w-4 h-4 text-slate-300 fill-slate-300" />;
                  } else {
                    rowClasses +=
                      'hover:bg-slate-800/40 border-l-4 border-transparent';
                    rankBadgeClasses =
                      'bg-slate-800/90 text-slate-300 font-bold border border-slate-700/60';
                  }

                  return (
                    <tr key={team.id} className={rowClasses}>
                      {/* Rank Column */}
                      <td className="py-5 sm:py-6 px-4 sm:px-6 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          {rankIcon}
                          <span
                            className={`inline-flex items-center justify-center min-w-10 sm:min-w-12 h-9 sm:h-10 px-3 rounded-xl text-sm sm:text-base tracking-wide ${rankBadgeClasses}`}
                          >
                            #{rank}
                          </span>
                        </div>
                      </td>

                      {/* Team Name Column - INCREASED FONT SIZE */}
                      <td className="py-5 sm:py-6 px-4 sm:px-8">
                        <div className="flex flex-col">
                          <span
                            className={`tracking-tight transition-colors break-words ${
                              isWinner
                                ? 'text-xl sm:text-2xl md:text-3xl font-black text-amber-100 group-hover:text-white drop-shadow-[0_1px_4px_rgba(251,191,36,0.3)]'
                                : isRunnerUp
                                ? 'text-xl sm:text-2xl md:text-3xl font-black text-slate-100 group-hover:text-white'
                                : 'text-lg sm:text-xl md:text-2xl font-bold text-slate-200 group-hover:text-white'
                            }`}
                          >
                            {team.name}
                          </span>

                          {/* Sub-label badges for Winner and Runner Up */}
                          {isWinner && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-400 mt-1">
                              <Sparkles className="w-3.5 h-3.5" /> Event Winner
                            </span>
                          )}
                          {isRunnerUp && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300 mt-1">
                              <Trophy className="w-3.5 h-3.5 text-slate-400" /> Runner Up
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Points Column */}
                      <td className="py-5 sm:py-6 px-4 sm:px-8 whitespace-nowrap text-right">
                        <div className="inline-flex items-baseline justify-end gap-1.5 sm:gap-2">
                          <span
                            className={`tabular-nums font-black tracking-tight ${
                              isWinner
                                ? 'text-2xl sm:text-3xl md:text-4xl text-amber-300 drop-shadow-[0_2px_12px_rgba(251,191,36,0.4)]'
                                : isRunnerUp
                                ? 'text-2xl sm:text-3xl md:text-4xl text-slate-200'
                                : 'text-xl sm:text-2xl md:text-3xl text-indigo-300'
                            }`}
                          >
                            {formatPoints(team.points)}
                          </span>
                          <span className="text-xs sm:text-sm text-slate-400 font-bold uppercase tracking-wider">
                            pts
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer info */}
          <div className="py-4 px-6 sm:px-8 bg-slate-950/80 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <span>
              Showing {filteredTeams.length} of {teams.length} participating teams
            </span>
            <span className="text-slate-500 font-medium">
              * Ranks are automatically calculated and updated in real-time
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
