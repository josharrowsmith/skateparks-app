import React from "react";
import MapView from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";

const locationMaker = ({ currentRegion }) => {
  return (
    <MapView.Marker
      coordinate={{
        latitude: currentRegion.latitude,
        longitude: currentRegion.longitude,
      }}
      title="You are here"
    >
      <MaterialIcons name="location-on" size={50} color="red" />
    </MapView.Marker>
  );
};

export default locationMaker;
