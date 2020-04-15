import React, { Component, useEffect, useRef } from "react";
import { Text, View } from "react-native";
import MapView from "react-native-maps";
import CurrentLocation from "../components/map/locationMarker";
import Marker from "../components/map/marker";
import Cards from "../components/map/cards";
import CenterLocation from "../components/map/centerLocation";
import { device } from "../constants";
import LightMap from "../assets/data/lightmap.json";
import DarkMap from "../assets/data/darkmap.json";
import Animated from "react-native-reanimated";

const { Value } = Animated;

interface Istate {
  currentRegion: any;
  radius: number;
  parks: any;
  isToggled: boolean;
  theme: any;
  latitudeDelta: number;
  longitudeDelta: number;
  index: number;
  x: number;
  pressed: boolean;
  navigation: any;
}

class Markers extends React.PureComponent<Istate> {
  state: Istate;
  map: MapView;

  constructor(props) {
    super(props);
    this.state = {
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
      x: 0,
      index: 0,
    };
  }

  AnimateMarkers = (x) => {
    const { latitudeDelta, longitudeDelta } = this.state;
    const { parks } = this.props;
    let index = Math.floor(x / device.cardWidth + 0.7); // animate 80% away from landing on the next item
    if (index >= parks.length) {
      index = parks.length - 1;
    }
    if (index <= 0) {
      index = 0;
    }
    clearTimeout(this.regionTimeout);
    this.regionTimeout = setTimeout(() => {
      if (this.index !== index) {
        this.index = index;
        const { _lat, _long } = parks[index].coordinates;
        this.map.animateToRegion(
          {
            latitude: _lat,
            longitude: _long,
            latitudeDelta,
            longitudeDelta,
          },
          500
        );
      }
      this.setState({ x });
    }, 500);
  };

  toggleCenter = async () => {
    const { currentRegion } = this.props;
    this.map.animateToRegion(
      {
        latitude: currentRegion.latitude,
        longitude: currentRegion.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      },
      100
    );
  };

  render() {
    const { x } = this.state;
    const { currentRegion, parks, isToggled, theme, navigation } = this.props;
    return (
      <>
        <MapView
          ref={(map) => (this.map = map)}
          style={{ alignSelf: "stretch", flex: 1, marginTop: -200 }}
          customMapStyle={theme.mode ? DarkMap : LightMap}
          initialRegion={{
            latitude: currentRegion.latitude,
            longitude: currentRegion.longitude,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
        >
          <CurrentLocation currentRegion={currentRegion} />
          <Marker {...{ parks, x }} />
        </MapView>
        <CenterLocation pressed={this.toggleCenter} {...{ theme }} />
        {isToggled && (
          <Cards
            {...{ parks }}
            MarkerAnimation={this.AnimateMarkers}
            navigation={navigation}
            theme={theme}
          />
        )}
      </>
    );
  }
}

export default Markers;
