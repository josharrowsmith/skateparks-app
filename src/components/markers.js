import React from "react";
import { View, Animated, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { device } from "../constants";

export default class Markers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { markers, animation } = this.props;
    // Need to figure out how to move this
    const interpolations = markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * device.cardWidth,
        index * device.cardWidth,
        (index + 1) * device.cardWidth
      ];
      const scale = animation.interpolate({
        inputRange,
        outputRange: [0.34, 2.5, 0.34],
        extrapolate: "clamp"
      });
      const opacity = animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp"
      });
      return { scale, opacity };
    });

    return (
      <>
        {markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale
              }
            ]
          };
          const opacityStyle = {
            opacity: interpolations[index].opacity
          };

          return (
            <MapView.Marker
              key={marker.id}
              coordinate={{
                latitude: marker.coordinates._lat,
                longitude: marker.coordinates._long
              }}
            >
              <Animated.View style={[scaleStyle, opacityStyle]}>
                <View style={styles.marker} />
              </Animated.View>
            </MapView.Marker>
          );
        })}
      </>
    );
  }
}

const styles = StyleSheet.create({
  marker: {
    width: 30,
    height: 30,
    borderRadius: 4,
    backgroundColor: "black"
  },
  mapbtn: {
    width: 100,
    height: 30,
    borderRadius: 15,
    backgroundColor: "black",
    color: "white"
  },
  mapText: {
    color: "white",
    textAlign: "center",
    alignContent: "center"
  }
});
