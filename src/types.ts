export interface Team {
  id: string;
  name: string;
  points: number;
  updatedAt: number;
  rank?: number;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export type CurrentRoute = '/' | '/admin' | '/admin/login';
