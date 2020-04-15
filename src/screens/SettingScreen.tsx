import React from "react";
import { View, Button } from "react-native";
import * as Location from "expo-location";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeMode } from "../store/actions/theme";
import { lightTheme, darkTheme } from "../constants/theme";
import { Bg } from "../constants/globalStyles"
import styled, { ThemeProvider } from "styled-components";

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: false
    };
  }

  render() {
    const { navigation, theme, isToggled } = this.props;

    return (
      <ThemeProvider theme={theme.mode === false ? lightTheme : darkTheme}>
        <Bg>
          <Button
            title="Dark mode"
            onPress={() => this.props.changeMode(theme.mode)}
          >
            Dark mode
          </Button>
        </Bg>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    theme: state.theme
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeMode: changeMode
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
