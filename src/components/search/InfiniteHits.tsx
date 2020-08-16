import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { connectInfiniteHits } from "react-instantsearch-native";
import Highlight from "./Highlight";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { goToPark } from "../../store/actions/parks";
import { device } from "../../constants";
import Rating from "react-native-stars";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../constants/theme";
import { Ionicons } from "@expo/vector-icons";

const Item = styled.TouchableOpacity`
  padding: ${20}px;
  flexDirection: column;
`;

const Separator = styled.View`
  marginRight: ${10}px;
  marginLeft: ${10}px;
  borderColor: #e8e8e8e8;
  borderBottomWidth: ${1}px;
`;

const ParkName = styled.Text`
  fontSize: ${18}px;
  color: ${(props) => props.theme.text};
`;

const FullStar = styled(Ionicons)`
  color: ${(props) => props.theme.text};
  font-size: ${18}px;
`;


const renderRow = ({ item: hit, navigate, dispatch, theme }) => {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View style={{ alignSelf: "center" }}>
        <Image
          source={{ uri: hit.d.images[0] }}
          resizeMode="cover"
          style={{ width: 50, height: 50, borderRadius: 50, marginLeft: 10 }}
        />
      </View>
      <Item
        onPress={async () => {
          const data = await dispatch(goToPark(hit.objectID));
          const park = data.d;
          navigate("Marker", {
            park,
            theme,
          });
        }}
      >
        <ParkName>
          <Highlight
            attribute="d.name"
            hit={hit}
            highlightProperty="_highlightResult"
            theme={theme}
          />
        </ParkName>

        <View style={{ alignSelf: "flex-start" }}>
          <Rating disabled={true} rating={hit.d.rating}  fullStar={<FullStar name={'md-star'}/>}
                emptyStar={<FullStar name={'md-star-outline'}/>}
                halfStar={<FullStar name={'md-star-half'}/>} />
        </View>
      </Item>
    </View>
  );
};

const InfiniteHits = ({ hits, hasMore, refine, theme }) => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  return (
    <ThemeProvider theme={theme.mode === false ? lightTheme : darkTheme}>
      <FlatList
        style={{
          position: "relative",
          backgroundColor: "transparent",
          borderRadius: 15,
          width: device.width - 20,
          marginTop: 10,
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 20,
        }}
        data={hits}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <Separator />}
        onEndReached={() => hasMore && refine()}
        renderItem={({ item, index }) => (
          <View>
            {item === undefined
              ? null
              : renderRow({ item, navigate, dispatch, theme })}
          </View>
        )}
      />
    </ThemeProvider>
  );
};

export default connectInfiniteHits(InfiniteHits);
