import React from "react";
import { Text, View, Button, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginUser, restoreSession } from "../store/actions/auth";
import { gStyle } from "../constants";
import Form from "../components/auth/authForm";

// eslint-disable-next-line react/prefer-stateless-function
class AuthScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const userData = await AsyncStorage.getItem("userData");
    const transformedData = JSON.parse(userData);
    const { token, userId, expiryDate } = transformedData;
    const expirationDate = new Date(expiryDate);
    if (expirationDate >= new Date() || token || userId) {
      navigation.navigate("Home");
    }
  }

  componentDidUpdate() {
    const { navigation, auth } = this.props;
    if (auth.userId) {
      navigation.navigate("Home");
    }
  }

  render() {
    const { navigation, auth } = this.props;

    return (
      <View style={gStyle.container}>
        <Form />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loginUser,
      restoreSession
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthScreen);
