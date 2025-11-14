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

export type BottomTabNavigatorParamList = {
  Старт: undefined;
  Времена: undefined;
  'О приложении': undefined;
  Тренажер: undefined;
};

const Tab = createBottomTabNavigator<any>();

const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#00D4AA',
      tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
      tabBarStyle: {
        backgroundColor: 'rgba(10, 0, 32, 0.95)',
        borderTopWidth: 0,
        height: 80,
        paddingBottom: 10,
        paddingTop: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 15,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 0.5,
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
            size={24}
            name={focused ? 'time' : 'time-outline'}
            color={color}
          />
        ),
        tabBarLabel: 'Tenses',
      }}
    />
    <Tab.Screen
      name='Профиль'
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            size={24}
            name={focused ? 'information-circle' : 'information-circle-outline'}
            color={color}
          />
        ),
        tabBarLabel: 'Profile',
      }}
    />
    <Tab.Screen
      name='О приложении'
      component={InfoScreen}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            size={24}
            name={focused ? 'information-circle' : 'information-circle-outline'}
            color={color}
          />
        ),
        tabBarLabel: 'About',
      }}
    />
  </Tab.Navigator>
);

const Stack = createStackNavigator<any>();

const MainStackNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName='Старт'
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#000000' },
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

export default MainStackNavigator;
