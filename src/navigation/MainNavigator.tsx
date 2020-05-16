import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import MarkerScreen from "../components/map/MarkerScreen";
import AuthScreen from "../screens/AuthScreen";
import RadiusScreen from "../screens/RadiusScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import AddScreen from "../screens/AddScreen";
import SearchScreen from "../screens/SearchScreen";
import { useSelector } from "react-redux";

const defaultNavOptions = {
  headerShown: false,
};

const MainStackNavigator = createStackNavigator();

export const MainNavigator = () => {
  return (
    <MainStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <MainStackNavigator.Screen name="Home" component={HomeScreen} />
      <MainStackNavigator.Screen name="Settings" component={SettingScreen} />
      <MainStackNavigator.Screen name="Marker" component={MarkerScreen} />
      <MainStackNavigator.Screen name="Add" component={AddScreen} />

    </MainStackNavigator.Navigator>
  );
};

const ModalStack = createStackNavigator();

export const ModalNavigator = () => {
  return (
    <ModalStack.Navigator
      mode="modal"
      headerMode="none"
      screenOptions={{
        animationEnabled: true,
        cardStyle: { backgroundColor: "rgba(0, 0, 0, 0.15)" },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => {
          return {
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.25, 0.7, 1],
              }),
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
                extrapolate: "clamp",
              }),
            },
          };
        },
      }}
    >
      <ModalStack.Screen name="Main" component={MainNavigator} />
      <ModalStack.Screen name="Modal" component={RadiusScreen} />
      <MainStackNavigator.Screen name="Search" component={SearchScreen} />
    </ModalStack.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  const theme = useSelector((state) => state.theme);
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.mode ? "#363537" : "#fff",
          },
          headerTintColor: theme.mode ? "#fff" : "#363537",
          headerTitle: "",
        }}
      />
    </AuthStackNavigator.Navigator>
  );
};
