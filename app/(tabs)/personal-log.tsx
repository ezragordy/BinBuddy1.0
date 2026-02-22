import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useApp } from '../../context/AppContext';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../../theme';

export default function PersonalLogScreen() {
  const { personalLog, darkMode } = useApp();
  const systemDark = useColorScheme() === 'dark';
  const isDark = darkMode ?? systemDark;
  const theme = isDark ? darkTheme : lightTheme;

  const disposalColors: Record<string, string> = {
    recycle: theme.colors.recycle,
    compost: theme.colors.compost,
    trash: theme.colors.trash,
    hazardous: theme.colors.hazardous,
    reuse: theme.colors.reuse,
  };

  if (personalLog.length === 0) {
    return (
      <View style={[styles.empty, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>Your EcoDex is empty</Text>
        <Text style={[styles.emptySub, { color: theme.colors.textMuted }]}>
          Start logging trash to build your personal disposal log and track your eco impact!
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>EcoDex</Text>
      <Text style={[styles.subtitle, { color: theme.colors.textMuted }]}>
        {personalLog.length} items logged
      </Text>

      {personalLog.map((entry) => {
        const date = new Date(entry.timestamp);
        const dateStr = date.toLocaleDateString();
        const disposalColor = disposalColors[entry.disposal] || theme.colors.primary;

        return (
          <View
            key={entry.id}
            style={[styles.card, { backgroundColor: theme.colors.surface }]}
          >
            <View style={[styles.cardLeft, { borderLeftColor: disposalColor }]}>
              <Text style={[styles.itemName, { color: theme.colors.text }]}>{entry.itemName}</Text>
              <Text style={[styles.category, { color: theme.colors.textMuted }]}>
                {entry.categoryName} • {entry.disposal}
              </Text>
            </View>
            <View style={styles.cardRight}>
              <Text style={[styles.points, { color: theme.colors.primary }]}>+{entry.points}</Text>
              <Text style={[styles.date, { color: theme.colors.textMuted }]}>{dateStr}</Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  cardLeft: {
    flex: 1,
    borderLeftWidth: 4,
    paddingLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  category: {
    fontSize: 12,
    marginTop: 4,
  },
  cardRight: {
    alignItems: 'flex-end',
  },
  points: {
    fontSize: 16,
    fontWeight: '700',
  },
  date: {
    fontSize: 11,
    marginTop: 4,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  emptySub: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});
