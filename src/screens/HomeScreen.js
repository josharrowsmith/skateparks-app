import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { GeoFirestore } from "geofirestore";
import firebase from "../config/firebase";
import { gStyle } from "../constants";
import Map from "../components/map";
import Loading from "../components/loading";
import Nav from "../components/nav";
import Cards from "../components/cards";
import Markers from "./Markers";

const GEOLOCATION_OPTIONS = {
  accuracy: Location.Accuracy.BestForNavigation,
  distanceInterval: 10
};

// eslint-disable-next-line react/prefer-stateless-function
export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMap: false,
      location: null,
      tracking: false,
      parks: [],
      showCards: false
    };
  }

  async componentDidMount() {
    // Statring location tracking
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      alert("Location permission required");
    }
    // watches the postition
    const sub = await Location.watchPositionAsync(
      GEOLOCATION_OPTIONS,
      this.locationChanged
    );
    this.setState({ tracking: true, subscription: sub });
  }

  componentWillUnmount() {
    if (this.state.subscription) {
      this.state.subscription.remove();
    }
  }

  /*eslint-disable */
  //if user location changes
  locationChanged = location => {
    this.setState({ location, tick: this.state.tick + 1, data: [] });
    this.getParks(location);
  };
  /*eslint-enable */

  async getParks(location) {
    const lat = location.coords.latitude;
    const long = location.coords.longitude;
    const radius = 5;
    const firestore = firebase.firestore();
    const geofirestore = new GeoFirestore(firestore);
    const geocollection = geofirestore.collection("skateparks");

    let query = await geocollection.limit(50).near({
      center: new firebase.firestore.GeoPoint(lat, long),
      radius: radius
    });

    let docQuery = await query.onSnapshot(snapshot => {
      let parks = [];

      for (let i = 0; i < snapshot.docs.length; i++) {
        let { doc } = snapshot.docChanges()[i];
        let park = {
          ...snapshot.docs[i].data(),
          distance: doc.distance,
          id: snapshot.docs[i].id
        };
        parks.push(park);
      }

      //Doesnt sort
      const newdata = parks.sort(function(a, b) {
        return a.distance - b.distance;
      });

      this.setState({ parks: newdata, showMap: true });
    });
  }

  toggleAction = () => {
    this.setState({
      showCards: !this.state.showCards
    });
  };

  render() {
    const { showMap, parks, location, showCards } = this.state;
    const { navigation } = this.props;

    return (
      <View style={gStyle.container}>
        {location && (
          <>
            <Markers
              location={location}
              markers={parks}
              showCards={showCards}
              navigation={navigation}
            />
            <Nav navigation={navigation} toggle={this.toggleAction} />
          </>
        )}
        {!location && <Loading />}
      </View>
    );
  }
}
