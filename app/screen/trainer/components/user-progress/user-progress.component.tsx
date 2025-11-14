import { View, Text, StyleSheet, Animated } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

type UserProgressComponentProps = {
  progressElementList: JSX.Element[];
  streak?: number;
};

const UserProgressComponent: React.FC<UserProgressComponentProps> = ({
  progressElementList,
  streak = 0,
}): JSX.Element => {
  const recentProgress = progressElementList.slice(-20); // Показываем только последние 20

  const getProgressStats = () => {
    const total = recentProgress.length;
    const correct = recentProgress.filter(el => el.props.type === 'success').length;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    
    return { total, correct, accuracy };
  };

  const { total, correct, accuracy } = getProgressStats();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Прогресс</Text>
        <View style={styles.stats}>
          <Text style={styles.accuracyText}>{accuracy}%</Text>
          <Text style={styles.statsText}>{correct}/{total}</Text>
        </View>
      </View>
      
      <View style={styles.progressCard}>
        <LinearGradient
          colors={['#FFFFFF', '#F8F9FA']}
          style={styles.progressGradient}
        >
          {/* Progress bars */}
          <View style={styles.progressBars}>
            <View style={styles.accuracyBar}>
              <View 
                style={[
                  styles.accuracyFill,
                  { width: `${accuracy}%` }
                ]} 
              />
            </View>
          </View>

          {/* Progress dots */}
          <View style={styles.progressElementsContainer}>
            {recentProgress.length > 0 ? (
              recentProgress
            ) : (
              <Text style={styles.emptyText}>Начните тренировку</Text>
            )}
          </View>

          {/* Streak indicator */}
          {streak >= 3 && (
            <View style={styles.streakIndicator}>
              <Text style={styles.streakText}>🔥 Серия: {streak}</Text>
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
    color: '#2c3e50',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  accuracyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28A745',
  },
  statsText: {
    fontSize: 14,
    color: '#6C757D',
    fontWeight: '500',
  },
  progressCard: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
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
    backgroundColor: '#E9ECEF',
    borderRadius: 3,
    overflow: 'hidden',
  },
  accuracyFill: {
    height: '100%',
    backgroundColor: '#28A745',
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
    color: '#6C757D',
    textAlign: 'center',
    width: '100%',
    fontStyle: 'italic',
  },
  streakIndicator: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    alignItems: 'center',
  },
  streakText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#856404',
  },
});

export default UserProgressComponent;