import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../../contexts/ThemeContext';

const { width, height } = Dimensions.get('window');

const InfoScreen = (): JSX.Element => {
  const { colors, theme } = useTheme();

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 80,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const advantages = [
    {
      icon: 'infinite',
      color: '#00D4AA',
      title: 'Бесконечная практика',
      description:
        'Никогда не заканчиваются упражнения благодаря нашей системе генерации контента',
    },
    {
      icon: 'time',
      color: '#FF6B35',
      title: 'Все времена',
      description:
        'Полное покрытие настоящего, прошедшего, будущего и всех грамматических вариаций',
    },
    {
      icon: 'analytics',
      color: '#8B5CFF',
      title: 'Умный отслеживание прогресса',
      description:
        'Аналитика в реальном времени и персонализированные инсайты о вашем обучении',
    },
    {
      icon: 'cellular',
      color: '#00B894',
      title: 'Адаптивная система',
      description:
        'Автоматическая настройка сложности на основе вашей успеваемости и стиля обучения',
    },
    {
      icon: 'download',
      color: '#FFD700',
      title: 'Полный оффлайн доступ',
      description:
        'Учитесь где угодно и когда угодно без подключения к интернету',
    },
    {
      icon: 'rocket',
      color: '#FF4081',
      title: 'Быстрый прогресс',
      description:
        'Измеримое улучшение ваших навыков английского всего за несколько дней',
    },
  ];

  // Функция для получения цветов градиента в зависимости от темы
  const getBackgroundGradient = () => {
    switch (theme) {
      case 'light':
        return ['#F8FAFF', '#F0F5FF', '#F8FAFF', '#F0F7FF'];
      case 'dark':
        return ['#0A0020', '#1A0030', '#0A0020', '#0F0028'];
      default:
        return ['#0A0020', '#1A0030', '#0A0020', '#0F0028'];
    }
  };

  const getFloatingOrbColor = (baseColor: string) => {
    return theme === 'light'
      ? baseColor.replace('rgba(', 'rgba(').replace(/[\d.]+\)$/, '0.05)')
      : baseColor;
  };

  // Функция для получения стилей тени в зависимости от темы
  const getShadowStyle = () => {
    if (theme === 'light') {
      return {
        shadowColor: 'rgba(0, 0, 0, 0.08)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
      };
    } else {
      return {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 15,
      };
    }
  };

  // Функция для получения стилей тени заголовка
  const getHeaderShadowStyle = () => {
    if (theme === 'light') {
      return {
        shadowColor: colors.primary + '40',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 12,
      };
    } else {
      return {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.6,
        shadowRadius: 25,
        elevation: 20,
      };
    }
  };

  // Функция для получения стилей тени карточки
  const getCardShadowStyle = () => {
    if (theme === 'light') {
      return {
        shadowColor: 'rgba(0, 0, 0, 0.06)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
      };
    } else {
      return {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
      };
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Улучшенный анимированный фон */}
      <View style={styles.background}>
        <LinearGradient
          colors={getBackgroundGradient()}
          style={styles.backgroundGradient}
        />

        {/* Анимированные плавающие элементы */}
        <Animated.View
          style={[
            styles.floatingOrb1,
            {
              opacity: fadeAnim,
              backgroundColor: getFloatingOrbColor('rgba(102, 61, 255, 0.15)'),
              ...(theme === 'light' && {
                backgroundColor: 'rgba(102, 61, 255, 0.03)',
              }),
            },
          ]}
        />
        <Animated.View
          style={[
            styles.floatingOrb2,
            {
              opacity: fadeAnim,
              backgroundColor: getFloatingOrbColor('rgba(0, 212, 170, 0.12)'),
              ...(theme === 'light' && {
                backgroundColor: 'rgba(0, 212, 170, 0.02)',
              }),
            },
          ]}
        />
        <Animated.View
          style={[
            styles.floatingOrb3,
            {
              opacity: fadeAnim,
              backgroundColor: getFloatingOrbColor('rgba(255, 107, 53, 0.1)'),
              ...(theme === 'light' && {
                backgroundColor: 'rgba(255, 107, 53, 0.02)',
              }),
            },
          ]}
        />
        <Animated.View
          style={[
            styles.floatingOrb4,
            {
              opacity: fadeAnim,
              backgroundColor: getFloatingOrbColor('rgba(139, 92, 255, 0.1)'),
              ...(theme === 'light' && {
                backgroundColor: 'rgba(139, 92, 255, 0.02)',
              }),
            },
          ]}
        />

        {/* Анимированные частицы - только для темной темы */}
        {theme === 'dark' && (
          <View style={styles.particlesContainer}>
            {[...Array(20)].map((_, i) => (
              <Animated.View
                key={i}
                style={[
                  styles.particle,
                  {
                    left: Math.random() * width,
                    top: Math.random() * height,
                    opacity: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 0.6],
                    }),
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    transform: [
                      {
                        scale: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.3, 1],
                        }),
                      },
                    ],
                  },
                ]}
              />
            ))}
          </View>
        )}
      </View>

      <View style={styles.container}>
        {/* Улучшенный заголовок */}
        <Animated.View
          style={[
            styles.headerSection,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                {
                  scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.iconContainer,
              {
                transform: [
                  {
                    rotate: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
                ...getHeaderShadowStyle(),
              },
            ]}
          >
            <LinearGradient
              colors={
                theme === 'light'
                  ? ['#6366F1', '#8B5CF6', '#00D4AA']
                  : ['#663DFF', '#8B5CFF', '#00D4AA']
              }
              style={[
                styles.iconGradient,
                {
                  borderColor:
                    theme === 'light'
                      ? 'rgba(255, 255, 255, 0.3)'
                      : 'rgba(255, 255, 255, 0.2)',
                },
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name='infinite' size={42} color='#FFFFFF' />
            </LinearGradient>
          </Animated.View>
          <Text
            style={[
              styles.mainTitle,
              {
                color: colors.text,
                textShadowColor:
                  theme === 'light'
                    ? 'rgba(99, 102, 241, 0.2)'
                    : 'rgba(102, 61, 255, 0.5)',
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: theme === 'light' ? 8 : 10,
              },
            ]}
          >
            ДЕРЖИ ГРАММАТИКУ
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Раскрой свой языковой потенциал
          </Text>
        </Animated.View>

        {/* Улучшенный контент - Без карточек, прямой скролл */}
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            },
          ]}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Приветственная секция */}
            <Animated.View style={[styles.section, styles.welcomeSection]}>
              <View style={styles.sectionHeader}>
                <LinearGradient
                  colors={
                    theme === 'light'
                      ? ['#6366F1', '#8B5CF6']
                      : ['#8B5CFF', '#663DFF']
                  }
                  style={[styles.sectionIcon, getShadowStyle()]}
                >
                  <Ionicons name='star' size={20} color='#FFFFFF' />
                </LinearGradient>
                <Text
                  style={[
                    styles.sectionTitle,
                    {
                      color: colors.text,
                      textShadowColor:
                        theme === 'light'
                          ? 'rgba(0, 0, 0, 0.05)'
                          : 'rgba(255, 255, 255, 0.1)',
                      textShadowOffset: { width: 0, height: 0 },
                      textShadowRadius: theme === 'light' ? 3 : 5,
                    },
                  ]}
                >
                  ДОБРО ПОЖАЛОВАТЬ В БУДУЩЕЕ ОБУЧЕНИЯ
                </Text>
              </View>
              <Text
                style={[styles.welcomeText, { color: colors.textSecondary }]}
              >
                Испытайте самую продвинутую платформу для изучения английского,
                созданную для преобразования ваших языковых навыков с помощью
                передовых технологий и проверенных образовательных методик.
              </Text>
            </Animated.View>

            {/* Сетка преимуществ */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <LinearGradient
                  colors={['#00D4AA', '#00B894']}
                  style={[styles.sectionIcon, getShadowStyle()]}
                >
                  <Ionicons
                    name='flash'
                    size={20}
                    color={theme === 'light' ? '#000' : '#FFF'}
                  />
                </LinearGradient>
                <Text
                  style={[
                    styles.sectionTitle,
                    {
                      color: colors.text,
                      textShadowColor:
                        theme === 'light'
                          ? 'rgba(0, 0, 0, 0.05)'
                          : 'rgba(255, 255, 255, 0.1)',
                      textShadowOffset: { width: 0, height: 0 },
                      textShadowRadius: theme === 'light' ? 3 : 5,
                    },
                  ]}
                >
                  ПОЧЕМУ МЫ ЛУЧШИЕ
                </Text>
              </View>

              <View style={styles.advantagesGrid}>
                {advantages.map((advantage, index) => (
                  <Animated.View
                    key={index}
                    style={[
                      styles.advantageCard,
                      {
                        opacity: fadeAnim,
                        transform: [
                          {
                            translateY: fadeAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [30, 0],
                            }),
                          },
                        ],
                        ...getCardShadowStyle(),
                      },
                    ]}
                  >
                    <LinearGradient
                      colors={
                        theme === 'light'
                          ? [
                              'rgba(255, 255, 255, 0.9)',
                              'rgba(255, 255, 255, 0.7)',
                            ]
                          : [
                              'rgba(255, 255, 255, 0.1)',
                              'rgba(255, 255, 255, 0.05)',
                            ]
                      }
                      style={[
                        styles.advantageGradient,
                        {
                          borderColor:
                            theme === 'light'
                              ? 'rgba(0, 0, 0, 0.05)'
                              : 'rgba(255, 255, 255, 0.1)',
                          backgroundColor:
                            theme === 'light'
                              ? colors.backgroundSecondary
                              : 'transparent',
                        },
                      ]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <View style={styles.advantageIconContainer}>
                        <Ionicons
                          name={advantage.icon}
                          size={28}
                          color={advantage.color}
                        />
                      </View>
                      <Text
                        style={[styles.advantageTitle, { color: colors.text }]}
                      >
                        {advantage.title}
                      </Text>
                      <Text
                        style={[
                          styles.advantageDescription,
                          { color: colors.textSecondary },
                        ]}
                      >
                        {advantage.description}
                      </Text>
                    </LinearGradient>
                  </Animated.View>
                ))}
              </View>
            </View>

            {/* Секция результатов */}
            <Animated.View style={[styles.section, styles.resultsSection]}>
              <View style={styles.sectionHeader}>
                <LinearGradient
                  colors={['#FF6B35', '#FF4081']}
                  style={[styles.sectionIcon, getShadowStyle()]}
                >
                  <Ionicons name='trophy' size={20} color='#FFFFFF' />
                </LinearGradient>
                <Text
                  style={[
                    styles.sectionTitle,
                    {
                      color: colors.text,
                      textShadowColor:
                        theme === 'light'
                          ? 'rgba(0, 0, 0, 0.05)'
                          : 'rgba(255, 255, 255, 0.1)',
                      textShadowOffset: { width: 0, height: 0 },
                      textShadowRadius: theme === 'light' ? 3 : 5,
                    },
                  ]}
                >
                  ДОКАЗАННЫЕ РЕЗУЛЬТАТЫ
                </Text>
              </View>
              <Text
                style={[styles.resultsText, { color: colors.textSecondary }]}
              >
                Присоединяйтесь к тысячам учеников, которые достигли беглости в
                3 раза быстрее, чем традиционными методами. Наша интеллектуальная
                система гарантирует, что вы тратите время на то, что действительно
                важно для вашего прогресса.
              </Text>

              <View style={styles.statsContainer}>
                <View
                  style={[
                    styles.statItem,
                    theme === 'light' && {
                      backgroundColor: 'rgba(0, 212, 170, 0.05)',
                      padding: 12,
                      borderRadius: 12,
                    },
                  ]}
                >
                  <Text style={[styles.statNumber, { color: '#00D4AA' }]}>
                    в 3 раза
                  </Text>
                  <Text
                    style={[styles.statLabel, { color: colors.textSecondary }]}
                  >
                    Быстрее прогресс
                  </Text>
                </View>
                <View
                  style={[
                    styles.statItem,
                    theme === 'light' && {
                      backgroundColor: 'rgba(0, 212, 170, 0.05)',
                      padding: 12,
                      borderRadius: 12,
                    },
                  ]}
                >
                  <Text style={[styles.statNumber, { color: '#00D4AA' }]}>
                    98%
                  </Text>
                  <Text
                    style={[styles.statLabel, { color: colors.textSecondary }]}
                  >
                    Удовлетворенность
                  </Text>
                </View>
                <View
                  style={[
                    styles.statItem,
                    theme === 'light' && {
                      backgroundColor: 'rgba(0, 212, 170, 0.05)',
                      padding: 12,
                      borderRadius: 12,
                    },
                  ]}
                >
                  <Text style={[styles.statNumber, { color: '#00D4AA' }]}>
                    24/7
                  </Text>
                  <Text
                    style={[styles.statLabel, { color: colors.textSecondary }]}
                  >
                    Доступность
                  </Text>
                </View>
              </View>
            </Animated.View>
          </ScrollView>
        </Animated.View>

        {/* Улучшенный футер */}
        <Animated.View
          style={[
            styles.footer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={[styles.footerText, { color: colors.textTertiary }]}>
            Преобразуй свой английский • Освой своё будущее
          </Text>
          <Text style={[styles.versionText, { color: colors.textTertiary }]}>
            Версия 1.0.0
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  floatingOrb1: {
    position: 'absolute',
    top: '10%',
    right: '15%',
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  floatingOrb2: {
    position: 'absolute',
    bottom: '20%',
    left: '10%',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  floatingOrb3: {
    position: 'absolute',
    top: '35%',
    left: '75%',
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  floatingOrb4: {
    position: 'absolute',
    bottom: '40%',
    right: '5%',
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  particlesContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 10,
  },
  iconContainer: {
    marginBottom: 20,
  },
  iconGradient: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 3,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1.5,
  },
  contentContainer: {
    flex: 1,
    marginBottom: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 35,
  },
  welcomeSection: {
    marginBottom: 40,
  },
  resultsSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  sectionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  welcomeText: {
    fontSize: 17,
    lineHeight: 26,
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  resultsText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    marginBottom: 25,
    textAlign: 'center',
  },
  advantagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  advantageCard: {
    width: (width - 55) / 2,
    marginBottom: 15,
    borderRadius: 20,
    overflow: 'hidden',
  },
  advantageGradient: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    minHeight: 160,
  },
  advantageIconContainer: {
    marginBottom: 12,
  },
  advantageTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  advantageDescription: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  statItem: {
    alignItems: 'center',
    padding: 8,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 25,
    paddingTop: 10,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    letterSpacing: 1,
  },
  versionText: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});

export default InfoScreen;