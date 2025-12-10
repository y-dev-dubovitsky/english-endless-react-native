import { useMemo, useCallback, useRef } from 'react';
import { SentenceInterface, TenseInterface } from '../types';

const MOCK_WORDS = [
  "есть", "был", "были", "иметь", "имеет", "имел",
  "делать", "делает", "делал", "буду", "бы", "могу", "мог",
  "должен", "может", "может быть", "должен", "должен", "идти", "шел",
  "увидеть", "увидел", "взять", "взял", "сделать", "сделал", "приходить", "пришел",
  "знать", "знал", "получить", "получил", "дать", "дал", "найти", "нашел",
  "думать", "думал", "сказать", "сказал", "хотеть", "хотел",
  "оставлять", "оставить", "помнить", "забыть", "чувствовать", "чувствовал",
  "разговаривать", "говорить", "работать", "исследовать", "учить", "обучать",
  "покупать", "продавать", "играть", "смотреть", "ждать", "ждал",
  "бить", "встречать", "лететь", "летел", "писать", "написал",
  "кричать", "плакать", "улыбаться", "смеяться", "ходить", "бежать",
  "прыгать", "танцевать", "чистить", "мыть", "звать", "звонил",
  "слышать", "слушать", "смотреть", "наблюдать", "сидеть", "стоял",
  "путешествовать", "жить", "умереть", "помогать", "желать", "выбирать",
  "искать", "лететь", "спрашивать", "отвечать", "пробовать", "регулировать",
  "добавлять", "удалять", "помогать", "заботиться", "равняться", "сравнивать",
  "миновать", "оставлять", "заставлять", "размышлять", "доказывать", "выражать"
];


export const useWordsManager = (sentence: SentenceInterface, tense: TenseInterface | undefined) => {
  const allWordsRef = useRef<string[]>([]);
  const prevSentenceRef = useRef<string>('');
  const prevTenseRef = useRef<string>('');

  // Генерация всех возможных слов с мемоизацией
  const getAllWords = useCallback((): string[] => {
    const sentenceStr = JSON.stringify(sentence);
    const tenseStr = JSON.stringify(tense);
    
    // Если ничего не изменилось, возвращаем кешированный результат
    if (sentenceStr === prevSentenceRef.current && 
        tenseStr === prevTenseRef.current &&
        allWordsRef.current.length > 0) {
      return [...allWordsRef.current];
    }

    if (!tense) {
      const mockWords = [...MOCK_WORDS].sort(() => Math.random() - 0.5);
      allWordsRef.current = mockWords;
      return mockWords;
    }

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

    const allRealWords = [...new Set([
      ...sentenceWords,
      ...allPronouns,
      ...allAuxiliaries,
      ...allVerbs,
    ].filter(word => word && word.trim() !== ""))];

    // Добавляем моковые слова (30-50% от количества реальных слов)
    const mockWordsCount = Math.max(
      3, 
      Math.min(MOCK_WORDS.length, Math.floor(allRealWords.length * 0.4))
    );
    
    const shuffledMockWords = [...MOCK_WORDS]
      .sort(() => Math.random() - 0.5)
      .slice(0, mockWordsCount)
      .filter(word => !allRealWords.includes(word));

    const allWords = [...allRealWords, ...shuffledMockWords]
      .sort(() => Math.random() - 0.5);

    // Сохраняем для кеширования
    allWordsRef.current = allWords;
    prevSentenceRef.current = sentenceStr;
    prevTenseRef.current = tenseStr;

    return allWords;
  }, [sentence, tense]);

  return { getAllWords };
};