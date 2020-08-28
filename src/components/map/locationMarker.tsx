import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import MapView, { Callout } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { getParks } from "../../store/actions/parks";
import { setLocation } from "../../store/actions/location";
import { getCurrentPositionAsync } from "expo-location";

const locationMaker = ({ currentRegion }) => {
  const radius = useSelector((state) => state.radius.radius);
  const parks = useSelector((state) => state.places.places);
  const localauth = useSelector((state) => state.auth);
  const [showMarker, setMarker] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      <MapView.Marker
        title="Current location"
        onPress={async () => {
          let location = await getCurrentPositionAsync({});
          setMarker(true);
          dispatch(
            setLocation(location.coords.latitude, location.coords.longitude)
          ),
            dispatch(
              getParks(
                radius,
                location.coords.latitude,
                location.coords.longitude
              )
            );
          // Nothing to see here
          setTimeout(() => {
            setMarker(false);
          }, 2000);
        }}
        coordinate={{
          latitude: currentRegion.latitude,
          longitude: currentRegion.longitude,
        }}
      >
        <MaterialIcons
          name="location-on"
          size={50}
          color="red"
          style={{ opacity: 0.5 }}
        />
      </MapView.Marker>
      {!showMarker && (
        <MapView.Marker
          title="Moved location"
          tracksViewChanges={true}
          coordinate={{
            latitude: currentRegion.latitude,
            longitude: currentRegion.longitude,
          }}
          draggable
          onDragEnd={(e) => {
            dispatch(
              getParks(
                radius,
                e.nativeEvent.coordinate.latitude,
                e.nativeEvent.coordinate.longitude
              )
            ),
              dispatch(
                setLocation(
                  e.nativeEvent.coordinate.latitude,
                  e.nativeEvent.coordinate.longitude
                )
              );
          }}
        >
          <MaterialIcons name="location-on" size={50} color="red" />
        </MapView.Marker>
      )}
    </>
  );
};

export default locationMaker;
