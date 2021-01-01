import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Button,
  Platform
} from "react-native";
import { lightTheme, darkTheme } from "../../constants/theme";
import { Bg, Btn, SmallFontInv } from "../../constants/globalStyles";
import styled, { ThemeProvider } from "styled-components";
import { device } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { addRating, editPark, deletePark } from "../../store/actions/parks";
import Stars from "react-native-stars";
import { Ionicons } from "@expo/vector-icons";

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
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
  width: ${device.width};
`;

const ParkTitle = styled.TextInput`
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
  display: flex;
  align-items: center;
`;

const FullStar = styled(Ionicons)`
  color: ${(props) => props.theme.text};
  font-size: 38px;
`;

export default ({ route, navigation }) => {
  const { park } = route.params;
  const { theme } = route.params;

  const [isLoading, setLoading] = useState(true);
  const localauth = useSelector((state) => state.auth);
  const location = useSelector((state) => state.location.location);
  const radius = useSelector((state) => state.radius.radius);
  const [name, onChangeName] = useState();
  const [desc, onChangeDescription] = useState();
  const dispatch = useDispatch();

  const ratePark = async (val) => {
    await dispatch(addRating(park.id, val, localauth.email));
    navigation.goBack();
  };

  const deleteCollection = async () => {
    await dispatch(deletePark(park.id));
    navigation.goBack();
  };

  const updatePark = () => {
    if (name) {
      dispatch(editPark(name, park.id, "name"));
      onChangeName(null);
    }
    if (desc) {
      dispatch(editPark(desc, park.id, "description"));
      onChangeDescription(null);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme.mode === false ? lightTheme : darkTheme}>
        <Container>
          <ScrollView
            horizontal
            style={{ flex: 1 }}
            snapToInterval={device.width}
          >
            {park.images.map((item, index) => {
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
            <ParkTitle
              editable={localauth.admin}
              onChangeText={(text) => onChangeName(text)}
            >
              {park.name}
            </ParkTitle>
            <TitleContainer>
              <Stars
                half={true}
                default={park.rating}
                spacing={5}
                starSize={30}
                count={5}
                update={(val) => ratePark(val)}
                fullStar={require("../../assets/starFilled.png")}
                emptyStar={require("../../assets/starEmpty.png")}
                halfStar={require("../../assets/starHalf.png")}
              />
              <Btn
                onPress={() =>
                  Linking.openURL(
                    `google.navigation:q=${park.coordinates.latitude}+${park.coordinates.longitude}`
                  )
                }
              >
                <SmallFontInv font={18}>Maps</SmallFontInv>
              </Btn>
            </TitleContainer>
            <ParkDescription
              editable={localauth.admin}
              onChangeText={(text) => onChangeDescription(text)}
            >
              {park.description}
            </ParkDescription>
          </ScrollView>
          {localauth.admin && (
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Btn style={{ marginBottom: 10 }} onPress={updatePark}>
                <SmallFontInv font={18}>update</SmallFontInv>
              </Btn>
              <Btn style={{ marginBottom: 10 }} onPress={deleteCollection}>
                <SmallFontInv font={18}>delete</SmallFontInv>
              </Btn>
            </View>
          )}
        </Container>
        <Back>
          <BackBtn onPress={() => navigation.navigate("Home")}>X</BackBtn>
        </Back>
      </ThemeProvider>
    </>
  );
};
