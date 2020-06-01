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

export const GoogleBtn = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.body};
  border: 1px solid #eeeeee;
  border-radius: 30px;
  display: flex;
  flexdirection: row;
  alignitems: center;
  padding: 10px;
  max-width: 300px;
`;

export const GoogleText = styled.Text`
  color: ${(props) => props.theme.text};
  fontsize: 20px;
  margin: 0 10px;
`;

export const Container = styled.View`
  display: flex;
  justifycontent: space-between;
  flexdirection: row;
  padding: 25px 0;
`;

export const NextBtn = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.text};
  borderradius: 30px;
  justifycontent: center;
  display: flex;
  alignitems: center;
  padding: 3px 15px;
`;

export const SwitchBtn = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.body};
`;

export const BtnText = styled.Text`
  color: ${(props) => props.theme.body};
  fontsize: 20px;
`;

export const SwitchText = styled.Text`
  color: ${(props) => props.theme.text};
  fontsize: 20px;
  alignitems: center;
  padding: 3px 0;
`;

export const AuthTitle = styled.Text`
  color: ${(props) => props.theme.text};
  fontsize: 32px;
  padding: 15px 0;
`;
