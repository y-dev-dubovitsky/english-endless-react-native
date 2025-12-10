import { View, StyleSheet, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { useTheme } from '../../../../contexts/ThemeContext'; // Добавляем импорт

type ProgressBlockComponentProps = {
  backgroundColor?: string;
  type?: 'success' | 'error' | 'neutral';
};

const ProgressBlockComponent: React.FC<ProgressBlockComponentProps> = ({
  backgroundColor,
  type = 'neutral',
}): JSX.Element => {
  const { colors, theme } = useTheme(); // Получаем тему
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getBlockStyle = () => {
    const baseColors = {
      success: theme === 'light' ? '#4CAF50' : '#66BB6A',
      error: theme === 'light' ? '#F44336' : '#EF5350',
      neutral: theme === 'light' ? '#6C757D' : '#90A4AE'
    };

    return {
      backgroundColor: backgroundColor || baseColors[type],
    };
  };

  const getShadowStyle = () => {
    if (theme === 'light') {
      return {
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
      };
    } else {
      return {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
      };
    }
  };

  return (
    <Animated.View 
      style={[
        styles.container, 
        getBlockStyle(),
        getShadowStyle(),
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        }
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: 12,
    height: 12,
    borderRadius: 3,
    margin: 2,
  },
});

export default ProgressBlockComponent;