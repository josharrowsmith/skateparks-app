import React from "react";
import { AppLoading } from "expo";
import { func } from "./src/constants";
import Stack from "./src/navigation/Stack";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <AppLoading
          onFinish={() => this.setState({ isLoading: false })}
          startAsync={func.loadAssetsAsync}
        />
      );
    }

    return (
      <React.Fragment>
        <Stack />
      </React.Fragment>
    );
  }
}

export default App;
