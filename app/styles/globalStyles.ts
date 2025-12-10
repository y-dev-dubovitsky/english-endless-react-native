// app/styles/globalStyles.ts
import { StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export const createGlobalStyles = () => {
  const { colors } = useTheme();
  
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    text: {
      color: colors.text,
    },
    textSecondary: {
      color: colors.textSecondary,
    },
    card: {
      backgroundColor: colors.backgroundSecondary,
      borderRadius: 12,
      padding: 16,
    },
    header: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 16,
    },
    // Добавьте другие глобальные стили
  });
};