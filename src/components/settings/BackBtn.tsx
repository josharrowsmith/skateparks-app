import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import styled from "styled-components";
import { device } from "../../constants";

const Back = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.text};
  position: absolute;
  top: 24px;
  left: 0;
  width: ${device.width / 1.3}px;
  borderBottomRightRadius: 30px;
  borderTopRightRadius: 30px;
  display: flex;
  flexDirection: row;
  justifyContent: space-around;
  marginTop: 22px;
  marginBottom: 22px;
`;

const X = styled.Text`
  color: ${(props) => props.theme.body};
  fontSize: 42px;
`;

const BackText = styled.Text`
  color: ${(props) => props.theme.body};
  fontSize: 28px
  textTransform: uppercase;
  alignSelf: center;
`

const BackBtn = ({ navigation, text }) => (
  <Back onPress={() => navigation.navigate("Home")}>
    <X>X</X>
    <BackText>{text}</BackText>
  </Back>
);

export default BackBtn;
