import { Edit3, Eraser } from 'lucide-react';

interface NumberPadProps {
  onNumberClick: (num: number) => void;
  onEraseClick: () => void;
  isNoteMode: boolean;
  onToggleNoteMode: () => void;
}

export default function NumberPad({ onNumberClick, onEraseClick, isNoteMode, onToggleNoteMode }: NumberPadProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button
            key={num}
            onClick={() => onNumberClick(num)}
            className="w-12 h-12 bg-white border-2 border-gray-300 rounded-lg text-xl font-semibold hover:bg-blue-50 hover:border-blue-400 transition-colors"
          >
            {num}
          </button>
        ))}
        <button
          onClick={onEraseClick}
          className="w-12 h-12 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center hover:bg-red-50 hover:border-red-400 transition-colors"
        >
          <Eraser className="w-5 h-5" />
        </button>
        <button
          onClick={onToggleNoteMode}
          className={`w-12 h-12 border-2 rounded-lg flex items-center justify-center transition-colors ${
            isNoteMode
              ? 'bg-blue-500 border-blue-600 text-white'
              : 'bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-400'
          }`}
        >
          <Edit3 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}