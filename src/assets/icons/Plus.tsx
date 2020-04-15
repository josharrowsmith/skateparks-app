import React from "react";
import Svg, { Path } from "react-native-svg";

const Plus = ({ fill, size, theme }) => (
  <Svg
    height={size}
    width={size}
    viewBox="0 0 25 25"
    fillRule="evenodd"
    clipRule="evenodd"
  >
    <Path
      d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"
      fill={theme ? "#fff" : "#000"}
    />
  </Svg>
);

Plus.defaultProps = {
  fill: "#fff",
  size: 22
};

export default Plus;
