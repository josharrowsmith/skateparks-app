import React from "react";
import { Text, View, Button } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as TaskManager from 'expo-task-manager'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setRadius } from "../store/actions/radius";
import { func } from "../constants/index";
import { gStyle } from "../constants";

class Setttings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enable: false
    };
  }

  componentDidMount() {}

  _enabled = async () => {
    await Location.startLocationUpdatesAsync(func.BACKGROUND_LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Highest,
      distanceInterval: 5000,
      showsBackgroundLocationIndicator: true
    });
    this.setState({
      enable: true
    });
  };

  _disable = async () => {
    await Location.stopLocationUpdatesAsync(func.BACKGROUND_LOCATION_TASK_NAME);
    this.setState({
      enable: false
    });
  };

  render() {
    const { navigation } = this.props;
    console.log(this.state.enable)

    return (
      <View style={gStyle.container}>
        <Text>Settings</Text>
        <Button
          title="press me"
          onPress={this.state.enable ? this._disable : this._enabled}
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
)(Setttings);

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
        console.log(locations);
        //Unsure how to access state outside of react, so ill just export the store for now.
        // const state = store.getState();
        // const radius = state.radius.radius;
        // getParks(radius, locations);
      }
    }
  );
}
