import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { lightTheme, darkTheme } from "../constants/theme";
import { Bg } from "../constants/globalStyles";
import styled, { ThemeProvider } from "styled-components";
import { gStyle, device } from "../constants";

interface Iprops {
  parks: any;
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.body};
`;

const ParkTitle = styled.Text`
  font-size: 26px;
  color: ${(props) => props.theme.text};
  padding: 0 10px;
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
  color: ${(props) => props.theme.text};
  font-size: 38px;
`;

export default ({ navigation }) => {
  const { park, theme } = navigation.state.params;
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
                    backgroundColor: "#099",
                  }}
                />
              );
            })}
          </ScrollView>
          <ScrollView style={{ flex: 2 }}>
            <ParkTitle>{park.name}</ParkTitle>
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
