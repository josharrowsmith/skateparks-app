import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  Button,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { AuthContainer, AuthTextBox } from "../../components/auth/BtnContainer";
import { useSelector, useDispatch } from "react-redux";
import { Bg, Btn, SmallFontInv, Title } from "../../constants/globalStyles";
import styled, { ThemeProvider } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { lightTheme, darkTheme } from "../../constants/theme";
import BackBtn from "../../components/settings/BackBtn";
import { storeDetails } from "../../store/actions/parks";
import Input from "../../components/auth/input";
import Stars from "react-native-stars";

const DetailsScreen = ({ props, route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [name, onChangeName] = useState();
  const [desc, onChangeDescription] = useState();
  const [rating, onChangeRating] = useState();

  return (
    <ThemeProvider theme={true ? lightTheme : darkTheme}>
      <Bg>
        <View style={styles.flex}>
          <KeyboardAvoidingView keyboardVerticalOffset={100}>
            <AuthTextBox>
              <ScrollView>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => onChangeName(text)}
                  value={name}
                  placeholder="Name"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => onChangeDescription(text)}
                  value={desc}
                  placeholder="Description"
                  multiline
                  numberOfLines={2}
                />
              </ScrollView>
              <View style={{ alignItems: "flex-start", paddingVertical: 20 }}>
                <Stars
                  half={true}
                  default={1}
                  spacing={5}
                  starSize={30}
                  count={5}
                  update={(val) => {
                    onChangeRating(val);
                  }}
                  fullStar={require("../../assets/starFilled.png")}
                  emptyStar={require("../../assets/starEmpty.png")}
                  halfStar={require("../../assets/starHalf.png")}
                />
              </View>
            </AuthTextBox>
          </KeyboardAvoidingView>
          <View style={{ alignSelf: "flex-start" }}>
            <Btn
              onPress={async () => dispatch(storeDetails(name, desc, rating))}
            >
              <SmallFontInv>Confirm</SmallFontInv>
            </Btn>
          </View>
        </View>
      </Bg>
      <BackBtn {...{ navigation }} text={"Go Home"} />
    </ThemeProvider>
  );
};
12;
const styles = StyleSheet.create({
  flex: {
    position: "absolute",
    top: 130,
    marginHorizontal: 10,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 10,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    fontSize: 18,
  },
});

export default DetailsScreen;
