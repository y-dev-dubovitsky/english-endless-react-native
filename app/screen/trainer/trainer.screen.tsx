// trainer.screen.tsx - оптимизированная версия с адаптивной карточкой
import Ionicons from '@expo/vector-icons/Ionicons';
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Vibration,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { SentenceInterface, TenseInterface } from '../../types';
import { default as rndRangeNum } from '../../utils/randomNumberInRange';
import { useTheme } from '../../contexts/ThemeContext';
import { updateAnswerStats } from '../main/main.screen';

const { width, height } = Dimensions.get('window');

// Моковые слова для вариантов ответов (упрощенный список для примера)
const MOCK_WORDS = [
  'есть', 'был', 'были', 'иметь', 'делать', 'буду', 'бы',
  'могу', 'должен', 'идти', 'шел', 'увидеть', 'взять', 'сделать',
  'приходить', 'знать', 'получить', 'дать', 'найти', 'думать'
];

const TrainerComponent = (props: any): JSX.Element => {
  const { theme, colors } = useTheme();
  const { tense } = props.route.params!;

  // States
  const [sentence, setSentence] = useState<SentenceInterface>({
    en: '',
    ru: '',
  });
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [progress, setProgress] = useState<{ correct: number; total: number }>({
    correct: 0,
    total: 0,
  });
  const [isAnswerVisible, setIsAnswerVisible] = useState<boolean>(false);
  const [isWrongAnswerVisible, setIsWrongAnswerVisible] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const particleIdCounter = useRef(0);

  // Refs для кеширования
  const possibleWordsRef = useRef<string[]>([]);
  const prevSentenceRef = useRef<string>('');
  const prevTenseRef = useRef<string>('');

  // Animations
  const mainSlide = useRef(new Animated.Value(height)).current;
  const cardScale = useRef(new Animated.Value(0.8)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const successAnim = useRef(new Animated.Value(0)).current;
  const wrongAnswerModalAnim = useRef(new Animated.Value(0)).current;

  // Генерация возможных слов с мемоизацией
  const getPossibleWords = useCallback(
    (
      sentence: SentenceInterface,
      tense: TenseInterface | undefined
    ): string[] => {
      const sentenceStr = JSON.stringify(sentence);
      const tenseStr = JSON.stringify(tense);

      // Если ничего не изменилось, возвращаем кешированный результат
      if (
        sentenceStr === prevSentenceRef.current &&
        tenseStr === prevTenseRef.current &&
        possibleWordsRef.current.length > 0
      ) {
        return [...possibleWordsRef.current];
      }

      if (!tense) {
        const mockWords = [...MOCK_WORDS].sort(() => Math.random() - 0.5);
        possibleWordsRef.current = mockWords;
        return mockWords;
      }

      const sentenceWords = sentence.ru
        .split(' ')
        .filter(word => word.trim() !== '');

      const allPronouns = Object.values(tense.pronounts)
        .flat()
        .flatMap(arr =>
          Array.isArray(arr) ? arr.map(obj => Object.values(obj)[0]) : []
        );

      const allAuxiliaries = Object.values(tense.auxiliaries)
        .flat()
        .flatMap(arr =>
          Array.isArray(arr) ? arr.map(obj => Object.values(obj)[0]) : []
        );

      const allVerbs = Object.values(tense.verbs)
        .flat()
        .flatMap(arr =>
          Array.isArray(arr) ? arr.map(obj => Object.values(obj)[0]) : []
        );

      const allRealWords = [
        ...new Set(
          [
            ...sentenceWords,
            ...allPronouns,
            ...allAuxiliaries,
            ...allVerbs,
          ].filter(word => word && word.trim() !== '')
        ),
      ];

      // Добавляем моковые слова
      const mockWordsCount = Math.max(
        3,
        Math.min(MOCK_WORDS.length, Math.floor(allRealWords.length * 0.4))
      );

      const shuffledMockWords = [...MOCK_WORDS]
        .sort(() => Math.random() - 0.5)
        .slice(0, mockWordsCount)
        .filter(word => !allRealWords.includes(word));

      const allWords = [...allRealWords, ...shuffledMockWords].sort(
        () => Math.random() - 0.5
      );

      // Сохраняем для кеширования
      possibleWordsRef.current = allWords;
      prevSentenceRef.current = sentenceStr;
      prevTenseRef.current = tenseStr;

      return allWords;
    },
    []
  );

  const possibleWords = useMemo(
    () => getPossibleWords(sentence, tense),
    [getPossibleWords, sentence, tense]
  );

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
    const newParticles = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
    }));
    setParticles(newParticles);
    particleIdCounter.current = 10;
  }, []);

  // Methods
  const getOnlyKey = useCallback(
    (object: object) => Object.keys(object)[0],
    []
  );
  const getOnlyValue = useCallback(
    (object: object) => Object.values(object)[0],
    []
  );

  const buildSentence = useCallback((...words: Array<string>): string => {
    return words.join(' ').trim();
  }, []);

  const navigateToMainPage = useCallback(() => {
    props.navigation.goBack();
  }, [props.navigation]);

  const handleWordSelect = useCallback(
    (word: string) => {
      if (selectedWords.includes(word)) {
        return;
      }

      Vibration.vibrate(15);
      const newSelectedWords = [...selectedWords, word];
      setSelectedWords(newSelectedWords);

      // Add selection particle effect
      const newParticleId = particleIdCounter.current;
      particleIdCounter.current += 1;

      const newParticle = {
        id: newParticleId,
        x: Math.random() * width,
        y: height * 0.7,
      };
      setParticles(prev => [...prev.slice(-30), newParticle]);

      // Автоматическое удаление частицы
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticleId));
      }, 3000);
    },
    [selectedWords]
  );

  const handleWordDeselect = useCallback(
    (index: number) => {
      Vibration.vibrate(15);
      const newSelectedWords = selectedWords.filter((_, i) => i !== index);
      setSelectedWords(newSelectedWords);
    },
    [selectedWords]
  );

  const clearAnswer = useCallback(() => {
    setSelectedWords([]);
  }, []);

  const createSuccessParticles = useCallback(() => {
    const successParticles = Array.from({ length: 20 }, (_, i) => {
      const id = particleIdCounter.current + i;
      return {
        id,
        x: width / 2,
        y: height / 2,
      };
    });

    particleIdCounter.current += 20;
    setParticles(prev => [...prev, ...successParticles]);

    // Удаление успешных частиц
    setTimeout(() => {
      const idsToRemove = successParticles.map(p => p.id);
      setParticles(prev => prev.filter(p => !idsToRemove.includes(p.id)));
    }, 2000);
  }, []);

  const playSuccessAnimation = useCallback(() => {
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
  }, [createSuccessParticles, successAnim]);

  const showWrongAnswerModal = useCallback(() => {
    setIsWrongAnswerVisible(true);
    Animated.spring(wrongAnswerModalAnim, {
      toValue: 1,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, []);

  const hideWrongAnswerModal = useCallback(() => {
    Animated.spring(wrongAnswerModalAnim, {
      toValue: 0,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    }).start(() => {
      setIsWrongAnswerVisible(false);
    });
  }, []);

  const checkAnswer = useCallback(() => {
    const userAnswer = selectedWords.join(' ');
    const isCorrect =
      userAnswer.replace(/\s+/g, ' ').trim() ===
      sentence.ru.replace(/\s+/g, ' ').trim();

    if (isCorrect) {
      setScore(prev => prev + 10);
      setStreak(prev => prev + 1);
      setProgress(prev => ({
        correct: prev.correct + 1,
        total: prev.total + 1,
      }));
      playSuccessAnimation();
      // TODO Вынести в store
      updateAnswerStats(isCorrect);

      setTimeout(() => getNextSentence(tense!), 2000);
    } else {
      setStreak(0);
      setProgress(prev => ({ ...prev, total: prev.total + 1 }));
      Vibration.vibrate(300);
      showWrongAnswerModal();
    }
  }, [
    selectedWords,
    sentence.ru,
    playSuccessAnimation,
    tense,
    showWrongAnswerModal,
  ]);

  const getNextSentence = useCallback(
    (tense: TenseInterface): void => {
      const { strategies, pronounts, auxiliaries, verbs } = tense;
      const strategy = strategies[rndRangeNum(0, strategies.length)];
      const pronountsList = pronounts[strategy[0]];
      const pronoun = pronountsList[rndRangeNum(0, pronountsList.length)];
      const auxiliariesList = auxiliaries[strategy[1]];
      const auxiliary = auxiliariesList[rndRangeNum(0, auxiliariesList.length)];
      const verbsList = verbs[strategy[2]];
      const verb = verbsList[rndRangeNum(0, verbsList.length)];

      setSentence({
        en: buildSentence(
          getOnlyKey(pronoun),
          getOnlyKey(auxiliary),
          getOnlyKey(verb)
        ),
        ru: buildSentence(
          getOnlyValue(pronoun),
          getOnlyValue(auxiliary),
          getOnlyValue(verb)
        ),
      });

      clearAnswer();
    },
    [buildSentence, getOnlyKey, getOnlyValue, clearAnswer]
  );

  // Функции для получения цветов
  const getBackgroundGradient = useCallback(() => {
    if (theme === 'light') {
      return ['#F8FAFF', '#F0F5FF', '#F8FAFF'];
    } else {
      return ['#0A0020', '#1A0030', '#0A0020'];
    }
  }, [theme]);

  const getParticleColor = useCallback(() => {
    return theme === 'light' ? colors.primary + '80' : '#663DFF';
  }, [theme, colors.primary]);

  const getSuccessGradientColors = useCallback(() => {
    if (theme === 'light') {
      return ['rgba(0, 212, 170, 0.9)', 'rgba(0, 184, 148, 0.95)'];
    } else {
      return [colors.accent, colors.accentLight || colors.accent];
    }
  }, [theme, colors.accent, colors.accentLight]);

  const getWrongAnswerGradientColors = useCallback(() => {
    if (theme === 'light') {
      return ['rgba(255, 64, 129, 0.9)', 'rgba(233, 30, 99, 0.95)'];
    } else {
      return ['rgba(244, 67, 54, 0.9)', 'rgba(229, 57, 53, 0.95)'];
    }
  }, [theme]);

  const accuracy = useMemo(
    () =>
      progress.total > 0
        ? Math.round((progress.correct / progress.total) * 100)
        : 0,
    [progress.correct, progress.total]
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Animated Background */}
      <View style={styles.background} pointerEvents='none'>
        <LinearGradient
          colors={getBackgroundGradient()}
          style={styles.backgroundGradient}
        />

        {/* Floating Particles */}
        {particles.map(particle => (
          <Animated.View
            key={`particle-${particle.id}`}
            style={[
              styles.particle,
              {
                left: particle.x,
                top: particle.y,
                opacity: glowAnim,
                backgroundColor: getParticleColor(),
              },
            ]}
            pointerEvents='none'
          />
        ))}
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <Animated.View
          style={[styles.container, { transform: [{ translateY: mainSlide }] }]}
        >
          {/* Компактный Header */}
          <View style={styles.compactHeader}>
            <TouchableOpacity
              style={styles.compactBackButton}
              onPress={navigateToMainPage}
              activeOpacity={0.7}
            >
              <Ionicons 
                name='chevron-back' 
                size={24} 
                color={theme === 'light' ? colors.primary : '#FFFFFF'} 
              />
            </TouchableOpacity>

            <View style={styles.compactStats}>
              <View style={styles.compactStatItem}>
                <Text style={styles.compactStatValue}>{score}</Text>
                <Text style={styles.compactStatLabel}>Очки</Text>
              </View>
              
              <View style={[
                styles.compactStatItem,
                streak > 0 && styles.streakActive
              ]}>
                <View style={styles.streakRow}>
                  <Text style={styles.compactStatValue}>{streak}</Text>
                  {streak >= 3 && (
                    <Ionicons name='flame' size={16} color='#FF6B35' />
                  )}
                </View>
                <Text style={styles.compactStatLabel}>Серия</Text>
              </View>

              <View style={styles.compactStatItem}>
                <Text style={styles.compactStatValue}>
                  {progress.correct}/{progress.total}
                </Text>
                <Text style={styles.compactStatLabel}>Верно</Text>
              </View>
            </View>
          </View>

          {/* Прогресс бар */}
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={[styles.progressTitle, { color: colors.text }]}>
                Прогресс
              </Text>
              <Text style={[styles.accuracyText, { 
                color: accuracy >= 70 ? '#00D4AA' : accuracy >= 40 ? '#FFB300' : '#FF4081'
              }]}>
                {accuracy}%
              </Text>
            </View>
            <View style={[styles.progressBarBackground, {
              backgroundColor: theme === 'light' 
                ? 'rgba(0, 0, 0, 0.1)' 
                : 'rgba(255, 255, 255, 0.1)'
            }]}>
              <View style={[
                styles.progressBarFill,
                { 
                  width: `${accuracy}%`,
                  backgroundColor: accuracy >= 70 ? '#00D4AA' : accuracy >= 40 ? '#FFB300' : '#FF4081'
                }
              ]} />
            </View>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Основная карточка */}
            <Animated.View
              style={[
                styles.mainCard,
                {
                  transform: [{ scale: cardScale }],
                  minHeight: height * 0.5, // Адаптивная высота
                },
              ]}
            >
              <LinearGradient
                colors={
                  theme === 'light'
                    ? ['rgba(240, 245, 255, 0.9)', 'rgba(230, 240, 255, 0.95)']
                    : ['rgba(30, 30, 60, 0.9)', 'rgba(20, 20, 40, 0.95)']
                }
                style={styles.cardGradient}
              >
                {/* Card Glow Border */}
                <Animated.View
                  style={[
                    styles.cardGlow,
                    {
                      opacity: glowAnim,
                      borderColor: colors.primary,
                    },
                  ]}
                  pointerEvents='none'
                />

                <View style={styles.cardContent}>
                  {/* Заголовок карточки */}
                  <View style={styles.cardHeader}>
                    <View
                      style={[
                        styles.tenseBadge,
                        {
                          backgroundColor:
                            theme === 'light'
                              ? 'rgba(102, 61, 255, 0.1)'
                              : 'rgba(102, 61, 255, 0.2)',
                          borderColor:
                            theme === 'light'
                              ? 'rgba(102, 61, 255, 0.3)'
                              : 'rgba(102, 61, 255, 0.5)',
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.tenseName,
                          {
                            color:
                              theme === 'light' ? colors.primary : '#8B5CFF',
                          },
                        ]}
                      >
                        {tense?.name || 'PRESENT SIMPLE'}
                      </Text>
                    </View>
                    
                    <TouchableOpacity
                      style={styles.hintButton}
                      onPress={() => setIsAnswerVisible(true)}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name='help-circle-outline'
                        size={22}
                        color={theme === 'light' ? colors.primary : '#8B5CFF'}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Оригинальное предложение */}
                  <View style={styles.sentenceSection}>
                    <Text style={[styles.sectionLabel, { 
                      color: theme === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)' 
                    }]}>
                      ОРИГИНАЛ:
                    </Text>
                    <Text style={[styles.originalText, { color: colors.text }]}>
                      {sentence.en}
                    </Text>
                  </View>

                  {/* Пользовательское предложение */}
                  <View style={styles.sentenceSection}>
                    <Text style={[styles.sectionLabel, { 
                      color: theme === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)' 
                    }]}>
                      ВАШ ОТВЕТ:
                    </Text>
                    <View style={[
                      styles.userAnswerContainer,
                      {
                        backgroundColor: theme === 'light' 
                          ? 'rgba(0, 0, 0, 0.05)' 
                          : 'rgba(255, 255, 255, 0.05)',
                        borderColor: theme === 'light'
                          ? 'rgba(0, 0, 0, 0.1)'
                          : 'rgba(255, 255, 255, 0.1)',
                      }
                    ]}>
                      {selectedWords.length === 0 ? (
                        <Text style={[styles.emptyAnswer, { 
                          color: theme === 'light' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)' 
                        }]}>
                          Выберите слова ниже...
                        </Text>
                      ) : (
                        <View style={styles.selectedWordsContainer}>
                          {selectedWords.map((word, index) => (
                            <TouchableOpacity
                              key={`selected-${index}`}
                              style={[
                                styles.selectedWordChip,
                                {
                                  backgroundColor: theme === 'light'
                                    ? 'rgba(102, 61, 255, 0.1)'
                                    : 'rgba(102, 61, 255, 0.2)',
                                }
                              ]}
                              onPress={() => handleWordDeselect(index)}
                              activeOpacity={0.7}
                            >
                              <Text style={[
                                styles.selectedWordText,
                                { color: theme === 'light' ? colors.primary : '#8B5CFF' }
                              ]}>
                                {word}
                              </Text>
                              <Ionicons
                                name='close-circle'
                                size={16}
                                color={theme === 'light' ? colors.primary : '#8B5CFF'}
                                style={styles.removeIcon}
                              />
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </View>
                  </View>

                  {/* Доступные слова */}
                  <View style={styles.wordsSection}>
                    <Text style={[styles.sectionLabel, { 
                      color: theme === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)' 
                    }]}>
                      ВЫБЕРИТЕ СЛОВА:
                    </Text>
                    <View style={styles.wordsGrid}>
                      {possibleWords.map((word, index) => {
                        const isSelected = selectedWords.includes(word);
                        return (
                          <TouchableOpacity
                            key={`word-${index}`}
                            style={[
                              styles.wordChip,
                              {
                                backgroundColor:
                                  theme === 'light'
                                    ? isSelected
                                      ? 'rgba(102, 61, 255, 0.1)'
                                      : 'rgba(255, 255, 255, 0.9)'
                                    : isSelected
                                    ? 'rgba(102, 61, 255, 0.2)'
                                    : 'rgba(255, 255, 255, 0.1)',
                                borderColor:
                                  theme === 'light'
                                    ? isSelected
                                      ? colors.primary
                                      : 'rgba(0, 0, 0, 0.1)'
                                    : isSelected
                                    ? '#8B5CFF'
                                    : 'rgba(255, 255, 255, 0.2)',
                              },
                            ]}
                            onPress={() => handleWordSelect(word)}
                            disabled={isSelected}
                            activeOpacity={0.6}
                          >
                            <Text style={[
                              styles.wordChipText,
                              { 
                                color: isSelected
                                  ? theme === 'light'
                                    ? colors.primary
                                    : '#8B5CFF'
                                  : colors.text
                              }
                            ]} numberOfLines={1} ellipsizeMode="tail">
                              {word}
                            </Text>
                            {isSelected && (
                              <Ionicons
                                name='checkmark-circle'
                                size={16}
                                color={theme === 'light' ? colors.primary : '#8B5CFF'}
                                style={styles.wordCheckmark}
                              />
                            )}
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>

                  {/* Кнопки действий */}
                  {selectedWords.length > 0 && (
                    <View style={styles.actionButtons}>
                      <TouchableOpacity
                        style={[styles.clearButton, {
                          backgroundColor: theme === 'light' 
                            ? 'rgba(139, 92, 255, 0.05)' 
                            : 'rgba(139, 92, 255, 0.1)',
                          borderColor: theme === 'light'
                            ? 'rgba(139, 92, 255, 0.2)'
                            : 'rgba(139, 92, 255, 0.3)',
                        }]}
                        onPress={clearAnswer}
                        activeOpacity={0.7}
                      >
                        <Ionicons
                          name='refresh'
                          size={18}
                          color={theme === 'light' ? '#667eea' : '#8B5CFF'}
                        />
                        <Text style={[styles.clearButtonText, {
                          color: theme === 'light' ? '#667eea' : '#8B5CFF'
                        }]}>
                          Очистить
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.checkButton}
                        onPress={checkAnswer}
                        activeOpacity={0.8}
                      >
                        <LinearGradient
                          colors={
                            theme === 'light'
                              ? ['#00B894', '#00D4AA']
                              : ['#00D4AA', '#00B894']
                          }
                          style={styles.checkButtonGradient}
                        >
                          <Ionicons name='checkmark-done' size={20} color='#000' />
                          <Text style={styles.checkButtonText}>Проверить</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </LinearGradient>
            </Animated.View>
          </ScrollView>
        </Animated.View>

        {/* Success Overlay */}
        <Animated.View
          style={[styles.successOverlay, { opacity: successAnim }]}
          pointerEvents='none'
        >
          <LinearGradient
            colors={getSuccessGradientColors()}
            style={styles.successCard}
          >
            <Ionicons name='trophy' size={60} color='#000' />
            <Text style={styles.successTitle}>Отлично!</Text>
            <Text style={styles.successScore}>+10 очков</Text>
          </LinearGradient>
        </Animated.View>

        {/* Wrong Answer Modal */}
        {isWrongAnswerVisible && (
          <View style={styles.wrongAnswerOverlay}>
            <TouchableOpacity
              style={styles.wrongAnswerOverlayTouchable}
              onPress={hideWrongAnswerModal}
              activeOpacity={1}
            >
              <Animated.View
                style={[
                  styles.wrongAnswerModal,
                  {
                    transform: [{ scale: wrongAnswerModalAnim }],
                    opacity: wrongAnswerModalAnim,
                  },
                ]}
              >
                <LinearGradient
                  colors={getWrongAnswerGradientColors()}
                  style={styles.wrongAnswerGradient}
                >
                  <View style={styles.wrongAnswerHeader}>
                    <Text style={styles.wrongAnswerTitle}>Неверно</Text>
                    <TouchableOpacity
                      onPress={hideWrongAnswerModal}
                      activeOpacity={0.7}
                    >
                      <Ionicons name='close' size={24} color='#FFFFFF' />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.wrongAnswerText}>
                    Ваш ответ: {selectedWords.join(' ')}
                  </Text>
                  <Text style={styles.correctAnswerText}>
                    Правильно: {sentence.ru}
                  </Text>
                </LinearGradient>
              </Animated.View>
            </TouchableOpacity>
          </View>
        )}

        {/* Answer Modal */}
        {isAnswerVisible && (
          <View style={styles.modalOverlay}>
            <TouchableOpacity
              style={styles.modalOverlayTouchable}
              onPress={() => setIsAnswerVisible(false)}
              activeOpacity={1}
            >
              <View style={styles.modalCard}>
                <LinearGradient
                  colors={
                    theme === 'light'
                      ? ['#667eea', '#764ba2']
                      : [colors.primary, colors.primaryDark || colors.primary]
                  }
                  style={styles.modalGradient}
                >
                  <Text style={styles.modalTitle}>Правильный ответ</Text>
                  <Text style={styles.modalAnswer}>{sentence.ru}</Text>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => setIsAnswerVisible(false)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.modalButtonText}>Понятно</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </View>
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
    width: 3,
    height: 3,
    borderRadius: 1.5,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  
  // Компактный Header
  compactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },
  compactBackButton: {
    padding: 8,
  },
  compactStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  compactStatItem: {
    alignItems: 'center',
    minWidth: 60,
  },
  streakActive: {
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  compactStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontVariant: ['tabular-nums'],
  },
  compactStatLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
    marginTop: 2,
  },
  
  // Прогресс бар
  progressContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  accuracyText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressBarBackground: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  
  // Основная карточка
  mainCard: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#663DFF',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  cardGradient: {
    flex: 1,
  },
  cardGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24,
    borderWidth: 1,
  },
  cardContent: {
    padding: 24,
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  tenseBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  tenseName: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  hintButton: {
    padding: 6,
  },
  
  // Секции внутри карточки
  sentenceSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  originalText: {
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 32,
  },
  
  // Ответ пользователя
  userAnswerContainer: {
    minHeight: 60,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    justifyContent: 'center',
  },
  emptyAnswer: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  selectedWordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  selectedWordChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
  },
  selectedWordText: {
    fontSize: 16,
    fontWeight: '500',
  },
  removeIcon: {
    marginLeft: 4,
  },
  
  // Доступные слова
  wordsSection: {
    marginBottom: 24,
  },
  wordsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  wordChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    maxWidth: '48%', // Ограничиваем ширину для двух колонок
    minWidth: 80,
    flexShrink: 1,
  },
  wordChipText: {
    fontSize: 15,
    fontWeight: '500',
    flexShrink: 1, // Предотвращаем перенос текста
    flexWrap: 'nowrap', // Запрещаем перенос на новую строку
  },
  wordCheckmark: {
    marginLeft: 6,
  },
  
  // Кнопки действий
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  checkButton: {
    flex: 2,
    borderRadius: 16,
    overflow: 'hidden',
  },
  checkButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
  },
  checkButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Success Overlay
  successOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  successCard: {
    padding: 30,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  successTitle: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
  },
  successScore: {
    color: '#000',
    fontSize: 16,
    marginTop: 4,
  },
  
  // Wrong Answer Modal
  wrongAnswerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
  },
  wrongAnswerOverlayTouchable: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrongAnswerModal: {
    width: '80%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  wrongAnswerGradient: {
    padding: 24,
  },
  wrongAnswerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  wrongAnswerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  wrongAnswerText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 12,
    borderRadius: 8,
  },
  correctAnswerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD600',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 12,
    borderRadius: 8,
  },
  
  // Answer Modal
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
  },
  modalOverlayTouchable: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '80%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalGradient: {
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  modalAnswer: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 28,
  },
  modalButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TrainerComponent;