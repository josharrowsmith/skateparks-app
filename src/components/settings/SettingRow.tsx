import React from "react";
import { View } from "react-native";
import styled from "styled-components";

const SetRow = styled.View`
  flexDirection: row;
  justifyContent: space-between;
  width: 80%;
  padding: 10px 0px;
  alignItems: center;
`;

const SettingRow = ({ children }) => <SetRow>{children}</SetRow>;

export default SettingRow;
