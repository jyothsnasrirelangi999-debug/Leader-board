import React from 'react';
import { CurrentRoute } from '../types';
import { ShieldCheck, Award } from 'lucide-react';
import srkrLogo from '../assets/srkr-logo.png';

interface FooterProps {
  onNavigate: (route: CurrentRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-[#050814]/90 backdrop-blur-md text-slate-400 text-xs py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: SRKR Branding */}
          <div className="flex items-center gap-3.5">
            <img
              src={srkrLogo || '/srkr-logo.png'}
              alt="SRKR College Logo"
              className="h-10 w-auto object-contain brightness-95"
            />
            <div>
              <p className="font-bold text-slate-200 text-sm">
                Sagi Rama Krishnam Raju Engineering College
              </p>
              <p className="text-slate-400 text-[11px]">
                Autonomous Institution • Affiliated to JNTUK • Bhimavaram, A.P.
              </p>
            </div>
          </div>

          {/* Center: AIKYAM Event Info */}
          <div className="text-center md:text-right">
            <p className="font-semibold text-indigo-300 flex items-center justify-center md:justify-end gap-1.5">
              <Award className="w-3.5 h-3.5 text-indigo-400" />
              <span>AIKYAM 2K26 • Annual Techno-Cultural Symposium</span>
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Official Live Event Scoring & Real-Time Ranking System
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 SRKR Engineering College. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-slate-300 transition-colors"
            >
              Public Leaderboard
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('/admin')}
              className="hover:text-slate-300 transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="w-3 h-3 text-slate-400" />
              Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
