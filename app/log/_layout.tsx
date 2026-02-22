import { Stack } from 'expo-router';
import { useApp } from '../../context/AppContext';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../../theme';

export default function LogLayout() {
  const { darkMode } = useApp();
  const systemDark = useColorScheme() === 'dark';
  const isDark = darkMode ?? systemDark;
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.text,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="category" options={{ title: 'Select Category' }} />
      <Stack.Screen name="item" options={{ title: 'Select Item' }} />
      <Stack.Screen name="confirm" options={{ title: 'Logged! 🎉' }} />
    </Stack>
  );
}
