import React from "react";
import { Text, View, Button, BackHandler } from "react-native";
import LottieManager from "../components/home/lottieManger";
import LottieAnimation from "../assets/data/bike.json";
import { gStyle } from "../constants";

// eslint-disable-next-line react/prefer-stateless-function
export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // has no idea you could do this
    // BackHandler.addEventListener("hardwareBackPress", function() {
    //   return true;
    // });
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={gStyle.container}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: "900",
            textTransform: "uppercase"
          }}
        >
          Find
        </Text>
        <LottieManager
          json={LottieAnimation}
          height={280}
          width={30}
          style={{
            marginTop: -50,
            zIndex: -450000,
            justifyContent: "center",
            alignItems: "center"
          }}
        />
        <View style={{ width: 300 }}>
          <Button
            title="Get Started"
            onPress={() => navigation.navigate("Auth")}
            color="black"
          >
            Get Started
          </Button>
        </View>
      </View>
    );
  }
}