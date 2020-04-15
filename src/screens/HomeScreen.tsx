import React, { useEffect, useState } from "react";
import { AsyncStorage } from "react-native";
import {
  requestPermissionsAsync,
  watchPositionAsync,
  Accuracy
} from "expo-location";
import Markers from "./MarkersScreen";
import Nav from "../components/home/nav";
import { useSelector, useDispatch } from "react-redux";
import { getParks } from "../store/actions/parks";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../constants/theme";
import Loading from "../components/home/loading";

interface IState {
  location: object;
  parks: any;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface IProps {
  navigation: any;
}

const Main = ({ navigation }: IProps) => {
  const [isToggled, setToggled] = useState(false);
  const [currentRegion, setCurrentRegion] = useState(null);
  const radius = useSelector(state => state.radius.radius);
  const parks = useSelector(state => state.places.places);
  const theme = useSelector(state => state.theme);
  const dispatch = useDispatch();
  const toggleTrueFalse = () => setToggled(!isToggled);

  useEffect(() => {
    async function loadInitialLocation() {
      const { granted } = await requestPermissionsAsync();
      if (granted) {
        await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            distanceInterval: 100
          },
          location => {
            const { latitude, longitude } = location.coords;
            setCurrentRegion({
              latitude,
              longitude,
              latitudeDelta: 0.04,
              longitudeDelta: 0.04
            });
            dispatch(getParks(radius, latitude, longitude));
          }
        );
      }
    }

    async function getStorage() {
      
    }

    loadInitialLocation();
    getStorage();
  }, []);

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
