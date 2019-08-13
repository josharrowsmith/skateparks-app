import React from "react";
import { TouchableOpacity, Platform, Text, View } from "react-native";
import { Notifications } from "expo";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as TaskManager from "expo-task-manager";
import Constants from "expo-constants";
import firebase from "../config/firebase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setRadius } from "../store/actions/radius";
import { setNotifications, removeNotifications } from "../store/actions/switch";
import { logoutUser } from "../store/actions/auth";
import { func } from "../constants/index";
import store from "../store/configStore";
import { getParks } from "../store/actions/notification";
import Switch from "../components/setting/switch";
import Grid from "../components/setting/grid";

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      switchValue: this.props.notification,
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
    this.props.setNotifications();
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
    this.props.removeNotifications();
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

  LogOut = () => {
    this.props.logoutUser();
    this.props.navigation.navigate("Auth");
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ backgroundColor: "#4d4b4b", flex: 1 }}>
        <Grid navigation={navigation}>
          <Switch
            ToggleSwitch={this.props.notification ? this.disable : this.enabled}
            switchValue={this.props.notification}
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
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            width: 100,
            height: 50
          }}
          onPress={this.LogOut}
        >
          <Text>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    radius: state.radius.radius,
    notification: state.notification.notification
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setRadius: setRadius,
      setNotifications: setNotifications,
      removeNotifications: removeNotifications,
      logoutUser: logoutUser
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
