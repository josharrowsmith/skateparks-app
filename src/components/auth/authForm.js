import React, { Component } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  TouchableOpacity,
  Text
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  loginUser,
  signupUser,
  restoreSession
} from "../../store/actions/auth";
import DefaultInput from "./defaultInput";
import validate from "./validation";
import { device } from "../../constants";

class Form extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    authMode: "login",
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmPassword: {
        value: "",
        valid: false,
        validationRules: {
          equalTo: "password"
        },
        touched: false
      }
    }
  };

  componentDidMount() {
    this.props.restoreSession();
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === "login" ? "signup" : "login"
      };
    });
  };

  authHandler = () => {
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };
    if (this.state.authMode === "login") {
      this.props.loginUser(authData);
    } else {
      this.props.signupUser(authData);
    }
  };

  updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if (key === "password") {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === "password"
                ? validate(
                    prevState.controls.confirmPassword.value,
                    prevState.controls.confirmPassword.validationRules,
                    connectedValue
                  )
                : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
  };

  render() {
    let confirmPasswordControl = null;
    let Title = (
      <Text style={styles.h1}>Log in to Find.</Text>
    )
    let submitButton = (
      <TouchableOpacity
        style={styles.submitButton}
        onPress={this.authHandler}
        disabled={
          (!this.state.controls.confirmPassword.valid &&
            this.state.authMode === "signup") ||
          !this.state.controls.email.valid ||
          !this.state.controls.password.valid
        }
      >
        <Text style={styles.submitText}>Next</Text>
      </TouchableOpacity>
    );
    if (this.state.isLoading) {
      submitButton = <ActivityIndicator />;
    }
    if (this.state.authMode === "signup") {
      confirmPasswordControl = (
        <View style={styles.portraitPasswordWrapper}>
          <DefaultInput
            placeholder="Confirm Password"
            style={styles.input}
            value={this.state.controls.confirmPassword.value}
            onChangeText={val => this.updateInputState("confirmPassword", val)}
            valid={this.state.controls.confirmPassword.valid}
            touched={this.state.controls.confirmPassword.touched}
            secureTextEntry
          />
        </View>
      );
      Title = (
        <Text style={styles.h1}>Sign Up.</Text>
      )
    }
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {Title}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inputContainer}>
            <DefaultInput
              placeholder="Your E-Mail Address"
              style={styles.input}
              value={this.state.controls.email.value}
              onChangeText={val => this.updateInputState("email", val)}
              valid={this.state.controls.email.valid}
              touched={this.state.controls.email.touched}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />
            <View style={styles.portraitPasswordContainer}>
              <View style={styles.portraitPasswordWrapper}>
                <DefaultInput
                  placeholder="Password"
                  style={styles.input}
                  value={this.state.controls.password.value}
                  onChangeText={val => this.updateInputState("password", val)}
                  valid={this.state.controls.password.valid}
                  touched={this.state.controls.password.touched}
                  secureTextEntry
                />
              </View>
              {confirmPasswordControl}
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.buttonContainer}>
          {submitButton}
          <TouchableOpacity
            style={styles.switchButton}
            color="#29aaf4"
            onPress={this.switchAuthModeHandler}
          >
            <Text>
              Switch to {this.state.authMode === "login" ? "Sign Up" : "Login"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: "700"
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginVertical: 20
  },
  inputContainer: {
    width: device.width - 20
  },
  input: {
    borderColor: "#fff",
    borderBottomColor: "#eee"
  },
  portraitPasswordContainer: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  portraitPasswordWrapper: {
    width: "100%"
  },
  buttonContainer: {
    flexDirection: "row",
    height: 50,
    width: device.width - 20,
    justifyContent: "space-between",
    alignItems: "center"
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    alignSelf: "center"
  },
  switchButton: {
    justifyContent: "center",
    alignSelf: "center"
  },
  submitButton: {
    backgroundColor: "#000",
    width: 60,
    height: 30,
    borderRadius: 15,
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loginUser,
      signupUser,
      restoreSession
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
