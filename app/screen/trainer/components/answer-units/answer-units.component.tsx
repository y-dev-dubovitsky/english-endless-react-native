import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { SentenceInterface, TenseInterface } from "../../../../types";
import { memo, useMemo, useCallback, useState, useRef, useEffect } from "react";
import { useTheme } from '../../../../contexts/ThemeContext';
import { useWordsManager } from '../../../../hooks/useWordsManager';

const { width } = Dimensions.get('window');

interface AnswerUnitsComponentProps {
  tense: TenseInterface | undefined;
  sentence: SentenceInterface;
  setUserAnswer: React.Dispatch<React.SetStateAction<string>>;
}

const AnswerUnitsComponent: React.FC<AnswerUnitsComponentProps> = memo(({
  tense,
  sentence,
  setUserAnswer,
}): JSX.Element => {
  const { colors, theme } = useTheme();
  const { getAllWords } = useWordsManager(sentence, tense);
  
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const scaleAnimsRef = useRef<Map<string, Animated.Value>>(new Map());
  const allWords = useMemo(() => getAllWords(), [getAllWords]);

  // Инициализация анимаций
  useEffect(() => {
    allWords.forEach(word => {
      if (!scaleAnimsRef.current.has(word)) {
        scaleAnimsRef.current.set(word, new Animated.Value(1));
      }
    });
  }, [allWords]);

  const handleWordPress = useCallback((word: string) => {
    const anim = scaleAnimsRef.current.get(word);
    if (!anim) return;

    Animated.sequence([
      Animated.timing(anim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setUserAnswer((prev) => {
      const newAnswer = prev ? `${prev} ${word}` : word;
      return newAnswer;
    });

    setUsedWords(prev => [...prev, word]);
  }, [setUserAnswer]);

  const getShadowStyle = useCallback(() => {
    if (theme === 'light') {
      return {
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
      };
    } else {
      return {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
      };
    }
  }, [theme]);

  const getContainerShadowStyle = useCallback(() => {
    if (theme === 'light') {
      return {
        shadowColor: 'rgba(0, 0, 0, 0.08)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
      };
    } else {
      return {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 10,
      };
    }
  }, [theme]);

  const handleClearSelection = useCallback(() => {
    setUsedWords([]);
    setUserAnswer('');
  }, [setUserAnswer]);

  const containerShadowStyle = useMemo(() => getContainerShadowStyle(), [getContainerShadowStyle]);
  const shadowStyle = useMemo(() => getShadowStyle(), [getShadowStyle]);

  return (
    <View style={[
      styles.container,
      { backgroundColor: colors.backgroundSecondary },
      containerShadowStyle
    ]}>
      <Text style={[styles.title, { color: colors.text }]}>Выберите слова:</Text>
      
      <View style={styles.wordsGrid}>
        {allWords.map((word, index) => {
          const anim = scaleAnimsRef.current.get(word) || new Animated.Value(1);
          const isUsed = usedWords.includes(word);
          
          return (
            <Animated.View
              key={`${word}-${index}`}
              style={[
                styles.wordWrapper,
                { transform: [{ scale: anim }] }
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.answerUnit,
                  shadowStyle,
                  { backgroundColor: colors.primary },
                  isUsed && { 
                    backgroundColor: theme === 'light' ? '#E9ECEF' : 'rgba(255, 255, 255, 0.1)'
                  },
                ]}
                onPress={() => handleWordPress(word)}
                disabled={isUsed}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.text,
                  { color: colors.white },
                  isUsed && { 
                    color: theme === 'light' ? '#6C757D' : 'rgba(255, 255, 255, 0.5)',
                    textDecorationLine: 'line-through'
                  }
                ]}>
                  {word}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>

      {usedWords.length > 0 && (
        <TouchableOpacity 
          style={styles.clearButton}
          onPress={handleClearSelection}
          activeOpacity={0.7}
        >
          <Text style={[styles.clearButtonText, { color: colors.primary }]}>Сбросить выбор</Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

AnswerUnitsComponent.displayName = 'AnswerUnitsComponent';

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  wordsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 8,
  },
  wordWrapper: {},
  answerUnit: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    minWidth: 60,
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
  },
  clearButton: {
    marginTop: 12,
    padding: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default AnswerUnitsComponent;