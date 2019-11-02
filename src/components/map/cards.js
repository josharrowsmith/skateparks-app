import React from "react";
import {
  Text,
  View,
  Animated,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking
} from "react-native";
import { device } from "../../constants";
import Card from "./card";
import Loading from "../home/loading";

export default class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      this.goToIndex();
    }, 1000);
  }

  goToIndex() {
    const { index } = this.props;
    if (this.scroll) {
      this.scroll
        .getNode()
        .scrollTo({ x: index * device.cardWidth, y: 0, animated: true });
    }
  }

  render() {
    const { animation, markers, navigation } = this.props;
    return (
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={device.cardWidth}
        ref={c => {
          this.scroll = c;
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: animation
                }
              }
            }
          ],
          { useNativeDriver: true }
        )}
        style={styles.scrollView}
        contentContainerStyle={styles.endPadding}
      >
        {markers.map(marker => (
          <Card marker={marker} navigation={navigation} />
        ))}
      </Animated.ScrollView>
    );
  }
}

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
