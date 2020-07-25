import React, { useEffect, useState, useRef } from "react";
import { Text, Button, View, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Bg, Btn, SmallFontInv, Title } from "../../constants/globalStyles";
import styled, { ThemeProvider } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { lightTheme, darkTheme } from "../../constants/theme";
import BackBtn from "../../components/settings/BackBtn";
import { storeLocation } from "../../store/actions/parks";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import LightMap from "../../assets/data/lightmap.json";
import DarkMap from "../../assets/data/darkmap.json";
import { MaterialIcons } from "@expo/vector-icons";
import CenterLocation from "../../components/map/centerLocation";

const MapScreen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const parks = useSelector((state) => state.places);
  const location = useSelector((state) => state.location);
  const theme = useSelector((state) => state.theme);

  return (
    <ThemeProvider theme={theme.mode ? darkTheme : lightTheme}>
      <Bg>
        <>
          <MapView
            style={{ alignSelf: "stretch", flex: 1, marginTop: -100 }}
            // customMapStyle={theme.mode ? DarkMap : LightMap}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: location.location.latitude,
              longitude: location.location.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: location.location.latitude,
                longitude: location.location.longitude,
              }}
              draggable
              onDragEnd={(e) => {
                dispatch(
                  storeLocation(
                    e.nativeEvent.coordinate.latitude,
                    e.nativeEvent.coordinate.longitude
                  )
                );
              }}
            >
              <MaterialIcons name="location-on" size={50} color="red" />
            </MapView.Marker>
          </MapView>
          <CenterLocation
            pressed={() =>
              dispatch(
                storeLocation(
                  location.location.latitude,
                  location.location.longitude
                )
              )
            }
            theme={false}
          />
          <BackBtn {...{ navigation }} text={"Go Home"} />
        </>
      </Bg>
    </ThemeProvider>
  );
};

export default MapScreen;
