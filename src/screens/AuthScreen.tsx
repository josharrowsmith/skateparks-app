import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../store/actions/auth";
import { lightTheme, darkTheme } from "../constants/theme";
import Input from "../components/auth/input";
import {
  AuthContainer,
  AuthTextBox,
  Container,
  NextBtn,
  SwitchBtn,
  BtnText,
  SwitchText,
  AuthTitle,
  GoogleBtn,
  GoogleText,
} from "../components/auth/BtnContainer";
import styled, { ThemeProvider } from "styled-components";
import GoogleAuth from "../components/auth/GoogleAuth";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const theme = useSelector((state) => state.theme);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme.mode === false ? lightTheme : darkTheme}>
      <AuthContainer>
        <AuthTitle>
          {isSignup ? "Sign up to Find." : "Log In to Find."}
        </AuthTitle>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50}>
          <AuthTextBox>
            <ScrollView>
              <Input
                id="email"
                label="E-Mail"
                keyboardType="email-address"
                required
                email
                autoCapitalize="none"
                errorText="Please enter a valid email address."
                onInputChange={inputChangeHandler}
                initialValue=""
                theme={theme}
              />
              <Input
                id="password"
                label="Password"
                keyboardType="default"
                secureTextEntry
                required
                minLength={5}
                autoCapitalize="none"
                errorText="Please enter a valid password."
                onInputChange={inputChangeHandler}
                initialValue=""
                theme={theme}
              />

              <Container>
                {isLoading ? (
                  <ActivityIndicator size="small" />
                ) : (
                  <NextBtn onPress={authHandler}>
                    <BtnText>{isSignup ? "Sign Up" : "Next"}</BtnText>
                  </NextBtn>
                )}
                <SwitchBtn
                  onPress={() => {
                    setIsSignup((prevState) => !prevState);
                  }}
                >
                  <SwitchText>{`Switch to ${
                    isSignup ? "Login" : "Sign Up"
                  }`}</SwitchText>
                </SwitchBtn>
              </Container>
            </ScrollView>
          </AuthTextBox>
        </KeyboardAvoidingView>
        <GoogleAuth />
      </AuthContainer>
    </ThemeProvider>
  );
};

export default AuthScreen;
