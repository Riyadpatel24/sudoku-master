import { Board, hasConflicts } from '../utils/sudoku';

interface SudokuBoardProps {
  board: Board;
  onCellClick: (row: number, col: number) => void;
  selectedCell: { row: number; col: number } | null;
  highlightErrors: boolean;
  solution?: number[][];
}

export default function SudokuBoard({ board, onCellClick, selectedCell, highlightErrors, solution }: SudokuBoardProps) {
  return (
    <div className="inline-block bg-black p-2 rounded-lg">
      <div className="grid grid-cols-9 gap-0">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
            const hasError = highlightErrors && hasConflicts(board, rowIndex, colIndex);
            const isCorrect = !cell.isInitial && cell.value !== 0 && solution && cell.value === solution[rowIndex][colIndex];
            const isInSameRow = selectedCell?.row === rowIndex;
            const isInSameCol = selectedCell?.col === colIndex;
            const isInSameBox =
              selectedCell &&
              Math.floor(selectedCell.row / 3) === Math.floor(rowIndex / 3) &&
              Math.floor(selectedCell.col / 3) === Math.floor(colIndex / 3);

            const borderClasses = [
              colIndex % 3 === 0 ? 'border-l-2 border-l-black' : 'border-l border-l-gray-400',
              colIndex === 8 ? 'border-r-2 border-r-black' : '',
              rowIndex % 3 === 0 ? 'border-t-2 border-t-black' : 'border-t border-t-gray-400',
              rowIndex === 8 ? 'border-b-2 border-b-black' : ''
            ].join(' ');

            return (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => onCellClick(rowIndex, colIndex)}
                className={`
                  w-12 h-12 flex items-center justify-center text-lg font-semibold
                  ${borderClasses}
                  ${hasError ? 'bg-red-100 text-red-600' : isCorrect ? 'bg-green-100 text-green-700' : isSelected ? 'bg-blue-200' : isInSameRow || isInSameCol || isInSameBox ? 'bg-blue-50' : 'bg-white'}
                  ${cell.isInitial ? 'text-black font-bold' : hasError ? 'text-red-600' : isCorrect ? 'text-green-700' : 'text-blue-600'}
                  hover:bg-blue-100 transition-colors
                  ${!cell.isInitial ? 'cursor-pointer' : 'cursor-default'}
                `}
              >
                {cell.value !== 0 ? (
                  cell.value
                ) : cell.notes.length > 0 ? (
                  <div className="grid grid-cols-3 gap-0 w-full h-full text-[8px] text-gray-500 p-0.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                      <div key={num} className="flex items-center justify-center">
                        {cell.notes.includes(num) ? num : ''}
                      </div>
                    ))}
                  </div>
                ) : null}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}