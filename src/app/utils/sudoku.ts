export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert' | 'extreme';

export interface Cell {
  value: number;
  isInitial: boolean;
  notes: number[];
  isCorrect?: boolean;
}

export type Board = Cell[][];

const EMPTY = 0;

function isValid(board: number[][], row: number, col: number, num: number): boolean {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num) {
      return false;
    }
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) {
        return false;
      }
    }
  }

  return true;
}

function solveSudoku(board: number[][]): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === EMPTY) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) {
              return true;
            }
            board[row][col] = EMPTY;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function generateFullBoard(): number[][] {
  const board: number[][] = Array(9).fill(null).map(() => Array(9).fill(EMPTY));

  const fillBoard = (board: number[][]): boolean => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === EMPTY) {
          const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
          for (const num of numbers) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (fillBoard(board)) {
                return true;
              }
              board[row][col] = EMPTY;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  fillBoard(board);
  return board;
}

function removeNumbers(board: number[][], difficulty: Difficulty): number[][] {
  const cellsToRemove: { [key in Difficulty]: number } = {
    easy: 35,
    medium: 45,
    hard: 52,
    expert: 58,
    extreme: 64
  };

  const puzzleBoard = board.map(row => [...row]);
  const positions: [number, number][] = [];

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      positions.push([i, j]);
    }
  }

  positions.sort(() => Math.random() - 0.5);

  for (let i = 0; i < cellsToRemove[difficulty]; i++) {
    const [row, col] = positions[i];
    puzzleBoard[row][col] = EMPTY;
  }

  return puzzleBoard;
}

export function generateSudoku(difficulty: Difficulty): { puzzle: Board; solution: number[][] } {
  const fullBoard = generateFullBoard();
  const puzzleNumbers = removeNumbers(fullBoard, difficulty);

  const puzzle: Board = puzzleNumbers.map((row, i) =>
    row.map((cell, j) => ({
      value: cell,
      isInitial: cell !== EMPTY,
      notes: []
    }))
  );

  return { puzzle, solution: fullBoard };
}

export function checkSolution(board: Board, solution: number[][]): boolean {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j].value !== solution[i][j]) {
        return false;
      }
    }
  }
  return true;
}

export function isBoardComplete(board: Board): boolean {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j].value === EMPTY) {
        return false;
      }
    }
  }
  return true;
}

export function hasConflicts(board: Board, row: number, col: number): boolean {
  const value = board[row][col].value;
  if (value === EMPTY) return false;

  for (let x = 0; x < 9; x++) {
    if (x !== col && board[row][x].value === value) return true;
    if (x !== row && board[x][col].value === value) return true;
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const r = startRow + i;
      const c = startCol + j;
      if ((r !== row || c !== col) && board[r][c].value === value) {
        return true;
      }
    }
  }

  return false;
}