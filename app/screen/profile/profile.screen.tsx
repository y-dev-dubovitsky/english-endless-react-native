// screens/ProfileScreen.tsx
import React from "react";
import { View, Text, StyleSheet, ScrollView, Switch, Animated, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from '../../contexts/ThemeContext';

const { width, height } = Dimensions.get('window');

const ProfileScreen = (): JSX.Element => {
  const { theme, actualTheme, setTheme, colors } = useTheme();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
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
    ]).start();
  }, []);

  const toggleTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const themeOptions = [
    {
      id: 'light',
      title: 'Светлая',
      icon: 'sunny',
      description: 'Яркая и чистая тема',
      gradient: ['#FFD89B', '#19547B'],
    },
    {
      id: 'dark',
      title: 'Темная',
      icon: 'moon',
      description: 'Комфорт для глаз',
      gradient: ['#0F172A', '#1E293B'],
    },
    {
      id: 'auto',
      title: 'Авто',
      icon: 'phone-portrait',
      description: 'Системная тема',
      gradient: ['#6366F1', '#8B5CF6'],
    },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      
      {/* Background */}
      <View style={styles.background}>
        <LinearGradient
          colors={[colors.backgroundSecondary, colors.background]}
          style={styles.backgroundGradient}
        />
      </View>

      <View style={styles.container}>
        
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
          <View style={[styles.iconContainer, { shadowColor: colors.primary }]}>
            <LinearGradient
              colors={[colors.primary, colors.primaryLight]}
              style={styles.iconGradient}
            >
              <Ionicons name="person" size={32} color={colors.white} />
            </LinearGradient>
          </View>
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
                    <TouchableOpacity
                      style={[
                        styles.themeButton,
                        {
                          backgroundColor: colors.backgroundSecondary,
                          borderColor: theme === option.id ? colors.primary : colors.border,
                          borderWidth: theme === option.id ? 2 : 1,
                        }
                      ]}
                      onPress={() => toggleTheme(option.id as Theme)}
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
                    </TouchableOpacity>
                  </Animated.View>
                ))}
              </View>
            </View>

            {/* Stats Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="stats-chart" size={24} color={colors.secondary} />
                <Text style={[styles.sectionTitle, { color: colors.text }]}>ВАША СТАТИСТИКА</Text>
              </View>

              <View style={styles.statsGrid}>
                <View style={[styles.statCard, { backgroundColor: colors.backgroundSecondary }]}>
                  <Ionicons name="time" size={24} color={colors.primary} />
                  <Text style={[styles.statNumber, { color: colors.text }]}>24ч 30м</Text>
                  <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Обучения</Text>
                </View>
                
                <View style={[styles.statCard, { backgroundColor: colors.backgroundSecondary }]}>
                  <Ionicons name="checkmark-done" size={24} color={colors.secondary} />
                  <Text style={[styles.statNumber, { color: colors.text }]}>1,247</Text>
                  <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Упражнений</Text>
                </View>
                
                <View style={[styles.statCard, { backgroundColor: colors.backgroundSecondary }]}>
                  <Ionicons name="trophy" size={24} color={colors.accent} />
                  <Text style={[styles.statNumber, { color: colors.text }]}>87%</Text>
                  <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Успеваемость</Text>
                </View>
              </View>
            </View>

            {/* Settings Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="settings" size={24} color={colors.text} />
                <Text style={[styles.sectionTitle, { color: colors.text }]}>НАСТРОЙКИ</Text>
              </View>

              <View style={[styles.settingsList, { backgroundColor: colors.backgroundSecondary }]}>
                <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
                  <View style={styles.settingInfo}>
                    <Ionicons name="notifications" size={20} color={colors.text} />
                    <Text style={[styles.settingText, { color: colors.text }]}>Уведомления</Text>
                  </View>
                  <Switch
                    value={true}
                    onValueChange={() => {}}
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor={colors.white}
                  />
                </View>

                <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
                  <View style={styles.settingInfo}>
                    <Ionicons name="volume-high" size={20} color={colors.text} />
                    <Text style={[styles.settingText, { color: colors.text }]}>Звуки</Text>
                  </View>
                  <Switch
                    value={true}
                    onValueChange={() => {}}
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor={colors.white}
                  />
                </View>

                <View style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <Ionicons name="download" size={20} color={colors.text} />
                    <Text style={[styles.settingText, { color: colors.text }]}>Оффлайн режим</Text>
                  </View>
                  <Switch
                    value={false}
                    onValueChange={() => {}}
                    trackColor={{ false: colors.border, true: colors.primary }}
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
            English Master Pro v2.0.0
          </Text>
        </Animated.View>

      </View>
    </SafeAreaView>
  );
};

const TouchableOpacity = ({ style, onPress, children }: any) => (
  <View style={style} onStartShouldSetResponder={() => true} onResponderRelease={onPress}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
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