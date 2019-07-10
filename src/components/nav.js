import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { colors, device, fonts } from "../constants";

const Nav = ({ navigation, toggle }) => (
  <View style={styles.container}>
    <View style={styles.containerInput}>
      <View style={styles.containerSquare}>
        <TouchableOpacity style={styles.mapbtn} onPress={toggle}>
          <Text style={styles.mapText}>Press Me</Text>
        </TouchableOpacity>
      </View>
      <Button title="where" onPress={() => navigation.navigate("Setting")}>
        Where to?
      </Button>
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
    bottom: device.iPhoneX ? 10 : 20,
    width: device.width - 40
  },
  containerBanner: {
    backgroundColor: colors.green,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  bannerText: {
    color: colors.white,
    fontSize: 12
  },
  bannerMuted: {
    color: colors.mint,
    fontFamily: fonts.uberMedium,
    fontSize: 12
  },
  containerInput: {
    alignItems: "center",
    backgroundColor: colors.white,
    flexDirection: "row",
    height: 48
  },
  containerSquare: {
    alignItems: "center",
    flex: 2
  },
  square: {
    backgroundColor: colors.black,
    height: 8,
    width: 8
  },
  text: {
    color: colors.greyAbbey,
    flex: 8,
    fontFamily: fonts.uberMedium,
    fontSize: 20
  },
  containerIcon: {
    alignItems: "center",
    borderLeftColor: colors.greyMercury,
    borderLeftWidth: 1,
    flex: 2
  }
});

export default Nav;
