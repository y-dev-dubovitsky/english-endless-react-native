import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Animated, TouchableOpacity, Dimensions } from "react-native";
import { Modal } from "react-native-paper";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from '../../../../contexts/ThemeContext'; // Добавляем импорт

const { width, height } = Dimensions.get('window');

type AnswerModalComponentProps = {
  answer: string;
  visible: boolean;
  hideAnswer: () => void;
};

const AnswerModalComponent: React.FC<AnswerModalComponentProps> = ({
  answer,
  visible,
  hideAnswer
}): JSX.Element => {
  const { colors, theme } = useTheme(); // Получаем тему
  
  const [scaleAnim] = useState(new Animated.Value(0));
  const [opacityAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 10,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const getGradientColors = () => {
    if (theme === 'light') {
      return ['#667eea', '#764ba2'];
    } else {
      return [colors.primary, colors.primaryDark || colors.primary];
    }
  };

  const getShadowStyle = () => {
    if (theme === 'light') {
      return {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10,
      };
    } else {
      return {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 15,
      };
    }
  };

  return (
    <Modal
      visible={visible}
      onDismiss={hideAnswer}
      contentContainerStyle={styles.modalContainer}
    >
      <Animated.View 
        style={[
          styles.container,
          getShadowStyle(),
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          }
        ]}
      >
        <LinearGradient
          colors={getGradientColors()}
          style={styles.gradientBackground}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Правильный ответ</Text>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={hideAnswer}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Answer Content */}
          <View style={[styles.answerContent, { backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)' }]}>
            <Ionicons name="checkmark-circle" size={48} color={theme === 'light' ? '#4CAF50' : '#66BB6A'} style={styles.icon} />
            <Text style={styles.answerText}>{answer}</Text>
          </View>

          {/* Hint Section */}
          <View style={[styles.hintSection, { backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.15)' }]}>
            <Text style={styles.hintTitle}>💡 Подсказка</Text>
            <Text style={styles.hintText}>
              Обратите внимание на порядок слов и вспомогательные глаголы
            </Text>
          </View>

          {/* Action Button */}
          <TouchableOpacity 
            style={[
              styles.continueButton, 
              { backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.2)' }
            ]} 
            onPress={hideAnswer}
            activeOpacity={0.7}
          >
            <Text style={styles.continueButtonText}>Продолжить</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  container: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  gradientBackground: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  closeButton: {
    padding: 4,
  },
  answerContent: {
    alignItems: 'center',
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
  },
  icon: {
    marginBottom: 16,
  },
  answerText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 30,
  },
  hintSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  hintTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  hintText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default AnswerModalComponent;