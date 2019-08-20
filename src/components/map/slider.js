import React, { Component } from "react";
import { StyleSheet, Text, View, Animated, Dimensions } from "react-native";
import * as GestureHandler from "react-native-gesture-handler";

const { PanGestureHandler } = GestureHandler;

const { width, height } = Dimensions.get("window");
const SLIDER_MIN_VALUE = 0;
const SLIDER_MAX_VALUE = 25;
const SLIDER_WIDTH = width - 48;
const SLIDER_HEIGHT = 52;
const MAX_OUTPUT_RANGE = SLIDER_WIDTH - SLIDER_HEIGHT;
const SLIDER_SCALE = MAX_OUTPUT_RANGE / SLIDER_MAX_VALUE;

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: SLIDER_MIN_VALUE,
      currentValue: SLIDER_MIN_VALUE
    };

    this._translateX = new Animated.Value(0);
    this._sliderFinalText = new Animated.Value(0);
    this._lastOffsetX = 0;
    this._sliderHandleAnimatedVal = new Animated.Value(0);
    this._onGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this._translateX
          }
        }
      ],
      {
        useNativeDriver: true,
        listener: e => {
          const currentOffsetX = e.nativeEvent.translationX;
          const value =
            SLIDER_MAX_VALUE > 10
              ? Math.floor((this._lastOffsetX + currentOffsetX) / SLIDER_SCALE)
              : ((this._lastOffsetX + currentOffsetX) / SLIDER_SCALE).toFixed(
                  2
                );

          if (value <= 0) {
            this.setState({ value: 0 });
          } else if (value >= SLIDER_MAX_VALUE) {
            this.setState({ value: SLIDER_MAX_VALUE });
          } else {
            this.setState({ value });
          }
        }
      }
    );
  }

  _onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === GestureHandler.State.ACTIVE) {
      if (event.nativeEvent.absoluteX <= 32) {
        this._lastOffsetX = 0;
      } else if (event.nativeEvent.absoluteX >= width - 32) {
        this._lastOffsetX = MAX_OUTPUT_RANGE;
      } else {
        this._lastOffsetX += event.nativeEvent.translationX;
      }

      this._translateX.setOffset(this._lastOffsetX);
      this._translateX.setValue(0);
    }

    if (event.nativeEvent.state === GestureHandler.State.END) {
      this.setState({
        currentValue: this.state.value
      });
      this.props.sendData(this.state.value);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sliderContainer}>
          <View style={[styles.sliderRangeContainer, StyleSheet.absoluteFill]}>
            <View style={styles.sliderRangeDotContainer}>
              <View style={styles.sliderRangeDot} />
            </View>
          </View>
          <PanGestureHandler
            shouldCancelWhenOutside={false}
            onGestureEvent={this._onGestureEvent}
            onHandlerStateChange={this._onHandlerStateChange}
            id="dragbox"
          >
            <Animated.View
              onTouchStart={this._animateSliderHandleUp}
              onTouchEnd={this._animateSliderHandleDown}
              style={[
                styles.sliderHandleContainer,
                {
                  transform: [
                    {
                      translateX: this._translateX.interpolate({
                        inputRange: [0, MAX_OUTPUT_RANGE],
                        outputRange: [0, MAX_OUTPUT_RANGE],
                        extrapolate: "clamp"
                      })
                    }
                  ]
                }
              ]}
            >
              <View style={styles.sliderHandleInner}>
                <Text>{this.state.value}km</Text>
              </View>
            </Animated.View>
          </PanGestureHandler>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000080"
  },
  sliderRangeContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  sliderMinMaxTextContainer: {
    width: 48,
    alignItems: "center"
  },
  sliderMinMaxText: {
    paddingHorizontal: 8,
    fontWeight: "800",
    color: "white"
  },
  sliderRangeDotContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  sliderRangeDot: {
    width: "100%",
    height: 1,
    marginHorizontal: 6,
    backgroundColor: "black",
    borderRadius: 2
  },
  sliderContainer: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
    borderRadius: 4,
    shadowColor: "black",
    shadowRadius: 8,
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  sliderHandleContainer: {
    alignItems: "center",
    top: SLIDER_HEIGHT - SLIDER_HEIGHT * 1.5,
    width: SLIDER_HEIGHT,
    height: SLIDER_HEIGHT * 1.5
  },
  sliderHandleOuter: {
    width: SLIDER_HEIGHT,
    height: SLIDER_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SLIDER_HEIGHT / 2,
    borderColor: "black",
    borderWidth: 2
  },
  sliderHandleInner: {
    width: SLIDER_HEIGHT * 0.75,
    height: SLIDER_HEIGHT * 0.75,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: (SLIDER_HEIGHT * 0.75) / 2
  }
});
