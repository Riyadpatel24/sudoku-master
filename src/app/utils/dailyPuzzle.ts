import { Board, Difficulty, generateSudoku } from './sudoku';

export type TimeOfDay = 'morning' | 'afternoon' | 'night';

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function seededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}

export function generateDailyPuzzle(date: string, timeOfDay: TimeOfDay, difficulty: Difficulty): { puzzle: Board; solution: number[][] } {
  const seed = hashString(`${date}-${timeOfDay}`);
  const random = seededRandom(seed);

  const originalRandom = Math.random;
  Math.random = random;

  const result = generateSudoku(difficulty);

  Math.random = originalRandom;

  return result;
}

export function getDailyPuzzleKey(date: string, timeOfDay: TimeOfDay): string {
  return `sudoku-daily-${date}-${timeOfDay}`;
}

export function saveDailyPuzzle(date: string, timeOfDay: TimeOfDay, puzzle: Board, solution: number[][]) {
  const key = getDailyPuzzleKey(date, timeOfDay);
  localStorage.setItem(key, JSON.stringify({ puzzle, solution }));
}

export function loadDailyPuzzle(date: string, timeOfDay: TimeOfDay): { puzzle: Board; solution: number[][] } | null {
  const key = getDailyPuzzleKey(date, timeOfDay);
  const saved = localStorage.getItem(key);
  if (saved) {
    return JSON.parse(saved);
  }
  return null;
}

export function getTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  return 'night';
}