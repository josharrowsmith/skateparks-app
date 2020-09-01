import React from "react";
import { Text, View, Platform } from "react-native";
import * as AppAuth from "expo-app-auth";
import * as GoogleSignIn from "expo-google-sign-in";
import * as Constants from "expo-constants";
import GoogleIcon from "../../assets/icons/Google";
import { GoogleBtn, GoogleText } from "./BtnContainer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { onSignIn } from "../../store/actions/auth";
import Loading from "../home/dots";

const { OAuthRedirect, URLSchemes } = AppAuth;

const isInClient = Constants.AppOwnership === "expo";
if (isInClient) {
  GoogleSignIn.allowInClient();
}

const clientIdForUseInTheExpoClient =
  "";

/*
 * Redefine this one with your client ID
 *
 * The iOS value is the one that really matters,
 * on Android this does nothing because the client ID
 * is read from the google-services.json.
 */
const yourClientIdForUseInStandalone = Platform.select({
  android:
    "",
  ios: "",
});
const webClientId =
  "";
const clientId = isInClient
  ? clientIdForUseInTheExpoClient
  : yourClientIdForUseInStandalone;

class GoogleAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  async componentDidMount() {
    try {
      await GoogleSignIn.initAsync({
        isOfflineEnabled: true,
        isPromptEnabled: true,
        clientId,
        webClientId,
      });
    } catch ({ message }) {}
  }

  render() {
    const scheme = {
      OAuthRedirect,
      URLSchemes,
    };

    const { isLoading } = this.state;
  

    return (
      <>
        <GoogleBtn onPress={this._toggleAuth}>
          <GoogleIcon />
          <GoogleText>Sign in with Google</GoogleText>
        </GoogleBtn>
      </>
    );
  }

  _toggleAuth = () => {
    this._signInAsync();
  };

  _signInAsync = async () => {
    const { navigation } = this.props;
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      userAuth = await user.refreshAuth();
      if (type === "success") {
        await this.props.onSignIn(user.auth.idToken, user.auth.accessToken);
        navigation.navigate("Home");
      }
    } catch ({ message }) {
      alert(JSON.stringify(message));
    }
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      onSignIn: onSignIn,
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(GoogleAuth);
