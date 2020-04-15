import React from "react";
import MapView from "react-native-maps";

const locationMaker = ({ currentRegion }) => {
  return (
    <MapView.Marker
      coordinate={{
        latitude: currentRegion.latitude,
        longitude: currentRegion.longitude
      }}
      title="You are here"
    />
  );
};

export default locationMaker;
