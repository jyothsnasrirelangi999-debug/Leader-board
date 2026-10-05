import React, { useState, useEffect } from 'react';
import { CurrentRoute } from './types';
import { LeaderboardProvider, useLeaderboard } from './context/LeaderboardContext';
import { Header } from './components/Header';
import { WinnerRunnerUpShowcase } from './components/WinnerRunnerUpShowcase';
import { EventHeroBanner } from './components/EventHeroBanner';
import { LeaderboardTable } from './components/LeaderboardTable';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';

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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
            {/* Top Hero Banner matching head.jpeg reference: Info on Left, Logo on Right */}
            <EventHeroBanner />

            {/* Winner and Runner Up Spotlight Showcase (NO Rank 3) */}
            <WinnerRunnerUpShowcase teams={teams} />

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
