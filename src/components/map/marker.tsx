import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView, { Callout } from "react-native-maps";
import { device } from "../../constants";
import styled from "styled-components";
import Animated from "react-native-reanimated";
import { deletePark } from "../../store/actions/parks";
import Pin from "../../assets/icons/pin";
import { auth } from "firebase";
const { interpolate, Extrapolate, Value } = Animated;

const MarkerIcon = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background-color: ${(props) => props.theme.text};
`;

interface Iprops {
  parks: any;
  x: Animated.Value<number>;
  auth: any;
}

export default class Markers extends React.Component<Iprops> {
  renderCallout(marker) {
    return (
      <>
        {this.props.auth.admin && (
          <Callout
            tooltip
            style={{
              backgroundColor: "red",
              height: 30,
              width: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Delete</Text>
          </Callout>
        )}
      </>
    );
  }
  render() {
    const { parks, x, auth } = this.props;
    const interpolations = parks.map((marker, i) => {
      const inputRange = [
        (i - 1) * device.cardWidth,
        i * device.cardWidth,
        (i + 1) * device.cardWidth,
      ];
      const scale = interpolate(x, {
        inputRange,
        outputRange: [0.34, 1, 0.34],
        extrapolate: Extrapolate.CLAMP,
      });

      const opacity = interpolate(x, {
        inputRange,
        outputRange: [0.5, 1, 0.5],
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
              onCalloutPress={() => {
                if (auth.admin) {
                  deletePark(marker.id);
                }
              }}
              key={marker.id}
              anchor={{ x: 0.5, y: 0.5 }}
              coordinate={{
                latitude: Number(marker.coordinates.latitude),
                longitude: Number(marker.coordinates.longitude),
              }}
            >
              <Animated.View style={[scaleStyle, opacityStyle]}>
                <MarkerIcon />
              </Animated.View>
              {this.renderCallout(marker)}
            </MapView.Marker>
          );
        })}
      </>
    );
  }
}
