import React from "react";
import { Text, View, Button } from "react-native";
import { gStyle } from "../constants";

export default class Setttings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { navigation } = this.props;

    return (
      <View style={gStyle.container}>
        <Text>Settings</Text>
      </View>
    );
  }
}
