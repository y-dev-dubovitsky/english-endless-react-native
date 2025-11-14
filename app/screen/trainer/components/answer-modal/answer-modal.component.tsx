import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Animated, TouchableOpacity, Dimensions } from "react-native";
import { Modal } from "react-native-paper";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "@expo/vector-icons/Ionicons";

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

  return (
    <Modal
      visible={visible}
      onDismiss={hideAnswer}
      contentContainerStyle={styles.modalContainer}
    >
      <Animated.View 
        style={[
          styles.container,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          }
        ]}
      >
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.gradientBackground}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Правильный ответ</Text>
            <TouchableOpacity style={styles.closeButton} onPress={hideAnswer}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Answer Content */}
          <View style={styles.answerContent}>
            <Ionicons name="checkmark-circle" size={48} color="#4CAF50" style={styles.icon} />
            <Text style={styles.answerText}>{answer}</Text>
          </View>

          {/* Hint Section */}
          <View style={styles.hintSection}>
            <Text style={styles.hintTitle}>💡 Подсказка</Text>
            <Text style={styles.hintText}>
              Обратите внимание на порядок слов и вспомогательные глаголы
            </Text>
          </View>

          {/* Action Button */}
          <TouchableOpacity style={styles.continueButton} onPress={hideAnswer}>
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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