import React, { useEffect, useState, useRef } from "react";
import { Text, Button, View, TextInput, processColor } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Bg, Btn, SmallFontInv, Title } from "../../constants/globalStyles";
import styled, { ThemeProvider } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { lightTheme, darkTheme } from "../../constants/theme";
import BackBtn from "../../components/settings/BackBtn";
import { addPark, clearData, uploadImages } from "../../store/actions/parks";
import firebase from "../../config/firebase"

const UploadScreen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.places.details);
  const urls = useSelector((state) => state.places.urls);
  const location = useSelector((state) => state.places.location);


  const processPark = async () => {
    const id = firebase.firestore().collection("skateparks").doc().id;
    const firebaseUrls = await uploadImages(urls, details.name, id);
    await dispatch(addPark(id, firebaseUrls, location, details));
    navigation.navigate("Home");
    dispatch(clearData());
  };

  return (
    <ThemeProvider theme={true ? lightTheme : darkTheme}>
      <Bg>
        <BackBtn {...{ navigation }} text={"Go Home"} />
        <Btn onPress={processPark}>
          <SmallFontInv>Upload</SmallFontInv>
        </Btn>
      </Bg>
    </ThemeProvider>
  );
};

export default UploadScreen;
