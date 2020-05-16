import React from "react";
import { StyleSheet, View, Animated, Dimensions } from "react-native";
import * as shape from "d3-shape";
import Svg, { Path } from "react-native-svg";
import Icons from "./icons";
import styled from "styled-components";
import SettingIcon from "../../assets/icons/Setting";
import RadarIcon from "../../assets/icons/Radar";
import PlusIcon from "../../assets/icons/Plus";
import SearchIcon from "../../assets/icons/Search";
import ToggleIcon from "../../assets/icons/Toggle";

const Navbar = styled.View`
  position: absolute;
  bottom: 0;
  background-color: ${(props) => props.theme.nav};
`;

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

interface Nav {
  toggle: any;
  Icons: any;
  theme: any;
  tabs: any;
}

interface NavProps {
  toggle: any;
  navigation: any;
  theme: any;
  tabs: any;
}

const { width } = Dimensions.get("window");
const height = 64;
const tabs = [
  { icon: <PlusIcon />, action: "Add" },
  { icon: <RadarIcon />, action: "Modal" },
  { icon: <ToggleIcon />, action: "toggle" },
  { icon: <SearchIcon />, action: "Search" },
  { icon: <SettingIcon />, action: "Settings" },
];
const tabWidth = width / tabs.length;

const getPath = (): string => {
  const left = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)([
    { x: 0, y: 0 },
    { x: width, y: 0 },
  ]);
  const tab = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(shape.curveBasis)([
    { x: width, y: 0 },
    { x: width + 5, y: 0 },
    { x: width + 10, y: 10 },
    { x: width + 15, y: height },
    { x: width + tabWidth - 15, y: height },
    { x: width + tabWidth - 10, y: 10 },
    { x: width + tabWidth - 5, y: 0 },
    { x: width + tabWidth, y: 0 },
  ]);
  const right = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)([
    { x: width + tabWidth, y: 0 },
    { x: width * 2.5, y: 0 },
    { x: width * 2.5, y: height },
    { x: 0, y: height },
    { x: 0, y: 0 },
  ]);
  return `${left} ${tab} ${right}`;
};
const d = getPath();

// eslint-disable-next-line react/prefer-stateless-function
class Nav extends React.PureComponent<NavProps> {
  value = new Animated.Value(0);

  render() {
    const { value } = this;
    const { toggle, navigation, theme } = this.props;
    const translateX = value.interpolate({
      inputRange: [0, width],
      outputRange: [-width, 0],
    });
    return (
      <>
        <Navbar width={width}>
          <AnimatedSvg
            width={width * 2.5}
            {...{ height }}
            style={{
              transform: [{ translateX: translateX }],
              backgroundColor: "transparent",
            }}
          >
            <Path fill={theme.mode ? "#363537" : "#fff"} {...{ d }} />
          </AnimatedSvg>
          <View style={StyleSheet.absoluteFill}>
            <Icons {...{ tabs, value, navigation, toggle, theme }} />
          </View>
        </Navbar>
      </>
    );
  }
}

export default Nav;
