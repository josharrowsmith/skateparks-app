import React, { useEffect, useState, useRef } from "react";
import { Text, Button, View, TextInput, AsyncStorage } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Bg, Btn, SmallFontInv, Title } from "../../constants/globalStyles";
import styled, { ThemeProvider } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { lightTheme, darkTheme } from "../../constants/theme";
import { refreshToken } from "../../store/actions/auth";
import firebase from "../../config/firebase";
const functions = firebase.functions();

const AddScreen = (props) => {
  const [IsAdmin, SetAdmin] = useState(false);
  const [value, onChangeText] = useState();
  const theme = useSelector((state) => state.theme);
  const radius = useSelector((state) => state.radius.radius);
  const localauth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { goBack, isFocused } = useNavigation();
  const makeAdmin = functions.httpsCallable("makeAdmin");

  const addToAdmin = (adminEmail) => {
    makeAdmin({ email: adminEmail })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
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
            <Btn onPress={() => addToAdmin(value)}>
              <SmallFontInv>Make Admin</SmallFontInv>
            </Btn>
            <View
              style={{
                width: "80%",
                marginBottom: 10,
                borderBottomColor: "#eee",
                borderWidth: 1,
                borderColor: "transparent",
              }}
            >
              <TextInput
                style={{}}
                onChangeText={(text) => onChangeText(text)}
                value={value}
              />
            </View>
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
