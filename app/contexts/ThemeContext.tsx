// contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  theme: Theme;
  actualTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  colors: typeof lightColors | typeof darkColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Цвета для светлой темы
export const lightColors = {
  primary: '#6366F1',
  primaryLight: '#8B5CF6',
  secondary: '#10B981',
  secondaryLight: '#34D399',
  accent: '#F59E0B',
  accentLight: '#FBBF24',
  
  background: '#FFFFFF',
  backgroundSecondary: '#F8FAFC',
  backgroundTertiary: '#F1F5F9',
  
  text: '#1E293B',
  textSecondary: '#475569',
  textTertiary: '#64748B',
  
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  
  white: '#FFFFFF',
  black: '#000000',
};

// Цвета для темной темы
export const darkColors = {
  primary: '#8B5CF6',
  primaryLight: '#A78BFA',
  secondary: '#34D399',
  secondaryLight: '#6EE7B7',
  accent: '#FBBF24',
  accentLight: '#FCD34D',
  
  background: '#0F172A',
  backgroundSecondary: '#1E293B',
  backgroundTertiary: '#334155',
  
  text: '#F1F5F9',
  textSecondary: '#CBD5E1',
  textTertiary: '#94A3B8',
  
  border: '#334155',
  borderLight: '#475569',
  
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
  
  white: '#FFFFFF',
  black: '#000000',
};

const THEME_STORAGE_KEY = 'app_theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setThemeState] = useState<Theme>('auto');

  // Загрузка темы из хранилища при запуске
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        setThemeState(savedTheme as Theme);
      }
    } catch (error) {
      console.log('Ошибка загрузки темы:', error);
    }
  };

  const setTheme = async (newTheme: Theme) => {
    try {
      setThemeState(newTheme);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.log('Ошибка сохранения темы:', error);
    }
  };

  const actualTheme = theme === 'auto' ? (systemColorScheme || 'light') : theme;
  const colors = actualTheme === 'light' ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, actualTheme, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};