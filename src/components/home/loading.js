import React from "react";
import { ActivityIndicator, View } from "react-native";

const Loading = () => (
  <View style={{ flex: 1, justifyContent: "center" }}>
    <ActivityIndicator size={100} color="#000" />
  </View>
);

export default Loading;
