// screens/ProfileScreen.tsx
import React from "react";
import { View, Text, StyleSheet, ScrollView, Switch, Animated, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from '../../contexts/ThemeContext';

const { width, height } = Dimensions.get('window');

const ProfileScreen = (): JSX.Element => {
  const { theme, colors, setTheme } = useTheme();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;
  const glowAnim = React.useRef(new Animated.Value(0)).current;
  
  // Particles state
  const [particles, setParticles] = React.useState<Array<{
    id: number, 
    x: number, 
    y: number, 
    scale: Animated.Value,
    opacity: Animated.Value
  }>>([]);

  React.useEffect(() => {
    // Создаем частицы
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      scale: new Animated.Value(0.1),
      opacity: new Animated.Value(0),
    }));
    setParticles(newParticles);

    // Запускаем анимации
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
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
      ),
    ]).start();

    // Анимации для частиц
    newParticles.forEach((particle, index) => {
      setTimeout(() => {
        Animated.parallel([
          Animated.spring(particle.scale, {
            toValue: 0.3 + Math.random() * 0.4,
            tension: 60 + Math.random() * 40,
            friction: 5 + Math.random() * 5,
            useNativeDriver: true,
          }),
          Animated.timing(particle.opacity, {
            toValue: 0.1 + Math.random() * 0.2,
            duration: 800 + Math.random() * 400,
            useNativeDriver: true,
          }),
        ]).start();
      }, index * 50);
    });
  }, []);

  const toggleTheme = (newTheme: 'light' | 'dark' | 'auto') => {
    setTheme(newTheme);
  };

  const themeOptions = [
    {
      id: 'light',
      title: 'Светлая',
      icon: 'sunny',
      description: 'Яркая и чистая тема',
      gradient: theme === 'light' ? ['#FFD89B', '#19547B'] : ['#4A5568', '#2D3748'],
    },
    {
      id: 'dark',
      title: 'Темная',
      icon: 'moon',
      description: 'Комфорт для глаз',
      gradient: theme === 'dark' ? ['#0F172A', '#1E293B'] : ['#4A5568', '#2D3748'],
    },
  ];

  // Функции для получения цветов в зависимости от темы
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      
      {/* Анимированный фон как на других страницах */}
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
              opacity: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 0.8]
              }),
            }
          ]} 
        />
        <Animated.View 
          style={[
            styles.floatingOrb2,
            { 
              backgroundColor: orbColors.orb2,
              opacity: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.4, 0.7]
              }),
            }
          ]} 
        />
        <Animated.View 
          style={[
            styles.floatingOrb3,
            { 
              backgroundColor: orbColors.orb3,
              opacity: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.6]
              }),
            }
          ]} 
        />
        
        {/* Анимированные частицы */}
        <View style={styles.particlesContainer}>
          {particles.map(particle => (
            <Animated.View
              key={`particle-${particle.id}`}
              style={[
                styles.particle,
                {
                  left: particle.x,
                  top: particle.y,
                  transform: [{ scale: particle.scale }],
                  opacity: particle.opacity,
                  backgroundColor: getParticleColor(),
                }
              ]}
            />
          ))}
        </View>
      </View>

      {/* Основной контент */}
      <View style={[styles.container, { zIndex: 10 }]}>
        
        {/* Header Section */}
        <Animated.View 
          style={[
            styles.headerSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Animated.View 
            style={[
              styles.iconContainer, 
              { 
                shadowColor: colors.primary,
                transform: [
                  {
                    scale: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1]
                    })
                  }
                ]
              }
            ]}
          >
            <LinearGradient
              colors={[colors.primary, colors.primaryLight || colors.primary]}
              style={styles.iconGradient}
            >
              <Animated.View 
                style={[
                  styles.iconGlow,
                  { 
                    opacity: glowAnim,
                    borderColor: colors.primary + '50',
                  }
                ]} 
              />
              <Ionicons name="person" size={32} color={colors.white} />
            </LinearGradient>
          </Animated.View>
          <Text style={[styles.mainTitle, { color: colors.text }]}>ПРОФИЛЬ</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Настройте приложение под себя</Text>
        </Animated.View>

        {/* Content */}
        <Animated.View 
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            
            {/* Theme Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="color-palette" size={24} color={colors.primary} />
                <Text style={[styles.sectionTitle, { color: colors.text }]}>ТЕМА ОФОРМЛЕНИЯ</Text>
              </View>
              <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
                Выберите подходящую цветовую тему для комфортного использования
              </Text>

              <View style={styles.themeOptions}>
                {themeOptions.map((option, index) => (
                  <Animated.View
                    key={option.id}
                    style={[
                      styles.themeCard,
                      {
                        opacity: fadeAnim,
                        transform: [
                          {
                            translateY: fadeAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [30, 0]
                            })
                          }
                        ]
                      }
                    ]}
                  >
                    <View
                      style={[
                        styles.themeButton,
                        {
                          backgroundColor: colors.backgroundSecondary,
                          borderColor: theme === option.id ? colors.primary : colors.border,
                          borderWidth: theme === option.id ? 2 : 1,
                          shadowColor: theme === option.id ? colors.primary : 'transparent',
                          shadowOffset: { width: 0, height: 4 },
                          shadowOpacity: theme === option.id ? 0.2 : 0,
                          shadowRadius: 8,
                          elevation: theme === option.id ? 4 : 0,
                        }
                      ]}
                      onStartShouldSetResponder={() => true}
                      onResponderRelease={() => toggleTheme(option.id as 'light' | 'dark' | 'auto')}
                    >
                      <LinearGradient
                        colors={option.gradient}
                        style={styles.themePreview}
                      >
                        <Ionicons 
                          name={option.icon} 
                          size={32} 
                          color={colors.white} 
                        />
                      </LinearGradient>
                      
                      <View style={styles.themeInfo}>
                        <Text style={[styles.themeTitle, { color: colors.text }]}>
                          {option.title}
                        </Text>
                        <Text style={[styles.themeDescription, { color: colors.textSecondary }]}>
                          {option.description}
                        </Text>
                      </View>

                      {theme === option.id && (
                        <View style={[styles.selectedIndicator, { backgroundColor: colors.primary }]}>
                          <Ionicons name="checkmark" size={16} color={colors.white} />
                        </View>
                      )}
                    </View>
                  </Animated.View>
                ))}
              </View>
            </View>

            {/* Stats Section - В разработке */}
            <View style={styles.section}>
              <View style={[
                styles.comingSoonContainer, 
                { 
                  backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                  borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                }
              ]}>
                <Ionicons name="construct" size={40} color={colors.textSecondary} style={styles.comingSoonIcon} />
                <Text style={[styles.comingSoonTitle, { color: colors.textSecondary }]}>
                  Функция в разработке
                </Text>
                <Text style={[styles.comingSoonText, { color: colors.textTertiary }]}>
                  Подробная статистика появится в следующем обновлении
                </Text>
              </View>

              <View style={styles.sectionHeader}>
                <Ionicons name="stats-chart" size={24} color={colors.textSecondary} />
                <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>ВАША СТАТИСТИКА</Text>
              </View>

              <View style={[styles.statsGrid, { opacity: 0.5 }]}>
                <View style={[
                  styles.statCard, 
                  { 
                    backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                    borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    borderWidth: 1,
                  }
                ]}>
                  <Ionicons name="time" size={24} color={colors.textSecondary} />
                  <Text style={[styles.statNumber, { color: colors.textSecondary }]}>--:--</Text>
                  <Text style={[styles.statLabel, { color: colors.textTertiary }]}>Обучения</Text>
                </View>
                
                <View style={[
                  styles.statCard, 
                  { 
                    backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                    borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    borderWidth: 1,
                  }
                ]}>
                  <Ionicons name="checkmark-done" size={24} color={colors.textSecondary} />
                  <Text style={[styles.statNumber, { color: colors.textSecondary }]}>---</Text>
                  <Text style={[styles.statLabel, { color: colors.textTertiary }]}>Упражнений</Text>
                </View>
                
                <View style={[
                  styles.statCard, 
                  { 
                    backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                    borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    borderWidth: 1,
                  }
                ]}>
                  <Ionicons name="trophy" size={24} color={colors.textSecondary} />
                  <Text style={[styles.statNumber, { color: colors.textSecondary }]}>--%</Text>
                  <Text style={[styles.statLabel, { color: colors.textTertiary }]}>Успеваемость</Text>
                </View>
              </View>
            </View>

            {/* Settings Section - В разработке */}
            <View style={styles.section}>
              <View style={[
                styles.comingSoonContainer, 
                { 
                  backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                  borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                }
              ]}>
                <Ionicons name="construct" size={40} color={colors.textSecondary} style={styles.comingSoonIcon} />
                <Text style={[styles.comingSoonTitle, { color: colors.textSecondary }]}>
                  Настройки в разработке
                </Text>
                <Text style={[styles.comingSoonText, { color: colors.textTertiary }]}>
                  Расширенные настройки появятся в следующем обновлении
                </Text>
              </View>

              <View style={styles.sectionHeader}>
                <Ionicons name="settings" size={24} color={colors.textSecondary} />
                <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>НАСТРОЙКИ</Text>
              </View>

              <View style={[
                styles.settingsList, 
                { 
                  backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                  borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                  borderWidth: 1,
                  opacity: 0.5 
                }
              ]}>
                <View style={[styles.settingItem, { borderBottomColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }]}>
                  <View style={styles.settingInfo}>
                    <Ionicons name="notifications" size={20} color={colors.textSecondary} />
                    <Text style={[styles.settingText, { color: colors.textSecondary }]}>Уведомления</Text>
                  </View>
                  <Switch
                    value={false}
                    disabled={true}
                    onValueChange={() => {}}
                    trackColor={{ false: colors.border + '80', true: colors.primary + '80' }}
                    thumbColor={colors.white}
                  />
                </View>

                <View style={[styles.settingItem, { borderBottomColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }]}>
                  <View style={styles.settingInfo}>
                    <Ionicons name="volume-high" size={20} color={colors.textSecondary} />
                    <Text style={[styles.settingText, { color: colors.textSecondary }]}>Звуки</Text>
                  </View>
                  <Switch
                    value={false}
                    disabled={true}
                    onValueChange={() => {}}
                    trackColor={{ false: colors.border + '80', true: colors.primary + '80' }}
                    thumbColor={colors.white}
                  />
                </View>

                <View style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <Ionicons name="download" size={20} color={colors.textSecondary} />
                    <Text style={[styles.settingText, { color: colors.textSecondary }]}>Оффлайн режим</Text>
                  </View>
                  <Switch
                    value={false}
                    disabled={true}
                    onValueChange={() => {}}
                    trackColor={{ false: colors.border + '80', true: colors.primary + '80' }}
                    thumbColor={colors.white}
                  />
                </View>
              </View>
            </View>

          </ScrollView>
        </Animated.View>

        {/* Footer */}
        <Animated.View 
          style={[
            styles.footer,
            {
              opacity: fadeAnim,
            }
          ]}
        >
          <Text style={[styles.footerText, { color: colors.textTertiary }]}>
            Держи грамматику v1.0.0
          </Text>
        </Animated.View>

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
    paddingHorizontal: 20,
    paddingTop: 10,
    zIndex: 10,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 10,
  },
  iconContainer: {
    marginBottom: 16,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  iconGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 40,
    borderWidth: 2,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1,
  },
  contentContainer: {
    flex: 1,
    marginBottom: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
  },
  sectionDescription: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    marginBottom: 20,
  },
  themeOptions: {
    gap: 12,
  },
  themeCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  themeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  themePreview: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  themeInfo: {
    flex: 1,
  },
  themeTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  themeDescription: {
    fontSize: 14,
    fontWeight: '400',
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Стили для блоков "в разработке"
  comingSoonContainer: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  comingSoonIcon: {
    marginBottom: 12,
  },
  comingSoonTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  comingSoonText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  settingsList: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default ProfileScreen;