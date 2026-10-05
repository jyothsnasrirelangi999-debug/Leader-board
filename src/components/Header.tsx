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
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#080d22]/90 border-b border-slate-800/80 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: SRKR College Official Logo & Identity */}
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-3.5 group text-left transition-opacity hover:opacity-95 focus:outline-none"
          title="Return to Home"
        >
          <div className="relative flex items-center justify-center p-1 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm shadow-inner group-hover:border-indigo-500/40 transition-colors">
            {/* SRKR Official Emblem preserving natural aspect ratio */}
            <img
              src={srkrLogo || '/srkr-logo.png'}
              alt="SRKR Engineering College Logo"
              className="h-13 w-auto max-h-13 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white group-hover:text-indigo-200 transition-colors">
              S.R.K.R. ENGINEERING COLLEGE
            </span>
            <span className="text-xs text-slate-400 font-medium tracking-wide flex items-center gap-1.5">
              <span>(Autonomous)</span>
              <span className="w-1 h-1 rounded-full bg-slate-500"></span>
              <span>Bhimavaram</span>
              <span className="w-1 h-1 rounded-full bg-slate-500"></span>
              <span className="text-indigo-400 font-semibold">ESTD: 1980</span>
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
