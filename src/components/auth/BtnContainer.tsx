import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { device } from "../../constants";

export const AuthContainer = styled.View`
  background-color: ${(props) => props.theme.body};
  padding: 0 10px;
  height: ${device.height}px;
`;

export const AuthTextBox = styled.View`
  width: ${device.width - 20}px;
`;

export const Container = styled.View`
  display: flex;
  justifyContent: space-between;
  flexDirection: row;
  padding: 25px 0;
`;

export const NextBtn = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.text};
  borderRadius: 30px;
  justifyContent: center;
  display: flex;
  alignItems: center;
  padding: 3px 15px;
`;

export const SwitchBtn = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.body};
`;

export const BtnText = styled.Text`
  color: ${(props) => props.theme.body};
  fontSize: 20px;
`;

export const GoogleBtn = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.body};
  border : 1px solid #eeeeee;
  border-radius: 30px;
  display: flex;
  flexDirection: row;
  alignItems: center;
  padding: 10px;
  max-width: 300px;
`;

export const GoogleText = styled.Text`
  color: ${(props) => props.theme.text};
  fontSize: 20px;
  margin: 0 10px;
`;

export const SwitchText = styled.Text`
  color: ${(props) => props.theme.text};
  fontSize: 20px;
  alignItems: center;
  padding: 3px 0;
`;

export const AuthTitle = styled.Text`
  color: ${props => props.theme.text};
  fontSize: 32px;
  padding: 15px 0;
`