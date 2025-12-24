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
  const slideAnim = React.useRef(new Animated.Value(30)).current;
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
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
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
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
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
            toValue: 0.4,
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
            toValue: 0.4 + Math.random() * 0.3,
            tension: 60 + Math.random() * 40,
            friction: 5 + Math.random() * 5,
            useNativeDriver: true,
          }),
          Animated.timing(particle.opacity, {
            toValue: 0.15 + Math.random() * 0.2,
            duration: 600 + Math.random() * 400,
            useNativeDriver: true,
          }),
        ]).start();
      }, index * 40);
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
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, marginTop: 5 }}>
      
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
              opacity: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.6]
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
                outputRange: [0.2, 0.5]
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
                outputRange: [0.1, 0.4]
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
        
        {/* Header Section с аватаркой по центру */}
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
                    opacity: glowAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.2, 0.4]
                    }),
                    borderColor: colors.primary + '50',
                  }
                ]} 
              />
              <Ionicons name="person" size={34} color={colors.white} />
            </LinearGradient>
          </Animated.View>
          
          <View style={styles.headerTextContainer}>
            <Text style={[styles.mainTitle, { color: colors.text }]}>Профиль</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Настройки и статистика
            </Text>
          </View>
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
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Тема оформления</Text>
              </View>
              <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
                Выберите подходящую цветовую тему
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
                              outputRange: [20, 0]
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
                          size={28} 
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

            {/* Settings Section */}
            <View style={styles.section}>
              <View style={[
                styles.comingSoonContainer, 
                { 
                  backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                  borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                }
              ]}>
                <Ionicons name="construct" size={38} color={colors.textSecondary} style={styles.comingSoonIcon} />
                <Text style={[styles.comingSoonTitle, { color: colors.textSecondary }]}>
                  Настройки в разработке
                </Text>
                <Text style={[styles.comingSoonText, { color: colors.textTertiary }]}>
                  Расширенные настройки появятся в следующем обновлении
                </Text>
              </View>

              <View style={styles.sectionHeader}>
                <Ionicons name="settings" size={24} color={colors.textSecondary} />
                <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Настройки</Text>
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
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  floatingOrb2: {
    position: 'absolute',
    bottom: '15%',
    left: '5%',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  floatingOrb3: {
    position: 'absolute',
    top: '50%',
    left: '70%',
    width: 70,
    height: 70,
    borderRadius: 35,
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
    paddingTop: 15,
    zIndex: 10,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  iconContainer: {
    marginBottom: 15,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  iconGradient: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 35,
    borderWidth: 2,
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '400',
  },
  contentContainer: {
    flex: 1,
    marginBottom: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '600',
  },
  sectionDescription: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    marginBottom: 18,
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
    width: 55,
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  themeInfo: {
    flex: 1,
  },
  themeTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 3,
  },
  themeDescription: {
    fontSize: 14,
    fontWeight: '400',
  },
  selectedIndicator: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    fontWeight: '600',
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
    fontWeight: '600',
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