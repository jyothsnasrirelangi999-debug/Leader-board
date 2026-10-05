import React, { useState } from 'react';
import { useLeaderboard } from '../context/LeaderboardContext';
import { Lock, User, KeyRound, ShieldAlert, ArrowLeft, CheckCircle2, Eye, EyeOff } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
  onNavigateHome: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onNavigateHome }) => {
  const { login } = useLeaderboard();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    // Validate inputs
    if (!username.trim()) {
      setErrorMessage('Please enter the administrator username.');
      setIsSubmitting(false);
      return;
    }

    if (!password) {
      setErrorMessage('Please enter the administrator password.');
      setIsSubmitting(false);
      return;
    }

    const result = login(username, password);
    setIsSubmitting(false);

    if (result.success) {
      onSuccess();
    } else {
      setErrorMessage(result.error || 'Invalid credentials. Access denied.');
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 px-4">
      {/* Back button */}
      <button
        onClick={onNavigateHome}
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Return to Public Leaderboard</span>
      </button>

      {/* Login Card */}
      <div className="relative rounded-3xl border border-slate-800 bg-gradient-to-b from-[#0d1433] to-[#090e24] p-8 shadow-2xl shadow-indigo-950/40 backdrop-blur-xl">
        {/* Top ambient glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-20 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none"></div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/20">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Administrator Access</h2>
          <p className="text-xs text-slate-400 mt-1.5 uppercase tracking-wider font-semibold">
            AIKYAM 2K26 • Event Management Portal
          </p>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-rose-950/50 border border-rose-800/80 text-rose-200 text-sm flex items-start gap-3 animate-shake">
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-rose-300">Authentication Failed</p>
              <p className="text-xs text-rose-200/90 mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrorMessage('');
                }}
                placeholder="Enter admin username"
                className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage('');
                }}
                placeholder="Enter admin password"
                className="w-full pl-10 pr-10 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all duration-200 active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
          </button>
        </form>

        {/* Secure Credentials Note for Administrators */}
        <div className="mt-8 pt-5 border-t border-slate-800/80 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-[11px] text-indigo-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Authorized Event Coordinators Only</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Demo Credentials: Username <code className="text-slate-300 font-mono">admin</code> | Password <code className="text-slate-300 font-mono">aikyam2026</code>
          </p>
        </div>
      </div>
    </div>
  );
};
