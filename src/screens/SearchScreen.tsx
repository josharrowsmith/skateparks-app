import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { device } from "../constants";
import styled, { ThemeProvider } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { SmallFont } from "../constants/globalStyles";

const SearchScreen = (props) => {
  const dispatch = useDispatch();
  const { goBack, isFocused } = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => goBack()}
      style={{
        backgroundColor: "transparent",
        height: device.height,
        flex: 1,
        justifyContent: "center",
        zIndex: -1,
        alignItems: "center",
      }}
    >
      <Text style={{fontSize: 20}}>Coming Soon</Text>
    </TouchableOpacity>
  );
};

export default SearchScreen;
