import React, { Component } from "react";
import { Dimensions, Animated, Button } from "react-native";
import MapView from "react-native-maps";
import Cards from "../components/cards";
import Markerss from "../components/markers";
import CurrentLocation from "../components/locationMarker";
import Home from "../components/centerLocation";

const { width } = Dimensions.get("window");

const CARD_WIDTH = width * 0.7;

export default class Markers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: null,
      scale: new Animated.Value(0),
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
      index: 0,
      pressed: false
    };
  }

  componentWillMount() {
    const { latitudeDelta, longitudeDelta } = this.state;
    this.index = 0;
    this.animation = new Animated.Value(0);

    this.animation.addListener(({ value }) => {
      const { markers } = this.props;
      let index = Math.floor(value / CARD_WIDTH + 0.8); // animate 80% away from landing on the next item
      if (index >= markers.length) {
        index = markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }
      this.setState({ index });
      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { _lat, _long } = markers[index].coordinates;
          this.map.animateToRegion(
            {
              latitude: _lat,
              longitude: _long,
              latitudeDelta,
              longitudeDelta
            },
            100
          );
        }
      }, 10);
    });
  }

  //Zooms out the map on new radius
  zommOut = () => {
    region = {
      latitude: this.props.location.coords.latitude,
      longitude: this.props.location.coords.longitude,
      latitudeDelta: this.state.latitudeDelta + 0.2,
      longitudeDelta: this.state.longitudeDelta + 0.2
    };
    this.setState({
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta
    });
    this.map.animateToRegion(region, 500);
  };

  toggleAction = () => {
    this.setState({
      pressed: !this.state.pressed
    });
  };

  render() {
    const { location, markers, showCards, navigation } = this.props;
    const { index, pressed } = this.state;
    return (
      <>
        <MapView
          ref={map => (this.map = map)}
          style={{ alignSelf: "stretch", flex: 1, marginTop: -300 }}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.09
          }}
        >
          <CurrentLocation location={location} />
          <Markerss markers={markers} animation={this.animation} />
        </MapView>
        {showCards && (
          <Cards markers={markers} animation={this.animation} index={index} navigation={navigation}/>
        )}
      </>
    );
  }
}