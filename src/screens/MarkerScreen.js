import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { gStyle, device } from "../constants";

export default class Marker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation } = this.props;
    const marker = navigation.getParam("marker");

    return (
      <View style={gStyle.container}>
        <ScrollView
          horizontal
          snapToInterval={device.width}
          showsHorizontalScrollIndicator={false}
          style={{ width: device.width }}
        >
          {marker.image.map((item, index) => {
            return (
              <Image
                key={item.id}
                source={{ uri: item }}
                style={{ width: device.width }}
                resizeMode="cover"
              />
            );
          })}
        </ScrollView>
        <View style={styles.titleContainer}>
          <Text>{marker.name}</Text>
          <Text>Rating</Text>
        </View>
        <ScrollView style={styles.descriptionContainer}>
          <Text>{marker.description}</Text>
        </ScrollView>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>X</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: "yellow",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    fontSize: 42
  },
  descriptionContainer: {
    flex: 2,
    padding: 20
  },
  backBtn: {
    top: 25,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    position: "absolute",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  backText: {
    color: "white",
    fontSize: 38
  }
});
