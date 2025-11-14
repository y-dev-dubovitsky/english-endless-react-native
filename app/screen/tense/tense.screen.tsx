import React from 'react';
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
  // Анимации приближения
  const mainScale = React.useRef(new Animated.Value(0.8)).current;
  const mainOpacity = React.useRef(new Animated.Value(0)).current;
  const cardsScale = TENSES_LIST.map(() => React.useRef(new Animated.Value(0.9)).current);
  const cardsOpacity = TENSES_LIST.map(() => React.useRef(new Animated.Value(0)).current);
  const cardsTranslate = TENSES_LIST.map(() => React.useRef(new Animated.Value(30)).current);

  React.useEffect(() => {
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
  }, []);

  const handleCardPress = (tense: any, index: number) => {
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
  };

  const TenseCard = ({ tense, index }: { tense: any, index: number }) => {
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
                  <Text style={styles.difficultyText}>
                    {getDifficulty(tense.type)}
                  </Text>
                </View>
              </View>
              
              <View style={styles.textContent}>
                <Text style={styles.title}>{tense.title}</Text>
                <Text style={styles.description}>{tense.description}</Text>
              </View>
              
              <View style={styles.cardFooter}>
                <View style={styles.stats}>
                  <Ionicons name="star" size={14} color="#FFD93D" />
                  <Text style={styles.statsText}>4.8</Text>
                  <View style={styles.statDivider} />
                  <Ionicons name="book" size={14} color="#FFFFFF" />
                  <Text style={styles.statsText}>15 уроков</Text>
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
  };

  const getTenseIcon = (type: string) => {
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
  };

  const getDifficulty = (type: string) => {
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
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      
      {/* Темный фон с градиентом */}
      <View style={styles.background}>
        <LinearGradient
          colors={['#0A0020', '#1A0030', '#0A0020']}
          style={styles.backgroundGradient}
        />
        
        {/* Фоновые элементы */}
        <View style={styles.floatingOrb1} />
        <View style={styles.floatingOrb2} />
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
          <View style={styles.headerMain}>
            <View style={styles.headerTitle}>
              <View style={styles.titleIcon}>
                <Ionicons name="time-outline" size={28} color="#663DFF" />
              </View>
              <View>
                <Text style={styles.pageTitle}>ENGLISH TENSES</Text>
                <Text style={styles.pageSubtitle}>
                  Master all temporal forms
                </Text>
              </View>
            </View>
            <View style={styles.counter}>
              <Text style={styles.counterNumber}>9</Text>
              <Text style={styles.counterLabel}>TENSES</Text>
            </View>
          </View>
        </View>

        {/* Сетка карточек */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {TENSES_LIST.map((tense, index) => (
            <TenseCard key={index} tense={tense} index={index} />
          ))}
          <View style={styles.footerSpace} />
        </ScrollView>

      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: 'rgba(102, 61, 255, 0.1)',
  },
  floatingOrb2: {
    position: 'absolute',
    bottom: '20%',
    left: '5%',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
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
    backgroundColor: 'rgba(102, 61, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(102, 61, 255, 0.3)',
  },
  pageTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '300',
    letterSpacing: 1,
    marginBottom: 4,
  },
  pageSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  counter: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(102, 61, 255, 0.2)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(102, 61, 255, 0.4)',
  },
  counterNumber: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  counterLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
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
    height: 160,
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
    top: -20,
    right: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  decorativeSquare: {
    position: 'absolute',
    bottom: -15,
    left: -15,
    width: 60,
    height: 60,
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
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
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
});

export default TenseScreen;