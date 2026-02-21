import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../../theme';

export default function HomeScreen() {
  const { stats, darkMode } = useApp();
  const systemDark = useColorScheme() === 'dark';
  const isDark = darkMode ?? systemDark;
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.greeting, { color: theme.colors.textMuted }]}>
          Log trash. Save the planet. 🌍
        </Text>
        <Text style={[styles.streakLabel, { color: theme.colors.textMuted }]}>Daily Streak</Text>
        <Text style={[styles.streakValue, { color: theme.colors.primary }]}>
          🔥 {stats.currentStreak} days
        </Text>
        <Text style={[styles.pointsLabel, { color: theme.colors.textMuted }]}>Total Points</Text>
        <Text style={[styles.pointsValue, { color: theme.colors.secondary }]}>
          ⭐ {stats.totalPoints} pts
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.logButton,
          {
            backgroundColor: theme.colors.primary,
            opacity: pressed ? 0.9 : 1,
          },
        ]}
        onPress={() => router.push('/log')}
      >
        <Ionicons name="add-circle" size={48} color="#FFF" />
        <Text style={styles.logButtonText}>Log Trash</Text>
        <Text style={styles.logButtonSub}>Tap to log your disposal</Text>
      </Pressable>

      <View style={[styles.statsRow, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.primary }]}>
            {stats.totalItems}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.textMuted }]}>Items Logged</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: theme.colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.secondary }]}>
            {stats.maxStreak}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.textMuted }]}>Best Streak</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 48,
  },
  card: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  greeting: {
    fontSize: 16,
    marginBottom: 16,
  },
  streakLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  streakValue: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 16,
  },
  pointsLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  pointsValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  logButton: {
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#2D7A4F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  logButtonText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 12,
  },
  logButtonSub: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
  },
});
