import React from "react";
import { Text, View, Button } from "react-native";
import { gStyle } from "../constants";

// eslint-disable-next-line react/prefer-stateless-function
export default class Welcome extends React.Component {
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
      <View style={gStyle.container}>
        <Text>Welcome</Text>
        <Button title="press me" onPress={() => navigation.navigate("Home")}>
          press me
        </Button>
      </View>
    );
  }
}
