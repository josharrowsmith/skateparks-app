import React from "react";
import { Platform } from "react-native"
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import MarkerScreen from "../components/map/MarkerScreen";
import AuthScreen from "../screens/AuthScreen";
import RadiusScreen from "../screens/RadiusScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import AddScreen from "../screens/Upload/AddScreen";
import SearchScreen from "../screens/SearchScreen";
import { useSelector } from "react-redux";
import ImageBrowserScreen from "../screens/Upload/ImageBrowserScreen";
import UploadScreen from "../screens/Upload/UploadScreen";
import MapScreen from "../screens/Upload/MapScreen";
import DetailsScreen from "../screens/Upload/DetailsScreen";
import MainImageScreen from "../screens/Upload/MainImageScreen";
import { Ionicons } from "@expo/vector-icons";

const defaultNavOptions = {
  headerShown: false,
};

const MainStackNavigator = createStackNavigator();

export const MainNavigator = () => {
  return (
    <MainStackNavigator.Navigator
      screenOptions={defaultNavOptions}
      initialRouteName="Home"
    >
      <MainStackNavigator.Screen name="Home" component={HomeScreen} />
      <MainStackNavigator.Screen name="Settings" component={SettingScreen} />
      <MainStackNavigator.Screen name="Marker" component={MarkerScreen} />
      <UploadTabsNavigator.Screen name="Add" component={UploadNavigator} />
    </MainStackNavigator.Navigator>
  );
};

const ImagesStackNavigator = createStackNavigator();

export const ImagesNavigator = () => {
  return (
    <ImagesStackNavigator.Navigator initialRouteName="MainImage">
      <ImagesStackNavigator.Screen
        name="MainImage"
        component={MainImageScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <ImagesStackNavigator.Screen
        name="ImageUpload"
        component={ImageBrowserScreen}
        options={() => ({ title: null })}
      />
    </ImagesStackNavigator.Navigator>
  );
};

const UploadTabsNavigator = createBottomTabNavigator();

export const UploadNavigator = () => {
  const isAuth = useSelector((state) => !!state.auth.admin);
  return (
    <UploadTabsNavigator.Navigator
      initialRouteName="Details"
      tabBarOptions={{
        activeTintColor: "#000",
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name == "Image") {
            iconName = Platform.OS === 'android' ? "md-images" : "ios-images";
          } else if (route.name == "Details") {
            iconName = Platform.OS === 'android' ? "md-information-circle" : "ios-information-circle";
          } else if (route.name == "Map") {
            iconName = Platform.OS === 'android' ? "md-pin" : "ios-pin";
          } else if (route.name == "Upload") {
            iconName = Platform.OS === 'android' ? "md-cloud-upload" : "ios-cloud-upload";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {isAuth && (
        <>
          <UploadTabsNavigator.Screen
            name="Details"
            component={DetailsScreen}
          />
          <UploadTabsNavigator.Screen
            name="Image"
            component={ImagesNavigator}
          />
          <UploadTabsNavigator.Screen name="Map" component={MapScreen} />
          <UploadTabsNavigator.Screen name="Upload" component={UploadScreen} />
        </>
      )}
      {!isAuth && (
        <MainStackNavigator.Screen
          name="Add"
          component={AddScreen}
          options={() => ({
            tabBarVisible: false,
          })}
        />
      )}
    </UploadTabsNavigator.Navigator>
  );
};

const ModalStack = createStackNavigator();

export const ModalNavigator = () => {
  return (
    <ModalStack.Navigator
      mode="modal"
      headerMode="none"
      initialRouteName="Main"
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
