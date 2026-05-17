/// <reference types="node" />

import { AlertCircle, Clock, Trophy, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Board, checkSolution, generateSudoku, isBoardComplete } from '../utils/sudoku';
import NumberPad from './NumberPad';
import SudokuBoard from './SudokuBoard';

interface ContestModeProps {
  isOpen: boolean;
  onClose: () => void;
  onWin: () => void;
}

export default function ContestMode({ isOpen, onClose, onWin }: ContestModeProps) {
  const [board, setBoard] = useState<Board | null>(null);
  const [solution, setSolution] = useState<number[][] | null>(null);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [isNoteMode, setIsNoteMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [mistakesLeft, setMistakesLeft] = useState(3);
  const [isActive, setIsActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (isOpen && !board) {
      startNewContest();
    }
  }, [isOpen]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0 && !gameOver) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setGameOver(true);
            setIsActive(false);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, gameOver]);

  const startNewContest = () => {
    const { puzzle, solution: sol } = generateSudoku('hard');
    setBoard(puzzle);
    setSolution(sol);
    setTimeLeft(600);
    setMistakesLeft(3);
    setIsActive(true);
    setGameOver(false);
    setSelectedCell(null);
  };

  const handleCellClick = (row: number, col: number) => {
    if (!board || board[row][col].isInitial || gameOver) return;
    setSelectedCell({ row, col });
  };

  const handleNumberClick = (num: number) => {
    if (!board || !selectedCell || !solution || gameOver) return;

    const { row, col } = selectedCell;
    if (board[row][col].isInitial) return;

    const newBoard = board.map(r => r.map(c => ({ ...c })));

    if (isNoteMode) {
      const notes = newBoard[row][col].notes;
      if (notes.includes(num)) {
        newBoard[row][col].notes = notes.filter(n => n !== num);
      } else {
        newBoard[row][col].notes = [...notes, num].sort();
      }
    } else {
      if (solution[row][col] !== num) {
        const newMistakes = mistakesLeft - 1;
        setMistakesLeft(newMistakes);
        if (newMistakes === 0) {
          setGameOver(true);
          setIsActive(false);
          return;
        }
      }

      newBoard[row][col].value = num;
      newBoard[row][col].notes = [];

      if (isBoardComplete(newBoard) && checkSolution(newBoard, solution)) {
        setGameOver(true);
        setIsActive(false);
        onWin();
      }
    }

    setBoard(newBoard);
  };

  const handleEraseClick = () => {
    if (!board || !selectedCell || gameOver) return;
    const { row, col } = selectedCell;
    if (board[row][col].isInitial) return;

    const newBoard = board.map(r => r.map(c => ({ ...c })));
    newBoard[row][col].value = 0;
    newBoard[row][col].notes = [];
    setBoard(newBoard);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Trophy className="w-8 h-8 text-yellow-500" />
            Contest Mode
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 bg-white rounded-lg p-4 flex items-center gap-3">
            <Clock className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Time Left</p>
              <p className={`text-2xl font-bold ${timeLeft < 60 ? 'text-red-600' : 'text-blue-600'}`}>
                {formatTime(timeLeft)}
              </p>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-orange-600" />
            <div>
              <p className="text-sm text-gray-600">Mistakes Left</p>
              <p className={`text-2xl font-bold ${mistakesLeft === 1 ? 'text-red-600' : 'text-orange-600'}`}>
                {mistakesLeft} / 3
              </p>
            </div>
          </div>
        </div>

        {gameOver && (
          <div className="mb-6 p-4 rounded-lg bg-white border-2 border-gray-300">
            {isBoardComplete(board!) && checkSolution(board!, solution!) ? (
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600 mb-2">🎉 Congratulations! 🎉</p>
                <p className="text-gray-700">
                  You completed the contest in {formatTime(600 - timeLeft)} with {3 - mistakesLeft} mistakes!
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600 mb-2">Game Over!</p>
                <p className="text-gray-700">
                  {mistakesLeft === 0 ? 'Too many mistakes!' : 'Time ran out!'}
                </p>
              </div>
            )}
            <button
              onClick={startNewContest}
              className="mt-4 w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        <div className="flex gap-6 justify-center">
          {board && (
            <>
              <SudokuBoard
                board={board}
                onCellClick={handleCellClick}
                selectedCell={selectedCell}
                highlightErrors={false}
                solution={solution || undefined}
              />
              <NumberPad
                onNumberClick={handleNumberClick}
                onEraseClick={handleEraseClick}
                isNoteMode={isNoteMode}
                onToggleNoteMode={() => setIsNoteMode(!isNoteMode)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}