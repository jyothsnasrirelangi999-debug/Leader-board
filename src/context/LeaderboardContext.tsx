import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Team } from '../types';
import {
  getStoredTeams,
  subscribeToLeaderboard,
  addTeam as addTeamStorage,
  updateTeam as updateTeamStorage,
  deleteTeam as deleteTeamStorage,
  adjustPoints as adjustPointsStorage,
  resetToSampleTeams as resetSampleStorage,
  isAdminAuthenticated as checkAuth,
  loginAdmin as loginStorage,
  logoutAdmin as logoutStorage,
} from '../services/leaderboardStorage';

interface LeaderboardContextType {
  teams: Team[];
  isLoading: boolean;
  isAdmin: boolean;
  refreshTeams: () => void;
  addTeam: (name: string, points: number) => { success: boolean; error?: string; team?: Team };
  updateTeam: (id: string, name: string, points: number) => { success: boolean; error?: string };
  deleteTeam: (id: string) => { success: boolean; error?: string };
  adjustPoints: (id: string, delta: number) => { success: boolean; error?: string };
  resetTeams: () => void;
  login: (u: string, p: string) => { success: boolean; error?: string };
  logout: () => void;
  lastUpdated: Date;
}

const LeaderboardContext = createContext<LeaderboardContextType | undefined>(undefined);

export const LeaderboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const loadData = useCallback(() => {
    const data = getStoredTeams();
    setTeams(data);
    setIsAdmin(checkAuth());
    setLastUpdated(new Date());
  }, []);

  useEffect(() => {
    loadData();
    setIsLoading(false);

    // Subscribe to multi-tab and broadcast updates
    const unsubscribe = subscribeToLeaderboard(() => {
      loadData();
    });

    // Also poll every 3 seconds to guarantee freshness
    const interval = setInterval(() => {
      loadData();
    }, 3000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [loadData]);

  const handleAddTeam = useCallback((name: string, points: number) => {
    const res = addTeamStorage(name, points);
    if (res.success) {
      loadData();
    }
    return res;
  }, [loadData]);

  const handleUpdateTeam = useCallback((id: string, name: string, points: number) => {
    const res = updateTeamStorage(id, name, points);
    if (res.success) {
      loadData();
    }
    return res;
  }, [loadData]);

  const handleDeleteTeam = useCallback((id: string) => {
    const res = deleteTeamStorage(id);
    if (res.success) {
      loadData();
    }
    return res;
  }, [loadData]);

  const handleAdjustPoints = useCallback((id: string, delta: number) => {
    const res = adjustPointsStorage(id, delta);
    if (res.success) {
      loadData();
    }
    return res;
  }, [loadData]);

  const handleResetTeams = useCallback(() => {
    resetSampleStorage();
    loadData();
  }, [loadData]);

  const handleLogin = useCallback((u: string, p: string) => {
    const res = loginStorage(u, p);
    if (res.success) {
      setIsAdmin(true);
    }
    return res;
  }, []);

  const handleLogout = useCallback(() => {
    logoutStorage();
    setIsAdmin(false);
  }, []);

  return (
    <LeaderboardContext.Provider
      value={{
        teams,
        isLoading,
        isAdmin,
        refreshTeams: loadData,
        addTeam: handleAddTeam,
        updateTeam: handleUpdateTeam,
        deleteTeam: handleDeleteTeam,
        adjustPoints: handleAdjustPoints,
        resetTeams: handleResetTeams,
        login: handleLogin,
        logout: handleLogout,
        lastUpdated,
      }}
    >
      {children}
    </LeaderboardContext.Provider>
  );
};

export const useLeaderboard = () => {
  const context = useContext(LeaderboardContext);
  if (!context) {
    throw new Error('useLeaderboard must be used within a LeaderboardProvider');
  }
  return context;
};
