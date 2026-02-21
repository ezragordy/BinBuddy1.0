import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useApp } from '../../context/AppContext';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../../theme';

export default function ConfirmScreen() {
  const { itemId, categoryId } = useLocalSearchParams<{ itemId: string; categoryId: string }>();
  const { categories, logItem, darkMode } = useApp();
  const [logged, setLogged] = useState(false);
  const systemDark = useColorScheme() === 'dark';
  const isDark = darkMode ?? systemDark;
  const theme = isDark ? darkTheme : lightTheme;

  const category = categories.find((c) => c.id === categoryId);
  const item = category?.items.find((i) => i.id === itemId);

  useEffect(() => {
    if (!item || !category || logged) return;
    logItem(item, category);
    setLogged(true);
  }, [item, category, logged]);

  if (!item || !category) return null;

  const disposalColors: Record<string, string> = {
    recycle: theme.colors.recycle,
    compost: theme.colors.compost,
    trash: theme.colors.trash,
    hazardous: theme.colors.hazardous,
    reuse: theme.colors.reuse,
  };
  const disposalColor = disposalColors[item.disposal] || theme.colors.primary;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View entering={FadeIn.delay(200).duration(400)} style={styles.header}>
        <View style={[styles.pointsBadge, { backgroundColor: theme.colors.accent }]}>
          <Text style={styles.pointsText}>+{item.points} pts</Text>
        </View>
        <Text style={[styles.title, { color: theme.colors.text }]}>{item.name}</Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300).duration(400)} style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Row label="Material" value={item.material} theme={theme} />
        <Row label="Proper Disposal" value={item.disposal.charAt(0).toUpperCase() + item.disposal.slice(1)} theme={theme} color={disposalColor} />
        <Row label="Human Risk" value={item.riskHuman} theme={theme} />
        <Row label="Animal Risk" value={item.riskAnimal} theme={theme} />
        <Row label="Environmental Risk" value={item.riskEnv} theme={theme} />
        <Row label="Decomposition" value={item.decomposition} theme={theme} />
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(400).duration(400)} style={[styles.factCard, { backgroundColor: disposalColor + '20', borderColor: disposalColor }]}>
        <Ionicons name="bulb" size={24} color={disposalColor} />
        <Text style={[styles.factText, { color: theme.colors.text }]}>{item.ecoFact}</Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(500).duration(400)}>
        <Pressable
          style={({ pressed }) => [
            styles.doneButton,
            { backgroundColor: theme.colors.primary, opacity: pressed ? 0.9 : 1 },
          ]}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.doneText}>Done</Text>
        </Pressable>
      </Animated.View>
    </ScrollView>
  );
}

function Row({
  label,
  value,
  theme,
  color,
}: {
  label: string;
  value: string;
  theme: typeof lightTheme;
  color?: string;
}) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, { color: theme.colors.textMuted }]}>{label}</Text>
      <Text style={[styles.rowValue, { color: color || theme.colors.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  pointsBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 12,
  },
  pointsText: {
    color: '#1A2E1A',
    fontSize: 18,
    fontWeight: '700',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  row: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
  rowLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  rowValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  factCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 2,
    gap: 12,
  },
  factText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  doneButton: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  doneText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
