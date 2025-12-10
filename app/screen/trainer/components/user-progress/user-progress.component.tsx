import { View, Text, StyleSheet, Animated } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../../../contexts/ThemeContext'; // Добавляем импорт

type UserProgressComponentProps = {
  progressElementList: JSX.Element[];
  streak?: number;
};

const UserProgressComponent: React.FC<UserProgressComponentProps> = ({
  progressElementList,
  streak = 0,
}): JSX.Element => {
  const { colors, theme } = useTheme(); // Получаем тему
  
  const recentProgress = progressElementList.slice(-20);

  const getProgressStats = () => {
    const total = recentProgress.length;
    const correct = recentProgress.filter(el => el.props.type === 'success').length;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    
    return { total, correct, accuracy };
  };

  const { total, correct, accuracy } = getProgressStats();

  const getShadowStyle = () => {
    if (theme === 'light') {
      return {
        shadowColor: 'rgba(0, 0, 0, 0.08)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
      };
    } else {
      return {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 10,
      };
    }
  };

  const getGradientColors = () => {
    if (theme === 'light') {
      return ['#FFFFFF', '#F8F9FA'];
    } else {
      return [colors.backgroundSecondary, colors.backgroundSecondary];
    }
  };

  const getAccuracyColor = () => {
    if (accuracy >= 80) return theme === 'light' ? '#28A745' : '#4CAF50';
    if (accuracy >= 60) return theme === 'light' ? '#FFC107' : '#FFB300';
    return theme === 'light' ? '#DC3545' : '#F44336';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Прогресс</Text>
        <View style={styles.stats}>
          <Text style={[styles.accuracyText, { color: getAccuracyColor() }]}>{accuracy}%</Text>
          <Text style={[styles.statsText, { color: colors.textSecondary }]}>{correct}/{total}</Text>
        </View>
      </View>
      
      <View style={[styles.progressCard, getShadowStyle()]}>
        <LinearGradient
          colors={getGradientColors()}
          style={styles.progressGradient}
        >
          {/* Progress bars */}
          <View style={styles.progressBars}>
            <View style={[styles.accuracyBar, { backgroundColor: theme === 'light' ? '#E9ECEF' : 'rgba(255, 255, 255, 0.1)' }]}>
              <View 
                style={[
                  styles.accuracyFill,
                  { 
                    width: `${accuracy}%`,
                    backgroundColor: getAccuracyColor()
                  }
                ]} 
              />
            </View>
          </View>

          {/* Progress dots */}
          <View style={styles.progressElementsContainer}>
            {recentProgress.length > 0 ? (
              recentProgress
            ) : (
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Начните тренировку</Text>
            )}
          </View>

          {/* Streak indicator */}
          {streak >= 3 && (
            <View style={[
              styles.streakIndicator,
              { backgroundColor: theme === 'light' ? '#FFF3CD' : 'rgba(255, 195, 0, 0.2)' }
            ]}>
              <Text style={[
                styles.streakText,
                { color: theme === 'light' ? '#856404' : '#FFC107' }
              ]}>
                🔥 Серия: {streak}
              </Text>
            </View>
          )}
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  accuracyText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsText: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressCard: {
    borderRadius: 16,
  },
  progressGradient: {
    borderRadius: 16,
    padding: 16,
  },
  progressBars: {
    marginBottom: 12,
  },
  accuracyBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  accuracyFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressElementsContainer: {
    minHeight: 32,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 4,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    width: '100%',
    fontStyle: 'italic',
  },
  streakIndicator: {
    marginTop: 8,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  streakText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default UserProgressComponent;