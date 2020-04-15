import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import MarkerScreen from "../screens/MarkerScreen";

const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        navigationOptions: false
      }
    },
    Setting: {
      screen: SettingScreen,
      navigationOptions: {
        navigationOptions: false
      }
    },
    Marker: {
      screen: MarkerScreen,
      navigationOptions: {
        navigationOptions: false
      }
    }
  },
  {
    headerMode: "none"
  }
);

const RootNavigator = createSwitchNavigator({
  Main: MainNavigator
});

const App = createAppContainer(RootNavigator);

export default App;
