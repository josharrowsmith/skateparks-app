import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

const renderContent = () => {
  return (
    <View
      style={{
        padding: 20,
        height: Dimensions.get("window").height,
        backgroundColor: "#fff"
      }}
    >
      <Text style={{ fontSize: 22 }}>Hello this is some content!</Text>
      <Text style={{ fontSize: 22, marginTop: 20 }}>More of it here</Text>
      <Text style={{ fontSize: 22, marginTop: 40 }}>And down here</Text>
    </View>
  );
};

const renderHeader = () => {
  return (
    <View style={styles.header}>
      <View style={styles.panelHandle} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 25,
    alignItems: "center",
    justifyContent: "center"
  },
  panelHandle: {
    width: 35,
    height: 6,
    borderRadius: 4,
    backgroundColor: "#000",
    marginBottom: 0
  }
});

export { renderHeader, renderContent };
