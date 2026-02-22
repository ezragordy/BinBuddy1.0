import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useApp } from '../../context/AppContext';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../../theme';

export default function TabLayout() {
  const { darkMode, toggleDarkMode } = useApp();
  const systemDark = useColorScheme() === 'dark';
  const isDark = darkMode ?? systemDark;
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
        headerRight: () => (
          <Pressable onPress={toggleDarkMode} style={{ padding: 12 }}>
            <Ionicons
              name={isDark ? 'sunny' : 'moon'}
              size={24}
              color={theme.colors.text}
            />
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'BinBuddy',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => <Ionicons name="stats-chart" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="personal-log"
        options={{
          title: 'EcoDex',
          tabBarIcon: ({ color, size }) => <Ionicons name="book" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="achievements"
        options={{
          title: 'Achievements',
          tabBarIcon: ({ color, size }) => <Ionicons name="trophy" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
