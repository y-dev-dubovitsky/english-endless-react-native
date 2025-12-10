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

// Цвета для светлой темы - мягкие приятные тона
export const lightColors = {
  // Основные цвета - мягкие пастельные оттенки
  primary: '#667EEA', // Мягкий лавандовый синий
  primaryLight: '#A5B4FC', // Светлый лавандовый
  secondary: '#4FD1C5', // Мятный бирюзовый
  secondaryLight: '#81E6D9', // Светлый мятный
  accent: '#F687B3', // Нежный розовый
  accentLight: '#FBB6CE', // Светлый розовый
  
  // Фоновые цвета - очень светлые, почти белые с оттенками
  background: '#FAFAFA', // Очень светлый серый
  backgroundSecondary: '#F3F4F6', // Светло-серый
  backgroundTertiary: '#E5E7EB', // Нейтральный серый
  
  // Текст - мягкие серые оттенки
  text: '#374151', // Темно-серый (почти черный)
  textSecondary: '#6B7280', // Средний серый
  textTertiary: '#9CA3AF', // Светлый серый
  
  // Границы - очень светлые
  border: '#D1D5DB', // Светло-серый
  borderLight: '#E5E7EB', // Очень светлый серый
  
  // Статусные цвета
  success: '#10B981', // Зеленый
  warning: '#F59E0B', // Оранжевый
  error: '#EF4444', // Красный
  
  // Базовые
  white: '#FFFFFF',
  black: '#000000',
  
  // Дополнительные мягкие цвета для градиентов
  gradientStart: '#667EEA',
  gradientEnd: '#764BA2',
};

// Цвета для темной темы - темные но не черные, с цветными акцентами
export const darkColors = {
  // Основные цвета - более насыщенные версии светлых
  primary: '#7C3AED', // Насыщенный фиолетовый
  primaryLight: '#8B5CF6', // Яркий фиолетовый
  secondary: '#0D9488', // Глубокий бирюзовый
  secondaryLight: '#14B8A6', // Светлый бирюзовый
  accent: '#DB2777', // Яркий розовый
  accentLight: '#EC4899', // Светлый розовый
  
  // Фоновые цвета - темные но не черные
  background: '#111827', // Темно-сине-серый
  backgroundSecondary: '#1F2937', // Темный серый
  backgroundTertiary: '#374151', // Средний темно-серый
  
  // Текст - светлые оттенки для контраста
  text: '#F9FAFB', // Почти белый
  textSecondary: '#D1D5DB', // Светло-серый
  textTertiary: '#788499ff', // Средний серый
  
  // Границы - темные с оттенками
  border: '#4B5563', // Темно-серый
  borderLight: '#6B7280', // Средний серый
  
  // Статусные цвета
  success: '#10B981', // Зеленый
  warning: '#F59E0B', // Оранжевый
  error: '#EF4444', // Красный
  
  // Базовые
  white: '#FFFFFF',
  black: '#000000',
  
  // Дополнительные цвета для градиентов
  gradientStart: '#7C3AED',
  gradientEnd: '#3730A3',
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