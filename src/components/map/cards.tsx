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
import Card from "./card";
import Loading from "../home/loading";
import { onScroll } from "react-native-redash";
import Animated from "react-native-reanimated";

const { Value, call, block, set } = Animated;

interface Iprops {
  parks: any;
  MarkerAnimation: any;
  navigation: any;
  theme: Object;
}

export default class Cards extends React.Component<Iprops> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { parks, MarkerAnimation, navigation, theme } = this.props;
    return (
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={device.cardWidth}
        style={styles.scrollView}
        contentContainerStyle={styles.endPadding}
        scrollEventThrottle={6}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: x => Animated.block([Animated.call([x], MarkerAnimation)])
                }
              }
            }
          ],
          {
            useNativeDriver: true
          }
        )}
      >
        {parks.map(park => (
          <Card key={park.id} park={park} navigation={navigation} theme={theme} />
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
    paddingRight: device.width - device.cardWidth
  }
});
