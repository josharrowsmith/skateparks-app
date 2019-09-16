import React, { Component } from "react";
import { Dimensions, Animated, Button } from "react-native";
import MapView from "react-native-maps";
import Cards from "../components/map/cards";
import Markerss from "../components/map/markers";
import CurrentLocation from "../components/map/locationMarker";
import CenterLocation from "../components/map/centerLocation";
import { device } from "../constants";

export default class Markers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: null,
      scale: new Animated.Value(0),
      index: 0,
      pressed: true,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    };
  }

  componentWillMount() {
    const { latitudeDelta, longitudeDelta } = this.state;

    this.animation = new Animated.Value(0);

    this.animation.addListener(({ value }) => {
      const { markers } = this.props;
      let index = Math.floor(value / device.cardWidth + 0.7); // animate 80% away from landing on the next item
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

  async componentDidUpdate(prevProps) {
    const { radius } = this.props;
    if (prevProps.radius !== this.props.radius) {
      if (prevProps.radius > this.props.radius) {
        this.zommIn();
      } else {
        this.zommOut();
      }
    }
  }
  //Zooms in the map on new radius
  zommIn = () => {
    if (this.props.radius >= 5) {
      region = {
        latitude: this.props.location.coords.latitude,
        longitude: this.props.location.coords.longitude,
        latitudeDelta: this.state.latitudeDelta - 0.2,
        longitudeDelta: this.state.longitudeDelta - 0.2
      };
      this.setState({
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta
      });
      this.map.animateToRegion(region, 500);
    }
  };

  //Zooms out the map on new radius
  zommOut = () => {
    if (this.props.radius > 6) {
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
    }
  };

  toggleAction = async () => {
    const { longitudeDelta, latitudeDelta, pressed } = this.state;
    const { location } = this.props;
    this.map.animateToRegion(
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta,
        longitudeDelta
      },
      100
    );
  };

  render() {
    const { location, markers, showCards, navigation } = this.props;
    const { index, pressed } = this.state;

    return (
      <>
        <MapView
          ref={map => (this.map = map)}
          style={{ alignSelf: "stretch", flex: 1, marginTop: -200 }}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }}
        >
          <CurrentLocation location={location} />
          <Markerss markers={markers} animation={this.animation} />
        </MapView>
        <CenterLocation pressed={this.toggleAction} />
        {showCards && (
          <Cards
            markers={markers}
            animation={this.animation}
            index={index}
            navigation={navigation}
          />
        )}
      </>
    );
  }
}
