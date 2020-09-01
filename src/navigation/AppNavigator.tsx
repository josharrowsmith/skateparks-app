import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ModalNavigator, AuthNavigator } from "./MainNavigator";
import * as authActions from "../store/actions/auth";

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate, email, admin } = transformedData;
      const expirationDate = new Date(expiryDate);
      if (expirationDate <= new Date() || !token || !userId) {
        return;
      }
      const expirationTime = expirationDate.getTime() - new Date().getTime();
      dispatch(authActions.authenticate(userId, token, null, expirationTime, email, admin));
    };
    tryLogin();
  }, [isAuth]);

  return (
    <NavigationContainer>
      {isAuth && <ModalNavigator />}
      {!isAuth && <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
