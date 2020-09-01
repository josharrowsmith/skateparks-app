import React from "react";
import styled from "styled-components";

const SettingTitle = styled.Text`
  fontSize: 35px;
  alignSelf: flex-start;
  textTransform: uppercase;
  color: ${(props) => props.theme.text};
`;

const User = styled.Text`
  fontSize: 14px;
  textTransform: lowercase;
  fontWeight: 500;
  color: ${(props) => props.theme.text};
`;

const Title = ({auth}) => (
  <SettingTitle>
    Options{"\n"}<User> {auth.email}</User>
  </SettingTitle>
);

export default Title;
