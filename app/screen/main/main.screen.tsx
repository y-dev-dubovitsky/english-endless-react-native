// import React, { useState } from 'react';
// import { 
//   StyleSheet, 
//   Text, 
//   View, 
//   ScrollView, 
//   TouchableOpacity,
//   Dimensions,
//   Animated,
//   Platform
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { LinearGradient } from 'expo-linear-gradient';
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { useTheme } from '../../contexts/ThemeContext';

// const { width } = Dimensions.get('window');

// // Интерфейс для данных дня
// interface DayData {
//   date: Date;
//   dayOfMonth: number;
//   dayOfWeek: string;
//   isToday: boolean;
//   isSelected: boolean;
//   completedTasks: number;
//   totalTasks: number;
//   accuracy: number;
//   studiedTime: number; // в минутах
// }

// const MainScreen = ({ navigation }: any): JSX.Element => {
//   const { colors, theme } = useTheme();
//   const [selectedDay, setSelectedDay] = useState<number>(0); // Индекс выбранного дня (0 - сегодня)

//   // Анимация появления карточек
//   const fadeAnim = React.useRef(new Animated.Value(0)).current;

//   React.useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 600,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   // Генерация данных для 7 дней (3 дня назад, сегодня, 3 дня вперед)
//   const generateWeekData = (): DayData[] => {
//     const today = new Date();
//     const days: DayData[] = [];
    
//     for (let i = -3; i <= 3; i++) {
//       const date = new Date(today);
//       date.setDate(today.getDate() + i);
      
//       // Генерация случайных данных для демонстрации
//       const totalTasks = 8;
//       const completedTasks = i >= 0 ? Math.floor(Math.random() * (totalTasks + 1)) : totalTasks;
//       const accuracy = completedTasks > 0 ? Math.floor(Math.random() * 20) + 80 : 0;
//       const studiedTime = completedTasks > 0 ? Math.floor(Math.random() * 60) + 30 : 0;
      
//       days.push({
//         date,
//         dayOfMonth: date.getDate(),
//         dayOfWeek: getDayOfWeekShort(date.getDay()),
//         isToday: i === 0,
//         isSelected: i === selectedDay,
//         completedTasks,
//         totalTasks,
//         accuracy,
//         studiedTime
//       });
//     }
    
//     return days;
//   };

//   const getDayOfWeekShort = (dayIndex: number): string => {
//     const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
//     return days[dayIndex];
//   };

//   const weekData = generateWeekData();
//   const selectedDayData = weekData[selectedDay + 3]; // +3 потому что начинаем с -3

//   // Стили в зависимости от темы
//   const getCardStyle = () => {
//     return {
//       backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 1)',
//       borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
//     };
//   };

//   const getShadowStyle = () => {
//     return theme === 'dark' 
//       ? {
//           shadowColor: '#000',
//           shadowOffset: { width: 0, height: 4 },
//           shadowOpacity: 0.3,
//           shadowRadius: 8,
//           elevation: 5,
//         }
//       : {
//           shadowColor: colors.primary,
//           shadowOffset: { width: 0, height: 2 },
//           shadowOpacity: 0.1,
//           shadowRadius: 8,
//           elevation: 3,
//         };
//   };

//   const handleDayPress = (index: number) => {
//     setSelectedDay(index);
//   };

//   // Форматирование времени изучения
//   const formatStudyTime = (minutes: number): string => {
//     if (minutes < 60) {
//       return `${minutes} мин`;
//     }
//     const hours = Math.floor(minutes / 60);
//     const remainingMinutes = minutes % 60;
//     return remainingMinutes > 0 
//       ? `${hours}ч ${remainingMinutes}мин` 
//       : `${hours}ч`;
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
//       <ScrollView 
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         {/* Упрощенный хедер без аватарки */}
//         <View style={styles.header}>
//           <View style={styles.greetingContainer}>
//             <Text style={[styles.greeting, { color: colors.text }]}>
//               Добро пожаловать
//             </Text>
//             <Text style={[styles.subGreeting, { color: colors.textSecondary }]}>
//               Продолжайте изучение английской грамматики
//             </Text>
//           </View>
//         </View>

//         <Animated.View style={{ opacity: fadeAnim }}>
//           {/* Основная карточка - Недельный календарь */}
//           <View style={[styles.mainCard, getCardStyle(), getShadowStyle()]}>
//             <View style={styles.mainCardHeader}>
//               <View style={[styles.mainCardIcon, { backgroundColor: colors.primary + '15' }]}>
//                 <Ionicons name="calendar" size={24} color={colors.primary} />
//               </View>
//               <Text style={[styles.mainCardTitle, { color: colors.text }]}>
//                 Статистика за день
//               </Text>
//             </View>
            
