import React from "react";
import Svg, { Path } from "react-native-svg";

const location = ({ fill, size }) => (
  <Svg
    height={size}
    width={size}
    viewBox="0 0 50 50"
    fillRule="evenodd"
    clipRule="evenodd"
  >
    <Path
      d="M 25 0 C 24.609375 0 24.257813 0.238281 24.09375 0.59375 L 2.1875 48.59375 C 2.019531 48.960938 2.097656 49.390625 2.375 49.6875 C 2.566406 49.890625 2.824219 50 3.09375 50 C 3.214844 50 3.351563 49.984375 3.46875 49.9375 L 25 41.65625 L 46.53125 49.9375 C 46.914063 50.082031 47.347656 49.984375 47.625 49.6875 C 47.902344 49.390625 47.980469 48.960938 47.8125 48.59375 L 25.90625 0.59375 C 25.742188 0.238281 25.390625 0 25 0 Z M 24 5.59375 L 24 39.90625 L 5.03125 47.1875 Z "
      fill={fill}
    />
  </Svg>
);

location.defaultProps = {
  fill: "black",
  size: 50
};

export default location;
