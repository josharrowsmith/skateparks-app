import React from "react";
import MapView from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { getParks } from "../../store/actions/parks";
import { setPark } from "../../store";
import { setLocation } from "../../store/actions/location";

const locationMaker = ({ currentRegion }) => {
  const radius = useSelector((state) => state.radius.radius);
  const parks = useSelector((state) => state.places.places);
  const dispatch = useDispatch();

  return (
    <MapView.Marker
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
  );
};

export default locationMaker;
