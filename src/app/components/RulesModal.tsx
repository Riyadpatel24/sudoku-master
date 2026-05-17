import { X } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RulesModal({ isOpen, onClose }: RulesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Sudoku Rules & Guide</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <section>
            <h3 className="text-xl font-semibold mb-3">Basic Rules</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="font-bold mr-2">1.</span>
                <span>Each row must contain the numbers 1-9 without repetition.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">2.</span>
                <span>Each column must contain the numbers 1-9 without repetition.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">3.</span>
                <span>Each 3×3 box must contain the numbers 1-9 without repetition.</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">How to Play</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="font-bold mr-2">•</span>
                <span>Click on any empty cell to select it.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">•</span>
                <span>Click a number on the number pad to fill the cell.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">•</span>
                <span>Use the eraser button to clear a cell.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">•</span>
                <span>Toggle note mode to add candidate numbers to cells.</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Solving Strategies</h3>
            <div className="space-y-3 text-gray-700">
              <div>
                <h4 className="font-semibold">Naked Singles</h4>
                <p className="text-sm">When a cell can only contain one possible number.</p>
              </div>
              <div>
                <h4 className="font-semibold">Hidden Singles</h4>
                <p className="text-sm">When a number can only go in one cell within a row, column, or box.</p>
              </div>
              <div>
                <h4 className="font-semibold">Scanning</h4>
                <p className="text-sm">Look for numbers that are missing in rows, columns, and boxes.</p>
              </div>
              <div>
                <h4 className="font-semibold">Cross-hatching</h4>
                <p className="text-sm">Eliminate possibilities by checking intersecting rows and columns.</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Daily Streaks</h3>
            <p className="text-gray-700">
              Complete puzzles during morning (6 AM - 12 PM), afternoon (12 PM - 6 PM), and
              night (6 PM - 6 AM) to build your daily streak. Try to complete all three each day!
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Contest Mode</h3>
            <p className="text-gray-700">
              Challenge yourself with timed puzzles and limited mistakes. Complete the puzzle
              before time runs out and with mistakes under the limit to win and unlock fascinating
              facts about Sudoku masters!
            </p>
          </section>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Got it! Let's Play
          </button>
        </div>
      </div>
    </div>
  );
}