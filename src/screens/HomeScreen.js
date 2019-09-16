import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setRadius } from "../store/actions/radius";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { GeoFirestore } from "geofirestore";
import firebase from "../config/firebase";
import { gStyle } from "../constants";
import Loading from "../components/home/loading";
import Nav from "../components/home/nav";
import Markers from "./MarkersScreen";

const GEOLOCATION_OPTIONS = {
  accuracy: Location.Accuracy.BestForNavigation,
  distanceInterval: 10
};

// eslint-disable-next-line react/prefer-stateless-function
class MapScreen extends React.Component {
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
    let status;
    status = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let statusNotifications = status.status;
    console.log("Notifications Permissions: ", statusNotifications);

    status = await Permissions.getAsync(Permissions.LOCATION);
    let statusLocation = status.status;
    console.log("Location Permissions: ", statusLocation);

    if (statusNotifications !== "granted") {
      console.log("Requesting Notification Permissions");
      status = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      statusNotifications = status.status;
    }

    if (statusLocation !== "granted") {
      console.log("Requesting Location Permissions");
      status = await Permissions.askAsync(Permissions.LOCATION);
      statusLocation = status.status;
    }

    if (statusNotifications !== "granted" || statusLocation !== "granted") {
      console.log("Permissions not granted");
      return;
    }

    console.log("Permissions Granted!");
    // watches the postition, gives that timer error
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

  async componentDidUpdate(prevProps) {
    const { location } = this.state;
    if (prevProps.radius !== this.props.radius) {
      if (prevProps.radius > this.props.radius) {
        this.getParks(location);
      } else {
        this.getParks(location);
      }
    }
  }

  //if user location changes
  locationChanged = location => {
    this.setState({ location, tick: this.state.tick + 1 });
    this.getParks(location);
  };

  async getParks(location) {
    try {
      const lat = location.coords.latitude;
      const long = location.coords.longitude;
      const radius = this.props.radius;
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
    } catch {
      console.log("something went wrong");
    }
  }

  toggleAction = () => {
    this.setState({
      showCards: !this.state.showCards
    });
  };

  render() {
    const {
      parks,
      location,
      showCards,
      latitudeDelta,
      longitudeDelta
    } = this.state;
    const { navigation, radius } = this.props;

    return (
      <View style={gStyle.container}>
        {location && (
          <>
            <Markers
              location={location}
              markers={parks}
              showCards={showCards}
              navigation={navigation}
              radius={radius}
            />
            <Nav navigation={navigation} toggle={this.toggleAction} />
          </>
        )}
        {!location && <Loading />}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    radius: state.radius.radius
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setRadius: setRadius
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapScreen);
