import React, { useState, useRef } from 'react';
import { Team } from '../types';
import { useLeaderboard } from '../context/LeaderboardContext';
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  PlusCircle,
  MinusCircle,
  HelpCircle,
  Image as ImageIcon,
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateHome }) => {
  const {
    teams,
    addTeam,
    updateTeam,
    deleteTeam,
    adjustPoints,
    resetTeams,
    customLogo,
    updateCustomLogo,
    resetCustomLogo,
    lastUpdated,
  } = useLeaderboard();

  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          updateCustomLogo(result);
          showToast('success', 'Official logo updated successfully!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add Team form state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamPoints, setNewTeamPoints] = useState<string>('0');
  const [addError, setAddError] = useState('');

  // Edit Team modal state
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [editName, setEditName] = useState('');
  const [editPoints, setEditPoints] = useState<string>('');
  const [editError, setEditError] = useState('');

  // Delete confirmation modal state
  const [deletingTeam, setDeletingTeam] = useState<Team | null>(null);

  // Reset confirmation modal state
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Status notifications
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  };

  // Handle Add Team
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAddError('');

    const ptsNum = Number(newTeamPoints);
    const result = addTeam(newTeamName, ptsNum);

    if (result.success) {
      showToast('success', `Team "${newTeamName.trim()}" added successfully!`);
      setNewTeamName('');
      setNewTeamPoints('0');
      setShowAddModal(false);
    } else {
      setAddError(result.error || 'Failed to add team.');
    }
  };

  // Open Edit Modal
  const handleOpenEdit = (team: Team) => {
    setEditingTeam(team);
    setEditName(team.name);
    setEditPoints(team.points.toString());
    setEditError('');
  };

  // Handle Save Changes for Edit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeam) return;
    setEditError('');

    const ptsNum = Number(editPoints);
    const result = updateTeam(editingTeam.id, editName, ptsNum);

    if (result.success) {
      showToast('success', `Updated changes for "${editName.trim()}"!`);
      setEditingTeam(null);
    } else {
      setEditError(result.error || 'Failed to update team.');
    }
  };

  // Handle Delete Team
  const handleConfirmDelete = () => {
    if (!deletingTeam) return;

    const result = deleteTeam(deletingTeam.id);
    if (result.success) {
      showToast('success', `Team "${deletingTeam.name}" has been deleted.`);
      setDeletingTeam(null);
    } else {
      showToast('error', result.error || 'Failed to delete team.');
    }
  };

  // Quick Points Adjustment (+10, +50, -10)
  const handleQuickAdjust = (team: Team, delta: number) => {
    const result = adjustPoints(team.id, delta);
    if (result.success) {
      const sign = delta > 0 ? `+${delta}` : `${delta}`;
      showToast('success', `${team.name}: ${sign} points applied.`);
    } else {
      showToast('error', result.error || 'Could not adjust points.');
    }
  };

  // Handle Reset to Default Sample Teams
  const handleConfirmReset = () => {
    resetTeams();
    setShowResetConfirm(false);
    showToast('success', 'Reset to initial sample teams successfully.');
  };

  const formatPoints = (pts: number) => new Intl.NumberFormat('en-IN').format(pts);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Toast Notification Banner */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl backdrop-blur-md text-sm font-semibold transition-all duration-300 border ${
            toast.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
              : 'bg-rose-950/90 border-rose-500/50 text-rose-200'
          }`}
        >
          {toast.type === 'success' ? (
            <Check className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>AIKYAM 2K26 Event Management</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">ADMIN DASHBOARD</h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage teams, enter event scores, and publish real-time rankings to the main leaderboard.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-700/80 rounded-xl hover:bg-slate-800 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
            <span>View Public Leaderboard</span>
          </button>

          <input
            type="file"
            ref={logoInputRef}
            onChange={handleLogoUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => logoInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-cyan-300 hover:text-white bg-cyan-950/40 border border-cyan-800/50 rounded-xl hover:bg-cyan-900/50 transition-colors"
            title="Upload/Paste exact official event logo"
          >
            <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>Upload Exact Logo</span>
          </button>

          {customLogo && (
            <button
              onClick={() => {
                resetCustomLogo();
                showToast('success', 'Restored default logo');
              }}
              className="flex items-center gap-1 px-2.5 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-900/60 border border-slate-800 rounded-xl"
              title="Reset to default logo"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Logo</span>
            </button>
          )}

          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-rose-300 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-rose-900 transition-colors"
            title="Reset to default sample teams"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Sample Data</span>
          </button>

          <button
            onClick={() => {
              setAddError('');
              setShowAddModal(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Team</span>
          </button>
        </div>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-slate-400 font-medium">Registered Teams</span>
          <p className="text-2xl font-black text-white mt-1">{teams.length}</p>
        </div>
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-slate-400 font-medium">Leading Team</span>
          <p className="text-lg font-bold text-amber-300 mt-1 truncate">
            {teams[0]?.name || 'N/A'}
          </p>
        </div>
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-slate-400 font-medium">Top Score</span>
          <p className="text-2xl font-black text-indigo-300 mt-1 tabular-nums">
            {teams[0] ? formatPoints(teams[0].points) : 0}
          </p>
        </div>
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-slate-400 font-medium">Auto-Rank Status</span>
          <p className="text-sm font-bold text-emerald-400 mt-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Descending Sort Active
          </p>
        </div>
      </div>

      {/* Current Rankings Table */}
      <div className="rounded-2xl border border-slate-800 bg-[#0a0f26]/90 shadow-2xl overflow-hidden backdrop-blur-md">
        <div className="p-4 sm:p-5 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white tracking-wide">
              CURRENT EVENT RANKINGS
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800/40">
              Live Synchronized
            </span>
          </div>
          <span className="text-xs text-slate-400">
            Last sync: {lastUpdated.toLocaleTimeString()}
          </span>
        </div>

        {teams.length === 0 ? (
          <div className="p-12 text-center">
            <AlertTriangle className="w-8 h-8 text-slate-500 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-300">No teams have been added yet.</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Click the "+ Add New Team" button above to register participating teams.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 px-4 py-2 text-xs font-semibold text-indigo-300 bg-indigo-950/60 border border-indigo-800 rounded-xl hover:bg-indigo-900"
            >
              + Add First Team
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-xs font-semibold uppercase text-slate-400 tracking-wider">
                  <th className="py-3.5 px-4 text-center w-16">#</th>
                  <th className="py-3.5 px-4">Team Name</th>
                  <th className="py-3.5 px-4 text-right w-40">Points</th>
                  <th className="py-3.5 px-4 text-center w-36">Quick Score</th>
                  <th className="py-3.5 px-4 text-center w-36">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {teams.map((team) => {
                  const rank = team.rank ?? 0;
                  const isTop3 = rank <= 3;

                  return (
                    <tr
                      key={team.id}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Rank Number */}
                      <td className="py-3.5 px-4 text-center font-bold">
                        <span
                          className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold ${
                            rank === 1
                              ? 'bg-amber-400 text-slate-950 shadow-sm shadow-amber-400/30'
                              : rank === 2
                              ? 'bg-slate-300 text-slate-950'
                              : rank === 3
                              ? 'bg-amber-700 text-white'
                              : 'text-slate-400 bg-slate-800/60'
                          }`}
                        >
                          {rank}
                        </span>
                      </td>

                      {/* Team Name */}
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-200 group-hover:text-white">
                          {team.name}
                        </span>
                        {rank === 1 && (
                          <span className="ml-2 text-[10px] font-bold uppercase text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                            1st Place
                          </span>
                        )}
                      </td>

                      {/* Points */}
                      <td className="py-3.5 px-4 text-right font-extrabold text-indigo-300 tabular-nums">
                        {formatPoints(team.points)}
                      </td>

                      {/* Quick Adjust Buttons */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => handleQuickAdjust(team, 10)}
                            className="px-2 py-1 text-[11px] font-bold text-emerald-300 bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-800/50 rounded-md transition-colors"
                            title="Add 10 points"
                          >
                            +10
                          </button>
                          <button
                            onClick={() => handleQuickAdjust(team, 50)}
                            className="px-2 py-1 text-[11px] font-bold text-indigo-300 bg-indigo-950/50 hover:bg-indigo-900/60 border border-indigo-800/50 rounded-md transition-colors"
                            title="Add 50 points"
                          >
                            +50
                          </button>
                          <button
                            onClick={() => handleQuickAdjust(team, -10)}
                            disabled={team.points < 10}
                            className="px-2 py-1 text-[11px] font-bold text-slate-400 bg-slate-800/50 hover:bg-slate-700/60 border border-slate-700/50 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Deduct 10 points"
                          >
                            -10
                          </button>
                        </div>
                      </td>

                      {/* Actions: Edit & Delete */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => handleOpenEdit(team)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:text-white bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-800/60 rounded-lg transition-colors"
                            title="Edit Team Name and Points"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => setDeletingTeam(team)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-rose-400 hover:text-rose-100 bg-rose-950/40 hover:bg-rose-900/70 border border-rose-800/50 rounded-lg transition-colors"
                            title="Delete Team"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* =========================================================================
          MODAL: ADD NEW TEAM
         ========================================================================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl border border-slate-700 bg-gradient-to-b from-[#0f1738] to-[#090e24] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-400" />
                <span>Add New Team</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {addError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{addError}</span>
              </div>
            )}

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Team Name
                </label>
                <input
                  type="text"
                  required
                  value={newTeamName}
                  onChange={(e) => {
                    setNewTeamName(e.target.value);
                    setAddError('');
                  }}
                  placeholder="e.g. Team Phoenix"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Initial Points
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  required
                  value={newTeamPoints}
                  onChange={(e) => {
                    setNewTeamPoints(e.target.value);
                    setAddError('');
                  }}
                  placeholder="0"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Rank will be automatically computed based on points.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md shadow-indigo-600/30"
                >
                  Add Team
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: EDIT TEAM (Team Name & Points, Save Changes / Cancel)
         ========================================================================= */}
      {editingTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl border border-slate-700 bg-gradient-to-b from-[#0f1738] to-[#090e24] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-indigo-400" />
                <span>Edit Team</span>
              </h3>
              <button
                onClick={() => setEditingTeam(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {editError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{editError}</span>
              </div>
            )}

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Team Name
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => {
                    setEditName(e.target.value);
                    setEditError('');
                  }}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Points
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  required
                  value={editPoints}
                  onChange={(e) => {
                    setEditPoints(e.target.value);
                    setEditError('');
                  }}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingTeam(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md shadow-indigo-600/30 transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: DELETE CONFIRMATION
         ========================================================================= */}
      {deletingTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl border border-rose-900/60 bg-[#120a17] p-6 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-950/80 border border-rose-700/60 flex items-center justify-center text-rose-400 mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-white text-center">Confirm Team Deletion</h3>
            <p className="text-sm text-slate-300 text-center mt-2">
              Are you sure you want to delete <strong className="text-white">"{deletingTeam.name}"</strong>?
            </p>
            <p className="text-xs text-rose-400 text-center mt-1">
              This action cannot be undone and will immediately recalculate all rankings.
            </p>

            <div className="flex items-center justify-center gap-3 mt-6 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setDeletingTeam(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-md shadow-rose-600/30 cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: RESET SAMPLE TEAMS CONFIRMATION
         ========================================================================= */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl border border-slate-700 bg-[#0c122e] p-6 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-indigo-950/80 border border-indigo-700/60 flex items-center justify-center text-indigo-400 mx-auto mb-4">
              <RotateCcw className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-white text-center">Reset Sample Teams?</h3>
            <p className="text-sm text-slate-300 text-center mt-2">
              This will restore the 5 original demonstration teams (Team Phoenix, Team Titans, Team Mavericks, Team Innovators, Team Warriors) and their sample scores.
            </p>

            <div className="flex items-center justify-center gap-3 mt-6 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md cursor-pointer"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
