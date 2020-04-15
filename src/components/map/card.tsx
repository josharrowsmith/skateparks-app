import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ScrollView
} from "react-native";
import { device } from "../../constants";
import styled from "styled-components";

const CardStyle = styled.View`
  elevation: 2;
  background-color: transparent;
  padding: 10px;
  shadowColor: ${(props) => props.theme.body};
  shadowRadius: 5px;
  shadowOpacity: 0.3;
  shadowOffset: { x: 2px, y: -2px };
  height: ${device.cardHeight}px;
  width: ${device.cardWidth}px;
  z-Index: 1;
`;


const CardImage = styled.Image`
  width: 100%;
  height: 100%;
  align-self: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const CardContainer = styled.View`
  background-color: ${(props) => props.theme.body};
  width: 100%;
`;

const Cardtitle = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.text};
  margin: 5px 10px;
`;

const DistanceContainer = styled.View`
  position: absolute;
  top: 50px;
  margin-left: ${device.cardWidth - 100}px;
  z-Index: 999;
`;
const Distance = styled.Text`
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.body};
  border-radius: 30px;
  text-align: center;
  width: 80px;
  height: 25px;
  justify-content: space-between;
`;
const LongPress = styled.TouchableOpacity`
  width: 100%;
  height: 70%;
  opacity: 1;
`;

const Card = ({ park, navigation, theme }) => (
  <CardStyle>
    <LongPress
      onPress={() =>
        navigation.navigate("Marker", {
          park,
          theme,
        })
      }
    >
      <CardImage source={{ uri: park.image[0] }} resizeMode="cover" />
    </LongPress>
    <DistanceContainer>
      <Distance>{park.distance.toFixed(2) + "kms"}</Distance>
    </DistanceContainer>
    <CardContainer>
      <Cardtitle>{park.name}</Cardtitle>
    </CardContainer>
  </CardStyle>
);

export default Card;
