import React from "react";
import {
  Text,
  View,
  Animated,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 2.5;
const CARD_WIDTH = width * 0.7;

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
        .scrollTo({ x: index * CARD_WIDTH, y: 0, animated: true });
    }
  }

  render() {
    const { animation, markers, navigation } = this.props;
    return (
      <Animated.ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH}
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
      >
        {markers.map(marker => (
          <View style={styles.card} key={marker.id}>
            <Image
              source={{ uri: marker.image }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.distance}>
              <Text style={styles.distanceText}>
                {marker.distance.toFixed(2)}
              </Text>
            </View>
            <Text style={styles.cardtitle}>{marker.name}</Text>
            <View style={styles.textContent}>
              <TouchableOpacity
                style={styles.mapbtn}
                onPress={() => navigation.navigate("Setting")}
              >
                <Text style={styles.mapText}>Press Me</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    paddingVertical: 0
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH
  },
  card: {
    padding: 0,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH
  },
  cardImage: {
    flex: 3,
    width: "100%",
    alignSelf: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  cardtitle: {
    marginLeft: 10,
    padding: 10,
    fontSize: 20
  },
  textContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  distance: {
    flex: 1,
    marginTop: -50,
    marginLeft: CARD_WIDTH - 100
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
