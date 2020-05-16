import React, { Component, useEffect, useRef } from "react";
import MapView, { Circle } from "react-native-maps";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getParks } from "../store/actions/parks";
import CurrentLocation from "../components/map/locationMarker";
import Marker from "../components/map/marker";
import Cards from "../components/map/cards";
import CenterLocation from "../components/map/centerLocation";
import { device } from "../constants";
import LightMap from "../assets/data/lightmap.json";
import DarkMap from "../assets/data/darkmap.json";
import Loading from "../components/home/loading";

interface IState {
  currentRegion: any;
  radius: number;
  parks: any;
  isToggled: boolean;
  theme: any;
  navigation: any;
}

class Markers extends React.PureComponent<IState> {
  state: IState;
  map: MapView;

  constructor(props) {
    super(props);
    this.state = {
      latitudeDelta: 0.4,
      longitudeDelta: 0.4,
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
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          },
          500
        );
      }
      this.setState({ x });
    }, 500);
  };

  toggleCenter = async () => {
    const { currentRegion } = this.props;
    const { latitudeDelta, longitudeDelta } = this.state;
    this.map.animateToRegion(
      {
        latitude: currentRegion.latitude,
        longitude: currentRegion.longitude,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
      },
      100
    );
  };

  async componentDidUpdate(prevProps) {
    const { radius, currentRegion } = this.props;
    if (prevProps.radius !== radius) {
      if (prevProps.radius > radius) {
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
        latitude: this.props.currentRegion.latitude,
        longitude: this.props.currentRegion.longitude,
        latitudeDelta: this.state.latitudeDelta - 0.15,
        longitudeDelta: this.state.longitudeDelta - 0.15,
      };
      this.setState({
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      });
      this.map.animateToRegion(region, 500);
    }
  };

  //Zooms out the map on new radius
  zommOut = () => {
    if (this.props.radius > 6) {
      region = {
        latitude: this.props.currentRegion.latitude,
        longitude: this.props.currentRegion.longitude,
        latitudeDelta: this.state.latitudeDelta + 0.15,
        longitudeDelta: this.state.longitudeDelta + 0.15,
      };
      this.setState({
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      });
      this.map.animateToRegion(region, 500);
    }
  };

  render() {
    const { x } = this.state;
    const {
      currentRegion,
      parks,
      isToggled,
      theme,
      navigation,
      radius,
    } = this.props;

    return (
      <>
        {!parks.length && radius !== 0.1 ? (
          <Loading />
        ) : (
          <MapView
            ref={(map) => (this.map = map)}
            style={{ alignSelf: "stretch", flex: 1, marginTop: -100 }}
            customMapStyle={theme.mode ? DarkMap : LightMap}
            initialRegion={{
              latitude: currentRegion.latitude,
              longitude: currentRegion.longitude,
              latitudeDelta: 0.4,
              longitudeDelta: 0.4,
            }}
          >
            <CurrentLocation currentRegion={currentRegion} />
            <Marker {...{ parks, x }} />
          </MapView>
        )}
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