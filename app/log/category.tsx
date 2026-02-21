import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../../theme';

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  'water-outline': 'water-outline',
  'wine-outline': 'wine-outline',
  'nutrition-outline': 'nutrition-outline',
  'document-text-outline': 'document-text-outline',
  'leaf-outline': 'leaf-outline',
  'phone-portrait-outline': 'phone-portrait-outline',
  'warning-outline': 'warning-outline',
};

export default function CategoryScreen() {
  const { categories, darkMode } = useApp();
  const systemDark = useColorScheme() === 'dark';
  const isDark = darkMode ?? systemDark;
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {categories.map((cat) => (
        <Pressable
          key={cat.id}
          style={({ pressed }) => [
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
          onPress={() => router.push({ pathname: '/log/item', params: { categoryId: cat.id } })}
        >
          <View style={[styles.iconWrap, { backgroundColor: theme.colors.primary + '20' }]}>
            <Ionicons
              name={iconMap[cat.icon] || 'trash-outline'}
              size={32}
              color={theme.colors.primary}
            />
          </View>
          <Text style={[styles.name, { color: theme.colors.text }]}>{cat.name}</Text>
          <Text style={[styles.count, { color: theme.colors.textMuted }]}>
            {cat.items.length} items
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  card: {
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
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  name: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
  },
  count: {
    fontSize: 14,
  },
});
