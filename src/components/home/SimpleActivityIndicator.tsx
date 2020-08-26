import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";


const { width: wWidth } = Dimensions.get("window");
const width = wWidth * 0.8;
const { interpolate, Extrapolate } = Animated;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  bubble: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    backgroundColor: "#000",
    marginLeft: 20
  },
});

interface SimpleActivityIndicatorProps {
  progress: Animated.Value<number>;
}

export default ({ progress }: SimpleActivityIndicatorProps) => {
  const bubbles = [0, 1, 2];
  const delta = 1 / bubbles.length;
  return (
      <View style={styles.container}>
        {bubbles.map((i) => {
          const start = i * delta;
          const end = start + delta;
          const opacity = interpolate(progress, {
            inputRange: [start, end],
            outputRange: [0.5, 1],
            extrapolate: Extrapolate.CLAMP,
          });
          const scale = interpolate(progress, {
            inputRange: [start, end],
            outputRange: [1, 1.5],
            extrapolate: Extrapolate.CLAMP,
          });
          return (
            <Animated.View
              key={i}
              style={[styles.bubble, { opacity, transform: [{ scale }] }]}
            />
          );
        })}
      </View>
  );
};
