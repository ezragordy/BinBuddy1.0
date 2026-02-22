import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useApp } from '../../context/AppContext';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../../theme';

export default function DashboardScreen() {
  const { stats, darkMode } = useApp();
  const systemDark = useColorScheme() === 'dark';
  const isDark = darkMode ?? systemDark;
  const theme = isDark ? darkTheme : lightTheme;

  const landfillPrevented = Math.round(stats.totalItems * 0.4);
  const carbonImpact = Math.round(stats.totalItems * 2.3);
  const treesSaved = (stats.totalItems * 0.017).toFixed(1);
  const oceanItems = Object.entries(stats.itemsByDisposal)
    .filter(([k]) => k === 'recycle' || k === 'compost')
    .reduce((a, [, v]) => a + v, 0);

  const statCards = [
    { label: 'Items Logged', value: stats.totalItems, icon: '📦', color: theme.colors.primary },
    { label: 'Landfill Diverted (kg est)', value: landfillPrevented, icon: '♻️', color: theme.colors.compost },
    { label: 'CO₂ Impact (kg est)', value: carbonImpact, icon: '🌱', color: theme.colors.secondary },
    { label: 'Trees Saved', value: treesSaved, icon: '🌳', color: theme.colors.success },
    { label: 'Ocean Pollution Prevented', value: oceanItems, icon: '🌊', color: theme.colors.recycle },
  ];

  const categoryEntries = Object.entries(stats.itemsByCategory).filter(([, v]) => v > 0);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>Your Impact</Text>

      {statCards.map((card, i) => (
        <View
          key={card.label}
          style={[styles.statCard, { backgroundColor: theme.colors.surface }]}
        >
          <View style={[styles.iconBox, { backgroundColor: card.color + '25' }]}>
            <Text style={styles.emoji}>{card.icon}</Text>
          </View>
          <View style={styles.statContent}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{card.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textMuted }]}>{card.label}</Text>
          </View>
        </View>
      ))}

      {categoryEntries.length > 0 && (
        <>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Waste Breakdown</Text>
          <View style={[styles.breakdownCard, { backgroundColor: theme.colors.surface }]}>
            {categoryEntries.map(([catId, count]) => (
              <View key={catId} style={styles.breakdownRow}>
                <Text style={[styles.breakdownLabel, { color: theme.colors.text }]}>
                  {catId.charAt(0).toUpperCase() + catId.slice(1)}
                </Text>
                <View style={[styles.barBg, { backgroundColor: theme.colors.border }]}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        width: `${(count / stats.totalItems) * 100}%`,
                        backgroundColor: theme.colors.primary,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.breakdownCount, { color: theme.colors.textMuted }]}>
                  {count}
                </Text>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  emoji: {
    fontSize: 24,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 14,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 12,
  },
  breakdownCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  breakdownLabel: {
    width: 80,
    fontSize: 14,
  },
  barBg: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 12,
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  breakdownCount: {
    width: 36,
    fontSize: 14,
    textAlign: 'right',
  },
});
