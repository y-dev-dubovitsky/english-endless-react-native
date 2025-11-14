import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  Animated,
  TouchableOpacity,
  Vibration,
  Dimensions
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { SentenceInterface, TenseInterface } from "../../types";
import { default as rndRangeNum } from "../../utils/randomNumberInRange";

const { width, height } = Dimensions.get('window');

const TrainerComponent = (props: any): JSX.Element => {
  const { tense } = props.route.params!;

  // States
  const [sentence, setSentence] = useState<SentenceInterface>({ en: "", ru: "" });
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [progress, setProgress] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });
  const [isAnswerVisible, setIsAnswerVisible] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);

  // Animations
  const mainSlide = React.useRef(new Animated.Value(height)).current;
  const cardScale = React.useRef(new Animated.Value(0.8)).current;
  const glowAnim = React.useRef(new Animated.Value(0)).current;
  const successAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    tense !== undefined && getNextSentence(tense);
    
    // Epic entrance animation
    Animated.parallel([
      Animated.spring(mainSlide, {
        toValue: 0,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(cardScale, {
        toValue: 1,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }),
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

    // Create floating particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
    }));
    setParticles(newParticles);
  }, []);

  // Methods
  const getOnlyKey = (object: object) => Object.keys(object)[0];
  const getOnlyValue = (object: object) => Object.values(object)[0];

  const buildSentence = (...words: Array<string>): string => {
    return words.join(" ").trim();
  };

  const navigateToMainPage = () => {
    props.navigation.navigate("Времена");
  };

  const getPossibleWords = (sentence: SentenceInterface, tense: TenseInterface | undefined): string[] => {
    if (!tense) return [];
    
    const sentenceWords = sentence.ru.split(" ").filter(word => word.trim() !== "");
    
    const allPronouns = Object.values(tense.pronounts).flat().flatMap(arr => 
      Array.isArray(arr) ? arr.map(obj => Object.values(obj)[0]) : []
    );
    
    const allAuxiliaries = Object.values(tense.auxiliaries).flat().flatMap(arr =>
      Array.isArray(arr) ? arr.map(obj => Object.values(obj)[0]) : []
    );
    
    const allVerbs = Object.values(tense.verbs).flat().flatMap(arr =>
      Array.isArray(arr) ? arr.map(obj => Object.values(obj)[0]) : []
    );

    return [...new Set([...sentenceWords, ...allPronouns, ...allAuxiliaries, ...allVerbs])]
      .filter(word => word && word.trim() !== "")
      .sort(() => Math.random() - 0.5);
  };

  const handleWordSelect = (word: string) => {
    Vibration.vibrate(15);
    const newSelectedWords = [...selectedWords, word];
    setSelectedWords(newSelectedWords);
    
    // Add selection particle effect
    const newParticle = {
      id: Date.now(),
      x: Math.random() * width,
      y: height * 0.7,
    };
    setParticles(prev => [...prev, newParticle]);
  };

  const handleWordDeselect = (index: number) => {
    Vibration.vibrate(15);
    const newSelectedWords = selectedWords.filter((_, i) => i !== index);
    setSelectedWords(newSelectedWords);
  };

  const clearAnswer = () => {
    setSelectedWords([]);
  };

  const createSuccessParticles = () => {
    const successParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1000,
      x: width / 2,
      y: height / 2,
    }));
    setParticles(prev => [...prev, ...successParticles]);
  };

  const playSuccessAnimation = () => {
    Vibration.vibrate(70);
    createSuccessParticles();
    
    Animated.sequence([
      Animated.timing(successAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(successAnim, {
        toValue: 0,
        duration: 500,
        delay: 1200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const checkAnswer = () => {
    const userAnswer = selectedWords.join(" ");
    const isCorrect = userAnswer.replace(/\s+/g, ' ').trim() === sentence.ru.replace(/\s+/g, ' ').trim();
    
    if (isCorrect) {
      setScore(score + 10);
      setStreak(streak + 1);
      setProgress(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
      playSuccessAnimation();
      
      setTimeout(() => getNextSentence(tense!), 2000);
    } else {
      setStreak(0);
      setProgress(prev => ({ ...prev, total: prev.total + 1 }));
      Vibration.vibrate(300);
    }
  };

  const getNextSentence = (tense: TenseInterface): void => {
    const { strategies, pronounts, auxiliaries, verbs } = tense;
    const strategy = strategies[rndRangeNum(0, strategies.length)];
    const pronountsList = pronounts[strategy[0]];
    const pronoun = pronountsList[rndRangeNum(0, pronountsList.length)];
    const auxiliariesList = auxiliaries[strategy[1]];
    const auxiliary = auxiliariesList[rndRangeNum(0, auxiliariesList.length)];
    const verbsList = verbs[strategy[2]];
    const verb = verbsList[rndRangeNum(0, verbsList.length)];

    setSentence({
      en: buildSentence(getOnlyKey(pronoun), getOnlyKey(auxiliary), getOnlyKey(verb)),
      ru: buildSentence(getOnlyValue(pronoun), getOnlyValue(auxiliary), getOnlyValue(verb)),
    });

    clearAnswer();
  };

  const possibleWords = getPossibleWords(sentence, tense);
  const accuracy = progress.total > 0 ? Math.round((progress.correct / progress.total) * 100) : 0;
  const userAnswer = selectedWords.join(" ");

  const glowInterpolate = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0px 0px 0px rgba(102, 61, 255, 0.3)', '0px 0px 40px rgba(102, 61, 255, 0.8)']
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      
      {/* Animated Background */}
      <View style={styles.background}>
        <LinearGradient
          colors={['#0A0020', '#1A0030', '#0A0020']}
          style={styles.backgroundGradient}
        />
        
        {/* Floating Particles */}
        {particles.map(particle => (
          <Animated.View
            key={particle.id}
            style={[
              styles.particle,
              {
                left: particle.x,
                top: particle.y,
                opacity: glowAnim,
              }
            ]}
          />
        ))}
        
        {/* Animated Grid */}
        <View style={styles.gridOverlay} />
      </View>

      <Animated.View style={[styles.container, { transform: [{ translateY: mainSlide }] }]}>
        
        {/* Premium Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={navigateToMainPage}>
            <LinearGradient
              colors={['#663DFF', '#8B5CFF']}
              style={styles.backGradient}
            >
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
              <Text style={styles.backText}>Назад</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{score}</Text>
              <Text style={styles.statLabel}>SCORE</Text>
            </View>
            <View style={[styles.statCard, streak > 0 && styles.streakCard]}>
              <View style={styles.streakContent}>
                <Text style={styles.statValue}>{streak}</Text>
                {streak >= 3 && <Ionicons name="flame" size={20} color="#FF6B35" />}
              </View>
              <Text style={styles.statLabel}>STREAK</Text>
            </View>
          </View>
        </View>

        {/* Main Content Area */}
        <View style={styles.mainContent}>
          
          {/* Premium Sentence Card */}
          <Animated.View style={[styles.sentenceCard, { 
            transform: [{ scale: cardScale }],
            shadowOffset: { width: 0, height: glowInterpolate }
          }]}>
            <LinearGradient
              colors={['rgba(30, 30, 60, 0.9)', 'rgba(20, 20, 40, 0.95)']}
              style={styles.sentenceGradient}
            >
              {/* Card Glow Border */}
              <Animated.View style={[styles.cardGlow, { opacity: glowAnim }]} />
              
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <View style={styles.tenseBadge}>
                    <Text style={styles.tenseName}>{tense?.name || "PRESENT SIMPLE"}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.hintButton}
                    onPress={() => setIsAnswerVisible(true)}
                  >
                    <Ionicons name="sparkles" size={24} color="#8B5CFF" />
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.englishText}>{sentence.en}</Text>
                
                <View style={styles.statsRow}>
                  <View style={styles.accuracyMeter}>
                    <View style={styles.accuracyBackground}>
                      <View style={[styles.accuracyFill, { width: `${accuracy}%` }]} />
                    </View>
                    <Text style={styles.accuracyText}>{accuracy}% ACCURACY</Text>
                  </View>
                  <View style={styles.progressCircle}>
                    <Text style={styles.progressCount}>{progress.correct}/{progress.total}</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Build Area - Ultra Modern */}
          <View style={styles.buildSection}>
            <Text style={styles.sectionTitle}>CONSTRUCT TRANSLATION</Text>
            
            <View style={styles.selectedArea}>
              {selectedWords.length === 0 ? (
                <View style={styles.placeholder}>
                  <Ionicons name="arrow-down" size={32} color="rgba(139, 92, 255, 0.5)" />
                  <Text style={styles.placeholderText}>Select words to build sentence</Text>
                </View>
              ) : (
                <View style={styles.selectedWordsRow}>
                  {selectedWords.map((word, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.selectedWordChip}
                      onPress={() => handleWordDeselect(index)}
                    >
                      <LinearGradient
                        colors={['#663DFF', '#8B5CFF']}
                        style={styles.selectedWordGradient}
                      >
                        <Text style={styles.selectedWordText}>{word}</Text>
                        <Ionicons name="close-circle" size={18} color="#FFFFFF" />
                      </LinearGradient>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {selectedWords.length > 0 && (
              <View style={styles.actionRow}>
                <TouchableOpacity 
                  style={styles.secondaryButton}
                  onPress={clearAnswer}
                >
                  <Ionicons name="refresh" size={20} color="#8B5CFF" />
                  <Text style={styles.secondaryText}>Clear</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.primaryButton}
                  onPress={checkAnswer}
                >
                  <LinearGradient
                    colors={['#00D4AA', '#00B894']}
                    style={styles.primaryGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Ionicons name="checkmark-done" size={24} color="#000" />
                    <Text style={styles.primaryText}>VERIFY ANSWER</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Words Grid - Premium */}
          <View style={styles.wordsSection}>
            <Text style={styles.sectionTitle}>AVAILABLE WORDS</Text>
            
            <View style={styles.wordsGrid}>
              {possibleWords.map((word, index) => {
                const isSelected = selectedWords.includes(word);
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.wordPill,
                      isSelected && styles.wordPillSelected
                    ]}
                    onPress={() => !isSelected && handleWordSelect(word)}
                    disabled={isSelected}
                  >
                    <Text style={[
                      styles.wordPillText,
                      isSelected && styles.wordPillTextSelected
                    ]}>
                      {word}
                    </Text>
                    {isSelected && (
                      <View style={styles.selectedIndicator}>
                        <Ionicons name="checkmark" size={16} color="#00D4AA" />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

        </View>

      </Animated.View>

      {/* Epic Success Overlay */}
      <Animated.View style={[styles.successOverlay, { opacity: successAnim }]}>
        <LinearGradient
          colors={['rgba(0, 212, 170, 0.9)', 'rgba(0, 184, 148, 0.95)']}
          style={styles.successCard}
        >
          <View style={styles.successIcon}>
            <Ionicons name="trophy" size={80} color="#000" />
          </View>
          <Text style={styles.successTitle}>PERFECT!</Text>
          <Text style={styles.successScore}>+10 XP</Text>
          <View style={styles.successStreak}>
            <Ionicons name="flash" size={20} color="#000" />
            <Text style={styles.successStreakText}>Streak: {streak}</Text>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Premium Modal */}
      {isAnswerVisible && (
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalCard, { transform: [{ scale: cardScale }] }]}>
            <LinearGradient
              colors={['rgba(30, 30, 60, 0.95)', 'rgba(20, 20, 40, 0.98)']}
              style={styles.modalGradient}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>CORRECT TRANSLATION</Text>
                <TouchableOpacity 
                  style={styles.modalClose}
                  onPress={() => setIsAnswerVisible(false)}
                >
                  <Ionicons name="close" size={24} color="#8B5CFF" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.modalContent}>
                <Ionicons name="bulb" size={48} color="#8B5CFF" />
                <Text style={styles.modalAnswer}>{sentence.ru}</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => setIsAnswerVisible(false)}
              >
                <Text style={styles.modalButtonText}>GOT IT</Text>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
        </View>
      )}

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
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    backgroundImage: `linear-gradient(rgba(102, 61, 255, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(102, 61, 255, 0.1) 1px, transparent 1px)`,
    backgroundSize: '50px 50px',
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#663DFF',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  backButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  backGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  streakCard: {
    backgroundColor: 'rgba(255, 107, 53, 0.2)',
    borderColor: 'rgba(255, 107, 53, 0.4)',
  },
  streakContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 4,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 24,
  },
  sentenceCard: {
    borderRadius: 28,
    marginBottom: 32,
    shadowColor: '#663DFF',
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
  },
  sentenceGradient: {
    borderRadius: 28,
    overflow: 'hidden',
  },
  cardGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#663DFF',
  },
  cardContent: {
    padding: 28,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  tenseBadge: {
    backgroundColor: 'rgba(102, 61, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(102, 61, 255, 0.5)',
  },
  tenseName: {
    color: '#8B5CFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
  hintButton: {
    padding: 8,
  },
  englishText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '300',
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 28,
    fontFamily: 'System',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accuracyMeter: {
    flex: 1,
    marginRight: 20,
  },
  accuracyBackground: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  accuracyFill: {
    height: '100%',
    backgroundColor: '#00D4AA',
    borderRadius: 3,
  },
  accuracyText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  progressCount: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buildSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 16,
    textAlign: 'center',
  },
  selectedArea: {
    minHeight: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  placeholderText: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
  },
  selectedWordsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  selectedWordChip: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  selectedWordGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  selectedWordText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 16,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(139, 92, 255, 0.1)',
    borderRadius: 20,
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 255, 0.3)',
  },
  secondaryText: {
    color: '#8B5CFF',
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButton: {
    flex: 2,
    borderRadius: 20,
    overflow: 'hidden',
  },
  primaryGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 18,
  },
  primaryText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  wordsSection: {
    flex: 1,
  },
  wordsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  wordPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  wordPillSelected: {
    backgroundColor: 'rgba(102, 61, 255, 0.2)',
    borderColor: 'rgba(102, 61, 255, 0.5)',
  },
  wordPillText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  wordPillTextSelected: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  selectedIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 212, 170, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  successCard: {
    width: '75%',
    padding: 40,
    borderRadius: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.5,
    shadowRadius: 40,
    elevation: 30,
  },
  successIcon: {
    marginBottom: 16,
  },
  successTitle: {
    color: '#000',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  successScore: {
    color: '#000',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
  },
  successStreak: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  successStreakText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
  },
  modalCard: {
    width: '80%',
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#663DFF',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 25,
  },
  modalGradient: {
    padding: 32,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  modalClose: {
    padding: 4,
  },
  modalContent: {
    alignItems: 'center',
    marginBottom: 28,
  },
  modalAnswer: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '300',
    textAlign: 'center',
    lineHeight: 32,
    marginTop: 16,
  },
  modalButton: {
    backgroundColor: '#8B5CFF',
    padding: 18,
    borderRadius: 20,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default TrainerComponent;