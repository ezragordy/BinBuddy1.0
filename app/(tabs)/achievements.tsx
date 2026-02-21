import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../../theme';

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  water: 'water',
  leaf: 'leaf',
  fish: 'fish',
  shield: 'shield',
  flame: 'flame',
  flash: 'flash',
  calendar: 'calendar',
  star: 'star',
  planet: 'planet',
};

export default function AchievementsScreen() {
  const { achievements, darkMode } = useApp();
  const systemDark = useColorScheme() === 'dark';
  const isDark = darkMode ?? systemDark;
  const theme = isDark ? darkTheme : lightTheme;
  const unlocked = achievements.filter((a) => a.unlocked).length;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.progress, { color: theme.colors.primary }]}>
          {unlocked} / {achievements.length}
        </Text>
        <Text style={[styles.progressLabel, { color: theme.colors.textMuted }]}>
          Achievements Unlocked
        </Text>
      </View>

      {achievements.map((a) => (
        <View
          key={a.id}
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              opacity: a.unlocked ? 1 : 0.6,
            },
          ]}
        >
          <View
            style={[
              styles.iconWrap,
              {
                backgroundColor: a.unlocked
                  ? theme.colors.primary + '30'
                  : theme.colors.textMuted + '20',
              },
            ]}
          >
            <Ionicons
              name={iconMap[a.icon] || 'trophy'}
              size={32}
              color={a.unlocked ? theme.colors.primary : theme.colors.textMuted}
            />
          </View>
          <View style={styles.cardContent}>
            <Text style={[styles.name, { color: theme.colors.text }]}>{a.name}</Text>
            <Text style={[styles.desc, { color: theme.colors.textMuted }]}>{a.description}</Text>
            {a.unlockedAt && (
              <Text style={[styles.unlocked, { color: theme.colors.success }]}>
                ✓ Unlocked
              </Text>
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  header: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  progress: {
    fontSize: 36,
    fontWeight: '700',
  },
  progressLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  card: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  desc: {
    fontSize: 14,
    marginTop: 4,
  },
  unlocked: {
    fontSize: 12,
    marginTop: 8,
    fontWeight: '600',
  },
});
