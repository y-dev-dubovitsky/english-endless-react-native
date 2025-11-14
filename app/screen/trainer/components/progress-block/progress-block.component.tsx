import { View, StyleSheet, Animated } from "react-native";
import { useEffect, useRef } from "react";

type ProgressBlockComponentProps = {
  backgroundColor?: string;
  type?: 'success' | 'error' | 'neutral';
};

const ProgressBlockComponent: React.FC<ProgressBlockComponentProps> = ({
  backgroundColor,
  type = 'neutral',
}): JSX.Element => {
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
      success: '#4CAF50',
      error: '#F44336',
      neutral: '#6C757D'
    };

    return {
      backgroundColor: backgroundColor || baseColors[type],
    };
  };

  return (
    <Animated.View 
      style={[
        styles.container, 
        getBlockStyle(),
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default ProgressBlockComponent;