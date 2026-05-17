import confetti from 'canvas-confetti';
import { BookOpen, Calendar, CheckCircle, Dumbbell, RefreshCw, Target, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';
import ContestMode from './components/ContestMode';
import DailyStreaks, { getTimeOfDay } from './components/DailyStreaks';
import NotesSection from './components/NotesSection';
import NumberPad from './components/NumberPad';
import RulesModal from './components/RulesModal';
import SudokuBoard from './components/SudokuBoard';
import SudokuMastersModal from './components/SudokuMastersModal';
import { generateDailyPuzzle, loadDailyPuzzle, saveDailyPuzzle, TimeOfDay } from './utils/dailyPuzzle';
import { Board, checkSolution, Difficulty, generateSudoku, isBoardComplete } from './utils/sudoku';

interface Note {
  id: string;
  date: string;
  content: string;
}

interface DailyCompletion {
  date: string;
  morning: boolean;
  afternoon: boolean;
  night: boolean;
}

type GameMode = 'daily' | 'practice';

export default function App() {
  const [gameMode, setGameMode] = useState<GameMode>('daily');
  const [board, setBoard] = useState<Board | null>(null);
  const [solution, setSolution] = useState<number[][] | null>(null);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [isNoteMode, setIsNoteMode] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showContest, setShowContest] = useState(false);
  const [showMasters, setShowMasters] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [dailyCompletion, setDailyCompletion] = useState<DailyCompletion>({
    date: new Date().toDateString(),
    morning: false,
    afternoon: false,
    night: false
  });
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [hasSeenRules, setHasSeenRules] = useState(false);
  const [currentTimeOfDay, setCurrentTimeOfDay] = useState<TimeOfDay>(getTimeOfDay());

  useEffect(() => {
    const savedNotes = localStorage.getItem('sudoku-notes');
    if (savedNotes) setNotes(JSON.parse(savedNotes));

    const savedCompletion = localStorage.getItem('sudoku-daily-completion');
    if (savedCompletion) {
      const parsed = JSON.parse(savedCompletion);
      if (parsed.date === new Date().toDateString()) {
        setDailyCompletion(parsed);
      }
    }

    const savedStreak = localStorage.getItem('sudoku-current-streak');
    if (savedStreak) setCurrentStreak(parseInt(savedStreak));

    const savedBestStreak = localStorage.getItem('sudoku-best-streak');
    if (savedBestStreak) setBestStreak(parseInt(savedBestStreak));

    const savedHasSeenRules = localStorage.getItem('sudoku-has-seen-rules');
    if (savedHasSeenRules) {
      setHasSeenRules(true);
    } else {
      setShowRules(true);
    }

    loadDailyChallenge();

    const interval = setInterval(() => {
      const newTimeOfDay = getTimeOfDay();
      if (newTimeOfDay !== currentTimeOfDay) {
        setCurrentTimeOfDay(newTimeOfDay);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('sudoku-notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('sudoku-daily-completion', JSON.stringify(dailyCompletion));
  }, [dailyCompletion]);

  useEffect(() => {
    localStorage.setItem('sudoku-current-streak', currentStreak.toString());
  }, [currentStreak]);

  useEffect(() => {
    localStorage.setItem('sudoku-best-streak', bestStreak.toString());
  }, [bestStreak]);

  const loadDailyChallenge = () => {
    setGameMode('daily');
    const today = new Date().toDateString();
    const timeOfDay = getTimeOfDay();

    let saved = loadDailyPuzzle(today, timeOfDay);

    if (!saved) {
      const { puzzle, solution: sol } = generateDailyPuzzle(today, timeOfDay, 'medium');
      saveDailyPuzzle(today, timeOfDay, puzzle, sol);
      saved = { puzzle, solution: sol };
    }

    setBoard(saved.puzzle);
    setSolution(saved.solution);
    setDifficulty('medium');
    setSelectedCell(null);
  };

  const startPracticeMode = (newDifficulty: Difficulty) => {
    setGameMode('practice');
    const { puzzle, solution: sol } = generateSudoku(newDifficulty);
    setBoard(puzzle);
    setSolution(sol);
    setDifficulty(newDifficulty);
    setSelectedCell(null);
  };

  const handleCellClick = (row: number, col: number) => {
    if (!board || board[row][col].isInitial) return;
    setSelectedCell({ row, col });
  };

  const handleNumberClick = (num: number) => {
    if (!board || !selectedCell) return;

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
      newBoard[row][col].value = num;
      newBoard[row][col].notes = [];
    }

    setBoard(newBoard);

    if (isBoardComplete(newBoard) && solution && checkSolution(newBoard, solution)) {
      handleGameComplete();
    }
  };

  const handleEraseClick = () => {
    if (!board || !selectedCell) return;
    const { row, col } = selectedCell;
    if (board[row][col].isInitial) return;

    const newBoard = board.map(r => r.map(c => ({ ...c })));
    newBoard[row][col].value = 0;
    newBoard[row][col].notes = [];
    setBoard(newBoard);
  };

  const handleGameComplete = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (gameMode === 'daily') {
      const timeOfDay = getTimeOfDay();
      const today = new Date().toDateString();

      if (dailyCompletion.date !== today) {
        const newCompletion: DailyCompletion = {
          date: today,
          morning: timeOfDay === 'morning',
          afternoon: timeOfDay === 'afternoon',
          night: timeOfDay === 'night'
        };
        setDailyCompletion(newCompletion);

        const newStreak = 1;
        setCurrentStreak(newStreak);
        if (newStreak > bestStreak) setBestStreak(newStreak);
      } else {
        const newCompletion = { ...dailyCompletion };
        const wasComplete = dailyCompletion.morning && dailyCompletion.afternoon && dailyCompletion.night;

        newCompletion[timeOfDay] = true;

        const isNowComplete = newCompletion.morning && newCompletion.afternoon && newCompletion.night;

        if (!wasComplete && isNowComplete) {
          const newStreak = currentStreak + 1;
          setCurrentStreak(newStreak);
          if (newStreak > bestStreak) setBestStreak(newStreak);
        }

        setDailyCompletion(newCompletion);
      }
    }
  };

  const handleAddNote = (content: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      content
    };
    setNotes([newNote, ...notes]);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleContestWin = () => {
    setTimeout(() => {
      setShowContest(false);
      setShowMasters(true);
    }, 1500);
  };

  const handleCloseRules = () => {
    setShowRules(false);
    if (!hasSeenRules) {
      setHasSeenRules(true);
      localStorage.setItem('sudoku-has-seen-rules', 'true');
    }
  };

  const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'expert', 'extreme'];

  const isDailyPuzzleCompleted = () => {
    const today = new Date().toDateString();
    const timeOfDay = getTimeOfDay();
    return dailyCompletion.date === today && dailyCompletion[timeOfDay];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">Sudoku Master</h1>
          <p className="text-gray-600">Challenge your mind, track your progress</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-3">
                <button
                  onClick={loadDailyChallenge}
                  disabled={isDailyPuzzleCompleted()}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                    gameMode === 'daily'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } ${isDailyPuzzleCompleted() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Calendar className="w-4 h-4" />
                  Daily Challenge
                  {isDailyPuzzleCompleted() && <CheckCircle className="w-4 h-4" />}
                </button>
                <div className="flex gap-1 items-center">
                  <button
                    onClick={() => setGameMode('practice')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                      gameMode === 'practice'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Dumbbell className="w-4 h-4" />
                    Practice
                  </button>
                </div>
              </div>
            </div>

            {gameMode === 'practice' && (
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                <div className="flex gap-2">
                  {difficulties.map(diff => (
                    <button
                      key={diff}
                      onClick={() => startPracticeMode(diff)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                        difficulty === diff
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {diff.charAt(0).toUpperCase() + diff.slice(1)}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => startPracticeMode(difficulty)}
                  className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                  title="New Game"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            )}

            {gameMode === 'daily' && (
              <div className="mb-4 pb-4 border-b border-gray-200">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    <strong>Daily Challenge - {currentTimeOfDay.charAt(0).toUpperCase() + currentTimeOfDay.slice(1)}</strong>
                    {isDailyPuzzleCompleted() && (
                      <span className="ml-2 text-green-600 font-semibold">✓ Completed!</span>
                    )}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Complete puzzles in all three time periods each day to build your streak!
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-6 justify-center items-start">
              {board && (
                <>
                  <SudokuBoard
                    board={board}
                    onCellClick={handleCellClick}
                    selectedCell={selectedCell}
                    highlightErrors={true}
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

            {board && solution && isBoardComplete(board) && checkSolution(board, solution) && (
              <div className="mt-4 bg-green-100 border-2 border-green-500 rounded-lg p-4 text-center">
                <p className="text-green-800 font-bold text-xl flex items-center justify-center gap-2">
                  <CheckCircle className="w-6 h-6" />
                  Congratulations! Puzzle Completed!
                </p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <DailyStreaks
              completedToday={dailyCompletion}
              currentStreak={currentStreak}
              bestStreak={bestStreak}
            />

            <div className="bg-white rounded-xl p-6 shadow-lg space-y-3">
              <button
                onClick={() => setShowRules(true)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                Rules & Guide
              </button>

              <button
                onClick={() => setShowContest(true)}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <Trophy className="w-5 h-5" />
                Contest Mode
              </button>

              <button
                onClick={() => setShowMasters(true)}
                className="w-full bg-yellow-600 text-white py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2"
              >
                <Target className="w-5 h-5" />
                Sudoku Masters
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ height: '400px' }}>
          <NotesSection
            notes={notes}
            onAddNote={handleAddNote}
            onDeleteNote={handleDeleteNote}
          />
        </div>
      </div>

      <RulesModal isOpen={showRules} onClose={handleCloseRules} />
      <ContestMode isOpen={showContest} onClose={() => setShowContest(false)} onWin={handleContestWin} />
      <SudokuMastersModal isOpen={showMasters} onClose={() => setShowMasters(false)} />
    </div>
  );
}
