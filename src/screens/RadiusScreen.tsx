import React, { useEffect } from "react";
import { Text, StyleSheet, Slider, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { device } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { setRadius } from "../store/actions/radius";
import { getParks, toggleCenter } from "../store/actions/parks";
import Svg, { Circle } from "react-native-svg";
// fix it later
// import Slider from "../components/slider/Slider";

const containerWidth = device.width;
const containerHeight = device.height - 100;
const center = {
  x: containerWidth / 2,

  y: containerHeight / 2,
};

const RadiusScreen = (props) => {
  const theme = useSelector((state) => state.theme);
  const radius = useSelector((state) => state.radius.radius);
  const location = useSelector((state) => state.location.location);
  const dispatch = useDispatch();
  const { goBack } = useNavigation();

  useEffect(() => {
    async function toggle() {
      dispatch(toggleCenter(location));
    }

    // toggle();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => goBack()}
      style={{
        backgroundColor: "transparent",
        height: device.height,
        flex: 1,
        justifyContent: "center",
        zIndex: -1,
      }}
    >
      <Svg style={StyleSheet.absoluteFill}>
        <Circle
          cx={center.x}
          cy={center.y}
          r={radius == 0 ? 1 : (radius * 100) / radius}
          fill={theme.mode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}
        />
      </Svg>
      <Text
        style={{
          position: "absolute",
          bottom: 150,
          width: device.width,
          fontSize: 32,
          textAlign: "center",
          color: theme.mode ? "#fff" : "#000",
        }}
      >
        {radius}km
      </Text>
      <Slider
        style={{
          position: "absolute",
          bottom: 100,
          width: device.width,
          height: 30,
        }}
        value={radius}
        minimumValue={0}
        maximumValue={20}
        minimumTrackTintColor={theme.mode ? "#fff" : "#000"}
        maximumTrackTintColor={theme.mode ? "#fff" : "#000"}
        thumbTintColor={theme.mode ? "#fff" : "#000"}
        step={5}
        onValueChange={async (val) => {
          await dispatch(setRadius(val));
          dispatch(getParks(val, location.latitude, location.longitude));
        }}
      />
    </TouchableOpacity>
  );
};

export default RadiusScreen;
