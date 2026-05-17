import { Award, X } from 'lucide-react';
import { useState } from 'react';

interface SudokuMastersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const sudokuMasters = [
  {
    name: 'Thomas Snyder',
    title: 'Four-time World Sudoku Champion',
    achievement: 'Won the World Sudoku Championship in 2007, 2008, 2009, and 2011',
    fact: 'Known for his incredible speed-solving abilities, Thomas can solve expert-level puzzles in under 2 minutes. He uses advanced techniques like X-Wings, Swordfish, and Coloring to crack the toughest puzzles.',
    strategy: 'His signature approach involves scanning for naked and hidden pairs first, then progressing to more complex pattern recognition.'
  },
  {
    name: 'Jan Mrozowski',
    title: 'World Sudoku Champion 2009',
    achievement: 'Champion at the 4th World Sudoku Championship in Žilina, Slovakia',
    fact: 'Jan is renowned for his consistency and accuracy. He rarely makes mistakes even under extreme time pressure, making him one of the most reliable solvers in competitive Sudoku.',
    strategy: 'He emphasizes the importance of maintaining a clear mental map of the entire grid and uses systematic elimination techniques.'
  },
  {
    name: 'Kota Morinishi',
    title: 'Multiple-time Japanese Sudoku Champion',
    achievement: 'Dominated Japanese national championships and represented Japan internationally',
    fact: 'Kota holds records for solving certain Sudoku variants and is particularly skilled at irregular Sudoku patterns. He developed his own notation system for tracking candidates.',
    strategy: 'Known for his pencilmarking technique, he meticulously notes all possibilities before making any moves.'
  },
  {
    name: 'Tiit Vunk',
    title: 'Estonian Sudoku Grand Master',
    achievement: 'Multiple Estonian champion and international competitor',
    fact: 'Tiit is a mathematics professor who applies graph theory and set theory to Sudoku solving. He has published papers on the mathematical properties of Sudoku puzzles.',
    strategy: 'Uses a hybrid approach combining logical deduction with mathematical pattern recognition.'
  },
  {
    name: 'Palmer Mebane',
    title: 'US Sudoku Champion',
    achievement: 'Winner of the US Sudoku Team and multiple national titles',
    fact: 'Palmer can solve a 6-star difficulty puzzle in under 4 minutes. He is also an expert in Sudoku variants like Killer Sudoku and Sudoku X.',
    strategy: 'Focuses on finding the "critical cells" that unlock the rest of the puzzle, often using advanced techniques like XY-Chains.'
  },
  {
    name: 'Jakub Ondrousek',
    title: 'Czech Sudoku Champion',
    achievement: 'Won Czech national championships and performed excellently in world competitions',
    fact: 'Jakub is known for his ability to solve puzzles mentally without writing down candidates, a skill that requires exceptional working memory and spatial reasoning.',
    strategy: 'Practices visualization techniques to "see" the completed grid before physically filling in numbers.'
  }
];

export default function SudokuMastersModal({ isOpen, onClose }: SudokuMastersModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const currentMaster = sudokuMasters[currentIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-yellow-100 to-orange-100 border-b border-orange-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Award className="w-8 h-8 text-yellow-600" />
            Sudoku Masters Hall of Fame
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-white rounded-xl p-6 shadow-lg mb-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{currentMaster.name}</h3>
                <p className="text-yellow-600 font-semibold">{currentMaster.title}</p>
              </div>
              <div className="bg-yellow-100 px-3 py-1 rounded-full text-sm font-semibold text-yellow-700">
                {currentIndex + 1} of {sudokuMasters.length}
              </div>
            </div>

            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-bold text-gray-800 mb-1">🏆 Achievement</h4>
                <p>{currentMaster.achievement}</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-1">💡 Interesting Fact</h4>
                <p>{currentMaster.fact}</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-1">🎯 Signature Strategy</h4>
                <p>{currentMaster.strategy}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setCurrentIndex((currentIndex - 1 + sudokuMasters.length) % sudokuMasters.length)}
              className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentIndex((currentIndex + 1) % sudokuMasters.length)}
              className="flex-1 bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}