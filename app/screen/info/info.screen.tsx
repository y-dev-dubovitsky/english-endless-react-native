import React from "react";
import { View, Text, StyleSheet, ScrollView, Animated, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "@expo/vector-icons/Ionicons";

const { width, height } = Dimensions.get('window');

const InfoScreen = (): JSX.Element => {
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
      })
    ]).start();
  }, []);

  const advantages = [
    {
      icon: "infinite",
      color: "#00D4AA",
      title: "Unlimited Practice",
      description: "Never run out of exercises with our AI-powered endless content generation"
    },
    {
      icon: "time",
      color: "#FF6B35",
      title: "All Tenses Mastered",
      description: "Complete coverage of present, past, future and all grammatical variations"
    },
    {
      icon: "analytics",
      color: "#8B5CFF",
      title: "Smart Progress Tracking",
      description: "Real-time analytics and personalized insights into your learning journey"
    },
    {
      icon: "cellular",
      color: "#00B894",
      title: "Adaptive Intelligence",
      description: "AI that adjusts difficulty based on your performance and learning patterns"
    },
    {
      icon: "download",
      color: "#FFD700",
      title: "Complete Offline Access",
      description: "Learn anywhere, anytime without requiring internet connection"
    },
    {
      icon: "rocket",
      color: "#FF4081",
      title: "Rapid Progress",
      description: "See measurable improvement in your English skills within just days"
    }
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      
      {/* Enhanced Animated Background */}
      <View style={styles.background}>
        <LinearGradient
          colors={['#0A0020', '#1A0030', '#0A0020', '#0F0028']}
          style={styles.backgroundGradient}
        />
        
        {/* Animated Floating Elements */}
        <Animated.View style={[styles.floatingOrb1, { opacity: fadeAnim }]} />
        <Animated.View style={[styles.floatingOrb2, { opacity: fadeAnim }]} />
        <Animated.View style={[styles.floatingOrb3, { opacity: fadeAnim }]} />
        <Animated.View style={[styles.floatingOrb4, { opacity: fadeAnim }]} />
        
        {/* Animated Particles */}
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
                    outputRange: [0, 0.6]
                  }),
                  transform: [
                    {
                      scale: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.3, 1]
                      })
                    }
                  ]
                }
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.container}>
        
        {/* Enhanced Header Section */}
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
                    outputRange: [0.8, 1]
                  })
                }
              ]
            }
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
                      outputRange: ['0deg', '360deg']
                    })
                  }
                ]
              }
            ]}
          >
            <LinearGradient
              colors={['#663DFF', '#8B5CFF', '#00D4AA']}
              style={styles.iconGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="infinite" size={42} color="#FFFFFF" />
            </LinearGradient>
          </Animated.View>
          <Text style={styles.mainTitle}>ENGLISH MASTER</Text>
          <Text style={styles.subtitle}>Unleash Your Language Potential</Text>
        </Animated.View>

        {/* Enhanced Content - No Card, Direct Scroll */}
        <Animated.View 
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            
            {/* Welcome Section */}
            <Animated.View style={[styles.section, styles.welcomeSection]}>
              <View style={styles.sectionHeader}>
                <LinearGradient
                  colors={['#8B5CFF', '#663DFF']}
                  style={styles.sectionIcon}
                >
                  <Ionicons name="sparkles" size={20} color="#FFFFFF" />
                </LinearGradient>
                <Text style={styles.sectionTitle}>WELCOME TO THE FUTURE OF LEARNING</Text>
              </View>
              <Text style={styles.welcomeText}>
                Experience the most advanced English learning platform designed to 
                transform your language skills through cutting-edge technology and 
                proven educational methodologies.
              </Text>
            </Animated.View>

            {/* Advantages Grid */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <LinearGradient
                  colors={['#00D4AA', '#00B894']}
                  style={styles.sectionIcon}
                >
                  <Ionicons name="flash" size={20} color="#000" />
                </LinearGradient>
                <Text style={styles.sectionTitle}>WHY WE'RE UNBEATABLE</Text>
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
                              outputRange: [30, 0]
                            })
                          }
                        ]
                      }
                    ]}
                  >
                    <LinearGradient
                      colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                      style={styles.advantageGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <View style={styles.advantageIconContainer}>
                        <Ionicons name={advantage.icon} size={28} color={advantage.color} />
                      </View>
                      <Text style={styles.advantageTitle}>{advantage.title}</Text>
                      <Text style={styles.advantageDescription}>{advantage.description}</Text>
                    </LinearGradient>
                  </Animated.View>
                ))}
              </View>
            </View>

            {/* Results Section */}
            <Animated.View style={[styles.section, styles.resultsSection]}>
              <View style={styles.sectionHeader}>
                <LinearGradient
                  colors={['#FF6B35', '#FF4081']}
                  style={styles.sectionIcon}
                >
                  <Ionicons name="trophy" size={20} color="#FFFFFF" />
                </LinearGradient>
                <Text style={styles.sectionTitle}>PROVEN RESULTS</Text>
              </View>
              <Text style={styles.resultsText}>
                Join thousands of learners who have achieved fluency 3x faster than 
                traditional methods. Our intelligent system ensures you spend time 
                on what matters most for your progress.
              </Text>
              
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>3x</Text>
                  <Text style={styles.statLabel}>Faster Progress</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>98%</Text>
                  <Text style={styles.statLabel}>Satisfaction</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>24/7</Text>
                  <Text style={styles.statLabel}>Available</Text>
                </View>
              </View>
            </Animated.View>

          </ScrollView>
        </Animated.View>

        {/* Enhanced Footer */}
        <Animated.View 
          style={[
            styles.footer,
            {
              opacity: fadeAnim,
            }
          ]}
        >
          <Text style={styles.footerText}>Transform Your English • Master Your Future</Text>
          <Text style={styles.versionText}>Powered by AI • Version 2.0.0</Text>
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
    backgroundColor: 'rgba(102, 61, 255, 0.15)',
  },
  floatingOrb2: {
    position: 'absolute',
    bottom: '20%',
    left: '10%',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 212, 170, 0.12)',
  },
  floatingOrb3: {
    position: 'absolute',
    top: '35%',
    left: '75%',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
  },
  floatingOrb4: {
    position: 'absolute',
    bottom: '40%',
    right: '5%',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(139, 92, 255, 0.1)',
  },
  particlesContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
    shadowColor: '#663DFF',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.6,
    shadowRadius: 25,
    elevation: 20,
  },
  iconGradient: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  mainTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 3,
    marginBottom: 8,
    textShadowColor: 'rgba(102, 61, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
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
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1.2,
    textShadowColor: 'rgba(255, 255, 255, 0.1)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  welcomeText: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: 17,
    lineHeight: 26,
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  resultsText: {
    color: 'rgba(255, 255, 255, 0.9)',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  advantageGradient: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    minHeight: 160,
  },
  advantageIconContainer: {
    marginBottom: 12,
  },
  advantageTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  advantageDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
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
  },
  statNumber: {
    color: '#00D4AA',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
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
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    letterSpacing: 1,
  },
  versionText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});

export default InfoScreen;