# 🧩 Sudoku Masters

A feature-rich, modern Sudoku web application built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

---

## 🚀 Features (Current)

- **Classic Sudoku Gameplay** — Full 9×9 Sudoku board with input validation
- **Number Pad** — On-screen number pad for easy input
- **Notes Mode** — Add pencil marks / candidate numbers to cells
- **Rules Modal** — In-app rules reference for new players
- **Daily Streaks** — Track your daily play streaks
- **Contest Mode** — Competitive timed mode for challenge seekers
- **Sudoku Masters Modal** — Leaderboard / masters showcase
- **Confetti Celebration** — Confetti animation on puzzle completion
- **Responsive Design** — Works on desktop and mobile

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool & Dev Server |
| Tailwind CSS v4 | Styling |
| lucide-react | Icons |
| canvas-confetti | Completion animation |

---

## 📁 Project Structure

src/
├── app/
│   ├── App.tsx                  # Root component
│   └── components/
│       ├── ContestMode.tsx      # Timed contest gameplay
│       ├── DailyStreaks.tsx     # Daily streak tracker
│       ├── NotesSection.tsx     # Notes / pencil mark UI
│       ├── NumberPad.tsx        # On-screen number input
│       ├── RulesModal.tsx       # Game rules popup
│       └── SudokuMastersModel.tsx  # Masters leaderboard modal
└── utils/
    └── sudoku.ts                # Sudoku generation & solving logic
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

# Clone the repository
git clone https://github.com/your-username/sudoku-masters.git
cd sudoku-masters

# Install dependencies
npm install

### Running Locally

npm run dev

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

npm run build

### Preview Production Build

npm run preview

---

## 📦 Dependencies

# Runtime 
npm install lucide-react canvas-confetti

# Dev
npm install -D @tailwindcss/vite @types/node


---

## 🔮 Upcoming Features

- [ ] Hint system
- [ ] Dark / Light theme toggle
- [ ] Puzzle history & statistics
- [ ] Save & resume game progress
- [ ] Online multiplayer / contest rooms

---

## 🤝 Contributing

This project is under active development. Feel free to open issues or submit pull requests.

1. Fork the repo
2. Create your feature branch (`git checkout -b feat/your-feature`)
3. Commit your changes (`git commit -m 'feat: add your feature'`)
4. Push to the branch (`git push origin feat/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> Built with ❤️ — More features coming soon!
