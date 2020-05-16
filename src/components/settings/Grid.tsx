import React from "react";
import { View } from "react-native";
import styled from "styled-components";

const Container = styled.View`
  display: flex;
  flexDirection: column;
  justifyContent: flex-start;
  alignItems: flex-start;
  alignContent: stretch;
  width: 100%;
  height: 100%;
`;

const Grid = ({ children }) => <Container>{children}</Container>;

export default Grid;
