import React, { useMemo, useCallback, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
  Text
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from '../../contexts/ThemeContext';

const { width, height } = Dimensions.get('window');

// Импортируем данные о временах
import {
  FUTURE_CONTINUOUS,
  FUTURE_PERFECT,
  FUTURE_SIMPLE,
  PAST_CONTINUOUS,
  PAST_PERFECT,
  PAST_SIMPLE,
  PRESENT_CONTINUOUS,
  PRESENT_PERFECT,
  PRESENT_SIMPLE,
} from "../../../assets/data";

// Премиум цветовые схемы в стиле приложения
const TENSE_COLORS = {
  PRESENT_SIMPLE: ['#663DFF', '#8B5CFF'],
  PRESENT_CONTINUOUS: ['#00D4AA', '#00B894'],
  PRESENT_PERFECT: ['#FF6B35', '#FF8E53'],
  PAST_SIMPLE: ['#FFD93D', '#FFE769'],
  PAST_CONTINUOUS: ['#6C5CE7', '#8175EA'],
  PAST_PERFECT: ['#FD79A8', '#FF8DB8'],
  FUTURE_SIMPLE: ['#00CEC9', '#00E5D4'],
  FUTURE_CONTINUOUS: ['#FDCB6E', '#FFDA95'],
  FUTURE_PERFECT: ['#E84393', '#F368A6'],
};

const TENSES_LIST = [
  { entity: PRESENT_SIMPLE, type: 'PRESENT_SIMPLE', title: 'Present Simple', description: 'Факты, регулярные действия' },
  { entity: PRESENT_CONTINUOUS, type: 'PRESENT_CONTINUOUS', title: 'Present Continuous', description: 'Действия в процессе' },
  { entity: PRESENT_PERFECT, type: 'PRESENT_PERFECT', title: 'Present Perfect', description: 'Опыт и результат' },
  { entity: PAST_SIMPLE, type: 'PAST_SIMPLE', title: 'Past Simple', description: 'Завершенные действия в прошлом' },
  { entity: PAST_CONTINUOUS, type: 'PAST_CONTINUOUS', title: 'Past Continuous', description: 'Длительные действия в прошлом' },
  { entity: PAST_PERFECT, type: 'PAST_PERFECT', title: 'Past Perfect', description: 'Предпрошедшее время' },
  { entity: FUTURE_SIMPLE, type: 'FUTURE_SIMPLE', title: 'Future Simple', description: 'Будущие действия и обещания' },
  { entity: FUTURE_CONTINUOUS, type: 'FUTURE_CONTINUOUS', title: 'Future Continuous', description: 'Длительные действия в будущем' },
  { entity: FUTURE_PERFECT, type: 'FUTURE_PERFECT', title: 'Future Perfect', description: 'Завершенные действия к моменту' },
];

const TenseScreen = (props: any): JSX.Element => {
  const { colors, theme } = useTheme();
  const [showHint, setShowHint] = useState(true);

  // Используем useMemo для стабильных значений
  const backgroundGradient = useMemo(() => 
    theme === 'dark'
      ? ['#0A0020', '#1A0030', '#0A0020']
      : ['#F8FAFC', '#E2E8F0', '#F8FAFC'],
    [theme]
  );

  const orbColor1 = useMemo(() => 
    theme === 'dark'
      ? 'rgba(102, 61, 255, 0.1)'
      : 'rgba(99, 102, 241, 0.1)',
    [theme]
  );

  const orbColor2 = useMemo(() => 
    theme === 'dark'
      ? 'rgba(0, 212, 170, 0.1)'
      : 'rgba(16, 185, 129, 0.1)',
    [theme]
  );

  // Анимации
  const mainScale = React.useRef(new Animated.Value(0.8)).current;
  const mainOpacity = React.useRef(new Animated.Value(0)).current;
  const cardsScale = React.useRef(TENSES_LIST.map(() => new Animated.Value(0.9))).current;
  const cardsOpacity = React.useRef(TENSES_LIST.map(() => new Animated.Value(0))).current;
  const cardsTranslate = React.useRef(TENSES_LIST.map(() => new Animated.Value(30))).current;
  const hintOpacity = React.useRef(new Animated.Value(1)).current;
  const hintTranslate = React.useRef(new Animated.Value(0)).current;

  // Флаг для предотвращения повторного запуска анимаций
  const animationStarted = React.useRef(false);

  React.useEffect(() => {
    // Запускаем анимацию только один раз
    if (!animationStarted.current) {
      animationStarted.current = true;
      
      // Эпичная анимация приближения
      Animated.parallel([
        Animated.spring(mainScale, {
          toValue: 1,
          tension: 70,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(mainOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();

      // Анимации карточек с эффектом приближения
      TENSES_LIST.forEach((_, index) => {
        Animated.parallel([
          Animated.spring(cardsScale[index], {
            toValue: 1,
            tension: 65,
            friction: 7,
            delay: index * 80,
            useNativeDriver: true,
          }),
          Animated.timing(cardsOpacity[index], {
            toValue: 1,
            duration: 500,
            delay: index * 80,
            useNativeDriver: true,
          }),
          Animated.spring(cardsTranslate[index], {
            toValue: 0,
            tension: 70,
            friction: 6,
            delay: index * 80,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }

    // Сбрасываем анимации при уходе с экрана
    return () => {
      // Оставляем значения анимаций текущими
    };
  }, []); // Пустой массив зависимостей - запускаем только при монтировании

  const handleHideHint = () => {
    Animated.parallel([
      Animated.timing(hintOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(hintTranslate, {
        toValue: -20,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowHint(false);
    });
  };

  const handleCardPress = useCallback((tense: any, index: number) => {
    // Анимация нажатия
    Animated.sequence([
      Animated.timing(cardsScale[index], {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(cardsScale[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      props.navigation.navigate("Тренажер", { tense: tense.entity });
    }, 150);
  }, [props.navigation]);

  const getTenseIcon = useCallback((type: string) => {
    const icons = {
      PRESENT_SIMPLE: '⏱️',
      PRESENT_CONTINUOUS: '🔄',
      PRESENT_PERFECT: '✅',
      PAST_SIMPLE: '📅',
      PAST_CONTINUOUS: '⏪',
      PAST_PERFECT: '🏁',
      FUTURE_SIMPLE: '🚀',
      FUTURE_CONTINUOUS: '🔮',
      FUTURE_PERFECT: '🎯',
    };
    return icons[type as keyof typeof icons] || '📚';
  }, []);

  const getDifficulty = useCallback((type: string) => {
    const difficulties = {
      PRESENT_SIMPLE: 'EASY',
      PRESENT_CONTINUOUS: 'MEDIUM',
      PRESENT_PERFECT: 'HARD',
      PAST_SIMPLE: 'EASY',
      PAST_CONTINUOUS: 'MEDIUM',
      PAST_PERFECT: 'HARD',
      FUTURE_SIMPLE: 'EASY',
      FUTURE_CONTINUOUS: 'MEDIUM',
      FUTURE_PERFECT: 'HARD',
    };
    return difficulties[type as keyof typeof difficulties] || 'MEDIUM';
  }, []);

  const TenseCard = React.useCallback(({ tense, index }: { tense: any, index: number }) => {
    const colors = TENSE_COLORS[tense.type as keyof typeof TENSE_COLORS];
    
    return (
      <Animated.View
        style={[
          styles.cardWrapper,
          {
            opacity: cardsOpacity[index],
            transform: [
              { scale: cardsScale[index] },
              { translateY: cardsTranslate[index] }
            ],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleCardPress(tense, index)}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={colors}
            style={styles.gradientBackground}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Glow эффект */}
            <View style={styles.cardGlow} />
            
            {/* Декоративные элементы */}
            <View style={styles.decorativeOrb} />
            <View style={styles.decorativeSquare} />
            
            {/* Контент карточки */}
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>
                    {getTenseIcon(tense.type)}
                  </Text>
                </View>
                <View style={styles.difficulty}>
                  <Text style={[styles.difficultyText, {
                    textShadowColor: 'rgba(0, 0, 0, 0.2)',
                    textShadowOffset: { width: 0.5, height: 0.5 },
                    textShadowRadius: 1,
                  }]}>
                    {getDifficulty(tense.type)}
                  </Text>
                </View>
              </View>
              
              <View style={styles.textContent}>
                <Text style={[styles.title, {
                  textShadowColor: 'rgba(0, 0, 0, 0.3)',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                }]}>
                  {tense.title}
                </Text>
                <Text style={[styles.description, {
                  textShadowColor: 'rgba(0, 0, 0, 0.2)',
                  textShadowOffset: { width: 0.5, height: 0.5 },
                  textShadowRadius: 1,
                }]}>
                  {tense.description}
                </Text>
              </View>
              
              <View style={styles.cardFooter}>
                <View style={styles.stats}>
                  <Ionicons name="star" size={14} color="#ffd83eff" />
                  <Text style={[styles.statsText, {
                    textShadowColor: 'rgba(0, 0, 0, 0.2)',
                    textShadowOffset: { width: 0.5, height: 0.5 },
                    textShadowRadius: 1,
                  }]}>
                    {(Math.random() * (5 - 2) + 2).toFixed(1)}
                  </Text>
                  <View style={styles.statDivider} />
                </View>
                <View style={styles.arrowContainer}>
                  <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
                </View>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  }, [handleCardPress, getTenseIcon, getDifficulty]);

  // Используем статические стили
  const styles = useMemo(() => StyleSheet.create({
    background: {
      ...StyleSheet.absoluteFillObject,
    },
    backgroundGradient: {
      flex: 1,
    },
    floatingOrb1: {
      position: 'absolute',
      top: '15%',
      right: '10%',
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    floatingOrb2: {
      position: 'absolute',
      bottom: '20%',
      left: '5%',
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    container: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 20,
    },
    header: {
      marginBottom: 32,
    },
    headerMain: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    headerTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    titleIcon: {
      width: 56,
      height: 56,
      borderRadius: 16,
      backgroundColor: theme === 'dark' ? 'rgba(102, 61, 255, 0.2)' : 'rgba(99, 102, 241, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
      borderWidth: 1,
      borderColor: theme === 'dark' ? 'rgba(102, 61, 255, 0.3)' : 'rgba(99, 102, 241, 0.3)',
    },
    pageTitle: {
      fontSize: 28,
      fontWeight: '300',
      letterSpacing: 1,
      marginBottom: 4,
    },
    pageSubtitle: {
      fontSize: 14,
      fontWeight: '500',
      letterSpacing: 0.5,
    },
    counter: {
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: theme === 'dark' ? 'rgba(102, 61, 255, 0.2)' : 'rgba(99, 102, 241, 0.2)',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme === 'dark' ? 'rgba(102, 61, 255, 0.4)' : 'rgba(99, 102, 241, 0.4)',
    },
    counterNumber: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 2,
    },
    counterLabel: {
      fontSize: 10,
      fontWeight: '700',
      letterSpacing: 1,
    },
    hintContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 16,
    },
    hintContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    hintIcon: {
      marginRight: 12,
    },
    hintTextContainer: {
      flex: 1,
    },
    hintTitle: {
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 2,
    },
    hintText: {
      fontSize: 12,
      lineHeight: 16,
    },
    hintCloseButton: {
      padding: 4,
    },
    scrollContent: {
      paddingBottom: 24,
    },
    cardWrapper: {
      marginBottom: 16,
    },
    card: {
      borderRadius: 24,
      overflow: 'hidden',
      height: 180, // Сделал карточки больше
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 15 },
      shadowOpacity: 0.4,
      shadowRadius: 25,
      elevation: 20,
    },
    gradientBackground: {
      flex: 1,
      padding: 24,
      position: 'relative',
    },
    cardGlow: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    decorativeOrb: {
      position: 'absolute',
      top: -30,
      right: -30,
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    decorativeSquare: {
      position: 'absolute',
      bottom: -15,
      left: -15,
      width: 80,
      height: 80,
      borderRadius: 12,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      transform: [{ rotate: '45deg' }],
    },
    cardContent: {
      flex: 1,
      justifyContent: 'space-between',
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    iconContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 12,
      padding: 8,
    },
    icon: {
      fontSize: 20,
    },
    difficulty: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    difficultyText: {
      color: '#000',
      fontSize: 11,
      fontWeight: '800',
      letterSpacing: 0.5,
    },
    textContent: {
      flex: 1,
      justifyContent: 'center',
      marginVertical: 10,
    },
    title: {
      color: '#FFFFFF',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 6,
      letterSpacing: 0.5,
    },
    description: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 18,
    },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    stats: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    statDivider: {
      width: 3,
      height: 3,
      borderRadius: 1.5,
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    statsText: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: 12,
      fontWeight: '600',
    },
    arrowContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 20,
      width: 36,
      height: 36,
      justifyContent: 'center',
      alignItems: 'center',
    },
    footerSpace: {
      height: 20,
    },
  }), [theme]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      
      {/* Темный фон с градиентом */}
      <View style={styles.background}>
        <LinearGradient
          colors={backgroundGradient}
          style={styles.backgroundGradient}
        />
        
        {/* Фоновые элементы */}
        <View style={[styles.floatingOrb1, { backgroundColor: orbColor1 }]} />
        <View style={[styles.floatingOrb2, { backgroundColor: orbColor2 }]} />
      </View>

      <Animated.View 
        style={[
          styles.container,
          {
            opacity: mainOpacity,
            transform: [{ scale: mainScale }]
          }
        ]}
      >
        
        {/* Премиум хедер */}
        <View style={styles.header}>
          {/* <View style={styles.headerMain}>
            <View style={styles.headerTitle}>
              <View style={styles.titleIcon}>
                <Ionicons name="time-outline" size={28} color={colors.primary} />
              </View>
              <View>
                <Text style={[styles.pageTitle, { color: colors.text }]}>
                  ENGLISH TENSES
                </Text>
                <Text style={[styles.pageSubtitle, { color: colors.textSecondary }]}>
                  Master all temporal forms
                </Text>
              </View>
            </View>
            <View style={styles.counter}>
              <Text style={[styles.counterNumber, { color: colors.text }]}>
                9
              </Text>
              <Text style={[styles.counterLabel, { color: colors.textSecondary }]}>
                TENSES
              </Text>
            </View>
          </View> */}

          {/* Всплывающая подсказка */}
          {showHint && (
            <Animated.View 
              style={[
                styles.hintContainer,
                {
                  backgroundColor: theme === 'dark' 
                    ? 'rgba(102, 61, 255, 0.15)'
                    : 'rgba(99, 102, 241, 0.1)',
                  borderColor: theme === 'dark' 
                    ? 'rgba(102, 61, 255, 0.3)'
                    : 'rgba(99, 102, 241, 0.2)',
                  borderWidth: 1,
                  opacity: hintOpacity,
                  transform: [{ translateY: hintTranslate }]
                }
              ]}
            >
              <View style={styles.hintContent}>
                <View style={styles.hintIcon}>
                  <Ionicons name="information-circle" size={24} color={colors.primary} />
                </View>
                <View style={styles.hintTextContainer}>
                  <Text style={[styles.hintTitle, { color: colors.text }]}>
                    Держи грамматику
                  </Text>
                  <Text style={[styles.hintText, { color: colors.textSecondary }]}>
                    Освойте все временные формы английского языка
                  </Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.hintCloseButton}
                onPress={handleHideHint}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={20} color={colors.textTertiary} />
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>

        {/* Сетка карточек */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {TENSES_LIST.map((tense, index) => (
            <TenseCard key={`${tense.type}-${index}`} tense={tense} index={index} />
          ))}
          <View style={styles.footerSpace} />
        </ScrollView>

      </Animated.View>
    </SafeAreaView>
  );
};

export default React.memo(TenseScreen);