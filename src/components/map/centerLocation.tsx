import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Location from "../../assets/icons/location";
import styled from "styled-components";

const Center = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
  right: 20px;
  top: 50%;
  background-color: ${(props) => props.theme.location};
  border-radius: 25px;
  padding: 5px;
  color: ${(props) => props.theme.text};
`;

const CenterLocation = ({ pressed, theme }) => (
  <Center onPress={pressed}>
    <Location fill={theme.mode} size={35} />
  </Center>
);

export default CenterLocation;
