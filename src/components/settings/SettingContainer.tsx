import React from "react";
import { View } from "react-native";
import styled from "styled-components";

const Container = styled.View`
display: flex;
width: 100%
height: 100%
padding: 120px 20px 0 20px;
`;

const SettingContainer = ({ children }) => <Container>{children}</Container>;

export default SettingContainer;
