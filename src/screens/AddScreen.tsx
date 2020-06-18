import React, { useEffect, useState, useRef } from "react";
import { Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Bg, Btn, SmallFontInv, Title } from "../constants/globalStyles";
import styled, { ThemeProvider } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { lightTheme, darkTheme } from "../constants/theme";
import firebase from "../config/firebase";
const functions = firebase.functions();

const AddScreen = (props) => {
  const [IsAdmin, SetAdmin] = useState(false);
  const theme = useSelector((state) => state.theme);
  const radius = useSelector((state) => state.radius.radius);
  const localauth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { goBack, isFocused } = useNavigation();
  const makeAdmin = functions.httpsCallable("makeAdmin");

  const addToAdmin = (adminEmail) => {
    makeAdmin({ email: adminEmail }).then((result) => {
      console.log(result);
    });
  };

  return (
    <ThemeProvider theme={theme.mode === false ? lightTheme : darkTheme}>
      <Bg>
        {!localauth.admin && (
          <>
            <Title>You Don't have access</Title>
            <Btn onPress={goBack}>
              <SmallFontInv>Go back</SmallFontInv>
            </Btn>
          </>
        )}
        {localauth.admin && (
          <>
            <Btn onPress={() => console.log("nope")}>
              <SmallFontInv>Make Admin</SmallFontInv>
            </Btn>
            <Btn onPress={goBack}>
              <SmallFontInv>Go back</SmallFontInv>
            </Btn>
          </>
        )}
      </Bg>
    </ThemeProvider>
  );
};

export default AddScreen;
