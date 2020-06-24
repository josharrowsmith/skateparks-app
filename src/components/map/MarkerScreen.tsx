import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";
import { lightTheme, darkTheme } from "../../constants/theme";
import { Bg, Btn, SmallFontInv } from "../../constants/globalStyles";
import styled, { ThemeProvider } from "styled-components";
import { device } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { addRating, getParks } from "../../store/actions/parks";
import Stars from "react-native-stars";

interface Iprops {
  parks: any;
  update: any;
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.body};
`;

const TitleContainer = styled.View`
  display: flex;
  flexDirection: row;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
  width: ${device.width};
`;

const ParkTitle = styled.Text`
  padding: 0 10px;
  font-size: 20px;
  color: ${(props) => props.theme.text};
`;

const ParkDescription = styled.Text`
  padding: 0 10px;
  font-size: 16px;
  color: ${(props) => props.theme.text};
`;

const Back = styled.TouchableOpacity`
  top: 30px;
  left: 0;
  right: 0;
  background-color: transparent;
  position: absolute;
  width: 50px;
  height: 30px;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const BackBtn = styled.Text`
  color: ${(props) => props.theme.exit};
  font-size: 38px;
`;

export default ({ route, navigation }) => {
  const { park } = route.params;
  const { theme } = route.params;

  const [isLoading, setLoading] = useState(true);
  const localauth = useSelector((state) => state.auth);
  const location = useSelector((state) => state.location.location);
  const radius = useSelector((state) => state.radius.radius);
  const dispatch = useDispatch();
  return (
    <>
      <ThemeProvider theme={theme.mode === false ? lightTheme : darkTheme}>
        <Container>
          <ScrollView
            horizontal
            style={{ flex: 1 }}
            snapToInterval={device.width}
          >
            {park.image.map((item, index) => {
              return (
                <Image
                  key={item.toString()}
                  source={{ uri: item }}
                  style={{
                    resizeMode: "cover",
                    height: device.height / 2,
                    width: device.width,
                  }}
                />
              );
            })}
          </ScrollView>
          <ScrollView style={{ flex: 2 }}>
            <ParkTitle>{park.name}</ParkTitle>
            <TitleContainer>
              <Stars
                half={true}
                default={park.avgRating}
                spacing={5}
                starSize={20}
                count={5}
                update={(val) => {
                  dispatch(addRating(park.id, val, localauth.email));
                  // Fix this later
                  setTimeout(() => {
                    dispatch(
                      getParks(radius, location.latitude, location.longitude)
                    );
                    navigation.goBack();
                  }, 2000);
                }}
                fullStar={require("../../assets/starFilled.png")}
                emptyStar={require("../../assets/starEmpty.png")}
                halfStar={require("../../assets/starHalf.png")}
              />
              <Btn
                onPress={() =>
                  Linking.openURL(
                    `google.navigation:q=${park.coordinates._lat}+${park.coordinates._long}`
                  )
                }
              >
                <SmallFontInv font={18}>Maps</SmallFontInv>
              </Btn>
            </TitleContainer>
            <ParkDescription>{park.description}</ParkDescription>
          </ScrollView>
        </Container>
        <Back>
          <BackBtn onPress={() => navigation.goBack()}>X</BackBtn>
        </Back>
      </ThemeProvider>
    </>
  );
};
