import React from "react";
import MapView from "react-native-maps";

const locationMaker = ({ location }) => {
  return (
    <MapView.Marker
      coordinate={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }}
      title="You are here"
    />
  );
};

export default locationMaker;
