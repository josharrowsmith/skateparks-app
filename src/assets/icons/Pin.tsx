import React from "react";
import Svg, { Path } from "react-native-svg";

const Pin = ({ fill, size, theme }) => (
  <Svg
    height={size}
    width={size}
    viewBox="0 0 24 24"
    fillRule="evenodd"
    clipRule="evenodd"
  >
    <Path
      d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 14c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"
      fill={theme ? "#fff" : "#000"}
    />
  </Svg>
);

Pin.defaultProps = {
  fill: "#fff",
  size: 22,
};

export default Pin;
