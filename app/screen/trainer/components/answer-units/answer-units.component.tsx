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
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [scaleAnims] = useState<Animated.Value[]>([]);

  // Инициализация анимаций
  useEffect(() => {
    const words = getPossibleAnswerUnitsArray(sentence, tense);
    words.forEach((_, index) => {
      scaleAnims[index] = new Animated.Value(0);
    });
  }, [sentence]);

  const getPossibleAnswerUnitsArray = (
    sentence: SentenceInterface,
    tense: TenseInterface | undefined
  ): Array<string> => {
    if (!tense) return [""];

    const sentenceWords = sentence.ru.split(" ").filter(word => word.trim() !== "");
    
    // Получаем дополнительные слова из всех возможных вариантов
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

    return allWords.sort(() => Math.random() - 0.5); // Перемешиваем слова
  };

  const handleWordPress = (word: string, index: number) => {
    // Анимация нажатия
    Animated.sequence([
      Animated.timing(scaleAnims[index], {
        toValue: 0.8,
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

  const words = getPossibleAnswerUnitsArray(sentence, tense);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Выберите слова:</Text>
      
      <View style={styles.wordsGrid}>
        {words.map((word, index) => {
          // Инициализируем анимацию если нужно
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
                  isUsed && styles.usedWord,
                ]}
                onPress={() => handleWordPress(word, index)}
                disabled={isUsed}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.text,
                  isUsed && styles.usedText
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
        >
          <Text style={styles.clearButtonText}>Сбросить выбор</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
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
    backgroundColor: '#667eea',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 60,
    alignItems: 'center',
  },
  usedWord: {
    backgroundColor: '#E9ECEF',
    shadowOpacity: 0,
    elevation: 0,
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  usedText: {
    color: '#6C757D',
    textDecorationLine: 'line-through',
  },
  clearButton: {
    marginTop: 12,
    padding: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '500',
  },
});

export default AnswerUnitsComponent;