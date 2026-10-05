import { Team, ValidationResult } from '../types';

const STORAGE_KEY = 'aikyam_2k26_leaderboard_teams_v1';
const AUTH_KEY = 'aikyam_2k26_admin_auth_token';
const CHANNEL_NAME = 'aikyam_leaderboard_channel';

export const INITIAL_SAMPLE_TEAMS: Team[] = [
  { id: 'team-1', name: 'Team Phoenix', points: 850, updatedAt: 1728000000000 },
  { id: 'team-2', name: 'Team Titans', points: 720, updatedAt: 1728000001000 },
  { id: 'team-3', name: 'Team Mavericks', points: 650, updatedAt: 1728000002000 },
  { id: 'team-4', name: 'Team Innovators', points: 540, updatedAt: 1728000003000 },
  { id: 'team-5', name: 'Team Warriors', points: 480, updatedAt: 1728000004000 },
];

let broadcastChannel: BroadcastChannel | null = null;
try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    broadcastChannel = new BroadcastChannel(CHANNEL_NAME);
  }
} catch {
  // BroadcastChannel might fail in restricted environments
  broadcastChannel = null;
}

const notifySubscribers = () => {
  if (broadcastChannel) {
    try {
      broadcastChannel.postMessage({ type: 'TEAMS_UPDATED', timestamp: Date.now() });
    } catch {
      // Ignore broadcast errors
    }
  }
};

/**
 * Sorts teams by points descending. If points are tied, sorts by earlier updatedAt or name.
 * Automatically computes ranks (#1, #2, #3, ...)
 */
export function sortAndRankTeams(teams: Team[]): Team[] {
  const sorted = [...teams].sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    return a.name.localeCompare(b.name);
  });

  return sorted.map((team, index) => ({
    ...team,
    rank: index + 1,
  }));
}

/**
 * Retrieves teams from localStorage or initializes with sample teams.
 */
export function getStoredTeams(): Team[] {
  if (typeof window === 'undefined') {
    return sortAndRankTeams(INITIAL_SAMPLE_TEAMS);
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // First run: save sample teams
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_TEAMS));
      return sortAndRankTeams(INITIAL_SAMPLE_TEAMS);
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return sortAndRankTeams(parsed);
    }
  } catch (err) {
    console.error('Failed to read leaderboard from localStorage', err);
  }

  return sortAndRankTeams(INITIAL_SAMPLE_TEAMS);
}

/**
 * Validates team data according to rules:
 * - Non-empty team name
 * - Duplicate team name check (case-insensitive)
 * - Valid points (numeric and >= 0)
 */
export function validateTeam(
  name: string,
  points: number | string,
  excludeId?: string,
  currentTeams?: Team[]
): ValidationResult {
  const trimmedName = name.trim();
  if (!trimmedName) {
    return { isValid: false, error: 'Team name cannot be empty.' };
  }

  if (trimmedName.length > 50) {
    return { isValid: false, error: 'Team name cannot exceed 50 characters.' };
  }

  const teams = currentTeams || getStoredTeams();
  const duplicate = teams.find(
    (t) => t.id !== excludeId && t.name.trim().toLowerCase() === trimmedName.toLowerCase()
  );
  if (duplicate) {
    return { isValid: false, error: `A team named "${duplicate.name}" already exists.` };
  }

  const numericPoints = typeof points === 'number' ? points : Number(points);
  if (isNaN(numericPoints) || points === '') {
    return { isValid: false, error: 'Points must be a valid number.' };
  }

  if (numericPoints < 0) {
    return { isValid: false, error: 'Points cannot be negative.' };
  }

  if (!Number.isInteger(numericPoints)) {
    return { isValid: false, error: 'Points must be a whole number.' };
  }

  return { isValid: true };
}

/**
 * Saves teams array to localStorage and broadcasts update.
 */
function saveTeams(teams: Team[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(teams));
    notifySubscribers();
  } catch (err) {
    console.error('Failed to save teams to localStorage', err);
  }
}

/**
 * Adds a new team with validation.
 */
