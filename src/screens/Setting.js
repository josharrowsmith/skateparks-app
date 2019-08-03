import React from "react";
import { Text, View, Button, Platform } from "react-native";
import { Notifications } from "expo";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as TaskManager from "expo-task-manager";
import Constants from "expo-constants";
import firebase from "../config/firebase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setRadius } from "../store/actions/radius";
import { func } from "../constants/index";
import store from "../store/configStore";
import { getParks } from "../store/actions/notification";
import { gStyle } from "../constants";

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enable: false,
      location: null
    };
  }

  async componentDidMount() {
    this.registerForPushNotificationsAsync();

    if (
      await TaskManager.isTaskRegisteredAsync(
        func.BACKGROUND_LOCATION_TASK_NAME
      )
    ) {
      this.setState({ enabled: true });
    }
    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("test", {
        name: "test",
        priority: "max",
        sound: true,
        vibrate: [0, 250, 250, 250],
        color: "#0000"
      });
    }
  }

  enabled = async () => {
    await Location.startLocationUpdatesAsync(
      func.BACKGROUND_LOCATION_TASK_NAME,
      {
        accuracy: Location.Accuracy.Highest,
        distanceInterval: 5000,
        showsBackgroundLocationIndicator: true
      }
    );
    this.setState({
      enable: true
    });
  };

  disable = async () => {
    await Location.stopLocationUpdatesAsync(func.BACKGROUND_LOCATION_TASK_NAME);
    this.setState({
      enable: false
    });
  };

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      const firestore = firebase.firestore();
      firestore
        .collection("users")
        .doc("IDs")
        .set({
          token
        });
    } else {
      console.log("Must use physical device for Push Notifications");
    }
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={gStyle.container}>
        <Text>Settings</Text>
        <Button
          title="press me"
          onPress={this.state.enable ? this.disable : this.enabled}
        />
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
)(Setting);

//Background location tracking
if (!TaskManager.isTaskDefined(func.BACKGROUND_LOCATION_TASK_NAME)) {
  TaskManager.defineTask(
    func.BACKGROUND_LOCATION_TASK_NAME,
    async ({ data, error }) => {
      if (error) {
        // Error occurred - check `error.message` for more details.
        console.log(error.message);
        return;
      }
      if (data) {
        const { locations } = data;
        console.log(locations)
        //Unsure how to access state outside of react, so ill just export the store for now.
        const state = store.getState();
        const radius = state.radius.radius;
        getParks(radius, locations);
      }
    }
  );
}
