import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import Cursor from "./Cursor";
import Labels from "./Labels";

const { Value, max, add } = Animated;

const { width: totalWidth } = Dimensions.get("window");
const count = 5;
const width = totalWidth / count;
const height = width;
const styles = StyleSheet.create({
  container: {
    width: totalWidth,
    height,
    borderRadius: height / 2,
    backgroundColor: "#f1f2f6",
    position: "absolute",
    bottom: 150,
  },
});

export default ({ x, test }) => {
  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "#000",
          width: add(max(x, 0), height),
          height,
          borderRadius: height / 2,
        }}
      />
      <Labels size={height} {...{ x, count }} />
      <Cursor size={height} {...{ x, count, test }} />
    </View>
  );
};