//             {/* Календарь на 7 дней */}
//             <View style={styles.calendarContainer}>
//               {weekData.map((day, index) => {
//                 const dayIndex = index - 3; // Преобразуем обратно к индексу от -3 до 3
//                 const progress = day.totalTasks > 0 
//                   ? (day.completedTasks / day.totalTasks) * 100 
//                   : 0;
                
//                 return (
//                   <TouchableOpacity
//                     key={index}
//                     style={[
//                       styles.dayCard,
//                       day.isSelected && [styles.selectedDayCard, { 
//                         backgroundColor: colors.primary + '15',
//                         borderColor: colors.primary 
//                       }],
//                       day.isToday && !day.isSelected && [styles.todayCard, { 
//                         borderColor: colors.primary 
//                       }]
//                     ]}
//                     onPress={() => handleDayPress(dayIndex)}
//                     activeOpacity={0.7}
//                   >
//                     <Text style={[
//                       styles.dayOfWeekText, 
//                       { color: colors.textSecondary },
//                       day.isSelected && { color: colors.primary, fontWeight: '600' }
//                     ]}>
//                       {day.dayOfWeek}
//                     </Text>
                    
//                     <View style={[
//                       styles.dayNumberContainer,
//                       day.isToday && [styles.todayNumberContainer, { backgroundColor: colors.primary }]
//                     ]}>
//                       <Text style={[
//                         styles.dayNumberText,
//                         day.isToday && { color: '#fff' },
//                         day.isSelected && !day.isToday && { color: colors.primary, fontWeight: '700' }
//                       ]}>
//                         {day.dayOfMonth}
//                       </Text>
//                     </View>
                    
//                     {/* Индикатор прогресса */}
//                     <View style={styles.dayProgressContainer}>
//                       <View style={[styles.dayProgressBar, { 
//                         backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' 
//                       }]}>
//                         <LinearGradient
//                           colors={progress > 0 ? [colors.primary, colors.primaryLight || colors.primary] : ['transparent', 'transparent']}
//                           style={[styles.dayProgressFill, { width: `${progress}%` }]}
//                           start={{ x: 0, y: 0 }}
//                           end={{ x: 1, y: 0 }}
//                         />
//                       </View>
//                       <Text style={[
//                         styles.dayProgressText, 
//                         { color: colors.textSecondary },
//                         day.completedTasks === day.totalTasks && { color: colors.primary, fontWeight: '600' }
//                       ]}>
//                         {day.completedTasks}/{day.totalTasks}
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 );
//               })}
//             </View>

//             {/* Статистика за выбранный день */}
//             <View style={styles.dayStatsContainer}>
//               <View style={styles.dayStatsHeader}>
//                 <Text style={[styles.dayStatsTitle, { color: colors.text }]}>
//                   {selectedDayData.isToday ? 'Сегодня' : 
//                    selectedDayData.dayOfWeek === 'ВС' || selectedDayData.dayOfWeek === 'СБ' ? 
//                    `Выходной, ${selectedDayData.dayOfMonth}` : 
//                    `${selectedDayData.dayOfWeek}, ${selectedDayData.dayOfMonth}`}
//                 </Text>
//               </View>
              
//               <View style={styles.dayStatsGrid}>
//                 <View style={styles.dayStatItem}>
//                   <Text style={[styles.dayStatNumber, { color: colors.text }]}>
//                     {selectedDayData.completedTasks}
//                   </Text>
//                   <Text style={[styles.dayStatLabel, { color: colors.textSecondary }]}>
//                     задач выполнено
//                   </Text>
//                 </View>
                
//                 <View style={styles.dayStatDivider} />
                
//                 <View style={styles.dayStatItem}>
//                   <Text style={[styles.dayStatNumber, { color: colors.text }]}>
//                     {selectedDayData.accuracy}%
//                   </Text>
//                   <Text style={[styles.dayStatLabel, { color: colors.textSecondary }]}>
//                     точность
//                   </Text>
//                 </View>
                
//                 <View style={styles.dayStatDivider} />
                
//                 <View style={styles.dayStatItem}>
//                   <Text style={[styles.dayStatNumber, { color: colors.text }]}>
//                     {formatStudyTime(selectedDayData.studiedTime)}
//                   </Text>
//                   <Text style={[styles.dayStatLabel, { color: colors.textSecondary }]}>
//                     время изучения
//                   </Text>
//                 </View>
//               </View>
              
