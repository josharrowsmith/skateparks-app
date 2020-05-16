import React from "react";
import { View } from "react-native";
import styled from "styled-components";

const SettingTitle = styled.Text`
  fontSize: 35px;
  alignSelf: flex-start;
  textTransform: uppercase;
  color: ${(props) => props.theme.text};

`;

const Title = () => <SettingTitle>Options</SettingTitle>;

export default Title;
