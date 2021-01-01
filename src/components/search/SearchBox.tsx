import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform
} from "react-native";
import { connectSearchBox } from "react-instantsearch-native";
import Animated, {
  Value,
  set,
  add,
  sub,
  Clock,
  Easing,
} from "react-native-reanimated";
import { timing, interpolateColor } from "react-native-redash";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useKeyboard } from "./keyboard";
const { useCode } = Animated;
const { width, height } = Dimensions.get("window");

const Touchablle = Animated.createAnimatedComponent(TouchableOpacity);
const Input = Animated.createAnimatedComponent(TextInput);
const Icon = Animated.createAnimatedComponent(Ionicons);
const inputRange = [0, 1];

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 26,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});

const SearchBox = ({ currentRefinement, refine, theme }) => {
  const inputRef = useRef(null);
  const [clock] = useState(new Clock());

  const [showInput, setShowInput] = useState(false);
  const [showing, setShowing] = useState(true);
  const [animatedValue] = useState(new Value(0));
  const [headerContentHeight] = useState(new Value(0));
  const [hiddenContentHeight] = useState(new Value(1));
  const { goBack } = useNavigation();
  const [keyboardHeight] = useKeyboard();

  useCode(() => {
    const TIME = 1000;
    if (showing) {
      setShowInput(true);
      return set(
        animatedValue,
        timing({
          clock,
          duration: TIME,
          to: add(headerContentHeight, hiddenContentHeight),
          from: animatedValue,
          easing: Easing.bezier(0.5, 0, 0, 1),
        })
      );
    }
  }, [showing]);
  return (
    <SafeAreaView>
      <Animated.View
        style={{
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <Animated.View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Animated.View
            style={{
              paddingHorizontal: animatedValue.interpolate({
                inputRange,
                outputRange: [10, 0],
              }),
              overflow: "hidden",
              width: animatedValue.interpolate({
                inputRange,
                outputRange: [100, 0],
              }),
            }}
          ></Animated.View>
          <Animated.View
            style={{
              marginHorizontal: 10,
              flexDirection: "row",
              height: 45,
              alignItems: "center",
              overflow: "hidden",

              backgroundColor: interpolateColor(animatedValue, {
                inputRange,
                outputRange:
                  theme.mode == false
                    ? ["#fff0", "#ffff"]
                    : ["#000", "#363537"],
              }),
              borderRadius: animatedValue.interpolate({
                inputRange,
                outputRange: [0, 100],
              }),
              width: animatedValue.interpolate({
                inputRange,
                outputRange: [45, width - 20],
              }),
            }}
          >
            <Touchablle
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 45,
                height: 45,
              }}
              onPress={() => setShowing(true)}
            >
              <Icon
                size={24}
                style={{
                  color: interpolateColor(animatedValue, {
                    inputRange,
                    outputRange:
                      theme.mode == false
                        ? ["#ffff", "#000"]
                        : ["#000", "#ffff"],
                  }),
                }}
                name={Platform.OS === 'android' ? "md-search" : "ios-search"}
              />
            </Touchablle>
            {showInput && (
              <Input
                onChangeText={(value) => refine(value)}
                value={currentRefinement}
                style={{
                  height: 30,
                  fontSize: 15,
                  borderRadius: 15,
                  paddingHorizontal: 15,
                  opacity: animatedValue,
                  backgroundColor: "#e1e1e1",
                  padding: 0,
                  width: animatedValue.interpolate({
                    inputRange,
                    outputRange: [0, width - 110],
                  }),
                }}
              />
            )}
            <Touchablle
              style={{
                justifyContent: "center",
                alignItems: "center",

                width: 45,
                height: 45,
              }}
              onPress={() => setShowing(false)}
            >
              <Icon
                size={24}
                onPress={goBack}
                style={{
                  opacity: animatedValue,
                  color: interpolateColor(animatedValue, {
                    inputRange,
                    outputRange:
                      theme.mode == false
                        ? ["#ffff", "#000"]
                        : ["#000", "#ffff"],
                  }),
                }}
                name={Platform.OS === 'android' ? "md-close" : "ios-close"}
              />
            </Touchablle>
          </Animated.View>
        </Animated.View>
        <Animated.View
          style={{
            top: 55,
            borderRadius: 15,
            position: "absolute",
            width: width - 20,
            height: Platform.OS === 'android' ? height - keyboardHeight - 55 - 50 : height - keyboardHeight - 55 - 50 - 20,
            opacity: animatedValue,
            transform: [{ scale: animatedValue }],
            backgroundColor: theme.mode == false ? "#fff" : "#363537",
          }}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

export default connectSearchBox(SearchBox);
