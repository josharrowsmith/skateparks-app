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
import Switch from "../components/switch";
import Grid from "../components/grid";

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      switchValue: false,
      switchValue2: false,
      switchValue3: false
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

  enabled = async value => {
    this.setState({ switchValue: value });
    await Location.startLocationUpdatesAsync(
      func.BACKGROUND_LOCATION_TASK_NAME,
      {
        accuracy: Location.Accuracy.Highest,
        distanceInterval: 5000,
        showsBackgroundLocationIndicator: true
      }
    );
  };

  disable = async value => {
    this.setState({ switchValue: false });
    await Location.stopLocationUpdatesAsync(func.BACKGROUND_LOCATION_TASK_NAME);
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

  ToggleSwitch = value => {
    this.setState({ switchValue2: value });
    console.log("Switch 1 is: " + value);
  };

  ToggleSwitch2 = value => {
    this.setState({ switchValue3: value });
    console.log("Switch 2 is: " + value);
  };

  render() {
    const { navigation } = this.props;

    return (
      <Grid navigation={navigation}>
        <Switch
          ToggleSwitch={this.state.switchValue ? this.disable : this.enabled}
          switchValue={this.state.switchValue}
        />
        <Switch
          ToggleSwitch={this.ToggleSwitch}
          switchValue={this.state.switchValue2}
        />
        <Switch
          ToggleSwitch={this.ToggleSwitch2}
          switchValue={this.state.switchValue3}
        />
      </Grid>
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
        //Unsure how to access state outside of react, so ill just export the store for now.
        const state = store.getState();
        const radius = state.radius.radius;
        getParks(radius, locations);
      }
    }
  );
}
