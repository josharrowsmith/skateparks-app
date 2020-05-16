import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Bg, Btn, SmallFontInv, Title } from "../constants/globalStyles";
import styled, { ThemeProvider } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { lightTheme, darkTheme } from "../constants/theme";

const AddScreen = (props) => {
  const theme = useSelector((state) => state.theme);
  const radius = useSelector((state) => state.radius.radius);
  const dispatch = useDispatch();
  const { goBack, isFocused } = useNavigation();

  return (
    <ThemeProvider theme={theme.mode === false ? lightTheme : darkTheme}>
      <Bg>
        <Title>You Don't have access</Title>
        <Btn onPress={goBack}><SmallFontInv>Go back</SmallFontInv></Btn>
      </Bg>
    </ThemeProvider>
  );
};

export default AddScreen;
