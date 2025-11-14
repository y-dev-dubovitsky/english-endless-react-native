import * as React from 'react';
import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import MainStackNavigator from './app/navigation/main-stack.navigator';
import { ThemeProvider } from './app/contexts/ThemeContext';

const App = (): JSX.Element => {
  return (
    <PaperProvider>
      <ThemeProvider>
        <MainStackNavigator />
      </ThemeProvider>
    </PaperProvider>
  );
};

export default App;