//               {/* Прогресс бар выбранного дня */}
//               <View style={styles.selectedDayProgress}>
//                 <View style={styles.progressHeader}>
//                   <Text style={[styles.progressLabel, { color: colors.text }]}>
//                     Прогресс дня
//                   </Text>
//                   <Text style={[styles.progressPercentage, { color: colors.primary }]}>
//                     {Math.round((selectedDayData.completedTasks / selectedDayData.totalTasks) * 100)}%
//                   </Text>
//                 </View>
//                 <View style={styles.progressBar}>
//                   <LinearGradient
//                     colors={[colors.primary, colors.primaryLight || colors.primary]}
//                     style={[
//                       styles.progressFill, 
//                       { width: `${(selectedDayData.completedTasks / selectedDayData.totalTasks) * 100}%` }
//                     ]}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 0 }}
//                   />
//                 </View>
//               </View>
//             </View>
//           </View>

//           {/* Новый блок: Быстрый доступ */}
//           <View style={styles.quickAccessHeader}>
//             <Text style={[styles.quickAccessTitle, { color: colors.text }]}>
//               Быстрый доступ
//             </Text>
//             <Text style={[styles.quickAccessSubtitle, { color: colors.primary }]}>
//               Ваши инструменты для обучения
//             </Text>
//           </View>

//           {/* Две колонки с карточками */}
//           <View style={styles.columnsContainer}>
//             {/* Левая колонка */}
//             <View style={styles.column}>
//               {/* Карточка со статистикой */}
//               <TouchableOpacity 
//                 style={[styles.smallCard, getCardStyle(), getShadowStyle()]}
//                 activeOpacity={0.9}
//               >
//                 <View style={styles.smallCardHeader}>
//                   <View style={[styles.smallCardIcon, { backgroundColor: colors.secondary + '15' }]}>
//                     <Ionicons name="stats-chart" size={20} color={colors.secondary || colors.accent} />
//                   </View>
//                   <Text style={[styles.smallCardTitle, { color: colors.text }]}>
//                     Статистика
//                   </Text>
//                 </View>
//                 <View style={styles.smallCardContent}>
//                   <View style={styles.miniStat}>
//                     <Text style={[styles.miniStatNumber, { color: colors.text }]}>48</Text>
//                     <Text style={[styles.miniStatLabel, { color: colors.textSecondary }]}>уроков</Text>
//                   </View>
//                   <View style={styles.miniStat}>
//                     <Text style={[styles.miniStatNumber, { color: colors.text }]}>24ч</Text>
//                     <Text style={[styles.miniStatLabel, { color: colors.textSecondary }]}>практики</Text>
//                   </View>
//                 </View>
//                 <View style={[styles.smallCardFooter, { borderTopColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }]}>
//                   <Text style={[styles.footerText, { color: colors.primary }]}>
//                     Посмотреть подробнее →
//                   </Text>
//                 </View>
//               </TouchableOpacity>

//               {/* Карточка со словарем */}
//               <TouchableOpacity 
//                 style={[styles.smallCard, getCardStyle(), getShadowStyle()]}
//                 activeOpacity={0.9}
//               >
//                 <View style={styles.smallCardHeader}>
//                   <View style={[styles.smallCardIcon, { backgroundColor: '#8B5CF6' + '15' }]}>
//                     <Ionicons name="book" size={20} color="#8B5CF6" />
//                   </View>
//                   <Text style={[styles.smallCardTitle, { color: colors.text }]}>
//                     Словарь
//                   </Text>
//                 </View>
//                 <View style={styles.smallCardContent}>
//                   <View style={styles.dictStats}>
//                     <View style={styles.dictStat}>
//                       <Text style={[styles.dictNumber, { color: colors.text }]}>247</Text>
//                       <Text style={[styles.dictLabel, { color: colors.textSecondary }]}>слов изучено</Text>
//                     </View>
//                     <View style={styles.dictStat}>
//                       <Text style={[styles.dictNumber, { color: colors.text }]}>+12</Text>
//                       <Text style={[styles.dictLabel, { color: colors.textSecondary }]}>за неделю</Text>
//                     </View>
//                   </View>
//                 </View>
//                 <View style={[styles.smallCardFooter, { borderTopColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }]}>
//                   <Text style={[styles.footerText, { color: colors.primary }]}>
//                     Добавить новые слова
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             </View>

