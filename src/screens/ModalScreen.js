import React from "react";
import { Text, Button, TouchableOpacity } from "react-native";

export default class ModalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // has no idea you could do this
    // BackHandler.addEventListener("hardwareBackPress", function() {
    //   return true;
    // });
  }

  render() {
    const { navigation } = this.props;

    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#00000080"
        }}
      >
        <Text>Modal!</Text>
        <Button title="Hide popup" onPress={() => navigation.goBack()} />
      </TouchableOpacity>
    );
  }
}
