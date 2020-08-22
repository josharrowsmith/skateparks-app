import React, { useEffect, useState, useRef } from "react";
import { Platform, AsyncStorage } from "react-native";
import {
  requestPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from "expo-location";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Markers from "./MarkersScreen";
import Nav from "../components/home/nav";
import { useSelector, useDispatch } from "react-redux";
import { getParks } from "../store/actions/parks";
import { setLocation } from "../store/actions/location";
import { notificationToken } from "../store/actions/auth";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../constants/theme";
import { checkIfAdmin, refreshToken } from "../store/actions/auth";
import SettingIcon from "../assets/icons/Setting";
import RadarIcon from "../assets/icons/Radar";
import PlusIcon from "../assets/icons/Plus";
import SearchIcon from "../assets/icons/Search";
import ToggleIcon from "../assets/icons/Toggle";
import firebase from "../config/firebase";
import * as authActions from "../store/actions/auth";

interface IState {
  location: object;
  parks: any;
  latitudeDelta: number;
  longitudeDelta: number;
  navigation: any;
}

// Leave this here
const tabs = [
  { icon: <PlusIcon />, action: "Add" },
  { icon: <RadarIcon />, action: "Modal" },
  { icon: <ToggleIcon />, action: "toggle" },
  { icon: <SearchIcon />, action: "Search" },
  { icon: <SettingIcon />, action: "Settings" },
];

const Main = ({ navigation }: IState) => {
  const [isToggled, setToggled] = useState(false);
  const ref = useRef(null);
  const [currentRegion, setCurrentRegion] = useState(null);
  const theme = useSelector((state) => state.theme);
  const radius = useSelector((state) => state.radius.radius);
  const parks = useSelector((state) => state.places.places);
  const localauth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const toggleTrueFalse = (val) => setToggled(val);

  useEffect(() => {
    async function loadInitialLocation() {
      const { granted } = await requestPermissionsAsync();
      if (granted) {
        await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            distanceInterval: 100,
          },
          (location) => {
            const { latitude, longitude } = location.coords;
            setCurrentRegion({
              latitude,
              longitude,
              latitudeDelta: 0.04,
              longitudeDelta: 0.04,
            });
            dispatch(setLocation(latitude, longitude));
            dispatch(getParks(radius, latitude, longitude));
          }
        );
      }
    }

    loadInitialLocation();
  }, [radius]);

  useEffect(() => {
    const getToken = async () => {
      const userData = await AsyncStorage.getItem("userData");
      const transformedData = JSON.parse(userData);
      const { userId, expiryDate, email, token, admin } = transformedData;
      const expirationDate = new Date(expiryDate);
      if (expirationDate <= new Date() || !token || !userId) {
        return;
      }
      const expirationTime = expirationDate.getTime() - new Date().getTime();
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          user.getIdToken().then(function(data) {
            dispatch(
              authActions.authenticate(
                userId,
                data,
                null,
                expirationTime,
                email,
                admin
              )
            );
          });
        }
      });
    };
    // getPushNotificationPermissions();
    getToken();
  }, []);

  async function getPushNotificationPermissions() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    const token = await Notifications.getExpoPushTokenAsync();
    dispatch(notificationToken(token));

    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("test", {
        name: "parks",
        priority: "max",
        sound: true,
        vibrate: [0, 250, 250, 250],
      });
    }
  }

  if (!currentRegion) {
    return null;
  }

  return (
    <ThemeProvider theme={theme.mode === false ? lightTheme : darkTheme}>
      <Markers
        isToggled={isToggled}
        currentRegion={currentRegion}
        radius={radius}
        parks={parks}
        theme={theme}
        navigation={navigation}
      />
      <Nav
        navigation={navigation}
        toggle={toggleTrueFalse}
        theme={theme}
        tabs={tabs}
      />
    </ThemeProvider>
  );
};

export default Main;
