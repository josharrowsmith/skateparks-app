import React, { useState, Children } from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { mix, useTransition } from "react-native-redash";
import Arrow from "./arrow";

const { interpolate } = Animated;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e8e8e8e8",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  items: {
    overflow: "hidden",
    marginTop: -10,
    paddingHorizontal: 5
  },
});

export interface List {
  name: string;
}

interface ListProps {
  children: any;
  text: string;
  theme: object
}

export default ({ children, text, theme }: ListProps) => {
  const [open, setOpen] = useState(false);
  const transition = useTransition(open);
  const height = mix(transition, 0, 50);
  const bottomRadius = interpolate(transition, {
    inputRange: [0, 16 / 400],
    outputRange: [8, 0],
  });
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
        <Animated.View
          style={[
            styles.container,
            {
              borderBottomLeftRadius: bottomRadius,
              borderBottomRightRadius: bottomRadius,
            },
          ]}
        >
          <Arrow {...{ transition }} />
          {children}
        </Animated.View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.items, { height }]}>
        <Text style={{color: theme.mode ? "#fff" : "#000"}} >{text}</Text>
      </Animated.View>
    </>
  );
};
