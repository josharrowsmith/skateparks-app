import React from "react";
import { Button, StyleSheet, View } from "react-native";
import Lottie from "lottie-react-native";

export default class lottieManager extends React.Component {
  state = {
    animation: null,
  };

  componentDidMount() {
    this._playAnimation();
  }

  render() {
    return (
      <View style={this.props.style}>
        {this.state.animation && (
          <Lottie
            ref={(animation) => {
              this.animation = animation;
            }}
            style={{
              zIndex: -10012012,
              width: this.props.width || 400,
              height: this.props.height || 400,
            }}
            source={this.state.animation}
          />
        )}
      </View>
    );
  }

  _playAnimation = () => {
    if (!this.state.animation) {
      this._loadAnimationAsync();
    } else {
      this.animation.reset();
      this.animation.play();
    }
  };

  _loadAnimationAsync = async () => {
    let result;
    if (this.props.json) {
      result = this.props.json;
    }
    if (this.props.url) {
      result = await fetch(this.props.url)
        .then((data) => {
          return data.json();
        })
        .catch((error) => {
          console.error(error);
        });
    }
    this.setState({ animation: result }, this._playAnimation);
  };
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingTop: 20,
  },
});
