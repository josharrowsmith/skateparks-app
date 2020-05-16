import React, { useEffect, useState } from "react";
import { Text, View, Button, AsyncStorage } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as TaskManager from "expo-task-manager";
import { useSelector, useDispatch } from "react-redux";
import { changeMode } from "../store/actions/theme";
import { logout } from "../store/actions/auth";
import { lightTheme, darkTheme } from "../constants/theme";
import {
  Bg,
  SmallFont,
  Btn,
  SmallFontInv,
  Description,
} from "../constants/globalStyles";
import styled, { ThemeProvider } from "styled-components";
import { Msg } from "../store/actions/notification";
import BackBtn from "../components/settings/BackBtn";
import Grid from "../components/settings/Grid";
import SettingContainer from "../components/settings/SettingContainer";
import Title from "../components/settings/Title";
import SettingRow from "../components/settings/SettingRow";
import { Toggle } from "../components/settings/toggle";
import { useNavigation } from "@react-navigation/native";
import Accordion from "../components/settings/accordion";

const BACKGROUND_LOCATION_TASK_NAME = "bg-location-name";

const SettingScreen = () => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [currentTheme, setTheme] = useState(false);
  const [currentThing, setThing] = useState(false);
  const [currentNofication, setNofication] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      await TaskManager.isTaskRegisteredAsync(BACKGROUND_LOCATION_TASK_NAME);
    })();
  });

  function changeTheme(state) {
    dispatch(changeMode(theme));
    setTheme(state);
  }

  function changeNofication(state) {
    setNofication(state);
    if (state) {
      enabled();
    } else {
      disable();
    }
  }

  function changeThing(state) {
    setThing(state);
  }

  async function enabled() {
    await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Highest,
      distanceInterval: 5000,
      timeInterval: 0,
      showsBackgroundLocationIndicator: true,
    });
  }

  async function disable() {
    await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK_NAME);
  }

  return (
    <ThemeProvider theme={theme.mode === false ? lightTheme : darkTheme}>
      <Bg>
        <BackBtn {...{ navigation }} />
        <SettingContainer>
          <Title />
          <Grid>
            <Accordion
              {...{ theme }}
              text={
                "Turn on push notifications within a 5km raduis to your current location"
              }
            >
              <SettingRow>
                <SmallFont>Nofication</SmallFont>
                <Toggle
                  isOn={currentNofication}
                  onToggle={(state) => changeNofication(state)}
                />
              </SettingRow>
            </Accordion>
            <Accordion
              {...{ theme }}
              text={"Hide your location from other users using the app"}
            >
              <SettingRow>
                <SmallFont>Ghost Mode</SmallFont>
                <Toggle
                  isOn={currentThing}
                  onToggle={(state) => changeThing(state)}
                />
              </SettingRow>
            </Accordion>
            <Accordion {...{ theme }} text={"Turn on dark mode"}>
              <SettingRow>
                <SmallFont>Dark Mode</SmallFont>
                <Toggle
                  isOn={theme.mode}
                  onToggle={(state) => changeTheme(state)}
                />
              </SettingRow>
            </Accordion>
            <Btn onPress={() => dispatch(logout())}>
              <SmallFontInv>Logout</SmallFontInv>
            </Btn>
          </Grid>
        </SettingContainer>
      </Bg>
    </ThemeProvider>
  );
};

//Background location tracking
if (!TaskManager.isTaskDefined(BACKGROUND_LOCATION_TASK_NAME)) {
  TaskManager.defineTask(
    BACKGROUND_LOCATION_TASK_NAME,
    async ({ data, error }) => {
      if (error) {
        // Error occurred - check `error.message` for more details.
        console.log(error.message);
        return;
      }
      if (data) {
        const { locations } = data;
        const theme = await AsyncStorage.getItem("userData");
        const transformedData = JSON.parse(theme);
        const { userId } = transformedData;
        const storageRadius = await AsyncStorage.getItem("radius");
        const transformedData2 = JSON.parse(storageRadius);
        const radius = 5;
        Msg(radius, locations, userId);
      }
    }
  );
}

export default SettingScreen;
