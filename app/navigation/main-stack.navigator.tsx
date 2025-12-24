// main-stack.navigator.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import InfoScreen from '../screen/info/info.screen';
import StartScreen from '../screen/start/start.screen';
import TenseScreen from '../screen/tense/tense.screen';
import MainScreen from '../screen/main/main.screen';
import DictionaryScreen from '../screen/dictionary/dictionary.screen';
import TrainerComponent from '../screen/trainer/trainer.screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProfileScreen from '../screen/profile/profile.screen';
import { useTheme } from '../contexts/ThemeContext';

export type BottomTabNavigatorParamList = {
  Главная: undefined;
  Времена: undefined;
  Словарь: undefined;
  Профиль: undefined;
  'О приложении': undefined;
};

export type RootStackParamList = {
  Старт: undefined;
  ОсновныеТабы: undefined;
  Тренажер: undefined;
};

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const BottomTabNavigator = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 0,
          height: 55,
          paddingBottom: 4,
          paddingTop: 4,
          // Уберите position: 'absolute' если это мешает отображению
          // position: 'absolute',
          // bottom: 0,
          // left: 0,
          // right: 0,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -3,
          },
          shadowOpacity: 0.15,
          shadowRadius: 6,
          elevation: 6,
        },
        tabBarLabelStyle: {
          fontSize: 9.5,
          fontWeight: '600',
          letterSpacing: 0.2,
          marginTop: 1,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
      }}
      initialRouteName='Главная'
    >
      <Tab.Screen
        name='Главная'
        component={MainScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              size={20}
              name={focused ? 'home' : 'home-outline'} // Исправлена иконка для Главной
              color={color}
            />
          ),
          tabBarLabel: 'Главная',
        }}
      />
      <Tab.Screen
        name='Времена'
        component={TenseScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              size={20}
              name={focused ? 'time' : 'time-outline'}
              color={color}
            />
          ),
          tabBarLabel: 'Времена',
        }}
      />
      <Tab.Screen
        name='Словарь'
        component={DictionaryScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              size={20}
              name={focused ? 'book' : 'book-outline'} // Исправлена иконка для Словаря
              color={color}
            />
          ),
          tabBarLabel: 'Словарь',
        }}
      />
      <Tab.Screen
        name='Профиль'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              size={20}
              name={focused ? 'person' : 'person-outline'}
              color={color}
            />
          ),
          tabBarLabel: 'Профиль',
        }}
      />
      <Tab.Screen
        name='О приложении'
        component={InfoScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              size={20}
              name={
                focused ? 'information-circle' : 'information-circle-outline'
              }
              color={color}
            />
          ),
          tabBarLabel: 'О приложении',
        }}
      />
    </Tab.Navigator>
  );
};

const MainStackNavigator = () => {
  const { colors } = useTheme();

  return (
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          primary: colors.primary,
          background: colors.background,
          card: colors.backgroundSecondary,
          text: colors.text,
          border: colors.border,
          notification: colors.accent,
        },
      }}
    >
      <Stack.Navigator
        initialRouteName='Старт'
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='Старт' component={StartScreen} />
        <Stack.Screen name='ОсновныеТабы' component={BottomTabNavigator} />
        <Stack.Screen name='Тренажер' component={TrainerComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;