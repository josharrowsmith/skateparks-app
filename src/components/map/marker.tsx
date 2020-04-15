import React from "react";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { device } from "../../constants";
import styled from "styled-components";
import Animated from "react-native-reanimated";
import Pin from "../../assets/icons/pin"
const { interpolate, Extrapolate, Value } = Animated;

const MarkerIcon = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.text};
`;

interface Iprops {
  parks: any;
  x: Animated.Value<number>;
}

export default class Markers extends React.Component<Iprops> {
  render() {
    const { parks, x } = this.props;
    const interpolations = parks.map((marker, i) => {
      const inputRange = [
        (i - 1) * device.cardWidth,
        i * device.cardWidth,
        (i + 1) * device.cardWidth,
      ];
      const scale = interpolate(x, {
        inputRange,
        outputRange: [0.34, 2.5, 0.34],
        extrapolate: Extrapolate.CLAMP,
      });

      const opacity = interpolate(x, {
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: Extrapolate.CLAMP,
      });

      return { scale, opacity };
    });
    return (
      <>
        {parks.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };

          const opacityStyle = {
            opacity: interpolations[index].opacity,
          };
          return (
            <MapView.Marker
              key={marker.id}
              coordinate={{
                latitude: marker.coordinates._lat,
                longitude: marker.coordinates._long,
              }}
            >
              <Animated.View style={[scaleStyle, opacityStyle]}>
                <MarkerIcon />
              </Animated.View>
            </MapView.Marker>
          );
        })}
      </>
    );
  }
}
