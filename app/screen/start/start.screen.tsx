import React from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "@expo/vector-icons/Ionicons";

const { width, height } = Dimensions.get('window');

const StartScreen = ({ navigation }: any): JSX.Element => {
  // Основные анимации приближения
  const scaleAnim = React.useRef(new Animated.Value(0.5)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;
  const rotateXAnim = React.useRef(new Animated.Value(15)).current;
  
  // Анимации частиц (движутся от пользователя вглубь экрана)
  const particlesScale = React.useRef(new Animated.Value(0.3)).current;
  const particlesOpacity = React.useRef(new Animated.Value(0)).current;
  
  // Анимации фоновых элементов (удаляются от пользователя)
  const backgroundScale = React.useRef(new Animated.Value(1.2)).current;
  const backgroundBlur = React.useRef(new Animated.Value(10)).current;

  // Particles state
  const [particles, setParticles] = React.useState<Array<{id: number, x: number, y: number, scale: Animated.Value}>>([]);

  React.useEffect(() => {
    // Создаем частицы с индивидуальными анимациями
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      scale: new Animated.Value(0.1 + Math.random() * 0.3),
    }));
    setParticles(newParticles);

    // Эпичная анимация приближения к пользователю
    Animated.parallel([
      // Основной контент приближается и становится четче
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 80,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(rotateXAnim, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }),
      
      // Частицы увеличиваются (приближаются)
      Animated.spring(particlesScale, {
        toValue: 1,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(particlesOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      
      // Фон отдаляется и размывается
      Animated.spring(backgroundScale, {
        toValue: 1,
        tension: 70,
        friction: 12,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundBlur, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();

    // Запускаем индивидуальные анимации для каждой частицы
    newParticles.forEach(particle => {
      Animated.spring(particle.scale, {
        toValue: 1,
        tension: 50 + Math.random() * 50,
        friction: 5 + Math.random() * 5,
        delay: Math.random() * 500,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  const handleGetStarted = () => {
    // Анимация "пролета" через экран при нажатии
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate('Список времен');
    });
  };

  // Интерполяции для сложных эффектов
  const perspectiveInterpolate = scaleAnim.interpolate({
    inputRange: [0.5, 1],
    outputRange: [500, 1000], // Изменение перспективы при приближении
  });

  const depthInterpolate = scaleAnim.interpolate({
    inputRange: [0.5, 1],
    outputRange: [-100, 0], // Эффект глубины
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      
      {/* Анимированный фон с эффектом удаления */}
      <Animated.View 
        style={[
          styles.background,
          { 
            transform: [{ scale: backgroundScale }],
          }
        ]}
      >
        <LinearGradient
          colors={['#0A0020', '#1A0030', '#0A0020']}
          style={styles.backgroundGradient}
        />
        
        {/* Анимированные частицы (приближаются к пользователю) */}
        {particles.map(particle => (
          <Animated.View
            key={particle.id}
            style={[
              styles.particle,
              {
                left: particle.x,
                top: particle.y,
                transform: [{ scale: particle.scale }],
                opacity: particlesOpacity,
              }
            ]}
          />
        ))}
        
        {/* Фоновые элементы с эффектом удаления */}
        <Animated.View 
          style={[
            styles.floatingOrb1,
            { 
              transform: [{ scale: backgroundScale }],
              opacity: backgroundBlur.interpolate({
                inputRange: [0, 10],
                outputRange: [1, 0.3]
              })
            }
          ]} 
        />
        <Animated.View 
          style={[
            styles.floatingOrb2,
            { 
              transform: [{ scale: backgroundScale }],
              opacity: backgroundBlur.interpolate({
                inputRange: [0, 10],
                outputRange: [1, 0.2]
              })
            }
          ]} 
        />
        
        {/* Сетка с эффектом перспективы */}
        <Animated.View 
          style={[
            styles.gridPattern,
            { 
              opacity: backgroundBlur.interpolate({
                inputRange: [0, 10],
                outputRange: [0.1, 0.05]
              })
            }
          ]} 
        />
      </Animated.View>

      {/* Основной контент с эффектом приближения */}
      <Animated.View 
        style={[
          styles.container,
          { 
            transform: [
              { perspective: perspectiveInterpolate },
              { scale: scaleAnim },
              { rotateX: rotateXAnim.interpolate({
                  inputRange: [0, 15],
                  outputRange: ['0deg', '15deg']
                }) 
              },
              { translateY: depthInterpolate }
            ],
            opacity: opacityAnim,
          }
        ]}
      >
        
        <View style={styles.content}>
          
          {/* Иконка с эффектом "выпрыгивания" */}
          <Animated.View 
            style={[
              styles.iconContainer,
              { 
                transform: [
                  { scale: scaleAnim.interpolate({
                      inputRange: [0.5, 1],
                      outputRange: [0.8, 1]
                    }) 
                  },
                  { translateY: depthInterpolate }
                ],
                opacity: opacityAnim,
              }
            ]}
          >
            <LinearGradient
              colors={['#663DFF', '#8B5CFF']}
              style={styles.iconGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Animated.View 
                style={[
                  styles.iconGlow,
                  { 
                    opacity: opacityAnim,
                    transform: [{ scale: scaleAnim }]
                  }
                ]} 
              />
              
              <View style={styles.iconContent}>
                <Ionicons name="language" size={48} color="#FFFFFF" />
                <Text style={styles.iconText}>EN</Text>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Текст контент с эффектом появления */}
          <Animated.View 
            style={[
              styles.textContainer,
              { 
                transform: [
                  { translateY: depthInterpolate },
                  { scale: scaleAnim.interpolate({
                      inputRange: [0.5, 1],
                      outputRange: [0.9, 1]
                    }) 
                  }
                ],
                opacity: opacityAnim,
              }
            ]}
          >
            <Animated.Text 
              style={[
                styles.subtitle,
                { 
                  opacity: opacityAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0, 0.5, 1]
                  })
                }
              ]}
            >
              MASTER THE ART OF
            </Animated.Text>
            
            <Animated.Text 
              style={[
                styles.title,
                { 
                  transform: [{ translateY: depthInterpolate }],
                  opacity: opacityAnim,
                }
              ]}
            >
              ENGLISH
            </Animated.Text>
            
            <Animated.Text 
              style={[
                styles.gradientTitle,
                { 
                  transform: [{ translateY: depthInterpolate }],
                  opacity: opacityAnim,
                }
              ]}
            >
              TEMPORALITY
            </Animated.Text>
            
            <Animated.View 
              style={[
                styles.descriptionContainer,
                { 
                  opacity: opacityAnim.interpolate({
                    inputRange: [0, 0.7, 1],
                    outputRange: [0, 0.3, 1]
                  })
                }
              ]}
            >
              <Ionicons name="flash" size={20} color="#00D4AA" style={styles.descriptionIcon} />
              <Text style={styles.description}>
                Transform your English skills through infinite practice sessions 
                and master all major tenses with confidence
              </Text>
            </Animated.View>
          </Animated.View>

          {/* Статистика с эффектом появления */}
          <Animated.View 
            style={[
              styles.statsContainer,
              { 
                opacity: opacityAnim.interpolate({
                  inputRange: [0, 0.8, 1],
                  outputRange: [0, 0.5, 1]
                })
              }
            ]}
          >
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>TENSES</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>∞</Text>
              <Text style={styles.statLabel}>EXERCISES</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>10K+</Text>
              <Text style={styles.statLabel}>USERS</Text>
            </View>
          </Animated.View>

          {/* Кнопка CTA с эффектом приближения */}
          <Animated.View 
            style={[
              styles.ctaContainer,
              { 
                transform: [
                  { translateY: depthInterpolate },
                  { scale: scaleAnim.interpolate({
                      inputRange: [0.5, 1],
                      outputRange: [0.8, 1]
                    }) 
                  }
                ],
                opacity: opacityAnim,
              }
            ]}
          >
            <TouchableOpacity 
              style={styles.ctaButton}
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#00D4AA', '#00B894']}
                style={styles.ctaGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="rocket" size={24} color="#000" />
                <Text style={styles.ctaText}>BEGIN JOURNEY</Text>
                <Animated.View 
                  style={[
                    styles.ctaGlow,
                    { 
                      opacity: opacityAnim,
                    }
                  ]} 
                />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Футер с фичами */}
          <Animated.View 
            style={[
              styles.featuresContainer,
              { 
                opacity: opacityAnim.interpolate({
                  inputRange: [0, 0.9, 1],
                  outputRange: [0, 0.3, 1]
                })
              }
            ]}
          >
            <View style={styles.featureItem}>
              <Ionicons name="infinite" size={20} color="#8B5CFF" />
              <Text style={styles.featureText}>Unlimited Practice</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="trending-up" size={20} color="#00D4AA" />
              <Text style={styles.featureText}>Progress Tracking</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="trophy" size={20} color="#FF6B35" />
              <Text style={styles.featureText}>Achievement System</Text>
            </View>
          </Animated.View>

        </View>
      </Animated.View>

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
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#663DFF',
  },
  floatingOrb1: {
    position: 'absolute',
    top: '20%',
    right: '15%',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(102, 61, 255, 0.1)',
  },
  floatingOrb2: {
    position: 'absolute',
    bottom: '30%',
    left: '10%',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
  },
  gridPattern: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    marginBottom: 40,
  },
  iconGradient: {
    width: 140,
    height: 140,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#663DFF',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.6,
    shadowRadius: 40,
    elevation: 30,
  },
  iconGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: 'rgba(102, 61, 255, 0.5)',
  },
  iconContent: {
    alignItems: 'center',
  },
  iconText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    letterSpacing: 2,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 3,
    marginBottom: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '300',
    letterSpacing: 2,
    marginBottom: -8,
  },
  gradientTitle: {
    color: '#FFFFFF',
    fontSize: 52,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    maxWidth: 320,
    marginTop: 16,
  },
  descriptionIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  description: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    textAlign: 'center',
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 320,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  ctaContainer: {
    width: '100%',
    maxWidth: 320,
    marginBottom: 32,
  },
  ctaButton: {
    borderRadius: 28,
    shadowColor: '#00D4AA',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.5,
    shadowRadius: 25,
    elevation: 20,
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 22,
    borderRadius: 28,
    position: 'relative',
  },
  ctaText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  ctaGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.3)',
  },
  featuresContainer: {
    width: '100%',
    maxWidth: 280,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  featureText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default StartScreen;