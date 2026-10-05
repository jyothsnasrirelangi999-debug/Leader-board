import React, { useState, useEffect } from 'react';
import { CurrentRoute } from './types';
import { LeaderboardProvider, useLeaderboard } from './context/LeaderboardContext';
import { Header } from './components/Header';
import { Top3Showcase } from './components/Top3Showcase';
import { LeaderboardTable } from './components/LeaderboardTable';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { Trophy, Sparkles, Activity, ShieldCheck, Flame } from 'lucide-react';
import aikyamLogo from './assets/aikyam-logo.jpg';

const MainApp: React.FC = () => {
  const { teams, isAdmin, isLoading, lastUpdated } = useLeaderboard();
  const [currentRoute, setCurrentRoute] = useState<CurrentRoute>('/');

  // Initialize and synchronize with browser URL and history
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path === '/admin') {
        setCurrentRoute('/admin');
      } else if (path === '/admin/login') {
        setCurrentRoute('/admin/login');
      } else {
        setCurrentRoute('/');
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigateTo = (route: CurrentRoute) => {
    setCurrentRoute(route);
    try {
      window.history.pushState({}, '', route);
    } catch {
      // History pushState may fail in some iframe environments
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If user tries to access /admin while unauthenticated, redirect to /admin/login
  useEffect(() => {
    if (currentRoute === '/admin' && !isAdmin && !isLoading) {
      navigateTo('/admin/login');
    }
  }, [currentRoute, isAdmin, isLoading]);

  return (
    <div className="min-h-screen flex flex-col bg-[#070b19] text-slate-100 font-['Segoe_UI',sans-serif] relative overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Navy/Blue/Purple subtle top ambient gradients */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-blue-900/20 via-indigo-900/15 to-transparent rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-96 -left-48 w-96 h-96 bg-purple-900/15 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 -right-48 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl opacity-40"></div>
      </div>

      {/* Persistent Professional Header */}
      <Header currentRoute={currentRoute} onNavigate={navigateTo} />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        {/* ROUTE 1: PUBLIC HOME LEADERBOARD (/) */}
        {currentRoute === '/' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            {/* Top Center: Official AIKYAM 2K26 Logo Display */}
            <div className="flex flex-col items-center justify-center text-center mb-10">
              <div className="relative group">
                {/* Subtle cyan/purple glow aura behind logo */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500/25 via-indigo-500/30 to-purple-500/25 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-500"></div>

                {/* AIKYAM 2K26 Official Logo with preserved aspect ratio */}
                <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-indigo-500/40 bg-black shadow-2xl shadow-indigo-950/60 p-1 flex items-center justify-center">
                  <img
                    src={aikyamLogo || '/aikyam-logo.jpg'}
                    alt="AIKYAM 2K26 Official Logo"
                    className="w-full h-full object-contain rounded-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Title & Subtitle as requested */}
              <div className="mt-6 space-y-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
                  AIKYAM 2K26
                </h1>
                <h2 className="text-base sm:text-lg md:text-xl font-extrabold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 uppercase">
                  TEAM LEADERBOARD
                </h2>
                <div className="flex items-center justify-center gap-2 pt-2 text-xs text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="font-semibold text-slate-300">Live Auto-Sorted Standings</span>
                  <span className="text-slate-600">•</span>
                  <span>SRKR Engineering College</span>
                </div>
              </div>
            </div>

            {/* Top 3 Podium Showcase if at least 3 teams exist */}
            <Top3Showcase teams={teams} />

            {/* Official Leaderboard Table */}
            <LeaderboardTable teams={teams} lastUpdated={lastUpdated} />
          </div>
        )}

        {/* ROUTE 2: ADMIN LOGIN (/admin/login) */}
        {currentRoute === '/admin/login' && (
          <AdminLogin
            onSuccess={() => navigateTo('/admin')}
            onNavigateHome={() => navigateTo('/')}
          />
        )}

        {/* ROUTE 3: ADMIN DASHBOARD (/admin) */}
        {currentRoute === '/admin' && isAdmin && (
          <AdminDashboard onNavigateHome={() => navigateTo('/')} />
        )}
      </main>

      {/* Persistent Official Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default function App() {
  return (
    <LeaderboardProvider>
      <MainApp />
    </LeaderboardProvider>
  );
}
