import React from 'react';
import { CurrentRoute } from '../types';
import { useLeaderboard } from '../context/LeaderboardContext';
import { ShieldCheck, LogOut, Radio, Trophy, LayoutDashboard } from 'lucide-react';
import srkrLogo from '../assets/srkr-logo.png';

interface HeaderProps {
  currentRoute: CurrentRoute;
  onNavigate: (route: CurrentRoute) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate }) => {
  const { isAdmin, logout } = useLeaderboard();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#080d22]/95 border-b border-slate-800/80 shadow-lg shadow-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 min-h-[90px] sm:min-h-[104px] flex items-center justify-between gap-4">
        {/* Left: SRKR College Official Logo & Identity (Significantly enlarged) */}
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-3.5 sm:gap-4 group text-left transition-opacity hover:opacity-95 focus:outline-none cursor-pointer"
          title="Return to Home"
        >
          <div className="relative flex items-center justify-center p-2 sm:p-2.5 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md shadow-lg shadow-black/20 group-hover:border-indigo-400/60 transition-colors shrink-0">
            {/* SRKR Official Emblem preserving natural aspect ratio with enlarged dimensions */}
            <img
              src={srkrLogo || '/srkr-logo.png'}
              alt="SRKR Engineering College Logo"
              className="h-16 sm:h-20 md:h-22 w-auto max-h-22 object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-base sm:text-xl md:text-2xl lg:text-3xl font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors drop-shadow-sm leading-tight">
              S.R.K.R. ENGINEERING COLLEGE
            </span>
            <span className="text-xs sm:text-sm text-slate-300 font-semibold tracking-wide flex items-center gap-1.5 sm:gap-2 mt-1">
              <span className="text-slate-200">(Autonomous)</span>
              <span className="w-1 h-1 rounded-full bg-slate-400"></span>
              <span>Bhimavaram</span>
              <span className="w-1 h-1 rounded-full bg-slate-400"></span>
              <span className="text-indigo-400 font-bold">ESTD: 1980</span>
            </span>
          </div>
        </button>

        {/* Center/Right: Live Sync indicator & Navigation */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Subtle Live Sync Pulse */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-wide">Live Scoring</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1.5 bg-slate-900/70 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => onNavigate('/')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentRoute === '/'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              onClick={() => onNavigate(isAdmin ? '/admin' : '/admin/login')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentRoute === '/admin' || currentRoute === '/admin/login'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {isAdmin ? (
                <>
                  <LayoutDashboard className="w-4 h-4 text-purple-300" />
                  <span>Admin</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin</span>
                </>
              )}
            </button>
          </nav>

          {/* Admin Logout button if authenticated */}
          {isAdmin && (
            <button
              onClick={() => {
                logout();
                onNavigate('/');
              }}
              title="Logout from Admin Dashboard"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-300 hover:text-rose-100 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/50 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
