import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../../contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const CARD_PADDING = 20;

// Интерфейс для данных дня
interface DayData {
  date: Date;
  dayOfMonth: number;
  dayOfWeek: string;
  isToday: boolean;
  isSelected: boolean;
  completedTasks: number;
  totalTasks: number;
  accuracy: number;
  studiedTime: number; // в минутах
}

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  colors: string[];
  badge?: string | number;
  progress?: number;
}

const MainScreen = ({ navigation }: any): JSX.Element => {
  const { colors, theme } = useTheme();
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [todaysStats, setTodaysStats] = useState({
    sessions: 0,
    totalTime: 0, // в минутах
    correctAnswers: 0,
    totalAnswers: 0,
    completedTenses: 0,
    totalTenses: 9,
  });
  const [todaysStudyTime, setTodaysStudyTime] = useState<number>(0);

  // Анимация появления карточек
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  // Ключи для хранения данных
  const STORAGE_KEYS = {
    SESSION_START: 'session_start_time',
    TOTAL_STUDY_TIME: 'total_study_time_today',
    DAILY_STATS: 'daily_stats',
    SESSIONS_COUNT: 'today_sessions_count',
    ANSWER_STATS: 'today_answer_stats',
  };

  // Получение реального времени изучения за сегодня
  useEffect(() => {
    loadTodaysStats();
    setupStudyTimeTracker();
  }, []);

  const setupStudyTimeTracker = async () => {
    // Запускаем отслеживание времени в фоне
    // Приложение должно обновлять время при переходе в бэкграунд/форграунд
    const interval = setInterval(async () => {
      const time = await calculateTodaysStudyTime();
      setTodaysStudyTime(time);
    }, 60000); // Обновляем каждую минуту

    return () => clearInterval(interval);
  };

  const calculateTodaysStudyTime = async (): Promise<number> => {
    try {
      const today = new Date().toDateString();
      const storedTime = await AsyncStorage.getItem(
        STORAGE_KEYS.TOTAL_STUDY_TIME
      );
      const lastSessionStart = await AsyncStorage.getItem(
        STORAGE_KEYS.SESSION_START
      );

      let totalTime = storedTime ? parseInt(storedTime) : 0;

      // Если сессия активна, добавляем текущее время
      if (lastSessionStart) {
        const startTime = parseInt(lastSessionStart);
        const currentTime = Date.now();
        const sessionMinutes = Math.floor((currentTime - startTime) / 60000);
        totalTime += sessionMinutes;
      }

      return totalTime;
    } catch (error) {
      console.error('Error calculating study time:', error);
      return todaysStudyTime;
    }
  };

  const loadTodaysStats = async () => {
    try {
      // Загрузка статистики ответов
      const answerStats = await AsyncStorage.getItem(STORAGE_KEYS.ANSWER_STATS);
      const parsedAnswerStats = answerStats
        ? JSON.parse(answerStats)
        : { correct: 0, total: 0 };

      // Загрузка количества сессий
      const sessionsCount = await AsyncStorage.getItem(
        STORAGE_KEYS.SESSIONS_COUNT
      );

      // Загрузка изученных времен
      const learnedTenses = await AsyncStorage.getItem('learned_tenses');
      const completedTenses = learnedTenses
        ? JSON.parse(learnedTenses).length
        : 0;

      // Загрузка слов из словаря (если есть)
      const vocabulary = await AsyncStorage.getItem('user_vocabulary');
      const learnedWords = vocabulary ? JSON.parse(vocabulary).length : 0;

      // Получаем реальное время изучения
      const studyTime = await calculateTodaysStudyTime();

      setTodaysStats({
        sessions: parseInt(sessionsCount || '0'),
        totalTime: studyTime,
        correctAnswers: parsedAnswerStats.correct || 0,
        totalAnswers: parsedAnswerStats.total || 0,
        completedTenses,
        totalTenses: 9,
      });

      setTodaysStudyTime(studyTime);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Обновляем статистику при фокусе экрана
    const unsubscribe = navigation.addListener('focus', () => {
      loadTodaysStats();
    });

    return unsubscribe;
  }, [navigation]);

  // Генерация данных для 7 дней с реальными данными
  const generateWeekData = (): DayData[] => {
    const today = new Date();
    const days: DayData[] = [];

    for (let i = -3; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = date.toDateString();

      // Для сегодняшнего дня используем реальные данные
      if (i === 0) {
        const accuracy =
          todaysStats.totalAnswers > 0
            ? Math.round(
                (todaysStats.correctAnswers / todaysStats.totalAnswers) * 100
              )
            : 0;

        days.push({
          date,
          dayOfMonth: date.getDate(),
          dayOfWeek: getDayOfWeekShort(date.getDay()),
          isToday: true,
          isSelected: i === selectedDay,
          completedTasks: todaysStats.sessions,
          totalTasks: 10, // Максимальное рекомендуемое количество сессий в день
          accuracy,
          studiedTime: todaysStats.totalTime,
        });
      } else {
        // Для прошлых дней можно получить из AsyncStorage или использовать исторические данные
        // TODO Статистика за прошлые дни
        const totalTasks = 10;
        // const completedTasks = Math.floor(Math.random() * (totalTasks + 1));
        // const accuracy =
        //   completedTasks > 0 ? Math.floor(Math.random() * 20) + 80 : 0;
        // const studiedTime =
        //   completedTasks > 0 ? Math.floor(Math.random() * 60) + 30 : 0;

        const completedTasks = 0;
        const accuracy = 0;
        const studiedTime = 0;

        days.push({
          date,
          dayOfMonth: date.getDate(),
          dayOfWeek: getDayOfWeekShort(date.getDay()),
          isToday: false,
          isSelected: i === selectedDay,
          completedTasks,
          totalTasks,
          accuracy,
          studiedTime,
        });
      }
    }

    return days;
  };

  const getDayOfWeekShort = (dayIndex: number): string => {
    const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    return days[dayIndex];
  };

  // Получение прогресса по изученным временам
  const getTensesProgress = () => {
    return Math.round(
      (todaysStats.completedTenses / todaysStats.totalTenses) * 100
    );
  };

  // Получение количества изученных слов (можно получить из реального словаря)
  const getLearnedWordsCount = async (): Promise<number> => {
    try {
      const vocabulary = await AsyncStorage.getItem('user_vocabulary');
      return vocabulary ? JSON.parse(vocabulary).length : 0;
    } catch (error) {
      return 0;
    }
  };

  // Данные для быстрых функций - на основе реальных данных
  const [quickActions, setQuickActions] = useState<QuickAction[]>([
    {
      id: '1',
      title: 'Словарь',
      subtitle: 'Загружается...',
      icon: 'book',
      colors: ['#667EEA', '#764BA2'],
    },
    {
      id: '2',
      title: 'Тренировка',
      subtitle: 'Продолжить обучение',
      icon: 'play-circle',
      colors: ['#4ECDC4', '#44A08D'],
      badge: 'Продолжить',
    },
    {
      id: '3',
      title: 'Все времена',
      subtitle: `${todaysStats.completedTenses}/9 изучено`,
      icon: 'time',
      colors: ['#FF9A9E', '#FAD0C4'],
      progress: getTensesProgress(),
    },
    {
      id: '4',
      title: 'Статистика',
      subtitle: `${todaysStats.correctAnswers} правильных ответов`,
      icon: 'stats-chart',
      colors: ['#A78BFA', '#818CF8'],
    },
  ]);

  // Обновляем быстрые действия с реальными данными
  useEffect(() => {
    const updateQuickActions = async () => {
      const learnedWords = await getLearnedWordsCount();
      const accuracy =
        todaysStats.totalAnswers > 0
          ? Math.round(
              (todaysStats.correctAnswers / todaysStats.totalAnswers) * 100
            )
          : 0;

      setQuickActions([
        {
          id: '1',
          title: 'Словарь',
          subtitle: `${learnedWords} слов изучено`,
          icon: 'book',
          colors: ['#667EEA', '#764BA2'],
          badge:
            learnedWords > 0 ? `+${Math.min(learnedWords, 99)}` : undefined,
        },
        {
          id: '2',
          title: 'Тренировка',
          subtitle:
            todaysStats.sessions > 0
              ? 'Продолжить обучение'
              : 'Начать тренировку',
          icon: 'play-circle',
          colors: ['#4ECDC4', '#44A08D'],
          badge: todaysStats.sessions > 0 ? 'Продолжить' : 'Начать',
        },
        {
          id: '3',
          title: 'Все времена',
          subtitle: `${todaysStats.completedTenses}/12 изучено`,
          icon: 'time',
          colors: ['#FF9A9E', '#FAD0C4'],
          progress: getTensesProgress(),
        },
        {
          id: '4',
          title: 'Статистика',
          subtitle: `${accuracy}% точность`,
          icon: 'stats-chart',
          colors: ['#A78BFA', '#818CF8'],
          badge: accuracy > 0 ? `${accuracy}%` : undefined,
        },
      ]);
    };

    updateQuickActions();
  }, [todaysStats]);

  const weekData = generateWeekData();
  const selectedDayData = weekData[selectedDay + 3];

  // Стили в зависимости от темы
  const getCardStyle = () => ({
    backgroundColor:
      theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 1)',
    borderColor:
      theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
  });

  const getShadowStyle = () =>
    theme === 'dark'
      ? {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 5,
        }
      : {
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
        };

  const handleDayPress = (index: number) => {
    setSelectedDay(index);
  };

  // Форматирование времени изучения
  const formatStudyTime = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} мин`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours}ч ${remainingMinutes}мин`
      : `${hours}ч`;
  };

  // Расчет ширины карточек быстрых функций
  const cardWidth = (width - CARD_PADDING * 2 - 16) / 2;

  // Навигация по функциям
  const handleQuickActionPress = (actionId: string) => {
    switch (actionId) {
      case '1':
        navigation.navigate('Словарь');
        break;
      case '2':
        navigation.navigate('Времена');
        break;
      case '3':
        navigation.navigate('Времена');
        break;
    }
  };

  // Получение текста для статистики
  const getAccuracyText = () => {
    if (todaysStats.accuracy >= 90) return 'Отлично!';
    if (todaysStats.accuracy >= 70) return 'Хорошо';
    return 'Практикуйтесь больше';
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* БЛОК 1: Календарь */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              📅 Календарь
            </Text>
            <Text
              style={[styles.sectionSubtitle, { color: colors.textSecondary }]}
            >
              Выберите день для просмотра статистики
            </Text>
          </View>

          <View style={[styles.calendarCard, getCardStyle(), getShadowStyle()]}>
            <View style={styles.calendarContainer}>
              {weekData.map((day, index) => {
                const dayIndex = index - 3;
                // const progress = day.totalTasks > 0
                //   ? (day.completedTasks / day.totalTasks) * 100
                //   : 0;
                //TODO Прогресс за день
                const progress = 0;

                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dayCard,
                      day.isSelected && [
                        styles.selectedDayCard,
                        {
                          backgroundColor: colors.primary + '15',
                          borderColor: colors.primary,
                        },
                      ],
                      day.isToday &&
                        !day.isSelected && [
                          styles.todayCard,
                          {
                            borderColor: colors.primary,
                          },
                        ],
                    ]}
                    onPress={() => handleDayPress(dayIndex)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.dayOfWeekText,
                        { color: colors.textSecondary },
                        day.isSelected && {
                          color: colors.primary,
                          fontWeight: '600',
                        },
                      ]}
                    >
                      {day.dayOfWeek}
                    </Text>

                    <View
                      style={[
                        styles.dayNumberContainer,
                        day.isToday && [
                          styles.todayNumberContainer,
                          { backgroundColor: colors.primary },
                        ],
                      ]}
                    >
                      <Text
                        style={[
                          styles.dayNumberText,
                          day.isToday && { color: '#fff' },
                          day.isSelected &&
                            !day.isToday && {
                              color: colors.primary,
                              fontWeight: '700',
                            },
                        ]}
                      >
                        {day.dayOfMonth}
                      </Text>
                    </View>

                    {/* Индикатор прогресса */}
                    <View style={styles.dayProgressContainer}>
                      <View
                        style={[
                          styles.dayProgressBar,
                          {
                            backgroundColor:
                              theme === 'dark'
                                ? 'rgba(255,255,255,0.1)'
                                : 'rgba(0,0,0,0.05)',
                          },
                        ]}
                      >
                        <LinearGradient
                          colors={
                            progress > 0
                              ? [
                                  colors.primary,
                                  colors.primaryLight || colors.primary,
                                ]
                              : ['transparent', 'transparent']
                          }
                          style={[
                            styles.dayProgressFill,
                            { width: `${progress}%` },
                          ]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                        />
                      </View>
                      <Text
                        style={[
                          styles.dayProgressText,
                          { color: colors.textSecondary },
                          day.completedTasks === day.totalTasks && {
                            color: colors.primary,
                            fontWeight: '600',
                          },
                        ]}
                      >
                        {day.completedTasks}/{day.totalTasks}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* БЛОК 2: Статистика за выбранный день */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              📊 Сегодняшняя статистика
            </Text>
            <Text
              style={[styles.sectionSubtitle, { color: colors.textSecondary }]}
            >
              Обновляется в реальном времени
            </Text>
          </View>

          <View style={[styles.statsCard, getCardStyle(), getShadowStyle()]}>
            {/* Статистика в виде круговых диаграмм/индикаторов */}
            <View style={styles.statsGrid}>
              {/* Сессии */}
              <View style={styles.statItem}>
                <View
                  style={[styles.statCircle, { borderColor: colors.primary }]}
                >
                  <Text
                    style={[styles.statCircleNumber, { color: colors.text }]}
                  >
                    {todaysStats.sessions}
                  </Text>
                </View>
                <Text style={[styles.statLabel, { color: colors.text }]}>
                  Сессий
                </Text>
                <Text style={[styles.statProgress, { color: colors.primary }]}>
                  {todaysStats.sessions > 0 ? 'Отлично!' : 'Начните первую'}
                </Text>
              </View>

              {/* Точность */}
              <View style={styles.statItem}>
                <View style={[styles.statCircle, { borderColor: '#06D6A0' }]}>
                  <Text style={[styles.statCircleNumber, { color: '#06D6A0' }]}>
                    {todaysStats.totalAnswers > 0
                      ? Math.round(
                          (todaysStats.correctAnswers /
                            todaysStats.totalAnswers) *
                            100
                        )
                      : 0}
                    %
                  </Text>
                </View>
                <Text style={[styles.statLabel, { color: colors.text }]}>
                  Точность
                </Text>
                <Text style={[styles.statProgress, { color: '#06D6A0' }]}>
                  {getAccuracyText()}
                </Text>
              </View>

              {/* Время изучения */}
              <View style={styles.statItem}>
                <View style={[styles.statCircle, { borderColor: '#FFD166' }]}>
                  <Ionicons name='time-outline' size={20} color='#FFD166' />
                  <Text
                    style={[
                      styles.statCircleNumber,
                      { color: '#FFD166', marginLeft: 4 },
                    ]}
                  >
                    {todaysStudyTime}
                  </Text>
                </View>
                <Text style={[styles.statLabel, { color: colors.text }]}>
                  Минут изучения
                </Text>
                <Text style={[styles.statProgress, { color: '#FFD166' }]}>
                  {formatStudyTime(todaysStudyTime)}
                </Text>
              </View>
            </View>

            {/* Прогресс дня */}
            <View style={styles.dayProgressContainerFull}>
              <View style={styles.progressHeader}>
                <Text style={[styles.progressLabel, { color: colors.text }]}>
                  Дневной прогресс
                </Text>
                <Text
                  style={[styles.progressPercentage, { color: colors.primary }]}
                >
                  {Math.round((todaysStats.sessions / 10) * 100)}%
                </Text>
              </View>
              <View style={styles.progressBar}>
                <LinearGradient
                  colors={[
                    colors.primary,
                    colors.primaryLight || colors.primary,
                  ]}
                  style={[
                    styles.progressFill,
                    { width: `${(todaysStats.sessions / 10) * 100}%` },
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              </View>
            </View>
          </View>

          {/* БЛОК 3: Быстрые функции */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              🕒 Быстрые функции
            </Text>
            <Text
              style={[styles.sectionSubtitle, { color: colors.textSecondary }]}
            >
              Ваши инструменты для обучения
            </Text>
          </View>

          <View style={styles.quickActionsGrid}>
            {quickActions.map(action => (
              <TouchableOpacity
                key={action.id}
                style={[
                  styles.quickActionCard,
                  getCardStyle(),
                  getShadowStyle(),
                  { width: cardWidth },
                ]}
                activeOpacity={0.9}
                onPress={() => handleQuickActionPress(action.id)}
              >
                <View style={styles.quickActionHeader}>
                  <Text
                    style={[styles.quickActionTitle, { color: colors.text }]}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.8}
                  >
                    {action.title}
                  </Text>
                  {action.badge && (
                    <View
                      style={[
                        styles.quickActionBadge,
                        { backgroundColor: action.colors[0] + '20' },
                      ]}
                    >
                      <Text
                        style={[
                          styles.quickActionBadgeText,
                          { color: action.colors[0] },
                        ]}
                      >
                        {action.badge}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.quickActionContent}>
                  <LinearGradient
                    colors={action.colors}
                    style={styles.quickActionIconContainer}
                  >
                    <Ionicons
                      name={action.icon as any}
                      size={24}
                      color='#fff'
                    />
                  </LinearGradient>

                  <View style={styles.quickActionInfo}>
                    <Text
                      style={[
                        styles.quickActionSubtitle,
                        { color: colors.textSecondary },
                      ]}
                      numberOfLines={1}
                    >
                      {action.subtitle}
                    </Text>

                    {action.progress !== undefined && (
                      <View style={styles.quickActionProgressContainer}>
                        <View
                          style={[
                            styles.quickActionProgressBar,
                            {
                              backgroundColor:
                                theme === 'dark'
                                  ? 'rgba(255,255,255,0.1)'
                                  : 'rgba(0,0,0,0.05)',
                            },
                          ]}
                        >
                          <LinearGradient
                            colors={action.colors}
                            style={[
                              styles.quickActionProgressFill,
                              { width: `${action.progress}%` },
                            ]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                          />
                        </View>
                        <Text
                          style={[
                            styles.quickActionProgressText,
                            { color: colors.textSecondary },
                          ]}
                        >
                          {action.progress}%
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Отступ внизу */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

// Вспомогательные функции для работы со статистикой
export const updateTodaysStats = async () => {
  try {
    const today = new Date().toDateString();
    const key = `stats_${today}`;

    // Получаем текущие данные
    const existingStats = await AsyncStorage.getItem(key);
    const stats = existingStats
      ? JSON.parse(existingStats)
      : {
          sessions: 0,
          totalTime: 0,
          correctAnswers: 0,
          totalAnswers: 0,
          lastUpdated: Date.now(),
        };

    // Обновляем количество сессий
    const sessions = await AsyncStorage.getItem('today_sessions_count');
    stats.sessions = parseInt(sessions || '0');

    // Обновляем время изучения
    const studyTime = await AsyncStorage.getItem('total_study_time_today');
    stats.totalTime = parseInt(studyTime || '0');

    // Обновляем ответы
    const answerStats = await AsyncStorage.getItem('today_answer_stats');
    if (answerStats) {
      const parsed = JSON.parse(answerStats);
      stats.correctAnswers = parsed.correct || 0;
      stats.totalAnswers = parsed.total || 0;
    }

    stats.lastUpdated = Date.now();

    await AsyncStorage.setItem(key, JSON.stringify(stats));
    return stats;
  } catch (error) {
    console.error('Error updating stats:', error);
  }
};

export const startStudySession = async () => {
  try {
    // Записываем время начала сессии
    await AsyncStorage.setItem('session_start_time', Date.now().toString());

    // Увеличиваем счетчик сессий за сегодня
    const today = new Date().toDateString();
    const sessionsKey = 'today_sessions_count';
    const currentSessions = await AsyncStorage.getItem(sessionsKey);
    const newCount = parseInt(currentSessions || '0') + 1;
    await AsyncStorage.setItem(sessionsKey, newCount.toString());

    console.log('Study session started');
  } catch (error) {
    console.error('Error starting study session:', error);
  }
};

export const endStudySession = async () => {
  try {
    const startTime = await AsyncStorage.getItem('session_start_time');
    if (startTime) {
      const sessionStart = parseInt(startTime);
      const sessionEnd = Date.now();
      const minutes = Math.floor((sessionEnd - sessionStart) / 60000);

      // Добавляем время к общему
      const totalTimeKey = 'total_study_time_today';
      const currentTotal = await AsyncStorage.getItem(totalTimeKey);
      const newTotal = parseInt(currentTotal || '0') + minutes;
      await AsyncStorage.setItem(totalTimeKey, newTotal.toString());

      // Очищаем время начала
      await AsyncStorage.removeItem('session_start_time');

      console.log(
        `Session ended. Duration: ${minutes} minutes. Total today: ${newTotal} minutes`
      );
    }
  } catch (error) {
    console.error('Error ending study session:', error);
  }
};

export const updateAnswerStats = async (isCorrect: boolean) => {
  try {
    const key = 'today_answer_stats';
    const existingStats = await AsyncStorage.getItem(key);
    const stats = existingStats
      ? JSON.parse(existingStats)
      : { correct: 0, total: 0 };

    stats.total += 1;
    if (isCorrect) {
      stats.correct += 1;
    }

    await AsyncStorage.setItem(key, JSON.stringify(stats));
    console.log('Answer stats updated:', stats);
  } catch (error) {
    console.error('Error updating answer stats:', error);
  }
};

// Сбрасываем ежедневную статистику в полночь
export const resetDailyStats = async () => {
  try {
    await AsyncStorage.multiRemove([
      'today_sessions_count',
      'total_study_time_today',
      'today_answer_stats',
      'session_start_time',
    ]);
    console.log('Daily stats reset');
  } catch (error) {
    console.error('Error resetting daily stats:', error);
  }
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: CARD_PADDING,
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
    paddingBottom: 40,
  },
  sectionHeader: {
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    opacity: 0.8,
  },
  calendarCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
  },
  calendarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCard: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    flex: 1,
    marginHorizontal: 2,
  },
  selectedDayCard: {
    borderWidth: 1,
  },
  todayCard: {
    borderWidth: 1,
  },
  dayOfWeekText: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
  },
  dayNumberContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  todayNumberContainer: {
    backgroundColor: '#007AFF',
  },
  dayNumberText: {
    fontSize: 16,
    fontWeight: '600',
  },
  dayProgressContainer: {
    alignItems: 'center',
    width: '100%',
  },
  dayProgressBar: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  dayProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  dayProgressText: {
    fontSize: 10,
    fontWeight: '500',
  },
  statsCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statCircleNumber: {
    fontSize: 20,
    fontWeight: '700',
  },
  statCircleLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 4,
  },
  statProgress: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  dayProgressContainerFull: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  quickActionCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    minHeight: 120,
  },
  quickActionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
    textAlign: 'left',
    includeFontPadding: false,
  },
  quickActionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 30,
    alignItems: 'center',
  },
  quickActionBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  quickActionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  quickActionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  quickActionInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  quickActionSubtitle: {
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 8,
  },
  quickActionProgressContainer: {
    width: '100%',
  },
  quickActionProgressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  quickActionProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  quickActionProgressText: {
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'right',
  },
  bottomSpacer: {
    height: 20,
  },
});

export default MainScreen;
