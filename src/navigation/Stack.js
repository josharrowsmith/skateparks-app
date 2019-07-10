import { createAppContainer, createStackNavigator } from "react-navigation";
import Welcome from "../screens/Welcome";
import HomeScreen from "../screens/HomeScreen"
import SettingScreen from "../screens/Setting";
// grab navigation

const StackNavigator = createStackNavigator(
  {
    Welcome: {
      screen: Welcome,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Setting: {
      screen: SettingScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  },
  {
    headerMode: "none",
    initialRouteName: "Welcome"
  }
);

const App = createAppContainer(StackNavigator);

export default App;