//             {/* Правая колонка */}
//             <View style={styles.column}>
//               {/* Карточка с временами */}
//               <TouchableOpacity 
//                 style={[styles.smallCard, getCardStyle(), getShadowStyle()]}
//                 activeOpacity={0.9}
//               >
//                 <View style={styles.smallCardHeader}>
//                   <View style={[styles.smallCardIcon, { backgroundColor: colors.primary + '15' }]}>
//                     <Ionicons name="time" size={20} color={colors.primary} />
//                   </View>
//                   <Text style={[styles.smallCardTitle, { color: colors.text }]}>
//                     Все времена
//                   </Text>
//                 </View>
//                 <View style={styles.smallCardContent}>
//                   <View style={styles.timeProgress}>
//                     <View style={styles.timeProgressRow}>
//                       <Text style={[styles.timeLabel, { color: colors.textSecondary }]}>
//                         Изучено
//                       </Text>
//                       <Text style={[styles.timeValue, { color: colors.text }]}>
//                         9/12
//                       </Text>
//                     </View>
//                     <View style={styles.progressBarSmall}>
//                       <LinearGradient
//                         colors={[colors.primary, colors.primaryLight || colors.primary]}
//                         style={[styles.progressFillSmall, { width: '75%' }]}
//                         start={{ x: 0, y: 0 }}
//                         end={{ x: 1, y: 0 }}
//                       />
//                     </View>
//                   </View>
//                 </View>
//                 <View style={[styles.smallCardFooter, { borderTopColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }]}>
//                   <Text style={[styles.footerText, { color: colors.primary }]}>
//                     Продолжить изучение
//                   </Text>
//                 </View>
//               </TouchableOpacity>

//               {/* Карточка с любимыми временами */}
//               <TouchableOpacity 
//                 style={[styles.smallCard, getCardStyle(), getShadowStyle()]}
//                 activeOpacity={0.9}
//               >
//                 <View style={styles.smallCardHeader}>
//                   <View style={[styles.smallCardIcon, { backgroundColor: colors.accent + '15' }]}>
//                     <Ionicons name="heart" size={20} color={colors.accent} />
//                   </View>
//                   <Text style={[styles.smallCardTitle, { color: colors.text }]}>
//                     Любимые времена
//                   </Text>
//                 </View>
//                 <View style={styles.smallCardContent}>
//                   <View style={styles.timeTagContainer}>
//                     <View style={[styles.timeTag, { backgroundColor: colors.primary + '20' }]}>
//                       <Text style={[styles.timeTagText, { color: colors.primary }]}>
//                         Present Simple
//                       </Text>
//                     </View>
//                     <View style={[styles.timeTag, { backgroundColor: colors.secondary + '20' }]}>
//                       <Text style={[styles.timeTagText, { color: colors.secondary || colors.accent }]}>
//                         Future Perfect
//                       </Text>
//                     </View>
//                   </View>
//                 </View>
//                 <View style={[styles.smallCardFooter, { borderTopColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }]}>
//                   <Text style={[styles.footerText, { color: colors.primary }]}>
//                     Топ-2 времени
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Animated.View>

