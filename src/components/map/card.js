import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking
} from "react-native";
import { device } from "../../constants";

const Card = ({ marker, navigation }) => (
  <View style={styles.card}>
    <TouchableOpacity
      style={styles.longPress}
      onLongPress={() =>
        navigation.navigate("Marker", {
          marker
        })
      }
    >
      <Image
        source={{ uri: marker.image[0] }}
        style={styles.cardImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
    <View style={styles.distance}>
      <Text style={styles.distanceText}>
        {marker.distance.toFixed(2) + "kms"}
      </Text>
    </View>
    <View style={styles.container}>
      <Text style={styles.cardtitle}>{marker.name}</Text>
      <View style={styles.textContent}>
        <Text>Rating</Text>
        <TouchableOpacity
          style={styles.mapbtn}
          onPress={() =>
            Linking.openURL(
              `google.navigation:q=${marker.coordinates._lat}+${marker.coordinates._long}`
            )
          }
        >
          <Text style={styles.mapText}>Maps</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  scrollView: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    paddingVertical: 0
  },
  endPadding: {
    paddingRight: device.width - device.cardWidth
  },
  card: {
    elevation: 2,
    backgroundColor: "transparent",
    padding: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: device.cardHeight,
    width: device.cardWidth
  },
  longPress: {
    width: "100%",
    height: "70%",
    opacity: 1
  },
  cardImage: {
    flex: 2,
    width: "100%",
    alignSelf: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  container: {
    backgroundColor: "white",
    height: "30%",
    width: "100%"
  },
  cardtitle: {
    fontSize: 16,
    paddingLeft: 20
  },
  textContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20
  },
  distance: {
    flex: 1,
    marginTop: -50,
    marginLeft: device.cardWidth - 100
  },
  distanceText: {
    color: "white",
    backgroundColor: "black",
    borderRadius: 30,
    textAlign: "center",
    width: 80,
    height: 25,
    justifyContent: "space-between"
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: 4,
    backgroundColor: "black"
  },
  mapbtn: {
    width: 100,
    height: 30,
    borderRadius: 15,
    backgroundColor: "black",
    color: "white"
  },
  mapText: {
    color: "white",
    textAlign: "center",
    alignContent: "center"
  }
});

export default Card;
