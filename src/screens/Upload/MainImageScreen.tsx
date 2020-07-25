import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  Button,
  View,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Bg, Btn, SmallFontInv, Title } from "../../constants/globalStyles";
import styled, { ThemeProvider } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { lightTheme, darkTheme } from "../../constants/theme";
import BackBtn from "../../components/settings/BackBtn";
import LottieManager from "../../components/home/lottieManger";
import Upload from "../../assets/data/upload.json";
import { uploadImages, storeUrls } from "../../store/actions/parks";

const MainImageScreen = (props) => {
  const navigation = useNavigation();
  const [stateParams, setNameState] = useState(null);
  const details = useSelector((state) => state.places.details);
  const dispatch = useDispatch();

  useEffect(() => {
    const { params } = props.route;
    if (params) {
      const { photos } = params;
      if (photos) setNameState(photos);
      delete params.photos;
    }
  }, [props]);

  useEffect(() => {
    async function uploadTest() {
      if (stateParams) {
        // const urls = await uploadImages(stateParams, details.name);
        await dispatch(storeUrls(stateParams));
      }
    }
    uploadTest();
  }, [stateParams]);

  const renderImage = (item, i) => {
    return (
      <View key={i} style={{ padding: 5 }}>
        <Image
          style={{ height: 100, width: 100 }}
          source={{ uri: item.uri }}
          key={i}
        />
      </View>
    );
  };

  return (
    <ThemeProvider theme={true ? lightTheme : darkTheme}>
      <Bg>
        <BackBtn {...{ navigation }} text={"Go Home"} />
        <View style={styles.flex}>
          {!stateParams && (
            <>
              <LottieManager
                json={Upload}
                height={400}
                width={300}
                style={{
                  marginTop: 30,
                }}
              />
              <View style={styles.btnRow}>
                <Btn onPress={() => console.log("camera")}>
                  <SmallFontInv>Open Camera</SmallFontInv>
                </Btn>
                <Btn onPress={() => navigation.navigate("ImageUpload")}>
                  <SmallFontInv>Camera Roll</SmallFontInv>
                </Btn>
              </View>
            </>
          )}
          {stateParams && (
            <View style={styles.grid}>
              {stateParams.map((item, i) => renderImage(item, i))}
            </View>
          )}
        </View>
      </Bg>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    flexDirection: "row",
    marginHorizontal: 10,
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  btnRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
  },
});

export default MainImageScreen;
