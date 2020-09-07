import React, { useEffect } from "react";
import {
  View,
  AsyncStorage,
  Dimensions,
} from "react-native";
import { lightTheme, darkTheme } from "../constants/theme";
import { Bg } from "../constants/globalStyles"; 
import styled, { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { changeMode } from "../store/actions/theme";
import { device } from "../constants";
import LottieManager from "../components/home/lottieManger";
import LottieAnimation from "../assets/data/bike.json";
import { setRadius } from "../store/actions/radius";
import LottieView from "lottie-react-native";

const { height, width } = Dimensions.get("window");

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

  console.log(device.width);

  return (
    <ThemeProvider theme={theme.mode === false ? lightTheme : darkTheme}>
      <View
        style={{
          zIndex: 99,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Title>SOTI</Title>
        <LottieManager
          json={LottieAnimation}
          height={280}
          width={30}
          style={{
            marginTop: -60,
            zIndex: 99,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <WelcomeBtn onPress={() => props.navigation.navigate("Auth")}>
          <BtnText>Get Started</BtnText>
        </WelcomeBtn>
      </View>
      <LottieView
        loop={true}
        width={device.width + 80}
        style={{ marginTop: 45 }}
        height={500}
        resizeMode={"cover"}
        autoPlay
        source={require("../assets/data/blob.json")}
      />
    </ThemeProvider>
  );
};
1;

export default WelcomeScreen;
