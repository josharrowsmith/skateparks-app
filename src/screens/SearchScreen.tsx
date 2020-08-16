import React, { useRef, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
  StatusBar,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { device } from "../constants";
import styled, { ThemeProvider } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import algoliasearch from "algoliasearch";
import { InstantSearch } from "react-instantsearch-native";
import SearchBox from "../components/search/SearchBox";
import InfiniteHits from "../components/search/InfiniteHits";
import { ALGOLIA_ID, ALGOLIA_SEARCH } from "react-native-dotenv";

const algoliaClient = algoliasearch(
  ALGOLIA_ID,
  ALGOLIA_SEARCH
);

const searchClient = {
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          processingTimeMS: 0,
        })),
      });
    }

    return algoliaClient.search(requests);
  },
};

const SearchScreen = (props, navigation) => {
  const theme = useSelector((state) => state.theme);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <InstantSearch searchClient={searchClient} indexName="skateparks">
        <SearchBox theme={theme} />
        <InfiniteHits navigation={navigation} theme={theme} />
      </InstantSearch>
    </>
  );
};

export default SearchScreen;
