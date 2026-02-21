# BinBuddy – Log Trash, Save the Planet 🌍

A fully **offline** mobile app to learn proper trash disposal through gamified logging. No AI, no backend—just you, your trash, and the planet.

## Features

- **Log Trash**: Select category → item → get disposal info, risks, decomposition time, and eco facts
- **Points & Streaks**: Earn points per item, build daily streaks (7, 30, 100, 365 day milestones)
- **Achievements**: Plastic Protector, Compost Champion, Ocean Guardian, Zero Waste Warrior, Landfill Slayer, Carbon Crusher, and more
- **Dashboard**: Visual stats—total items, landfill diverted, CO₂ impact, trees saved, ocean pollution prevented
- **EcoDex**: Personal log of every item you’ve logged
- **Dark & Light Mode**: Toggle in the header (sun/moon icon)

## Categories & Items

- **Plastic**: Bottles, bags, straws, containers
- **Glass**: Bottles, jars  
- **Metal**: Aluminum cans, steel cans
- **Paper**: Newspaper, cardboard, paper towels
- **Organic**: Food scraps, coffee grounds
- **Electronic**: Batteries, old phones
- **Hazardous**: Paint, expired medication

All item info is stored in `data/trashItems.json`—easy to extend.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Install & Run

```bash
cd BinBuddy
npm install
npx expo start
```

Then:

- **iOS Simulator**: Press `i` in the terminal
- **Android Emulator**: Press `a` in the terminal  
- **Expo Go**: Scan the QR code with the Expo Go app on your phone

## Tech Stack

- **Expo** (React Native)
- **Expo Router** (file-based routing)
- **AsyncStorage** (local persistence)
- **TypeScript**

## Project Structure

```
BinBuddy/
├── app/
│   ├── (tabs)/          # Tab screens: Home, Dashboard, EcoDex, Achievements
│   ├── log/             # Log flow: category → item → confirm
│   └── _layout.tsx      # Root layout + AppProvider
├── context/
│   └── AppContext.tsx   # Global state, stats, achievements
├── data/
│   └── trashItems.json  # Item database
├── utils/
│   └── storage.ts       # AsyncStorage helpers
└── theme.ts             # Light/dark theme colors
```

## Adding Custom Items

Edit `data/trashItems.json` and add items under the appropriate category. Each item needs:

- `id`, `name`, `material`, `disposal` (recycle/compost/trash/hazardous/reuse)
- `riskHuman`, `riskAnimal`, `riskEnv`
- `decomposition`, `ecoFact`, `points`

---

*Built with 🌱 for a cleaner planet.*
