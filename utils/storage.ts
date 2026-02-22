import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  USER_STATS: '@binbuddy_stats',
  PERSONAL_LOG: '@binbuddy_log',
  ACHIEVEMENTS: '@binbuddy_achievements',
  SETTINGS: '@binbuddy_settings',
  CUSTOM_ITEMS: '@binbuddy_custom_items',
};

export interface UserStats {
  totalPoints: number;
  totalItems: number;
  currentStreak: number;
  lastLogDate: string | null;
  maxStreak: number;
  itemsByCategory: Record<string, number>;
  itemsByDisposal: Record<string, number>;
}

export const DEFAULT_STATS: UserStats = {
  totalPoints: 0,
  totalItems: 0,
  currentStreak: 0,
  lastLogDate: null,
  maxStreak: 0,
  itemsByCategory: {},
  itemsByDisposal: {},
};

export interface LogEntry {
  id: string;
  itemId: string;
  itemName: string;
  categoryId: string;
  categoryName: string;
  disposal: string;
  material: string;
  riskHuman: string;
  riskAnimal: string;
  riskEnv: string;
  decomposition: string;
  ecoFact: string;
  points: number;
  photoUri?: string;
  customItem?: boolean;
  timestamp: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export const ACHIEVEMENTS_LIST: Achievement[] = [
  { id: 'plastic-protector', name: 'Plastic Protector', description: 'Log 20 plastic items', icon: 'water', unlocked: false },
  { id: 'compost-champion', name: 'Compost Champion', description: 'Compost 15 organic items', icon: 'leaf', unlocked: false },
  { id: 'ocean-guardian', name: 'Ocean Guardian', description: 'Recycle 25 items', icon: 'fish', unlocked: false },
  { id: 'zero-waste-warrior', name: 'Zero Waste Warrior', description: 'Log 50 items total', icon: 'shield', unlocked: false },
  { id: 'landfill-slayer', name: 'Landfill Slayer', description: 'Log 100 items total', icon: 'flame', unlocked: false },
  { id: 'carbon-crusher', name: 'Carbon Crusher', description: 'Maintain 7-day streak', icon: 'flash', unlocked: false },
  { id: 'streak-30', name: 'Eco Veteran', description: '30-day streak', icon: 'calendar', unlocked: false },
  { id: 'streak-100', name: 'Earth Hero', description: '100-day streak', icon: 'star', unlocked: false },
  { id: 'streak-365', name: 'Planet Guardian', description: '365-day streak', icon: 'planet', unlocked: false },
];

export async function getStats(): Promise<UserStats> {
  try {
    const data = await AsyncStorage.getItem(KEYS.USER_STATS);
    return data ? { ...DEFAULT_STATS, ...JSON.parse(data) } : DEFAULT_STATS;
  } catch {
    return DEFAULT_STATS;
  }
}

export async function saveStats(stats: UserStats): Promise<void> {
  await AsyncStorage.setItem(KEYS.USER_STATS, JSON.stringify(stats));
}

export async function getPersonalLog(): Promise<LogEntry[]> {
  try {
    const data = await AsyncStorage.getItem(KEYS.PERSONAL_LOG);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export async function savePersonalLog(log: LogEntry[]): Promise<void> {
  await AsyncStorage.setItem(KEYS.PERSONAL_LOG, JSON.stringify(log));
}

export async function addLogEntry(entry: LogEntry): Promise<void> {
  const log = await getPersonalLog();
  log.unshift(entry);
  await savePersonalLog(log);
}

export async function getAchievements(): Promise<Achievement[]> {
  try {
    const data = await AsyncStorage.getItem(KEYS.ACHIEVEMENTS);
    return data ? JSON.parse(data) : ACHIEVEMENTS_LIST;
  } catch {
    return ACHIEVEMENTS_LIST;
  }
}

export async function saveAchievements(achievements: Achievement[]): Promise<void> {
  await AsyncStorage.setItem(KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
}

export async function getSettings(): Promise<{ darkMode: boolean }> {
  try {
    const data = await AsyncStorage.getItem(KEYS.SETTINGS);
    return data ? JSON.parse(data) : { darkMode: false };
  } catch {
    return { darkMode: false };
  }
}

export async function saveSettings(settings: { darkMode: boolean }): Promise<void> {
  await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
}
