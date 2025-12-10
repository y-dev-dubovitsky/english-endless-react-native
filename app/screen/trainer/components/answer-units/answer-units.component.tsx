import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { SentenceInterface, TenseInterface } from "../../../../types";
import { default as rndRangeNum } from "../../../../utils/randomNumberInRange";
import { useState, useEffect } from "react";
import { useTheme } from '../../../../contexts/ThemeContext'; // Добавляем импорт

const { width } = Dimensions.get('window');

interface AnswerUnitsComponentProps {
  tense: TenseInterface | undefined;
  sentence: SentenceInterface;
  setUserAnswer: React.Dispatch<React.SetStateAction<string>>;
}

const AnswerUnitsComponent: React.FC<AnswerUnitsComponentProps> = ({
  tense,
  sentence,
  setUserAnswer,
}): JSX.Element => {
  const { colors, theme } = useTheme(); // Получаем тему
  
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [scaleAnims] = useState<Animated.Value[]>([]);

  // Инициализация анимаций
  useEffect(() => {
    const words = getPossibleAnswerUnitsArray(sentence, tense);
    words.forEach((_, index) => {
      scaleAnims[index] = new Animated.Value(1); // Изменяем с 0 на 1 для правильной анимации
    });
  }, [sentence]);

  const getPossibleAnswerUnitsArray = (
    sentence: SentenceInterface,
    tense: TenseInterface | undefined
  ): Array<string> => {
    if (!tense) return [""];

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

    const allWords = [...new Set([
      ...sentenceWords,
      ...allPronouns,
      ...allAuxiliaries,
      ...allVerbs,
    ].filter(word => word && word.trim() !== ""))];

    return allWords.sort(() => Math.random() - 0.5);
  };

  const handleWordPress = (word: string, index: number) => {
    // Анимация нажатия
    Animated.sequence([
      Animated.timing(scaleAnims[index], {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnims[index], {
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
  };

  const getShadowStyle = () => {
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
  };

  const getContainerShadowStyle = () => {
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
  };

  const words = getPossibleAnswerUnitsArray(sentence, tense);

  return (
    <View style={[
      styles.container,
      { backgroundColor: colors.backgroundSecondary },
      getContainerShadowStyle()
    ]}>
      <Text style={[styles.title, { color: colors.text }]}>Выберите слова:</Text>
      
      <View style={styles.wordsGrid}>
        {words.map((word, index) => {
          if (!scaleAnims[index]) {
            scaleAnims[index] = new Animated.Value(1);
          }

          const isUsed = usedWords.includes(word);
          
          return (
            <Animated.View
              key={`${word}-${index}`}
              style={[
                styles.wordWrapper,
                { transform: [{ scale: scaleAnims[index] }] }
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.answerUnit,
                  getShadowStyle(),
                  { backgroundColor: colors.primary },
                  isUsed && { 
                    backgroundColor: theme === 'light' ? '#E9ECEF' : 'rgba(255, 255, 255, 0.1)'
                  },
                ]}
                onPress={() => handleWordPress(word, index)}
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
          onPress={() => setUsedWords([])}
          activeOpacity={0.7}
        >
          <Text style={[styles.clearButtonText, { color: colors.primary }]}>Сбросить выбор</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

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
  wordWrapper: {
    // Обертка для анимации
  },
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