//         {/* Отступ внизу */}
//         <View style={styles.bottomSpacer} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollContent: {
//     flexGrow: 1,
//     paddingHorizontal: 20,
//     paddingTop: Platform.OS === 'ios' ? 20 : 40,
//     paddingBottom: 40,
//   },
//   header: {
//     marginBottom: 32,
//   },
//   greetingContainer: {
//     alignItems: 'flex-start',
//   },
//   greeting: {
//     fontSize: 28,
//     fontWeight: '700',
//     letterSpacing: -0.5,
//     marginBottom: 8,
//   },
//   subGreeting: {
//     fontSize: 16,
//     fontWeight: '400',
//     opacity: 0.7,
//   },
//   quickAccessHeader: {
//     marginBottom: 16,
//     paddingHorizontal: 4,
//   },
//   quickAccessTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     marginBottom: 4,
//   },
//   quickAccessSubtitle: {
//     fontSize: 15,
//     fontWeight: '500',
//   },
//   mainCard: {
//     borderRadius: 20,
//     padding: 24,
//     marginBottom: 24,
//     borderWidth: 1,
//   },
//   mainCardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   mainCardIcon: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   mainCardTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     flex: 1,
//   },
//   calendarContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 24,
//   },
//   dayCard: {
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 8,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: 'transparent',
//     flex: 1,
//     marginHorizontal: 2,
//   },
//   selectedDayCard: {
//     borderWidth: 1,
//   },
//   todayCard: {
//     borderWidth: 1,
//   },
//   dayOfWeekText: {
//     fontSize: 12,
//     fontWeight: '500',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   dayNumberContainer: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   todayNumberContainer: {
//     backgroundColor: '#007AFF',
//   },
//   dayNumberText: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   dayProgressContainer: {
//     alignItems: 'center',
//     width: '100%',
//   },
//   dayProgressBar: {
//     width: '100%',
//     height: 4,
//     borderRadius: 2,
//     overflow: 'hidden',
//     marginBottom: 4,
//   },
//   dayProgressFill: {
//     height: '100%',
//     borderRadius: 2,
//   },
//   dayProgressText: {
//     fontSize: 10,
//     fontWeight: '500',
//   },
//   dayStatsContainer: {
//     borderRadius: 16,
//     padding: 20,
//     backgroundColor: 'rgba(0,0,0,0.02)',
//   },
//   dayStatsHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   dayStatsTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     flex: 1,
//   },
//   // Удалены стили dayStatusBadge и dayStatusText, так как этот элемент больше не используется
//   dayStatsGrid: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   dayStatItem: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   dayStatNumber: {
//     fontSize: 24,
//     fontWeight: '700',
//     marginBottom: 4,
//   },
//   dayStatLabel: {
//     fontSize: 12,
//     fontWeight: '500',
//     opacity: 0.8,
//     textAlign: 'center',
//   },
//   dayStatDivider: {
//     width: 1,
//     height: 40,
//     backgroundColor: 'rgba(0, 0, 0, 0.1)',
//   },
//   selectedDayProgress: {
//     marginTop: 8,
//   },
//   progressHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   progressLabel: {
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   progressPercentage: {
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   progressBar: {
//     height: 8,
//     backgroundColor: 'rgba(0, 0, 0, 0.05)',
//     borderRadius: 4,
//     overflow: 'hidden',
//   },
//   progressFill: {
//     height: '100%',
//     borderRadius: 4,
//   },
//   columnsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 0,
//   },
//   column: {
//     flex: 1,
//     marginHorizontal: 6,
//   },
//   smallCard: {
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 16,
//     borderWidth: 1,
//   },
//   smallCardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   smallCardIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   smallCardTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     flex: 1,
//   },
//   smallCardContent: {
//     minHeight: 60,
//   },
//   smallCardFooter: {
//     paddingTop: 16,
//     borderTopWidth: 1,
//   },
//   footerText: {
//     fontSize: 13,
//     fontWeight: '600',
//   },
//   miniStat: {
//     flexDirection: 'row',
//     alignItems: 'baseline',
//     marginBottom: 8,
//   },
//   miniStatNumber: {
//     fontSize: 24,
//     fontWeight: '700',
//     marginRight: 6,
//   },
//   miniStatLabel: {
//     fontSize: 13,
//     fontWeight: '500',
//     opacity: 0.8,
//   },
//   timeTagContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//   },
//   timeTag: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 12,
//   },
//   timeTagText: {
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   timeProgress: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   timeProgressRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   timeLabel: {
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   timeValue: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   progressBarSmall: {
//     height: 6,
//     backgroundColor: 'rgba(0, 0, 0, 0.05)',
//     borderRadius: 3,
//     overflow: 'hidden',
//   },
//   progressFillSmall: {
//     height: '100%',
//     borderRadius: 3,
//   },
//   dictStats: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   dictStat: {
//     alignItems: 'flex-start',
//   },
//   dictNumber: {
//     fontSize: 24,
//     fontWeight: '700',
//     marginBottom: 2,
//   },
//   dictLabel: {
//     fontSize: 12,
//     fontWeight: '500',
//     opacity: 0.8,
//   },
//   bottomSpacer: {
//     height: 20,
//   },
// });

// export default MainScreen;


import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  Animated,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from '../../contexts/ThemeContext';

const { width } = Dimensions.get('window');

// Интерфейс для данных дня
interface DayData {
  date: Date;
  dayOfMonth: number;
  dayOfWeek: string;
  isToday: boolean;
  isSelected: boolean;
  completedTasks: number;
  totalTasks: number;
  accuracy: number;
  studiedTime: number; // в минутах
}

const MainScreen = ({ navigation }: any): JSX.Element => {
  const { colors, theme } = useTheme();
  const [selectedDay, setSelectedDay] = useState<number>(0); // Индекс выбранного дня (0 - сегодня)

  // Анимация появления карточек
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  // Генерация данных для 7 дней (3 дня назад, сегодня, 3 дня вперед)
  const generateWeekData = (): DayData[] => {
    const today = new Date();
    const days: DayData[] = [];
    
    for (let i = -3; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Генерация случайных данных для демонстрации
      const totalTasks = 8;
      const completedTasks = i >= 0 ? Math.floor(Math.random() * (totalTasks + 1)) : totalTasks;
      const accuracy = completedTasks > 0 ? Math.floor(Math.random() * 20) + 80 : 0;
      const studiedTime = completedTasks > 0 ? Math.floor(Math.random() * 60) + 30 : 0;
      
      days.push({
        date,
        dayOfMonth: date.getDate(),
        dayOfWeek: getDayOfWeekShort(date.getDay()),
        isToday: i === 0,
        isSelected: i === selectedDay,
        completedTasks,
        totalTasks,
        accuracy,
        studiedTime
      });
    }
    
    return days;
  };

  const getDayOfWeekShort = (dayIndex: number): string => {
    const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    return days[dayIndex];
  };

  const weekData = generateWeekData();
  const selectedDayData = weekData[selectedDay + 3]; // +3 потому что начинаем с -3

  // Стили в зависимости от темы
  const getCardStyle = () => {
    return {
      backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 1)',
      borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
    };
  };

  const getShadowStyle = () => {
    return theme === 'dark' 
      ? {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 5,
        }
      : {
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
        };
  };

  const handleDayPress = (index: number) => {
    setSelectedDay(index);
  };

  // Форматирование времени изучения
  const formatStudyTime = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} мин`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 
      ? `${hours}ч ${remainingMinutes}мин` 
      : `${hours}ч`;
  };

  // Навигация к экранам
  const navigateToDictionary = () => {
    navigation.navigate('Dictionary');
  };

  const navigateToStats = () => {
    navigation.navigate('Statistics');
  };

  const navigateToTenses = () => {
    navigation.navigate('Tenses');
  };

  const navigateToPractice = () => {
    navigation.navigate('Practice');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Упрощенный хедер без аватарки */}
        <View style={styles.header}>
          <View style={styles.greetingContainer}>
            <Text style={[styles.greeting, { color: colors.text }]}>
              Добро пожаловать
            </Text>
            <Text style={[styles.subGreeting, { color: colors.textSecondary }]}>
              Продолжайте изучение английской грамматики
            </Text>
          </View>
        </View>

        <Animated.View style={{ opacity: fadeAnim }}>
          {/* БЛОК 1: Календарь */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              📅 Календарь
            </Text>
            <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
              Выберите день для просмотра статистики
            </Text>
          </View>

          <View style={[styles.calendarCard, getCardStyle(), getShadowStyle()]}>
            <View style={styles.calendarContainer}>
              {weekData.map((day, index) => {
                const dayIndex = index - 3; // Преобразуем обратно к индексу от -3 до 3
                const progress = day.totalTasks > 0 
                  ? (day.completedTasks / day.totalTasks) * 100 
                  : 0;
                
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dayCard,
                      day.isSelected && [styles.selectedDayCard, { 
                        backgroundColor: colors.primary + '15',
                        borderColor: colors.primary 
                      }],
                      day.isToday && !day.isSelected && [styles.todayCard, { 
                        borderColor: colors.primary 
                      }]
                    ]}
                    onPress={() => handleDayPress(dayIndex)}
                    activeOpacity={0.7}
                  >
                    <Text style={[
                      styles.dayOfWeekText, 
                      { color: colors.textSecondary },
                      day.isSelected && { color: colors.primary, fontWeight: '600' }
                    ]}>
                      {day.dayOfWeek}
                    </Text>
                    
                    <View style={[
                      styles.dayNumberContainer,
                      day.isToday && [styles.todayNumberContainer, { backgroundColor: colors.primary }]
                    ]}>
                      <Text style={[
                        styles.dayNumberText,
                        day.isToday && { color: '#fff' },
                        day.isSelected && !day.isToday && { color: colors.primary, fontWeight: '700' }
                      ]}>
                        {day.dayOfMonth}
                      </Text>
                    </View>
                    
                    {/* Индикатор прогресса */}
                    <View style={styles.dayProgressContainer}>
                      <View style={[styles.dayProgressBar, { 
                        backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' 
                      }]}>
                        <LinearGradient
                          colors={progress > 0 ? [colors.primary, colors.primaryLight || colors.primary] : ['transparent', 'transparent']}
                          style={[styles.dayProgressFill, { width: `${progress}%` }]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                        />
                      </View>
                      <Text style={[
                        styles.dayProgressText, 
                        { color: colors.textSecondary },
                        day.completedTasks === day.totalTasks && { color: colors.primary, fontWeight: '600' }
                      ]}>
                        {day.completedTasks}/{day.totalTasks}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* БЛОК 2: Статистика за выбранный день */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              📊 Статистика за день
            </Text>
            <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
              {selectedDayData.isToday ? 'Сегодняшние результаты' : 
               selectedDayData.dayOfWeek === 'ВС' || selectedDayData.dayOfWeek === 'СБ' ? 
               `Результаты за выходной` : 
               `Результаты за ${selectedDayData.dayOfWeek.toLowerCase()}`}
            </Text>
          </View>

          <View style={[styles.statsCard, getCardStyle(), getShadowStyle()]}>
            {/* Статистика в виде круговых диаграмм/индикаторов */}
            <View style={styles.statsGrid}>
              {/* Задачи */}
              <View style={styles.statItem}>
                <View style={[styles.statCircle, { borderColor: colors.primary }]}>
                  <Text style={[styles.statCircleNumber, { color: colors.text }]}>
                    {selectedDayData.completedTasks}
                  </Text>
                  <Text style={[styles.statCircleLabel, { color: colors.textSecondary }]}>
                    /{selectedDayData.totalTasks}
                  </Text>
                </View>
                <Text style={[styles.statLabel, { color: colors.text }]}>Задач выполнено</Text>
                <Text style={[styles.statProgress, { color: colors.primary }]}>
                  {Math.round((selectedDayData.completedTasks / selectedDayData.totalTasks) * 100)}%
                </Text>
              </View>

              {/* Точность */}
              <View style={styles.statItem}>
                <View style={[styles.statCircle, { borderColor: '#06D6A0' }]}>
                  <Text style={[styles.statCircleNumber, { color: '#06D6A0' }]}>
                    {selectedDayData.accuracy}%
                  </Text>
                </View>
                <Text style={[styles.statLabel, { color: colors.text }]}>Точность</Text>
                <Text style={[styles.statProgress, { color: '#06D6A0' }]}>
                  {selectedDayData.accuracy >= 90 ? 'Отлично' : selectedDayData.accuracy >= 70 ? 'Хорошо' : 'Можно лучше'}
                </Text>
              </View>

              {/* Время */}
              <View style={styles.statItem}>
                <View style={[styles.statCircle, { borderColor: '#FFD166' }]}>
                  <Ionicons name="time-outline" size={20} color="#FFD166" />
                  <Text style={[styles.statCircleNumber, { color: '#FFD166', marginLeft: 4 }]}>
                    {selectedDayData.studiedTime}
                  </Text>
                </View>
                <Text style={[styles.statLabel, { color: colors.text }]}>Минут изучения</Text>
                <Text style={[styles.statProgress, { color: '#FFD166' }]}>
                  {formatStudyTime(selectedDayData.studiedTime)}
                </Text>
              </View>
            </View>

            {/* Прогресс бар дня */}
            <View style={styles.dayProgressContainerFull}>
              <View style={styles.progressHeader}>
                <Text style={[styles.progressLabel, { color: colors.text }]}>
                  Прогресс дня
                </Text>
                <Text style={[styles.progressPercentage, { color: colors.primary }]}>
                  {Math.round((selectedDayData.completedTasks / selectedDayData.totalTasks) * 100)}%
                </Text>
              </View>
              <View style={styles.progressBar}>
                <LinearGradient
                  colors={[colors.primary, colors.primaryLight || colors.primary]}
                  style={[
                    styles.progressFill, 
                    { width: `${(selectedDayData.completedTasks / selectedDayData.totalTasks) * 100}%` }
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              </View>
            </View>
          </View>

          {/* БЛОК 3: Быстрые функции */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              ⚡ Быстрые функции
            </Text>
            <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
              Ваши инструменты для обучения
            </Text>
          </View>

          <View style={styles.quickActionsGrid}>
            {/* Словарь */}
            <TouchableOpacity 
              style={[styles.quickActionCard, getCardStyle(), getShadowStyle()]}
              activeOpacity={0.9}
              onPress={navigateToDictionary}
            >
              <LinearGradient
                colors={['#667EEA', '#764BA2']}
                style={styles.quickActionGradient}
              >
                <Ionicons name="book" size={28} color="#fff" />
              </LinearGradient>
              <View style={styles.quickActionContent}>
                <Text style={[styles.quickActionTitle, { color: colors.text }]}>
                  Словарь
                </Text>
                <Text style={[styles.quickActionSubtitle, { color: colors.textSecondary }]}>
                  247 слов изучено
                </Text>
              </View>
              <View style={[styles.quickActionBadge, { backgroundColor: '#667EEA' + '20' }]}>
                <Text style={[styles.quickActionBadgeText, { color: '#667EEA' }]}>
                  +12
                </Text>
              </View>
            </TouchableOpacity>

            {/* Тренировка */}
            <TouchableOpacity 
              style={[styles.quickActionCard, getCardStyle(), getShadowStyle()]}
              activeOpacity={0.9}
              onPress={navigateToPractice}
            >
              <LinearGradient
                colors={['#4ECDC4', '#44A08D']}
                style={styles.quickActionGradient}
              >
                <Ionicons name="play-circle" size={28} color="#fff" />
              </LinearGradient>
              <View style={styles.quickActionContent}>
                <Text style={[styles.quickActionTitle, { color: colors.text }]}>
                  Тренировка
                </Text>
                <Text style={[styles.quickActionSubtitle, { color: colors.textSecondary }]}>
                  Практика времён
                </Text>
              </View>
              <View style={[styles.quickActionBadge, { backgroundColor: '#4ECDC4' + '20' }]}>
                <Ionicons name="flame" size={16} color="#4ECDC4" />
                <Text style={[styles.quickActionBadgeText, { color: '#4ECDC4', marginLeft: 4 }]}>
                  7
                </Text>
              </View>
            </TouchableOpacity>

            {/* Времена */}
            <TouchableOpacity 
              style={[styles.quickActionCard, getCardStyle(), getShadowStyle()]}
              activeOpacity={0.9}
              onPress={navigateToTenses}
            >
              <LinearGradient
                colors={['#FF9A9E', '#FAD0C4']}
                style={styles.quickActionGradient}
              >
                <Ionicons name="time" size={28} color="#fff" />
              </LinearGradient>
              <View style={styles.quickActionContent}>
                <Text style={[styles.quickActionTitle, { color: colors.text }]}>
                  Все времена
                </Text>
                <Text style={[styles.quickActionSubtitle, { color: colors.textSecondary }]}>
                  9/12 изучено
                </Text>
              </View>
              <View style={styles.quickActionProgress}>
                <View style={[styles.quickActionProgressBar, { backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}>
                  <View style={[styles.quickActionProgressFill, { width: '75%', backgroundColor: '#FF6B6B' }]} />
                </View>
                <Text style={[styles.quickActionProgressText, { color: colors.textSecondary }]}>
                  75%
                </Text>
              </View>
            </TouchableOpacity>

            {/* Статистика */}
            <TouchableOpacity 
              style={[styles.quickActionCard, getCardStyle(), getShadowStyle()]}
              activeOpacity={0.9}
              onPress={navigateToStats}
            >
              <LinearGradient
                colors={['#A78BFA', '#818CF8']}
                style={styles.quickActionGradient}
              >
                <Ionicons name="stats-chart" size={28} color="#fff" />
              </LinearGradient>
              <View style={styles.quickActionContent}>
                <Text style={[styles.quickActionTitle, { color: colors.text }]}>
                  Статистика
                </Text>
                <Text style={[styles.quickActionSubtitle, { color: colors.textSecondary }]}>
                  Ваш прогресс
                </Text>
              </View>
              <View style={[styles.quickActionTrend, { backgroundColor: '#A78BFA' + '20' }]}>
                <Ionicons name="trending-up" size={16} color="#A78BFA" />
                <Text style={[styles.quickActionTrendText, { color: '#A78BFA', marginLeft: 4 }]}>
                  +24%
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Отступ внизу */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
  },
  greetingContainer: {
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subGreeting: {
    fontSize: 16,
    fontWeight: '400',
    opacity: 0.7,
  },
  sectionHeader: {
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    opacity: 0.8,
  },
  calendarCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
  },
  calendarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCard: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    flex: 1,
    marginHorizontal: 2,
  },
  selectedDayCard: {
    borderWidth: 1,
  },
  todayCard: {
    borderWidth: 1,
  },
  dayOfWeekText: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
  },
  dayNumberContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  todayNumberContainer: {
    backgroundColor: '#007AFF',
  },
  dayNumberText: {
    fontSize: 16,
    fontWeight: '600',
  },
  dayProgressContainer: {
    alignItems: 'center',
    width: '100%',
  },
  dayProgressBar: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  dayProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  dayProgressText: {
    fontSize: 10,
    fontWeight: '500',
  },
  statsCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statCircleNumber: {
    fontSize: 20,
    fontWeight: '700',
  },
  statCircleLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 4,
  },
  statProgress: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  dayProgressContainerFull: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 60) / 2, // Для двух колонок с отступами
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickActionGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  quickActionSubtitle: {
    fontSize: 12,
    opacity: 0.8,
  },
  quickActionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  quickActionBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  quickActionProgress: {
    alignItems: 'flex-end',
  },
  quickActionProgressBar: {
    width: 60,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  quickActionProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  quickActionProgressText: {
    fontSize: 10,
    fontWeight: '500',
  },
  quickActionTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  quickActionTrendText: {
    fontSize: 12,
    fontWeight: '700',
  },
  bottomSpacer: {
    height: 20,
  },
});

export default MainScreen;