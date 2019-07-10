import React from "react";
import { Button, View, StyleSheet } from "react-native";

const centerLocation = ({ pressed }) => (
  <View style={styles.container}>
    <Button title="go home" onPress={pressed} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
    position: "absolute",
    justifyContent: "center"
  }
});

export default centerLocation;
