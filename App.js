import React from "react";
import { AppLoading } from "expo";
import { Provider } from "react-redux";
import { func } from "./src/constants";
import AppNavigator from "./src/navigation/AppNavigator";
import store from "./src/store/configStore";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  render() {
    const { isLoading } = this.state;
    console.ignoredYellowBox = ['Setting a timer'];

    if (isLoading) {
      return (
        <AppLoading
          onFinish={() => this.setState({ isLoading: false })}
          startAsync={func.loadAssetsAsync}
        />
      );
    }

    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;
