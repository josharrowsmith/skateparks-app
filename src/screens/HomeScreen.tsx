import React, { useEffect, useState, useRef } from "react";
import { Platform } from "react-native";
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
import { checkIfAdmin } from "../store/actions/auth";

interface IState {
  location: object;
  parks: any;
  latitudeDelta: number;
  longitudeDelta: number;
  navigation: any;
}

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
    getPushNotificationPermissions();
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

  useEffect(() => {
    async function checkAdmin() {
      const result = await dispatch(checkIfAdmin(localauth.token));
      const isAdmin = await JSON.parse(result);
      localauth.admin = await isAdmin.admin;
    }
    checkAdmin();
  }, [localauth]);

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
      <Nav navigation={navigation} toggle={toggleTrueFalse} theme={theme} />
    </ThemeProvider>
  );
};

export default Main;
