import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { colors, device } from "../constants";

import SettingIcon from "../assets/icons/Setting";
import Radar from "../assets/icons/Radar";

const Nav = ({ navigation, toggle }) => (
  <View style={styles.container}>
    <View style={styles.containerBanner}>
      <TouchableOpacity style={styles.mapbtn} onPress={toggle}>
        <Radar size={35} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.middle} onPress={toggle} />
      <TouchableOpacity onPress={() => navigation.navigate("Setting")}>
        <SettingIcon size={35} />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    position: "absolute",
    shadowColor: colors.black,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    bottom: device.iPhoneX ? 10 : 10,
    width: device.width - 40
  },
  containerBanner: {
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
    borderRadius: 20
  },
  middle: {
    borderTopWidth: 5,
    borderTopColor: colors.black,
    borderStyle: "solid",
    alignSelf: "flex-start",
    width: "30%",
    height: "100%",
    marginTop: 10
  }
});

export default Nav;
