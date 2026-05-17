import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Note {
  id: string;
  date: string;
  content: string;
}

interface NotesSectionProps {
  notes: Note[];
  onAddNote: (content: string) => void;
  onDeleteNote: (id: string) => void;
}

export default function NotesSection({ notes, onAddNote, onDeleteNote }: NotesSectionProps) {
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(newNote.trim());
      setNewNote('');
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg h-full flex flex-col">
      <h3 className="text-xl font-bold mb-4">My Mistakes Journal</h3>

      <div className="mb-4">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write down what you learned today..."
          className="w-full p-3 border-2 border-gray-300 rounded-lg resize-none focus:border-blue-500 focus:outline-none"
          rows={3}
        />
        <button
          onClick={handleAddNote}
          className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Note
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        {notes.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No notes yet. Start tracking your learning journey!</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs text-gray-500">{note.date}</p>
                <button
                  onClick={() => onDeleteNote(note.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-700 text-sm whitespace-pre-wrap">{note.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}