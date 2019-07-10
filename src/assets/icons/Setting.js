import React from "react";
import Svg, { Path } from "react-native-svg";

const SettingIcon = ({ fill, size }) => (
  <Svg height={size} width={size} viewBox="0 0 24 24">
    <Path
      d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"
      fill={fill}
    />
  </Svg>
);

SettingIcon.defaultProps = {
  fill: "black",
  size: 24
};

export default SettingIcon;
