import React from "react";
import { Animated, Easing, TouchableOpacity } from "react-native";

const knobOffset = 32;

export class Toggle extends React.Component {
  state = {
    isOn: this.props.isOn,
    animatedValue: new Animated.Value(this.props.isOn ? knobOffset : 0),
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isOn !== this.props.isOn) {
      this.setState({ isOn: this.props.isOn }, () => {
        Animated.timing(this.state.animatedValue, {
          toValue: this.state.isOn ? knobOffset : 0,
          easing: Easing.elastic(0.7),
          duration: 100,
          useNativeDriver: true,
        }).start();
      });
    }
  }

  handlePress() {
    this.setState({ isOn: !this.state.isOn }, () =>
      this.props.onToggle(this.state.isOn)
    );
  }

  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          backgroundColor: this.state.isOn ? "#363537" : "#000",
          width: 64,
          height: 32,
          borderRadius: 32,
          padding: 4,
          marginTop: 8
        }}
        onPress={() => this.handlePress()}
      >
        <Animated.View
          style={{
            width: 24,
            height: 24,
            borderRadius: 32,
            backgroundColor: "#fff",
            transform: [
              {
                translateX: this.state.animatedValue,
              },
            ],
          }}
        />
      </TouchableOpacity>
    );
  }
}
