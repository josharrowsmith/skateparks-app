import React, { useState } from "react";
import {
  ActivityIndicator,
} from "react-native";
import { device } from "../../constants";
import styled from "styled-components";
import Loading from "../home/loading";

const CardStyle = styled.View`
  elevation: 2;
  background-color: transparent;
  padding: 10px;
  height: ${device.cardHeight}px;
  width: ${device.cardWidth}px;
  z-index: 1;
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
  z-index: 999;
`;
const Distance = styled.Text`
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.body};
  border-radius: 1000px;
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

const Card = ({ park, navigation, theme }) => {
  const [isLoading, setLoading] = useState(false);
  return (
    <CardStyle>
      <LongPress
        onPress={() =>
          navigation.navigate("Marker", {
            park,
            theme,
          })
        }
      >
        {!isLoading && (
          <ActivityIndicator
            color={theme.mode ? "#fff" : "#000"}
            size={100}
            style={{ position: "absolute", alignSelf: "center" }}
          />
        )}
        <CardImage
          onLoadEnd={() => setLoading(true)}
          source={{ uri: park.images[0] }}
          resizeMode="cover"
        />
      </LongPress>
      <DistanceContainer>
        <Distance>{park.distance.toFixed(2) + "kms"}</Distance>
      </DistanceContainer>
      <CardContainer>
        <Cardtitle>{park.name}</Cardtitle>
      </CardContainer>
    </CardStyle>
  );
};

export default Card;
