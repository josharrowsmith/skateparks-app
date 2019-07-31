import React from "react";
import { Text, View, Button, Image, StyleSheet } from "react-native";
import { gStyle } from "../constants";

export default class Setttings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { navigation } = this.props;
    const marker = navigation.getParam("marker");

    return (
      <View style={gStyle.container}>
        <Text>{marker.name}</Text>
        <Image
          source={{ uri: marker.image }}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardImage: {
    flex: 1,
    height: "100%",
    width: "100%"
  }
});
