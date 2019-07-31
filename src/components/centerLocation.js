import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Location from "../assets/icons/location";

const CenterLocation = ({ pressed }) => (
  <TouchableOpacity style={styles.container} onPress={pressed}>
    <Location size={35} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "center",
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 5
  }
});

export default CenterLocation;
