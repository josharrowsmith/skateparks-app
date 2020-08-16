import React, { useEffect } from "react";
import {
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  Button,
} from "react-native";
import { lightTheme, darkTheme } from "../constants/theme";
import { Bg } from "../constants/globalStyles";
import styled, { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { changeMode } from "../store/actions/theme";
import LottieManager from "../components/home/lottieManger";
import LottieAnimation from "../assets/data/bike.json";
import * as authActions from "../store/actions/auth";
import { setRadius } from "../store/actions/radius";

const Title = styled.Text`
  font-size: 40px;
  text-transform: uppercase;
  color: ${(props) => props.theme.text};
`;

const WelcomeBtn = styled.TouchableOpacity`
  background: ${(props) => props.theme.text};
  width: 150px;
  height: 40px;
  border-radius: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BtnText = styled.Text`
  color: ${(props) => props.theme.body};
  text-align: center;
  font-size: ${16}px;
`;

const WelcomeScreen = (props) => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    // Unsure why its not working for now
    const getStorage = async () => {
      const data = await AsyncStorage.getItem("theme");
      if (!data) {
        return;
      }
      const radius = await AsyncStorage.getItem("radius");
      if (!radius) {
        dispatch(setRadius(5));
      }
      const transformedData = JSON.parse(data);
      const { theme } = transformedData;
      if (theme.mode == true) {
        dispatch(changeMode(theme));
      }
    };
    getStorage();
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme.mode === false ? lightTheme : darkTheme}>
      <Bg>
        <Title>Find</Title>
        <LottieManager
          json={LottieAnimation}
          height={280}
          width={30}
          style={{
            marginTop: -50,
            zIndex: -450000,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <WelcomeBtn onPress={() => props.navigation.navigate("Auth")}>
          <BtnText>Get Started</BtnText>
        </WelcomeBtn>
      </Bg>
    </ThemeProvider>
  );
};

export default WelcomeScreen;
