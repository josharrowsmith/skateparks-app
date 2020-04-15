import React from "react";
import Svg, { Path } from "react-native-svg";

const Toggle = ({ fill, size, theme }) => (
  <Svg height={size} width={size} viewBox="0 0 24 24">
    <Path d="M0 12v1h23v-1h-23z" fill={theme ? "#fff" : "#000"} />
  </Svg>
);

Toggle.defaultProps = {
  fill: "#fff",
  size: 24
};

export default Toggle;