export function addTeam(
  name: string,
  points: number
): { success: boolean; error?: string; team?: Team } {
  const currentTeams = getStoredTeams();
  const validation = validateTeam(name, points, undefined, currentTeams);
  if (!validation.isValid) {
    return { success: false, error: validation.error };
  }

  const newTeam: Team = {
    id: `team-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: name.trim(),
    points: Math.round(Number(points)),
    updatedAt: Date.now(),
  };

  const updatedTeams = [...currentTeams, newTeam];
  saveTeams(updatedTeams);
  return { success: true, team: newTeam };
}

/**
 * Updates an existing team's name and/or points with validation.
 */
export function updateTeam(
  id: string,
  name: string,
  points: number
): { success: boolean; error?: string } {
  const currentTeams = getStoredTeams();
  const targetIndex = currentTeams.findIndex((t) => t.id === id);
  if (targetIndex === -1) {
    return { success: false, error: 'Team not found.' };
  }

  const validation = validateTeam(name, points, id, currentTeams);
  if (!validation.isValid) {
    return { success: false, error: validation.error };
  }

  const updatedTeams = currentTeams.map((t) =>
    t.id === id
      ? {
          ...t,
          name: name.trim(),
          points: Math.round(Number(points)),
          updatedAt: Date.now(),
        }
      : t
  );

  saveTeams(updatedTeams);
  return { success: true };
}

/**
 * Adjusts an existing team's points by a delta value (e.g. +10, -10).
 */
export function adjustPoints(id: string, delta: number): { success: boolean; error?: string } {
  const currentTeams = getStoredTeams();
  const target = currentTeams.find((t) => t.id === id);
  if (!target) {
    return { success: false, error: 'Team not found.' };
  }

  const newPoints = target.points + delta;
  if (newPoints < 0) {
    return { success: false, error: 'Points cannot be negative.' };
  }

  return updateTeam(id, target.name, newPoints);
}

/**
 * Deletes a team by ID.
 */
export function deleteTeam(id: string): { success: boolean; error?: string } {
  const currentTeams = getStoredTeams();
  const targetIndex = currentTeams.findIndex((t) => t.id === id);
  if (targetIndex === -1) {
    return { success: false, error: 'Team not found.' };
  }

  const updatedTeams = currentTeams.filter((t) => t.id !== id);
  saveTeams(updatedTeams);
  return { success: true };
}

/**
 * Resets the teams list back to the sample teams.
 */
export function resetToSampleTeams(): Team[] {
  saveTeams(INITIAL_SAMPLE_TEAMS);
  return sortAndRankTeams(INITIAL_SAMPLE_TEAMS);
}

/**
 * Subscribes to live updates via BroadcastChannel and window storage events.
 */
export function subscribeToLeaderboard(callback: () => void): () => void {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      callback();
    }
  };

  const handleBroadcast = (event: MessageEvent) => {
    if (event.data?.type === 'TEAMS_UPDATED') {
      callback();
    }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorage);
    if (broadcastChannel) {
      broadcastChannel.addEventListener('message', handleBroadcast);
    }
  }

  return () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', handleStorage);
      if (broadcastChannel) {
        broadcastChannel.removeEventListener('message', handleBroadcast);
      }
    }
  };
}

/* ==========================================================================
   ADMIN AUTHENTICATION
   ========================================================================== */

/**
 * Credentials for the event administrator.
 * In a college festival setup, these are kept secure and never rendered to public views.
 */
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'aikyam2026',
};

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const token = sessionStorage.getItem(AUTH_KEY);
    return token === 'authenticated_aikyam_admin_session';
  } catch {
    return false;
  }
}

export function loginAdmin(username: string, password: string): { success: boolean; error?: string } {
  if (!username.trim()) {
    return { success: false, error: 'Username is required.' };
  }
  if (!password) {
    return { success: false, error: 'Password is required.' };
  }

  if (
    username.trim().toLowerCase() === ADMIN_CREDENTIALS.username.toLowerCase() &&
    password === ADMIN_CREDENTIALS.password
  ) {
    try {
      sessionStorage.setItem(AUTH_KEY, 'authenticated_aikyam_admin_session');
    } catch {
      // Storage error
    }
    return { success: true };
  }

  return { success: false, error: 'Invalid username or password. Please verify your credentials.' };
}

export function logoutAdmin(): void {
  try {
    sessionStorage.removeItem(AUTH_KEY);
  } catch {
    // Storage error
  }
}
