// main-stack.navigator.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import InfoScreen from '../screen/info/info.screen';
import StartScreen from '../screen/start/start.screen';
import TenseScreen from '../screen/tense/tense.screen';
import TrainerComponent from '../screen/trainer/trainer.screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProfileScreen from '../screen/profile/profile.screen';
import { useTheme } from '../contexts/ThemeContext';

export type BottomTabNavigatorParamList = {
  Старт: undefined;
  Времена: undefined;
  'О приложении': undefined;
  Тренажер: undefined;
};

const Tab = createBottomTabNavigator<any>();

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
          height: 60, // Уменьшили высоту с 80 до 60
          paddingBottom: 5, // Уменьшили нижний отступ
          paddingTop: 5, // Уменьшили верхний отступ
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTopLeftRadius: 15, // Уменьшили скругление
          borderTopRightRadius: 15,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -5, // Уменьшили тень
          },
          shadowOpacity: 0.2, // Сделали тень менее заметной
          shadowRadius: 10, // Уменьшили радиус тени
          elevation: 8, // Уменьшили высоту тени на Android
        },
        tabBarLabelStyle: {
          fontSize: 10, // Уменьшили размер текста с 12 до 10
          fontWeight: '600',
          letterSpacing: 0.3, // Уменьшили межбуквенное расстояние
          marginTop: 2, // Добавили небольшой отступ сверху
        },
        tabBarIconStyle: {
          marginTop: 3, // Добавили небольшой отступ для иконок
        },
      }}
      initialRouteName='Времена'
    >
      <Tab.Screen
        name='Времена'
        component={TenseScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              size={22} // Уменьшили размер иконки с 24 до 22
              name={focused ? 'time' : 'time-outline'}
              color={color}
            />
          ),
          tabBarLabel: 'Времена',
        }}
      />
      <Tab.Screen
        name='Профиль'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              size={22} // Уменьшили размер иконки
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
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              size={22} // Уменьшили размер иконки
              name={focused ? 'information-circle' : 'information-circle-outline'}
              color={color}
            />
          ),
          tabBarLabel: 'О приложении',
        }}
      />
    </Tab.Navigator>
  );
};

// Остальной код остается без изменений
const Stack = createStackNavigator<any>();

const MainStackNavigator = () => {
  const { colors } = useTheme();
  
  return (
    <NavigationContainer theme={{
      dark: false,
      colors: {
        primary: colors.primary,
        background: colors.background,
        card: colors.backgroundSecondary,
        text: colors.text,
        border: colors.border,
        notification: colors.accent,
      },
    }}>
      <Stack.Navigator
        initialRouteName='Старт'
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: colors.background },
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current, next, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
              overlayStyle: {
                opacity: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.3],
                }),
              },
            };
          },
        }}
      >
        <Stack.Screen name='Старт' component={StartScreen} />
        <Stack.Screen name='Список времен' component={BottomTabNavigator} />
        <Stack.Screen name='Тренажер' component={TrainerComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;