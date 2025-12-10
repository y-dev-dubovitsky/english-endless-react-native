// App.tsx
import * as React from 'react';
import 'react-native-gesture-handler';
import { PaperProvider, adaptNavigationTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './app/navigation/main-stack.navigator';
import { ThemeProvider, useTheme } from './app/contexts/ThemeContext';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

const AppContent = () => {
  const { colors, actualTheme } = useTheme();
  
  // Создаем тему для react-native-paper
  const paperTheme = actualTheme === 'dark' 
    ? { ...MD3DarkTheme, colors: {
        ...MD3DarkTheme.colors,
        primary: colors.primary,
        background: colors.background,
        surface: colors.backgroundSecondary,
        text: colors.text,
        onSurface: colors.text,
        accent: colors.accent,
      }}
    : { ...MD3LightTheme, colors: {
        ...MD3LightTheme.colors,
        primary: colors.primary,
        background: colors.background,
        surface: colors.backgroundSecondary,
        text: colors.text,
        onSurface: colors.text,
        accent: colors.accent,
      }};
  
  return (
    <PaperProvider theme={paperTheme}>
      <MainStackNavigator />
    </PaperProvider>
  );
};

const App = (): JSX.Element => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;