import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Grid = props => (
  <View style={styles.container}>
    <View style={styles.settings}>
      <View style={styles.whiteBox}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
          <Text style={styles.closeBtn}>X</Text>
        </TouchableOpacity>
        <Text style={styles.settingText}>Settings</Text>
      </View>
    </View>
    <Text style={styles.h1}>notifications</Text>
    <View style={styles.grid}>
      <View style={styles.row1}>
        <Text style={styles.h2}>Allow notification for parks in range</Text>
      </View>
      <View style={styles.row2}>{props.children[0]}</View>
      <View style={styles.row1}>
        <Text style={styles.h2}>Sound</Text>
      </View>
      <View style={styles.row2}>{props.children[1]}</View>
      <View style={styles.row1}>
        <Text style={styles.h2}>Vibrate</Text>
      </View>
      <View style={styles.row2}>{props.children[2]}</View>
    </View>
  </View>
);

export default Grid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4d4b4b"
  },
  settings: {
    marginTop: 50,
    justifyContent: "center"
  },
  whiteBox: {
    backgroundColor: "white",
    width: "50%",
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  closeBtn: {
    fontSize: 25,
    textTransform: "uppercase",
    padding: 5
  },
  settingText: {
    fontSize: 25,
    textTransform: "uppercase",
    alignSelf: "center",
    marginLeft: 5
  },
  notification: {
    flex: 3,
    alignItems: "center"
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 30,
    marginTop: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  h1: {
    fontSize: 30,
    textTransform: "uppercase",
    color: "white",
    textAlign: "center",
    padding: 20
  },
  h2: {
    fontSize: 15,
    textTransform: "uppercase",
    color: "white"
  },
  row1: {
    flexBasis: "70%",
    color: "white",
    textTransform: "uppercase",
    marginTop: 20
  },
  row2: {
    flexBasis: "15%",
    backgroundColor: "grey",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "white",
    marginTop: 20
  }
});
