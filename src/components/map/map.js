import React from "react";
import MapView from "react-native-maps";

const { PROVIDER_GOOGLE } = MapView;

const Map = ({ lat, long, children }) => (
  <MapView
    provider={PROVIDER_GOOGLE}
    style={{ alignSelf: "stretch", flex: 1 }}
    initialRegion={{
      latitude: lat,
      longitude: long,
      latitudeDelta: 0.09,
      longitudeDelta: 0.09
    }}
  >
    {children}
  </MapView>
);

export default Map;
