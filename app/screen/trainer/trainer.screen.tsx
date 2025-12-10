// trainer.screen.tsx - исправленная версия с модалкой для неправильного ответа
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

const { width, height } = Dimensions.get('window');

// Моковые слова для вариантов ответов
const MOCK_WORDS = [
  'есть',
  'есть',
  'есть',
  'был',
  'были',
  'иметь',
  'имеет',
  'имел',
  'делать',
  'делает',
  'делал',
  'буду',
  'бы',
  'могу',
  'мог',
  'должен',
  'может',
  'может быть',
  'должен',
  'должен',
  'идти',
  'шел',
  'увидеть',
  'увидел',
  'взять',
  'взял',
  'сделать',
  'сделал',
  'приходить',
  'пришел',
  'знать',
  'знал',
  'получить',
  'получил',
  'дать',
  'дал',
  'найти',
  'нашел',
  'думать',
  'думал',
  'сказать',
  'сказал',
  'хотеть',
  'хотел',
  'оставлять',
  'оставить',
  'помнить',
  'забыть',
  'чувствовать',
  'чувствовал',
  'разговаривать',
  'говорить',
  'работать',
  'учить',
  'обучать',
  'покупать',
  'продавать',
  'играть',
  'смотреть',
  'ждать',
  'ждал',
  'бить',
  'встречать',
  'лететь',
  'летел',
  'писать',
  'написал',
  'кричать',
  'плакать',
  'улыбаться',
  'смеяться',
  'ходить',
  'бежать',
  'прыгать',
  'танцевать',
  'чистить',
  'мыть',
  'звать',
  'звонил',
  'слышать',
  'слушать',
  'наблюдать',
  'сидеть',
  'стоял',
  'путешествовать',
  'жить',
  'умереть',
  'помогать',
  'желать',
  'выбирать',
  'искать',
  'спрашивать',
  'отвечать',
  'пробовать',
  'регулировать',
  'добавлять',
  'удалять',
  'заботиться',
  'равняться',
  'сравнивать',
  'миновать',
  'оставлять',
  'заставлять',
  'размышлять',
  'доказывать',
  'выражать',
  'кричать',
  'восклицать',
  'находить',
  'показывать',
  'соединять',
  'приходить',
  'покидывать',
  'прийти',
  'открывать',
  'закрывать',
  'добавить',
  'заменять',
  'устанавливать',
  'продолжать',
  'переставать',
  'понимать',
  'изучать',
  'переводить',
  'призывать',
  'платить',
  'замышлять',
  'критиковать',
  'осуждать',
  'дразнить',
  'покидать',
  'уверять',
  'обещать',
  'разводить',
  'смешивать',
  'применять',
  'собеседовать',
  'отвечать',
  'изменять',
  'оправдывать',
  'участвовать',
  'признавать',
  'фиксировать',
  'освобождать',
  'признавать',
  'потрясать',
  'завершать',
  'достигать',
  'устраивать',
  'выводить',
  'утверждать',
  'возвращать',
  'договариваться',
  'делить',
  'разминать',
  'наказывать',
  'менять',
  'принимать',
  'выводить',
  'фокусировать',
  'править',
  'формировать',
  'развивать',
  'заслуживать',
  'защищать',
  'проверять',
  'избегать',
  'охранять',
  'выразить',
  'выбирать',
  'мириться',
  'прощать',
  'исправлять',
  'объяснять',
  'передавать',
  'управлять',
  'проводить',
  'поддерживать',
  'разгадывать',
  'считать',
  'покорять',
  'объяснять',
  'исследовать',
  'преодолевать',
  'находить',
  'объединять',
  'отпускать',
  'заботиться',
  'рекомендовать',
  'сохранять',
  'планировать',
  'развивать',
  'сформировать',
  'улучшать',
  'формировать',
  'производить',
  'анализировать',
  'исследовать',
  'конструировать',
  'создавать',
  'проектировать',
  'проверять',
  'настраивать',
  'подготавливать',
  'выражать',
  'предлагать',
  'оставлять',
  'показывать',
  'рассматривать',
  'укреплять',
  'разрабатывать',
  'утверждать',
  'доказывать',
  'выявлять',
  'привлекать',
  'применять',
  'ассоциировать',
  'выдавать',
  'сообщать',
  'завершать',
  'вводить',
  'заключать',
  'устанавливать',
  'документировать',
  'соединять',
  'предсказывать',
  'понимать',
  'исправлять',
  'контролировать',
  'жарить',
  'печь',
  'варить',
  'мешать',
  'разливать',
  'усиливать',
  'уменьшать',
  'дотрагиваться',
  'изменять',
  'мыслить',
  'интерпретировать',
  'разъяснять',
  'опростить',
  'заботиться',
  'обсуждать',
  'настраивать',
  'включать',
  'выключать',
  'помогать',
  'упрощать',
  'формировать',
  'смешивать',
  'изменять',
  'проектировать',
  'управлять',
  'вводить',
  'освобождать',
  'накапливать',
  'снижать',
  'укрывать',
  'габарировать',
  'уточнять',
  'приспосабливать',
  'обнаруживать',
  'отслеживать',
  'разгерметизировать',
  'сфокусировать',
  'подводить',
  'собирать',
  'размышлять',
  'проектировать',
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
  const [isWrongAnswerVisible, setIsWrongAnswerVisible] =
    useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);
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

      // Добавляем моковые слова (30-50% от количества реальных слов)
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

    // Create floating particles with unique IDs
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
    }));
    setParticles(newParticles);
    particleIdCounter.current = 15;
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

      // Add selection particle effect with unique ID
      const newParticleId = particleIdCounter.current;
      particleIdCounter.current += 1;

      const newParticle = {
        id: newParticleId,
        x: Math.random() * width,
        y: height * 0.7,
      };
      setParticles(prev => [...prev.slice(-50), newParticle]); // Ограничиваем количество частиц

      // Автоматическое удаление частицы через 3 секунды
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
    const successParticles = Array.from({ length: 25 }, (_, i) => {
      const id = particleIdCounter.current + i;
      return {
        id,
        x: width / 2,
        y: height / 2,
      };
    });

    particleIdCounter.current += 25;
    setParticles(prev => [...prev, ...successParticles]);

    // Автоматическое удаление успешных частиц через 2 секунды
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

    // Анимация появления модалки
    Animated.spring(wrongAnswerModalAnim, {
      toValue: 1,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, []);

  const hideWrongAnswerModal = useCallback(() => {
    // Анимация скрытия модалки
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

        {/* Floating Particles with unique keys */}
        {particles.map(particle => (
          <Animated.View
            key={`particle-${particle.id}`} // Используем префикс для уникальности
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
          {/* Premium Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={navigateToMainPage}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <LinearGradient
                colors={
                  theme === 'light'
                    ? [colors.primaryLight, colors.primary]
                    : ['#663DFF', '#8B5CFF']
                }
                style={styles.backGradient}
              >
                <Ionicons name='chevron-back' size={24} color='#FFFFFF' />
                <Text style={styles.backText}>Назад</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.statsContainer}>
              <View
                style={[
                  styles.statCard,
                  {
                    backgroundColor:
                      theme === 'light'
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'rgba(255, 255, 255, 0.1)',
                    borderColor:
                      theme === 'light'
                        ? 'rgba(255, 255, 255, 0.3)'
                        : 'rgba(255, 255, 255, 0.2)',
                  },
                ]}
              >
                <Text style={styles.statValue}>{score}</Text>
                <Text style={styles.statLabel}>ОЧКИ</Text>
              </View>
              <View
                style={[
                  styles.statCard,
                  streak > 0 && styles.streakCard,
                  {
                    backgroundColor:
                      streak > 0
                        ? theme === 'light'
                          ? 'rgba(255, 107, 53, 0.1)'
                          : 'rgba(255, 107, 53, 0.2)'
                        : theme === 'light'
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'rgba(255, 255, 255, 0.1)',
                    borderColor:
                      streak > 0
                        ? theme === 'light'
                          ? 'rgba(255, 107, 53, 0.3)'
                          : 'rgba(255, 107, 53, 0.4)'
                        : theme === 'light'
                        ? 'rgba(255, 255, 255, 0.3)'
                        : 'rgba(255, 255, 255, 0.2)',
                  },
                ]}
              >
                <View style={styles.streakContent}>
                  <Text style={styles.statValue}>{streak}</Text>
                  {streak >= 3 && (
                    <Ionicons name='flame' size={20} color='#FF6B35' />
                  )}
                </View>
                <Text style={styles.statLabel}>СЕРИЯ</Text>
              </View>
            </View>
          </View>

          {/* Main Content Area */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Premium Sentence Card */}
            <Animated.View
              style={[
                styles.sentenceCard,
                {
                  transform: [{ scale: cardScale }],
                },
              ]}
            >
              <LinearGradient
                colors={
                  theme === 'light'
                    ? ['rgba(240, 245, 255, 0.9)', 'rgba(230, 240, 255, 0.95)']
                    : ['rgba(30, 30, 60, 0.9)', 'rgba(20, 20, 40, 0.95)']
                }
                style={styles.sentenceGradient}
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
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Ionicons
                        name='star'
                        size={24}
                        color={theme === 'light' ? colors.primary : '#8B5CFF'}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text style={[styles.englishText, { color: colors.text }]}>
                    {sentence.en}
                  </Text>

                  <View style={styles.statsRow}>
                    <View style={styles.accuracyMeter}>
                      <View
                        style={[
                          styles.accuracyBackground,
                          {
                            backgroundColor:
                              theme === 'light'
                                ? 'rgba(0, 0, 0, 0.1)'
                                : 'rgba(255, 255, 255, 0.1)',
                          },
                        ]}
                      >
                        <View
                          style={[
                            styles.accuracyFill,
                            {
                              width: `${accuracy}%`,
                              backgroundColor:
                                accuracy >= 70
                                  ? '#00D4AA'
                                  : accuracy >= 40
                                  ? '#FFB300'
                                  : '#FF4081',
                            },
                          ]}
                        />
                      </View>
                      <Text
                        style={[
                          styles.accuracyText,
                          {
                            color:
                              theme === 'light'
                                ? 'rgba(0, 0, 0, 0.7)'
                                : 'rgba(255, 255, 255, 0.7)',
                          },
                        ]}
                      >
                        {accuracy}% Точность
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.progressCircle,
                        {
                          backgroundColor:
                            theme === 'light'
                              ? 'rgba(255, 255, 255, 0.2)'
                              : 'rgba(255, 255, 255, 0.1)',
                          borderColor:
                            theme === 'light'
                              ? 'rgba(0, 0, 0, 0.2)'
                              : 'rgba(255, 255, 255, 0.2)',
                        },
                      ]}
                    >
                      <Text
                        style={[styles.progressCount, { color: colors.text }]}
                      >
                        {progress.correct}/{progress.total}
                      </Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </Animated.View>

            {/* Build Area */}
            <View style={styles.buildSection}>
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    color:
                      theme === 'light'
                        ? 'rgba(0, 0, 0, 0.6)'
                        : 'rgba(255, 255, 255, 0.6)',
                  },
                ]}
              >
                Составьте предложение
              </Text>

              <View
                style={[
                  styles.selectedArea,
                  {
                    backgroundColor:
                      theme === 'light'
                        ? 'rgba(0, 0, 0, 0.05)'
                        : 'rgba(255, 255, 255, 0.05)',
                    borderColor:
                      theme === 'light'
                        ? 'rgba(0, 0, 0, 0.1)'
                        : 'rgba(255, 255, 255, 0.1)',
                  },
                ]}
              >
                {selectedWords.length === 0 ? (
                  <View style={styles.placeholder}>
                    <Ionicons
                      name='arrow-down'
                      size={32}
                      color={
                        theme === 'light'
                          ? 'rgba(102, 61, 255, 0.3)'
                          : 'rgba(139, 92, 255, 0.5)'
                      }
                    />
                    <Text
                      style={[
                        styles.placeholderText,
                        {
                          color:
                            theme === 'light'
                              ? 'rgba(0, 0, 0, 0.3)'
                              : 'rgba(255, 255, 255, 0.3)',
                        },
                      ]}
                    >
                      Выберите слова чтобы составить предложение
                    </Text>
                  </View>
                ) : (
                  <View style={styles.selectedWordsRow}>
                    {selectedWords.map((word, index) => (
                      <TouchableOpacity
                        key={`selected-${index}-${word}`}
                        style={styles.selectedWordChip}
                        onPress={() => handleWordDeselect(index)}
                        activeOpacity={0.7}
                      >
                        <LinearGradient
                          colors={
                            theme === 'light'
                              ? ['#667eea', '#764ba2']
                              : ['#663DFF', '#8B5CFF']
                          }
                          style={styles.selectedWordGradient}
                        >
                          <Text style={styles.selectedWordText}>{word}</Text>
                          <Ionicons
                            name='close-circle'
                            size={18}
                            color='#FFFFFF'
                          />
                        </LinearGradient>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {selectedWords.length > 0 && (
                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={[
                      styles.secondaryButton,
                      {
                        backgroundColor:
                          theme === 'light'
                            ? 'rgba(139, 92, 255, 0.05)'
                            : 'rgba(139, 92, 255, 0.1)',
                        borderColor:
                          theme === 'light'
                            ? 'rgba(139, 92, 255, 0.2)'
                            : 'rgba(139, 92, 255, 0.3)',
                      },
                    ]}
                    onPress={clearAnswer}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name='refresh'
                      size={20}
                      color={theme === 'light' ? '#667eea' : '#8B5CFF'}
                    />
                    <Text
                      style={[
                        styles.secondaryText,
                        { color: theme === 'light' ? '#667eea' : '#8B5CFF' },
                      ]}
                    >
                      Очистить
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={checkAnswer}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={
                        theme === 'light'
                          ? ['#00B894', '#00D4AA']
                          : ['#00D4AA', '#00B894']
                      }
                      style={styles.primaryGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Ionicons name='checkmark-done' size={24} color='#000' />
                      <Text style={styles.primaryText}>Проверить</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Words Grid */}
            <View style={styles.wordsSection}>
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    color:
                      theme === 'light'
                        ? 'rgba(0, 0, 0, 0.6)'
                        : 'rgba(255, 255, 255, 0.6)',
                  },
                ]}
              >
                Доступные слова
              </Text>

              <View style={styles.wordsGrid}>
                {possibleWords.map((word, index) => {
                  const isSelected = selectedWords.includes(word);
                  return (
                    <TouchableOpacity
                      key={`word-${index}-${word}`}
                      style={[
                        styles.wordPill,
                        {
                          backgroundColor:
                            theme === 'light'
                              ? isSelected
                                ? 'rgba(102, 61, 255, 0.1)'
                                : 'rgba(255, 255, 255, 0.2)'
                              : isSelected
                              ? 'rgba(102, 61, 255, 0.2)'
                              : 'rgba(255, 255, 255, 0.1)',
                          borderColor:
                            theme === 'light'
                              ? isSelected
                                ? 'rgba(102, 61, 255, 0.3)'
                                : 'rgba(0, 0, 0, 0.2)'
                              : isSelected
                              ? 'rgba(102, 61, 255, 0.5)'
                              : 'rgba(255, 255, 255, 0.2)',
                        },
                      ]}
                      onPress={() => handleWordSelect(word)}
                      disabled={isSelected}
                      activeOpacity={0.6}
                    >
                      <Text
                        style={[
                          styles.wordPillText,
                          {
                            color: isSelected
                              ? theme === 'light'
                                ? 'rgba(102, 61, 255, 0.7)'
                                : 'rgba(255, 255, 255, 0.5)'
                              : colors.text,
                          },
                        ]}
                      >
                        {word}
                      </Text>
                      {isSelected && (
                        <View
                          style={[
                            styles.selectedIndicator,
                            {
                              backgroundColor:
                                theme === 'light'
                                  ? 'rgba(0, 212, 170, 0.2)'
                                  : 'rgba(0, 212, 170, 0.2)',
                            },
                          ]}
                        >
                          <Ionicons
                            name='checkmark'
                            size={16}
                            color='#00D4AA'
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>
        </Animated.View>

        {/* Epic Success Overlay */}
        <Animated.View
          style={[styles.successOverlay, { opacity: successAnim }]}
          pointerEvents='none'
        >
          <LinearGradient
            colors={getSuccessGradientColors()}
            style={styles.successCard}
          >
            <View style={styles.successIcon}>
              <Ionicons name='trophy' size={80} color='#000' />
            </View>
            <Text style={styles.successTitle}>Великолепно!</Text>
            <Text style={styles.successScore}>+10 XP</Text>
            <View style={styles.successStreak}>
              <Ionicons name='flash' size={20} color='#000' />
              <Text style={styles.successStreakText}>Попытка: {streak}</Text>
            </View>
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
                    <Text style={styles.wrongAnswerTitle}>Ответ неверный</Text>
                    <TouchableOpacity
                      style={styles.wrongAnswerClose}
                      onPress={hideWrongAnswerModal}
                      activeOpacity={0.7}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Ionicons name='close' size={28} color='#FFFFFF' />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.wrongAnswerContent}>
                    <Ionicons
                      name='sad-outline'
                      size={60}
                      color='#FFFFFF'
                      style={styles.wrongAnswerIcon}
                    />
                    <Text style={styles.wrongAnswerText}>
                      Ваш ответ: {selectedWords.join(' ')}
                    </Text>
                    <Text style={styles.correctAnswerText}>
                      Правильный ответ: {sentence.ru}
                    </Text>

                    <View style={styles.wrongAnswerHint}>
                      <Ionicons name='bulb-outline' size={24} color='#FFD600' />
                      <Text style={styles.wrongAnswerHintText}>
                        Обратите внимание на порядок слов и грамматические формы
                      </Text>
                    </View>
                  </View>

                  {/* <View style={styles.wrongAnswerButtons}>
                    <TouchableOpacity 
                      style={[styles.wrongAnswerButton, styles.retryButton]}
                      onPress={clearAnswer}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="refresh" size={22} color="#FFFFFF" />
                      <Text style={styles.wrongAnswerButtonText}>Попробовать снова</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.wrongAnswerButton, styles.showAnswerButton]}
                      onPress={() => {
                        hideWrongAnswerModal();
                        setIsAnswerVisible(true);
                      }}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="eye" size={22} color="#FFFFFF" />
                      <Text style={styles.wrongAnswerButtonText}>Посмотреть ответ</Text>
                    </TouchableOpacity>
                  </View> */}
                </LinearGradient>
              </Animated.View>
            </TouchableOpacity>
          </View>
        )}

        {/* Premium Modal для правильного ответа */}
        {isAnswerVisible && (
          <View style={styles.modalOverlay}>
            <TouchableOpacity
              style={styles.modalOverlayTouchable}
              onPress={() => setIsAnswerVisible(false)}
              activeOpacity={1}
            >
              <Animated.View
                style={[
                  styles.modalCard,
                  { transform: [{ scale: cardScale }] },
                ]}
              >
                <LinearGradient
                  colors={
                    theme === 'light'
                      ? [
                          'rgba(240, 245, 255, 0.95)',
                          'rgba(230, 240, 255, 0.98)',
                        ]
                      : ['rgba(30, 30, 60, 0.95)', 'rgba(20, 20, 40, 0.98)']
                  }
                  style={styles.modalGradient}
                >
                  <View style={styles.modalHeader}>
                    <Text style={[styles.modalTitle, { color: colors.text }]}>
                      CORRECT TRANSLATION
                    </Text>
                    <TouchableOpacity
                      style={styles.modalClose}
                      onPress={() => setIsAnswerVisible(false)}
                      activeOpacity={0.7}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Ionicons
                        name='close'
                        size={24}
                        color={theme === 'light' ? colors.primary : '#8B5CFF'}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.modalContent}>
                    <Ionicons
                      name='bulb'
                      size={48}
                      color={theme === 'light' ? colors.primary : '#8B5CFF'}
                    />
                    <Text style={[styles.modalAnswer, { color: colors.text }]}>
                      {sentence.ru}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.modalButton,
                      {
                        backgroundColor:
                          theme === 'light' ? colors.primary : '#8B5CFF',
                      },
                    ]}
                    onPress={() => setIsAnswerVisible(false)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.modalButtonText}>GOT IT</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </Animated.View>
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
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  backButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  backGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
  },
  streakCard: {
    borderWidth: 1.5,
  },
  streakContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 18,
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
  sentenceCard: {
    borderRadius: 28,
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 24,
    shadowColor: '#663DFF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  sentenceGradient: {
    borderRadius: 28,
    overflow: 'hidden',
  },
  cardGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 28,
    borderWidth: 2,
  },
  cardContent: {
    padding: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  tenseBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  tenseName: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
  hintButton: {
    padding: 8,
  },
  englishText: {
    fontSize: 28,
    fontWeight: '300',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 24,
    fontFamily: 'System',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accuracyMeter: {
    flex: 1,
    marginRight: 16,
  },
  accuracyBackground: {
    height: 6,
    borderRadius: 3,
    marginBottom: 6,
    overflow: 'hidden',
  },
  accuracyFill: {
    height: '100%',
    borderRadius: 3,
  },
  accuracyText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  progressCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  progressCount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  buildSection: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 12,
    textAlign: 'center',
  },
  selectedArea: {
    minHeight: 80,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
  },
  selectedWordsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  selectedWordChip: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  selectedWordGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  selectedWordText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 20,
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1,
  },
  secondaryText: {
    fontSize: 15,
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
    gap: 10,
    paddingVertical: 16,
  },
  primaryText: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  wordsSection: {
    marginHorizontal: 24,
    marginBottom: 40,
  },
  wordsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  wordPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
  },
  wordPillText: {
    fontSize: 15,
    fontWeight: '600',
  },
  selectedIndicator: {
    width: 18,
    height: 18,
    borderRadius: 9,
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
    width: '70%',
    padding: 32,
    borderRadius: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 20,
  },
  successIcon: {
    marginBottom: 12,
  },
  successTitle: {
    color: '#000',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  successScore: {
    color: '#000',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  successStreak: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  successStreakText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
  },
  // Wrong Answer Modal Styles
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
    width: '85%',
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#FF4081',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 20,
  },
  wrongAnswerGradient: {
    padding: 24,
  },
  wrongAnswerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  wrongAnswerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  wrongAnswerClose: {
    padding: 4,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  wrongAnswerContent: {
    alignItems: 'center',
    marginBottom: 24,
  },
  wrongAnswerIcon: {
    marginBottom: 20,
  },
  wrongAnswerText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 12,
    borderRadius: 12,
    width: '100%',
  },
  correctAnswerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD600',
    textAlign: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 12,
    borderRadius: 12,
    width: '100%',
  },
  wrongAnswerHint: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 12,
    width: '100%',
    gap: 8,
  },
  wrongAnswerHintText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    flex: 1,
  },
  wrongAnswerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  wrongAnswerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    flex: 1,
  },
  retryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  showAnswerButton: {
    backgroundColor: 'rgba(255, 214, 0, 0.3)',
  },
  wrongAnswerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  // Original modal for correct answer
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
    width: '85%',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#663DFF',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.4,
    shadowRadius: 25,
    elevation: 20,
  },
  modalGradient: {
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  modalClose: {
    padding: 4,
  },
  modalContent: {
    alignItems: 'center',
    marginBottom: 24,
  },
  modalAnswer: {
    fontSize: 22,
    fontWeight: '300',
    textAlign: 'center',
    lineHeight: 30,
    marginTop: 16,
  },
  modalButton: {
    padding: 16,
    borderRadius: 16,
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
