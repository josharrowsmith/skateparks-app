import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Bg } from "../../constants/globalStyles";
import styled, { ThemeProvider } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { ImageBrowser } from "expo-image-picker-multiple";
import * as ImageManipulator from "expo-image-manipulator";
import { lightTheme, darkTheme } from "../../constants/theme";
import BackBtn from "../../components/settings/BackBtn";
let onSubmit;

const ImageBrowserScreen = (props) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.headerBtn} onPress={() => onSubmit()}>
          <Text style={styles.headerText}>Done</Text>
        </TouchableOpacity>
      ),
    });
  }, [props]);

  const emptyStayComponent = (
    <Text style={{ textAlign: "center" }}>Empty =(</Text>
  );

  const imagesCallback = (callback) => {
    callback
      .then(async (photos) => {
        const cPhotos = [];
        for (let photo of photos) {
          const pPhoto = await _processImageAsync(photo.uri);
          cPhotos.push({
            uri: pPhoto.uri,
            name: photo.filename,
            type: "image/jpg",
            base64: pPhoto.base64,
          });
        }
        navigation.navigate("Main", { photos: cPhotos });
      })
      .catch((e) => console.log(e));
  };

  async function _processImageAsync(uri) {
    const file = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1000 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG, base64: true }
    );
    return file;
  }

  const renderSelectedComponent = (number) => (
    <View style={styles.countBadge}>
      <Text style={styles.countBadgeText}>{number}</Text>
    </View>
  );

  return (
    <ThemeProvider theme={true ? lightTheme : darkTheme}>
      <Bg>
        <View style={[styles.flex, styles.container]}>
          <ImageBrowser
            max={6}
            onChange={(count, callback) => {
              onSubmit = callback;
            }}
            callback={imagesCallback}
            renderSelectedComponent={renderSelectedComponent}
            emptyStayComponent={emptyStayComponent}
          />
        </View>
      </Bg>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    position: "relative",
  },
  emptyStay: {
    textAlign: "center",
  },
  countBadge: {
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: "absolute",
    right: 3,
    bottom: 3,
    justifyContent: "center",
    backgroundColor: "#0580FF",
  },
  countBadgeText: {
    fontWeight: "bold",
    alignSelf: "center",
    padding: "auto",
    color: "#ffffff",
  },
  headerBtn: {
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: "absolute",
    right: 3,
    justifyContent: "center",
    backgroundColor: "#000",
  },
  headerText: {
    color: "#fff",
  },
});

export default ImageBrowserScreen;
