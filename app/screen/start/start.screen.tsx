import React from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, TouchableOpacity, Easing } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from '../../contexts/ThemeContext';

const { width, height } = Dimensions.get('window');

const StartScreen = ({ navigation }: any): JSX.Element => {
  const { colors, theme } = useTheme();

  // Основные анимации
  const titleAnim = React.useRef(new Animated.Value(0)).current;
  const subtitleAnim = React.useRef(new Animated.Value(0)).current;
  const buttonAnim = React.useRef(new Animated.Value(0)).current;
  const glowAnim = React.useRef(new Animated.Value(0)).current;
  
  // Анимация светящейся линии
  const lineScale = React.useRef(new Animated.Value(0)).current;
  const lineOpacity = React.useRef(new Animated.Value(0)).current;
  
  // Анимации для волн
  const waveScale1 = React.useRef(new Animated.Value(1)).current;
  const waveOpacity1 = React.useRef(new Animated.Value(1)).current;
  const waveScale2 = React.useRef(new Animated.Value(1)).current;
  const waveOpacity2 = React.useRef(new Animated.Value(1)).current;
  const waveScale3 = React.useRef(new Animated.Value(1)).current;
  const waveOpacity3 = React.useRef(new Animated.Value(1)).current;
  
  // Партиклы-точки (используем translate вместо left/top)
  const particles = React.useRef(
    Array.from({ length: 12 }, () => ({
      translateX: new Animated.Value(0),
      translateY: new Animated.Value(0),
      scale: new Animated.Value(0),
      opacity: new Animated.Value(0),
      startX: Math.random() * width * 0.8 + width * 0.1,
      startY: Math.random() * height * 0.6 + height * 0.2,
    }))
  ).current;

  React.useEffect(() => {
    // Устанавливаем начальные позиции для частиц
    particles.forEach((particle) => {
      particle.translateX.setValue(particle.startX);
      particle.translateY.setValue(particle.startY);
      
      // Плавающая анимация для частиц
      Animated.loop(
        Animated.sequence([
          Animated.timing(particle.translateY, {
            toValue: particle.startY - 20,
            duration: 3000 + Math.random() * 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(particle.translateY, {
            toValue: particle.startY,
            duration: 3000 + Math.random() * 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      ).start();
    });

    // Анимация светящейся линии
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(lineScale, {
            toValue: 1,
            duration: 2000,
            easing: Easing.inOut(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(lineOpacity, {
            toValue: 0.8,
            duration: 1000,
            easing: Easing.inOut(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(lineScale, {
            toValue: 0,
            duration: 2000,
            easing: Easing.inOut(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(lineOpacity, {
            toValue: 0.3,
            duration: 1000,
            easing: Easing.inOut(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();

    // Анимация свечения
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.3,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Анимация волн
    Animated.loop(
      Animated.sequence([
        // Первая волна
        Animated.parallel([
          Animated.timing(waveScale1, {
            toValue: 1.8,
            duration: 3000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(waveOpacity1, {
            toValue: 0,
            duration: 3000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(waveScale1, {
          toValue: 1,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(waveOpacity1, {
          toValue: 1,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.delay(1000),
        // Вторая волна
        Animated.parallel([
          Animated.timing(waveScale2, {
            toValue: 1.8,
            duration: 3000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(waveOpacity2, {
            toValue: 0,
            duration: 3000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(waveScale2, {
          toValue: 1,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(waveOpacity2, {
          toValue: 1,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.delay(2000),
        // Третья волна
        Animated.parallel([
          Animated.timing(waveScale3, {
            toValue: 1.8,
            duration: 3000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(waveOpacity3, {
            toValue: 0,
            duration: 3000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(waveScale3, {
          toValue: 1,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(waveOpacity3, {
          toValue: 1,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Анимация появления частиц
    particles.forEach((particle, index) => {
      setTimeout(() => {
        Animated.parallel([
          Animated.spring(particle.scale, {
            toValue: 0.6 + Math.random() * 0.4,
            tension: 80,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.timing(particle.opacity, {
            toValue: 0.1 + Math.random() * 0.1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]).start();
      }, index * 100);
    });

    // Последовательность анимаций для основного контента
    Animated.stagger(300, [
      Animated.spring(titleAnim, {
        toValue: 1,
        tension: 120,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(subtitleAnim, {
        toValue: 1,
        tension: 120,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(buttonAnim, {
        toValue: 1,
        tension: 110,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [theme]);

  const handleGetStarted = () => {
    // Анимация нажатия кнопки с волновым эффектом
    Animated.parallel([
      Animated.spring(buttonAnim, {
        toValue: 0.9,
        tension: 300,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(lineScale, {
        toValue: 1.5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(lineOpacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: 1.5,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.parallel([
        Animated.spring(buttonAnim, {
          toValue: 1,
          tension: 150,
          friction: 15,
          useNativeDriver: true,
        }),
        Animated.timing(lineScale, {
          toValue: 0.4,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(lineOpacity, {
          toValue: 0.3,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.3,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        navigation.navigate('ОсновныеТабы');
      });
    });
  };

  // Функции для получения цветов
  const getBackgroundGradient = () => {
    if (theme === 'dark') {
      return ['#0A0020', '#1A0030', '#0F0028'];
    } else {
      return ['#F0F5FF', '#E6F0FF', '#F8FAFF'];
    }
  };

  const getParticleColor = () => {
    return theme === 'dark' ? colors.primary + '40' : colors.primary + '20';
  };

  const getOrbColors = () => {
    if (theme === 'dark') {
      return {
        orb1: 'rgba(102, 61, 255, 0.08)',
        orb2: 'rgba(0, 212, 170, 0.06)',
        orb3: 'rgba(139, 92, 255, 0.05)',
      };
    } else {
      return {
        orb1: 'rgba(99, 102, 241, 0.04)',
        orb2: 'rgba(16, 185, 129, 0.03)',
        orb3: 'rgba(139, 92, 255, 0.025)',
      };
    }
  };

  const orbColors = getOrbColors();

  // Интерполяции
  const titleTranslate = titleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 0]
  });

  const titleOpacity = titleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  const subtitleTranslate = subtitleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0]
  });

  const subtitleOpacity = subtitleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  const buttonScale = buttonAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1]
  });

  const buttonOpacity = buttonAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.6]
  });

  // Градиент для кнопки
  const getButtonGradient = () => {
    return [colors.primary, colors.primaryLight || colors.primary];
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      
      {/* Анимированный фон */}
      <View style={styles.background} pointerEvents="none">
        <LinearGradient
          colors={getBackgroundGradient()}
          style={styles.backgroundGradient}
        />
        
        {/* Плавающие орбы */}
        <Animated.View 
          style={[
            styles.floatingOrb1,
            { 
              backgroundColor: orbColors.orb1,
              opacity: glowOpacity,
            }
          ]} 
        />
        <Animated.View 
          style={[
            styles.floatingOrb2,
            { 
              backgroundColor: orbColors.orb2,
              opacity: glowOpacity,
            }
          ]} 
        />
        <Animated.View 
          style={[
            styles.floatingOrb3,
            { 
              backgroundColor: orbColors.orb3,
              opacity: glowOpacity,
            }
          ]} 
        />
        
        {/* Анимированные частицы */}
        <View style={styles.particlesContainer}>
          {particles.map((particle, index) => (
            <Animated.View
              key={index}
              style={[
                styles.particle,
                {
                  backgroundColor: getParticleColor(),
                  transform: [
                    { translateX: particle.translateX },
                    { translateY: particle.translateY },
                    { scale: particle.scale }
                  ],
                  opacity: particle.opacity,
                }
              ]}
            />
          ))}
        </View>
      </View>

      {/* Контент */}
      <View style={[styles.container, { zIndex: 10 }]}>
        
        {/* Главный блок */}
        <View style={styles.mainBlock}>
          
          {/* Светящаяся линия */}
          <Animated.View 
            style={[
              styles.glowLineWrapper,
              {
                opacity: lineOpacity,
                transform: [
                  { translateX: -width * 0.3 },
                  { scaleX: lineScale }
                ],
              }
            ]}
          >
            <View style={[styles.glowLine, { backgroundColor: colors.primary }]} />
          </Animated.View>

          {/* Заголовок */}
          <Animated.View 
            style={[
              styles.titleContainer,
              { 
                opacity: titleOpacity,
                transform: [{ translateY: titleTranslate }]
              }
            ]}
          >
            <Text style={[styles.title, { color: colors.text }]}>
              ДЕРЖИ
            </Text>
            <View style={styles.subtitleWrapper}>
              <Text style={[styles.titleAccent, { color: colors.primary }]}>
                ГРАММАТИКУ
              </Text>
            </View>
          </Animated.View>

          {/* Подзаголовок */}
          <Animated.View 
            style={[
              styles.subtitleContainer,
              { 
                opacity: subtitleOpacity,
                transform: [{ translateY: subtitleTranslate }]
              }
            ]}
          >
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Полный контроль над грамматикой
            </Text>
            <Text style={[styles.subtitleSmall, { color: colors.textTertiary }]}>
              9 времен • Бесконечная практика
            </Text>
          </Animated.View>

          {/* Статистика */}
          <Animated.View 
            style={[
              styles.statsContainer,
              { opacity: subtitleOpacity }
            ]}
          >
            <View style={[styles.statCard, { 
              backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
              borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              borderWidth: 1,
            }]}>
              <Ionicons name="time-outline" size={28} color={colors.primary} />
              <Text style={[styles.statNumber, { color: colors.text }]}>9</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>ВРЕМЕН</Text>
            </View>
            <View style={[styles.statCard, { 
              backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
              borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              borderWidth: 1,
            }]}>
              <Ionicons name="infinite-outline" size={28} color={colors.secondary || colors.accent} />
              <Text style={[styles.statNumber, { color: colors.text }]}>∞</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>ТРЕНИРОВОК</Text>
            </View>
          </Animated.View>

        </View>

        {/* Нижняя часть с круглой кнопкой и волнами */}
        <View style={styles.bottomSection}>
          
          {/* Контейнер для волн и кнопки */}
          <View style={styles.waveContainer}>
            {/* Волны */}
            <Animated.View 
              style={[
                styles.wave,
                {
                  transform: [{ scale: waveScale1 }],
                  opacity: waveOpacity1,
                  borderColor: colors.primary + '30',
                }
              ]}
            />
            <Animated.View 
              style={[
                styles.wave,
                {
                  transform: [{ scale: waveScale2 }],
                  opacity: waveOpacity2,
                  borderColor: colors.primary + '20',
                }
              ]}
            />
            <Animated.View 
              style={[
                styles.wave,
                {
                  transform: [{ scale: waveScale3 }],
                  opacity: waveOpacity3,
                  borderColor: colors.primary + '10',
                }
              ]}
            />
            
            {/* Круглая кнопка */}
            <Animated.View 
              style={[
                styles.roundButtonContainer,
                { 
                  opacity: buttonOpacity,
                  transform: [{ scale: buttonScale }]
                }
              ]}
            >
              <TouchableOpacity 
                style={styles.roundButton}
                onPress={handleGetStarted}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={getButtonGradient()}
                  style={styles.roundButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.buttonContent}>
                    <Ionicons name="play" size={32} color="#FFFFFF" />
                    <Text style={styles.roundButtonText}>
                      НАЧАТЬ
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* Футер */}
          <Animated.View 
            style={[
              styles.footer,
              {
                opacity: subtitleOpacity,
              }
            ]}
          >
            <Text style={[styles.footerText, { color: colors.textTertiary }]}>
              Присоединяйтесь к сообществу учеников
            </Text>
          </Animated.View>

        </View>

      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  floatingOrb1: {
    position: 'absolute',
    top: '10%',
    right: '5%',
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  floatingOrb2: {
    position: 'absolute',
    bottom: '15%',
    left: '5%',
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  floatingOrb3: {
    position: 'absolute',
    top: '50%',
    left: '70%',
    width: 80,
    height: 80,
    borderRadius: 40,
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
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 40,
  },
  mainBlock: {
    alignItems: 'center',
  },
  glowLineWrapper: {
    position: 'absolute',
    top: 120,
    width: width * 0.6,
    overflow: 'hidden',
  },
  glowLine: {
    height: 2,
    borderRadius: 1,
    width: '100%',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 64,
    fontWeight: '300',
    letterSpacing: -1.5,
    marginBottom: 4,
  },
  subtitleWrapper: {
    marginTop: -8,
  },
  titleAccent: {
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  subtitleContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  subtitleSmall: {
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    width: '100%',
    maxWidth: 360,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 100,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  bottomSection: {
    alignItems: 'center',
  },
  waveContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: 200,
    marginBottom: 30,
  },
  wave: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 1.5,
  },
  roundButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  roundButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.8,
    marginTop: 8,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default StartScreen;