import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  getStats,
  saveStats,
  getPersonalLog,
  addLogEntry as addLogEntryStorage,
  getAchievements,
  saveAchievements,
  getSettings,
  saveSettings,
  UserStats,
  LogEntry,
  Achievement,
  DEFAULT_STATS,
  ACHIEVEMENTS_LIST,
} from '../utils/storage';
import trashData from '../data/trashItems.json';

interface TrashItem {
  id: string;
  name: string;
  material: string;
  disposal: string;
  riskHuman: string;
  riskAnimal: string;
  riskEnv: string;
  decomposition: string;
  ecoFact: string;
  points: number;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  items: TrashItem[];
}

interface AppContextType {
  stats: UserStats;
  personalLog: LogEntry[];
  achievements: Achievement[];
  darkMode: boolean;
  categories: Category[];
  loadData: () => Promise<void>;
  logItem: (item: TrashItem, category: Category, photoUri?: string) => Promise<void>;
  toggleDarkMode: () => void;
  refreshLog: () => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

function calculateStreak(lastLogDate: string | null): { current: number; max: number } {
  if (!lastLogDate) return { current: 0, max: 0 };
  const today = new Date().toISOString().split('T')[0];
  const last = new Date(lastLogDate);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return { current: 1, max: 1 };
  if (diffDays === 1) return { current: 2, max: 2 };
  return { current: 0, max: 0 };
}

function checkAchievements(
  stats: UserStats,
  log: LogEntry[],
  existing: Achievement[]
): Achievement[] {
  const recycleCount = log.filter((e) => e.disposal === 'recycle').length;
  const compostCount = log.filter((e) => e.disposal === 'compost').length;
  const plasticCount = log.filter((e) => e.categoryId === 'plastic').length;
  const total = stats.totalItems;
  const streak = stats.currentStreak;

  return existing.map((a) => {
    if (a.unlocked) return a;
    let shouldUnlock = false;
    switch (a.id) {
      case 'plastic-protector':
        shouldUnlock = plasticCount >= 20;
        break;
      case 'compost-champion':
        shouldUnlock = compostCount >= 15;
        break;
      case 'ocean-guardian':
        shouldUnlock = recycleCount >= 25;
        break;
      case 'zero-waste-warrior':
        shouldUnlock = total >= 50;
        break;
      case 'landfill-slayer':
        shouldUnlock = total >= 100;
        break;
      case 'carbon-crusher':
        shouldUnlock = streak >= 7;
        break;
      case 'streak-30':
        shouldUnlock = streak >= 30;
        break;
      case 'streak-100':
        shouldUnlock = streak >= 100;
        break;
      case 'streak-365':
        shouldUnlock = streak >= 365;
        break;
      default:
        break;
    }
    if (shouldUnlock) {
      return { ...a, unlocked: true, unlockedAt: new Date().toISOString() };
    }
    return a;
  });
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<UserStats>(DEFAULT_STATS);
  const [personalLog, setPersonalLog] = useState<LogEntry[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS_LIST);
  const [darkMode, setDarkModeState] = useState(false);
  const categories = trashData.categories as Category[];

  const loadData = useCallback(async () => {
    const [loadedStats, loadedLog, loadedAchievements, settings] = await Promise.all([
      getStats(),
      getPersonalLog(),
      getAchievements(),
      getSettings(),
    ]);
    const lastDate = loadedStats.lastLogDate;

    let newStats = { ...loadedStats };
    if (lastDate) {
      const last = new Date(lastDate);
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays > 1) {
        newStats = { ...newStats, currentStreak: 0 };
      }
    }

    const updatedAchievements = checkAchievements(newStats, loadedLog, loadedAchievements);
    setStats(newStats);
    setPersonalLog(loadedLog);
    setAchievements(updatedAchievements);
    setDarkModeState(settings.darkMode);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const logItem = useCallback(
    async (item: TrashItem, category: Category, photoUri?: string) => {
      const today = new Date().toISOString().split('T')[0];
      const lastDate = stats.lastLogDate;

      let newStreak = stats.currentStreak;
      if (!lastDate) {
        newStreak = 1;
      } else {
        const last = new Date(lastDate);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays === 0) {
          newStreak = stats.currentStreak;
        } else if (diffDays === 1) {
          newStreak = stats.currentStreak + 1;
        } else {
          newStreak = 1;
        }
      }

      const newStats: UserStats = {
        ...stats,
        totalPoints: stats.totalPoints + item.points,
        totalItems: stats.totalItems + 1,
        currentStreak: newStreak,
        lastLogDate: today,
        maxStreak: Math.max(stats.maxStreak, newStreak),
        itemsByCategory: {
          ...stats.itemsByCategory,
          [category.id]: (stats.itemsByCategory[category.id] || 0) + 1,
        },
        itemsByDisposal: {
          ...stats.itemsByDisposal,
          [item.disposal]: (stats.itemsByDisposal[item.disposal] || 0) + 1,
        },
      };

      const entry: LogEntry = {
        id: `log-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        itemId: item.id,
        itemName: item.name,
        categoryId: category.id,
        categoryName: category.name,
        disposal: item.disposal,
        material: item.material,
        riskHuman: item.riskHuman,
        riskAnimal: item.riskAnimal,
        riskEnv: item.riskEnv,
        decomposition: item.decomposition,
        ecoFact: item.ecoFact,
        points: item.points,
        photoUri,
        timestamp: new Date().toISOString(),
      };

      await addLogEntryStorage(entry);
      await saveStats(newStats);
      setStats(newStats);
      setPersonalLog((prev) => [entry, ...prev]);

      const updatedAchievements = checkAchievements(
        newStats,
        [entry, ...personalLog],
        achievements
      );
      const hasNew = updatedAchievements.some((a) => a.unlocked && !achievements.find((e) => e.id === a.id)?.unlocked);
      if (hasNew) {
        await saveAchievements(updatedAchievements);
        setAchievements(updatedAchievements);
      }
    },
    [stats, personalLog, achievements]
  );

  const toggleDarkMode = useCallback(async () => {
    const next = !darkMode;
    setDarkModeState(next);
    await saveSettings({ darkMode: next });
  }, [darkMode]);

  const refreshLog = useCallback(async () => {
    const log = await getPersonalLog();
    setPersonalLog(log);
  }, []);

  return (
    <AppContext.Provider
      value={{
        stats,
        personalLog,
        achievements,
        darkMode,
        categories,
        loadData,
        logItem,
        toggleDarkMode,
        refreshLog,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
