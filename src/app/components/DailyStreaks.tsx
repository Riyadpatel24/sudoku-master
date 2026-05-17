import { CloudSun, Moon, Sun } from 'lucide-react';
import { TimeOfDay } from '../utils/dailyPuzzle';

interface DailyStreaksProps {
  completedToday: {
    morning: boolean;
    afternoon: boolean;
    night: boolean;
  };
  currentStreak: number;
  bestStreak: number;
}

export function getTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  return 'night';
}

export default function DailyStreaks({ completedToday, currentStreak, bestStreak }: DailyStreaksProps) {
  const timeOfDay = getTimeOfDay();

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4">Daily Streaks</h3>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className={`text-center p-4 rounded-lg ${completedToday.morning ? 'bg-green-100' : 'bg-gray-100'} ${timeOfDay === 'morning' ? 'ring-2 ring-blue-500' : ''}`}>
          <Sun className={`w-8 h-8 mx-auto mb-2 ${completedToday.morning ? 'text-green-600' : 'text-gray-400'}`} />
          <p className="text-sm font-semibold">Morning</p>
          <p className="text-xs text-gray-600">6 AM - 12 PM</p>
          {completedToday.morning && <p className="text-green-600 font-bold mt-1">✓</p>}
        </div>

        <div className={`text-center p-4 rounded-lg ${completedToday.afternoon ? 'bg-green-100' : 'bg-gray-100'} ${timeOfDay === 'afternoon' ? 'ring-2 ring-blue-500' : ''}`}>
          <CloudSun className={`w-8 h-8 mx-auto mb-2 ${completedToday.afternoon ? 'text-green-600' : 'text-gray-400'}`} />
          <p className="text-sm font-semibold">Afternoon</p>
          <p className="text-xs text-gray-600">12 PM - 6 PM</p>
          {completedToday.afternoon && <p className="text-green-600 font-bold mt-1">✓</p>}
        </div>

        <div className={`text-center p-4 rounded-lg ${completedToday.night ? 'bg-green-100' : 'bg-gray-100'} ${timeOfDay === 'night' ? 'ring-2 ring-blue-500' : ''}`}>
          <Moon className={`w-8 h-8 mx-auto mb-2 ${completedToday.night ? 'text-green-600' : 'text-gray-400'}`} />
          <p className="text-sm font-semibold">Night</p>
          <p className="text-xs text-gray-600">6 PM - 6 AM</p>
          {completedToday.night && <p className="text-green-600 font-bold mt-1">✓</p>}
        </div>
      </div>

      <div className="flex justify-around text-center">
        <div>
          <p className="text-2xl font-bold text-blue-600">{currentStreak}</p>
          <p className="text-sm text-gray-600">Current Streak</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-purple-600">{bestStreak}</p>
          <p className="text-sm text-gray-600">Best Streak</p>
        </div>
      </div>
    </div>
  );
}