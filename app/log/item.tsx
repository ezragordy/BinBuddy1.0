import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useApp } from '../../context/AppContext';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../../theme';

export default function ItemScreen() {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const { categories, darkMode } = useApp();
  const systemDark = useColorScheme() === 'dark';
  const isDark = darkMode ?? systemDark;
  const theme = isDark ? darkTheme : lightTheme;
  const category = categories.find((c) => c.id === categoryId);

  if (!category) return null;

  const disposalColors: Record<string, string> = {
    recycle: theme.colors.recycle,
    compost: theme.colors.compost,
    trash: theme.colors.trash,
    hazardous: theme.colors.hazardous,
    reuse: theme.colors.reuse,
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {category.items.map((item) => (
        <Pressable
          key={item.id}
          style={({ pressed }) => [
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              borderLeftColor: disposalColors[item.disposal] || theme.colors.primary,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
          onPress={() =>
            router.push({
              pathname: '/log/confirm',
              params: {
                itemId: item.id,
                categoryId: category.id,
              },
            })
          }
        >
          <Text style={[styles.name, { color: theme.colors.text }]}>{item.name}</Text>
          <View style={styles.row}>
            <Text style={[styles.badge, { backgroundColor: disposalColors[item.disposal] + '30', color: disposalColors[item.disposal] }]}>
              {item.disposal.charAt(0).toUpperCase() + item.disposal.slice(1)}
            </Text>
            <Text style={[styles.points, { color: theme.colors.textMuted }]}>
              +{item.points} pts
            </Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  card: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: '600',
  },
  points: {
    fontSize: 14,
  },
});
