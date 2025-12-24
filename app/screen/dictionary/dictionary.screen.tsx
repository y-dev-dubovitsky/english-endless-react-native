import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Animated,
  Dimensions,
  Keyboard,
  Modal,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from '../../contexts/ThemeContext';
import * as SQLite from 'expo-sqlite';

const { width, height } = Dimensions.get('window');

interface Word {
  id: number;
  word: string;
  translation: string;
  transcription?: string;
  example?: string;
  tags?: string[];
  isFavorite: boolean;
  created_at: string;
  category: string;
  difficulty: number;
}

const DictionaryScreen = (): JSX.Element => {
  const { theme, colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [words, setWords] = useState<Word[]>([]);
  const [filteredWords, setFilteredWords] = useState<Word[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [db, setDb] = useState<SQLite.WebSQLDatabase | null>(null);
  const [newWord, setNewWord] = useState({
    word: '',
    translation: '',
    transcription: '',
    example: '',
    tags: [] as string[],
    category: 'common',
    difficulty: 2,
  });
  const [newTag, setNewTag] = useState('');
  
  // Анимации
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const modalSlide = useRef(new Animated.Value(height)).current;
  const modalOpacity = useRef(new Animated.Value(0)).current;
  
  // Категории для выбора
  const categories = [
    { id: 'common', name: 'Общее', icon: 'star', color: '#4ECDC4' },
    { id: 'verbs', name: 'Глаголы', icon: 'flash', color: '#FF6B6B' },
    { id: 'nouns', name: 'Существительные', icon: 'cube', color: '#45B7D1' },
    { id: 'adjectives', name: 'Прилагательные', icon: 'color-palette', color: '#96CEB4' },
    { id: 'phrases', name: 'Фразы', icon: 'chatbubbles', color: '#FECA57' },
    { id: 'business', name: 'Бизнес', icon: 'briefcase', color: '#9B5DE5' },
    { id: 'academic', name: 'Академия', icon: 'school', color: '#00BBF9' },
    { id: 'idioms', name: 'Идиомы', icon: 'bulb', color: '#FF6B6B' },
  ];
  
  // Сложность
  const difficulties = [
    { level: 1, label: 'Начинающий', color: '#06D6A0' },
    { level: 2, label: 'Средний', color: '#FFD166' },
    { level: 3, label: 'Продвинутый', color: '#EF476F' },
  ];

  // Предустановленные сложные слова
  const preloadedWords = [
    {
      word: 'Serendipity',
      translation: 'Счастливая случайность',
      transcription: '/ˌserənˈdɪpəti/',
      example: 'Finding this book was pure serendipity.',
      tags: JSON.stringify(['сложное', 'удача']),
      category: 'nouns',
      difficulty: 3,
      isFavorite: 0,
    },
    {
      word: 'Ephemeral',
      translation: 'Минувший, кратковременный',
      transcription: '/ɪˈfemərəl/',
      example: 'The beauty of cherry blossoms is ephemeral.',
      tags: JSON.stringify(['поэтичное', 'время']),
      category: 'adjectives',
      difficulty: 3,
      isFavorite: 1,
    },
    {
      word: 'Quintessential',
      translation: 'Квинтэссенция, совершенный образец',
      transcription: '/ˌkwɪntɪˈsenʃl/',
      example: 'He is the quintessential English gentleman.',
      tags: JSON.stringify(['абсолютный', 'пример']),
      category: 'adjectives',
      difficulty: 3,
      isFavorite: 0,
    },
    {
      word: 'Melancholy',
      translation: 'Меланхолия, грусть',
      transcription: '/ˈmelənkəli/',
      example: 'A feeling of melancholy hung in the air.',
      tags: JSON.stringify(['эмоции', 'грусть']),
      category: 'nouns',
      difficulty: 2,
      isFavorite: 0,
    },
    {
      word: 'Perspicacious',
      translation: 'Проницательный, прозорливый',
      transcription: '/ˌpɜːspɪˈkeɪʃəs/',
      example: 'Her perspicacious remarks impressed everyone.',
      tags: JSON.stringify(['интеллект', 'наблюдательность']),
      category: 'adjectives',
      difficulty: 3,
      isFavorite: 1,
    },
    {
      word: 'Luminous',
      translation: 'Светящийся, яркий',
      transcription: '/ˈluːmɪnəs/',
      example: 'The luminous moon lit up the night sky.',
      tags: JSON.stringify(['свет', 'яркость']),
      category: 'adjectives',
      difficulty: 2,
      isFavorite: 0,
    },
    {
      word: 'Ineffable',
      translation: 'Невыразимый, неописуемый',
      transcription: '/ɪnˈefəbl/',
      example: 'The beauty of the scene was ineffable.',
      tags: JSON.stringify(['невыразимый', 'эмоции']),
      category: 'adjectives',
      difficulty: 3,
      isFavorite: 0,
    },
    {
      word: 'Solitude',
      translation: 'Уединение, одиночество',
      transcription: '/ˈsɒlətuːd/',
      example: 'She enjoyed the solitude of the mountains.',
      tags: JSON.stringify(['уединение', 'состояние']),
      category: 'nouns',
      difficulty: 2,
      isFavorite: 0,
    },
    {
      word: 'Resilience',
      translation: 'Устойчивость, жизнестойкость',
      transcription: '/rɪˈzɪliəns/',
      example: 'Her resilience in the face of adversity was remarkable.',
      tags: JSON.stringify(['сила', 'психология']),
      category: 'nouns',
      difficulty: 2,
      isFavorite: 1,
    },
    {
      word: 'Ubiquitous',
      translation: 'Вездесущий, повсеместный',
      transcription: '/juːˈbɪkwɪtəs/',
      example: 'Smartphones have become ubiquitous in modern life.',
      tags: JSON.stringify(['распространенность', 'технологии']),
      category: 'adjectives',
      difficulty: 3,
      isFavorite: 0,
    },
  ];

  // Инициализация БД
  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const database = SQLite.openDatabase('dictionary.db');
        setDb(database);
        
        database.transaction(tx => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS words (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              word TEXT NOT NULL,
              translation TEXT NOT NULL,
              transcription TEXT,
              example TEXT,
              tags TEXT,
              isFavorite INTEGER DEFAULT 0,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              category TEXT DEFAULT 'common',
              difficulty INTEGER DEFAULT 2
            )`,
            [],
            () => {
              console.log('Table created successfully');
              
              // Проверяем, есть ли уже слова в БД
              tx.executeSql(
                'SELECT COUNT(*) as count FROM words',
                [],
                (_, { rows }) => {
                  const count = rows.item(0).count;
                  console.log('Words count:', count);
                  
                  if (count === 0) {
                    console.log('Adding preloaded words...');
                    // Добавляем предустановленные слова
                    preloadedWords.forEach((word) => {
                      tx.executeSql(
                        `INSERT INTO words 
                        (word, translation, transcription, example, tags, category, difficulty, isFavorite) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                        [
                          word.word,
                          word.translation,
                          word.transcription,
                          word.example,
                          word.tags,
                          word.category,
                          word.difficulty,
                          word.isFavorite,
                        ],
                        () => {
                          console.log('Added word:', word.word);
                        },
                        (_, error) => {
                          console.error('Error adding word:', word.word, error);
                          return false;
                        }
                      );
                    });
                  }
                  
                  // Загружаем слова после проверки
                  setTimeout(() => {
                    loadWords();
                  }, 100);
                },
                (_, error) => {
                  console.error('Error checking word count:', error);
                  return false;
                }
              );
            },
            (_, error) => {
              console.error('Error creating table:', error);
              return false;
            }
          );
        });
        
        // Анимация появления
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]).start();
      } catch (error) {
        console.error('Error initializing database:', error);
      }
    };

    initializeDatabase();
  }, []);

  // Анимация модального окна
  useEffect(() => {
    if (showAddModal) {
      Animated.parallel([
        Animated.timing(modalSlide, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(modalOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(modalSlide, {
          toValue: height,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(modalOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showAddModal]);

  // Фильтрация слов при поиске
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredWords(words);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = words.filter(word => {
      const wordTags = word.tags || [];
      return (
        word.word.toLowerCase().includes(query) ||
        word.translation.toLowerCase().includes(query) ||
        word.transcription?.toLowerCase().includes(query) ||
        word.example?.toLowerCase().includes(query) ||
        wordTags.some((tag: string) => tag.toLowerCase().includes(query))
      );
    });
    setFilteredWords(filtered);
  }, [searchQuery, words]);

  // Загрузка слов
  const loadWords = () => {
    if (!db) return;
    
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM words ORDER BY isFavorite DESC, difficulty DESC, word ASC',
        [],
        (_, { rows }) => {
          const loadedWords: Word[] = [];
          for (let i = 0; i < rows.length; i++) {
            const item = rows.item(i);
            loadedWords.push({
              ...item,
              tags: item.tags ? JSON.parse(item.tags) : [],
            });
          }
          setWords(loadedWords);
          setFilteredWords(loadedWords);
          console.log('Loaded words:', loadedWords.length);
        },
        (_, error) => {
          console.error('Error loading words:', error);
          return false;
        }
      );
    });
  };

  // Добавление тега
  const addTag = () => {
    if (newTag.trim() && !newWord.tags.includes(newTag.trim())) {
      setNewWord({
        ...newWord,
        tags: [...newWord.tags, newTag.trim()],
      });
      setNewTag('');
    }
  };

  // Удаление тега
  const removeTag = (tagToRemove: string) => {
    setNewWord({
      ...newWord,
      tags: newWord.tags.filter(tag => tag !== tagToRemove),
    });
  };

  // Добавление слова
  const handleAddWord = () => {
    if (!newWord.word.trim() || !newWord.translation.trim()) {
      Alert.alert('Заполните обязательные поля', 'Слово и перевод обязательны');
      return;
    }

    if (!db) return;

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO words (word, translation, transcription, example, tags, category, difficulty) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          newWord.word.trim(),
          newWord.translation.trim(),
          newWord.transcription.trim(),
          newWord.example.trim(),
          JSON.stringify(newWord.tags),
          newWord.category,
          newWord.difficulty,
        ],
        () => {
          // Сброс формы
          setNewWord({
            word: '',
            translation: '',
            transcription: '',
            example: '',
            tags: [],
            category: 'common',
            difficulty: 2,
          });
          setShowAddModal(false);
          loadWords();
          
          Alert.alert('Успех', 'Слово добавлено в словарь');
        },
        (_, error) => {
          console.error('Error adding word:', error);
          Alert.alert('Ошибка', 'Не удалось добавить слово');
          return false;
        }
      );
    });
  };

  // Переключение избранного
  const toggleFavorite = (id: number, currentFavorite: boolean) => {
    if (!db) return;
    
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE words SET isFavorite = ? WHERE id = ?',
        [currentFavorite ? 0 : 1, id],
        () => {
          loadWords();
          if (selectedWord?.id === id) {
            setSelectedWord({
              ...selectedWord,
              isFavorite: currentFavorite ? 0 : 1,
            });
          }
        }
      );
    });
  };

  // Удаление слова
  const handleDeleteWord = (id: number) => {
    Alert.alert(
      'Удалить слово',
      'Вы уверены, что хотите удалить это слово?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: () => {
            if (!db) return;
            
            db.transaction(tx => {
              tx.executeSql(
                'DELETE FROM words WHERE id = ?',
                [id],
                () => {
                  loadWords();
                  if (selectedWord?.id === id) {
                    setShowDetailModal(false);
                    setSelectedWord(null);
                  }
                }
              );
            });
          },
        },
      ]
    );
  };

  // Открытие деталей слова
  const openWordDetails = (word: Word) => {
    setSelectedWord(word);
    setShowDetailModal(true);
  };

  // Получение цвета категории
  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || colors.primary;
  };

  // Получение цвета сложности
  const getDifficultyColor = (level: number) => {
    const difficulty = difficulties.find(d => d.level === level);
    return difficulty?.color || colors.primary;
  };

  // Рендер элемента слова
  const renderWordItem = ({ item }: { item: Word }) => (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <TouchableOpacity
        style={[
          styles.wordItem,
          {
            backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#fff',
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
          }
        ]}
        onPress={() => openWordDetails(item)}
        activeOpacity={0.7}
      >
        <View style={styles.wordHeader}>
          <View style={styles.wordMain}>
            <Text style={[styles.wordText, { color: colors.text }]}>
              {item.word}
            </Text>
            {item.transcription && (
              <Text style={[styles.transcriptionText, { color: colors.textSecondary }]}>
                [{item.transcription}]
              </Text>
            )}
          </View>
          
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(item.id, item.isFavorite === 1)}
          >
            <Ionicons
              name={item.isFavorite ? 'heart' : 'heart-outline'}
              size={22}
              color={item.isFavorite ? '#FF6B6B' : colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
        
        <Text style={[styles.translationText, { color: colors.primary }]}>
          {item.translation}
        </Text>
        
        {item.example && (
          <Text style={[styles.exampleText, { color: colors.textSecondary }]} numberOfLines={2}>
            "{item.example}"
          </Text>
        )}
        
        <View style={styles.wordFooter}>
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) + '20' }]}>
            <Ionicons 
              name={categories.find(c => c.id === item.category)?.icon as any} 
              size={12} 
              color={getCategoryColor(item.category)} 
            />
            <Text style={[styles.categoryText, { color: getCategoryColor(item.category) }]}>
              {categories.find(c => c.id === item.category)?.name}
            </Text>
          </View>
          
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) + '20' }]}>
            <View style={[styles.difficultyDot, { backgroundColor: getDifficultyColor(item.difficulty) }]} />
            <Text style={[styles.difficultyText, { color: getDifficultyColor(item.difficulty) }]}>
              {difficulties.find(d => d.level === item.difficulty)?.label}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      
      {/* Основной контент */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          {/* Хедер */}
          <View style={styles.header}>
            <View>
              <Text style={[styles.title, { color: colors.text }]}>
                Словарь
              </Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                {filteredWords.length} {filteredWords.length === 1 ? 'слово' : 
                 filteredWords.length > 1 && filteredWords.length < 5 ? 'слова' : 'слов'}
              </Text>
            </View>
            
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: colors.primary }]}
              onPress={() => setShowAddModal(true)}
            >
              <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          
          {/* Поиск */}
          <Animated.View
            style={[
              styles.searchContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }
            ]}
          >
            <View style={styles.searchWrapper}>
              <Ionicons 
                name="search" 
                size={20} 
                color={colors.textSecondary} 
                style={styles.searchIcon}
              />
              <TextInput
                style={[
                  styles.searchInput,
                  {
                    backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.03)',
                    color: colors.text,
                  }
                ]}
                placeholder="Поиск слова, перевода или тега..."
                placeholderTextColor={colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCorrect={false}
                autoCapitalize="none"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => setSearchQuery('')}
                >
                  <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>
          
          {/* Список слов */}
          <View style={styles.listContainer}>
            {filteredWords.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons 
                  name={searchQuery ? "search-outline" : "book-outline"} 
                  size={64} 
                  color={colors.textSecondary + '40'} 
                />
                <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                  {searchQuery ? 'Ничего не найдено' : 'Словарь пуст'}
                </Text>
                <Text style={[styles.emptySubtext, { color: colors.textTertiary }]}>
                  {searchQuery ? 'Попробуйте другой запрос' : 'Добавьте первое слово'}
                </Text>
              </View>
            ) : (
              <FlatList
                data={filteredWords}
                renderItem={renderWordItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
              />
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
      
      {/* Модалка добавления слова - Bottom Sheet */}
      <Modal
        visible={showAddModal}
        transparent={true}
        animationType="none"
        onRequestClose={() => setShowAddModal(false)}
      >
        <Animated.View style={[styles.modalOverlay, { opacity: modalOpacity }]}>
          <TouchableOpacity 
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setShowAddModal(false)}
          />
          <Animated.View
            style={[
              styles.modalContent,
              {
                backgroundColor: theme === 'dark' ? colors.background : '#fff',
                transform: [{ translateY: modalSlide }],
                height: height * 0.85,
              }
            ]}
          >
            <KeyboardAvoidingView 
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1 }}
            >
              <View style={styles.modalHeader}>
                <View style={styles.modalHandle} />
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  Новое слово
                </Text>
                <TouchableOpacity
                  onPress={() => setShowAddModal(false)}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={24} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>
              
              <ScrollView 
                style={styles.modalScrollView}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.modalForm}>
                  {/* Обязательные поля */}
                  <View style={styles.formRow}>
                    <View style={styles.formGroup}>
                      <Text style={[styles.label, { color: colors.text }]}>
                        Слово <Text style={{color: '#EF476F'}}>*</Text>
                      </Text>
                      <TextInput
                        style={[
                          styles.formInput,
                          {
                            backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.03)',
                            color: colors.text,
                            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : colors.border,
                          }
                        ]}
                        placeholder="hello"
                        placeholderTextColor={colors.textSecondary}
                        value={newWord.word}
                        onChangeText={(text) => setNewWord({...newWord, word: text})}
                        autoCapitalize="none"
                        autoFocus
                      />
                    </View>
                    
                    <View style={styles.formGroup}>
                      <Text style={[styles.label, { color: colors.text }]}>
                        Перевод <Text style={{color: '#EF476F'}}>*</Text>
                      </Text>
                      <TextInput
                        style={[
                          styles.formInput,
                          {
                            backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.03)',
                            color: colors.text,
                            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : colors.border,
                          }
                        ]}
                        placeholder="привет"
                        placeholderTextColor={colors.textSecondary}
                        value={newWord.translation}
                        onChangeText={(text) => setNewWord({...newWord, translation: text})}
                      />
                    </View>
                  </View>
                  
                  {/* Необязательные поля */}
                  <View style={styles.formGroup}>
                    <Text style={[styles.label, { color: colors.text }]}>Транскрипция (опционально)</Text>
                    <TextInput
                      style={[
                        styles.formInput,
                        {
                          backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.03)',
                          color: colors.text,
                          borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : colors.border,
                        }
                      ]}
                      placeholder="həˈloʊ"
                      placeholderTextColor={colors.textSecondary}
                      value={newWord.transcription}
                      onChangeText={(text) => setNewWord({...newWord, transcription: text})}
                      autoCapitalize="none"
                    />
                  </View>
                  
                  <View style={styles.formGroup}>
                    <Text style={[styles.label, { color: colors.text }]}>Пример использования (опционально)</Text>
                    <TextInput
                      style={[
                        styles.formTextarea,
                        {
                          backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.03)',
                          color: colors.text,
                          borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : colors.border,
                        }
                      ]}
                      placeholder="Hello, how are you?"
                      placeholderTextColor={colors.textSecondary}
                      value={newWord.example}
                      onChangeText={(text) => setNewWord({...newWord, example: text})}
                      multiline
                      numberOfLines={3}
                      textAlignVertical="top"
                    />
                  </View>
                  
                  {/* Теги */}
                  <View style={styles.formGroup}>
                    <Text style={[styles.label, { color: colors.text }]}>Теги (опционально)</Text>
                    <View style={styles.tagInputContainer}>
                      <TextInput
                        style={[
                          styles.tagInput,
                          {
                            backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.03)',
                            color: colors.text,
                            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : colors.border,
                          }
                        ]}
                        placeholder="Добавить тег..."
                        placeholderTextColor={colors.textSecondary}
                        value={newTag}
                        onChangeText={setNewTag}
                        onSubmitEditing={addTag}
                      />
                      <TouchableOpacity
                        style={[styles.tagAddButton, { backgroundColor: colors.primary }]}
                        onPress={addTag}
                      >
                        <Ionicons name="add" size={20} color="#fff" />
                      </TouchableOpacity>
                    </View>
                    
                    {newWord.tags.length > 0 && (
                      <View style={styles.tagsContainer}>
                        {newWord.tags.map((tag, index) => (
                          <View key={index} style={[styles.tagItem, { backgroundColor: colors.primary + '20' }]}>
                            <Text style={[styles.tagText, { color: colors.primary }]}>{tag}</Text>
                            <TouchableOpacity
                              onPress={() => removeTag(tag)}
                              style={styles.tagRemoveButton}
                            >
                              <Ionicons name="close" size={14} color={colors.primary} />
                            </TouchableOpacity>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                  
                  {/* Категория */}
                  <View style={styles.formGroup}>
                    <Text style={[styles.label, { color: colors.text }]}>Категория</Text>
                    <ScrollView 
                      horizontal 
                      showsHorizontalScrollIndicator={false}
                      style={styles.categoriesScroll}
                    >
                      {categories.map((cat) => (
                        <TouchableOpacity
                          key={cat.id}
                          style={[
                            styles.categoryOption,
                            newWord.category === cat.id && styles.categoryOptionActive,
                            newWord.category === cat.id && { borderColor: cat.color }
                          ]}
                          onPress={() => setNewWord({...newWord, category: cat.id})}
                        >
                          <Ionicons 
                            name={cat.icon as any} 
                            size={16} 
                            color={newWord.category === cat.id ? cat.color : colors.textSecondary} 
                          />
                          <Text style={[
                            styles.categoryOptionText,
                            { color: newWord.category === cat.id ? cat.color : colors.textSecondary }
                          ]}>
                            {cat.name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                  
                  {/* Сложность */}
                  <View style={styles.formGroup}>
                    <Text style={[styles.label, { color: colors.text }]}>Сложность</Text>
                    <View style={styles.difficultyContainer}>
                      {difficulties.map((diff) => (
                        <TouchableOpacity
                          key={diff.level}
                          style={[
                            styles.difficultyOption,
                            newWord.difficulty === diff.level && styles.difficultyOptionActive,
                            newWord.difficulty === diff.level && { borderColor: diff.color }
                          ]}
                          onPress={() => setNewWord({...newWord, difficulty: diff.level})}
                        >
                          <View style={[styles.difficultyDotOption, { backgroundColor: diff.color }]} />
                          <Text style={[
                            styles.difficultyOptionText,
                            { color: newWord.difficulty === diff.level ? diff.color : colors.textSecondary }
                          ]}>
                            {diff.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </View>
              </ScrollView>
              
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setShowAddModal(false)}
                >
                  <Text style={[styles.modalButtonText, { color: colors.textSecondary }]}>
                    Отмена
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.modalButton, 
                    styles.saveButton, 
                    { 
                      backgroundColor: colors.primary,
                      opacity: (!newWord.word.trim() || !newWord.translation.trim()) ? 0.5 : 1 
                    }
                  ]}
                  onPress={handleAddWord}
                  disabled={!newWord.word.trim() || !newWord.translation.trim()}
                >
                  <Ionicons name="add-circle" size={20} color="#fff" />
                  <Text style={[styles.modalButtonText, { color: '#fff', marginLeft: 8 }]}>
                    Добавить
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </Animated.View>
        </Animated.View>
      </Modal>
      
      {/* Модалка деталей слова */}
      <Modal
        visible={showDetailModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setShowDetailModal(false);
          setSelectedWord(null);
        }}
      >
        {selectedWord && (
          <View style={styles.detailModalOverlay}>
            <Animated.View
              style={[
                styles.detailModalContent,
                {
                  backgroundColor: theme === 'dark' ? colors.background : '#fff',
                  maxHeight: height * 0.8,
                }
              ]}
            >
              <ScrollView 
                style={styles.detailScrollView}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.detailHeader}>
                  <View style={styles.detailWordInfo}>
                    <Text style={[styles.detailWordText, { color: colors.text }]}>
                      {selectedWord.word}
                    </Text>
                    {selectedWord.transcription && (
                      <Text style={[styles.detailTranscription, { color: colors.textSecondary }]}>
                        [{selectedWord.transcription}]
                      </Text>
                    )}
                  </View>
                  
                  <TouchableOpacity
                    style={styles.detailFavorite}
                    onPress={() => {
                      toggleFavorite(selectedWord.id, selectedWord.isFavorite === 1);
                    }}
                  >
                    <Ionicons
                      name={selectedWord.isFavorite ? 'heart' : 'heart-outline'}
                      size={28}
                      color={selectedWord.isFavorite ? '#FF6B6B' : colors.textSecondary}
                    />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.detailContent}>
                  <View style={styles.detailSection}>
                    <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                      Перевод
                    </Text>
                    <Text style={[styles.detailValue, { color: colors.text }]}>
                      {selectedWord.translation}
                    </Text>
                  </View>
                  
                  {selectedWord.example && (
                    <View style={styles.detailSection}>
                      <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                        Пример использования
                      </Text>
                      <Text style={[styles.detailExample, { color: colors.text }]}>
                        "{selectedWord.example}"
                      </Text>
                    </View>
                  )}
                  
                  {selectedWord.tags && selectedWord.tags.length > 0 && (
                    <View style={styles.detailSection}>
                      <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                        Теги
                      </Text>
                      <View style={styles.detailTags}>
                        {selectedWord.tags.map((tag, index) => (
                          <View key={index} style={[styles.detailTag, { backgroundColor: colors.primary + '20' }]}>
                            <Text style={[styles.detailTagText, { color: colors.primary }]}>{tag}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                  
                  <View style={styles.detailMeta}>
                    <View style={styles.detailSection}>
                      <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                        Категория
                      </Text>
                      <View style={[styles.detailCategory, { backgroundColor: getCategoryColor(selectedWord.category) + '20' }]}>
                        <Ionicons 
                          name={categories.find(c => c.id === selectedWord.category)?.icon as any} 
                          size={14} 
                          color={getCategoryColor(selectedWord.category)} 
                        />
                        <Text style={[styles.detailCategoryText, { color: getCategoryColor(selectedWord.category), marginLeft: 6 }]}>
                          {categories.find(c => c.id === selectedWord.category)?.name}
                        </Text>
                      </View>
                    </View>
                    
                    <View style={styles.detailSection}>
                      <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>
                        Сложность
                      </Text>
                      <View style={[styles.detailDifficulty, { backgroundColor: getDifficultyColor(selectedWord.difficulty) + '20' }]}>
                        <View style={[styles.detailDifficultyDot, { backgroundColor: getDifficultyColor(selectedWord.difficulty) }]} />
                        <Text style={[styles.detailDifficultyText, { color: getDifficultyColor(selectedWord.difficulty), marginLeft: 6 }]}>
                          {difficulties.find(d => d.level === selectedWord.difficulty)?.label}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
              
              <View style={styles.detailFooter}>
                <TouchableOpacity
                  style={[styles.detailButton, styles.deleteButton]}
                  onPress={() => handleDeleteWord(selectedWord.id)}
                >
                  <Ionicons name="trash" size={20} color="#EF476F" />
                  <Text style={[styles.detailButtonText, { color: '#EF476F' }]}>
                    Удалить
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.detailButton, styles.closeDetailButton]}
                  onPress={() => {
                    setShowDetailModal(false);
                    setSelectedWord(null);
                  }}
                >
                  <Text style={[styles.detailButtonText, { color: colors.text }]}>
                    Закрыть
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchWrapper: {
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: 16,
    zIndex: 1,
  },
  searchInput: {
    borderRadius: 16,
    padding: 16,
    paddingLeft: 48,
    fontSize: 16,
    fontWeight: '500',
    height: 56,
  },
  clearButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 1,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 30,
  },
  wordItem: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  wordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  wordMain: {
    flex: 1,
  },
  wordText: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  transcriptionText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  translationText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  exampleText: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 12,
    lineHeight: 20,
  },
  wordFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  difficultyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  favoriteButton: {
    padding: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    alignItems: 'center',
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 2,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    zIndex: 10,
  },
  modalScrollView: {
    paddingHorizontal: 24,
  },
  modalForm: {
    gap: 20,
    paddingBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
  },
  formGroup: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  formInput: {
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    minHeight: 50,
  },
  formTextarea: {
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  tagInputContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tagInput: {
    flex: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    minHeight: 50,
  },
  tagAddButton: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  tagItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tagRemoveButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesScroll: {
    flexDirection: 'row',
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginRight: 8,
    minHeight: 44,
  },
  categoryOptionActive: {
    borderWidth: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  categoryOptionText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  difficultyContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  difficultyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    flex: 1,
  },
  difficultyOptionActive: {
    borderWidth: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  difficultyDotOption: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  difficultyOptionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  cancelButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  saveButton: {
    opacity: 1,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  detailModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  detailModalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  detailScrollView: {
    maxHeight: height * 0.6,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    padding: 24,
    paddingBottom: 0,
  },
  detailWordInfo: {
    flex: 1,
  },
  detailWordText: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
  },
  detailTranscription: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  detailFavorite: {
    padding: 8,
    marginTop: -8,
  },
  detailContent: {
    gap: 20,
    paddingHorizontal: 24,
  },
  detailSection: {
    gap: 8,
  },
  detailMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 20,
    fontWeight: '600',
  },
  detailExample: {
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 24,
  },
  detailTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  detailTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  detailTagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  detailCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  detailCategoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  detailDifficulty: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  detailDifficultyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  detailDifficultyText: {
    fontSize: 14,
    fontWeight: '600',
  },
  detailFooter: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    paddingTop: 20,
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  detailButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  deleteButton: {
    backgroundColor: 'rgba(239, 71, 111, 0.1)',
  },
  closeDetailButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  detailButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DictionaryScreen;