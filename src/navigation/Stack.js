import { createAppContainer, createStackNavigator } from "react-navigation";
import Welcome from "../screens/Welcome";
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/Setting";
import ModalScreen from "../screens/ModalScreen";
import MarkerScreen from "../screens/MarkerScreen";

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
    },
    Marker: {
      screen: MarkerScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Modal: {
      screen: ModalScreen
    }
  },
  {
    headerMode: "none",
    initialRouteName: "Setting",
    mode: "modal",
    transparentCard: true,
    cardStyle: { opacity: 1 }
  }
);

const App = createAppContainer(StackNavigator);

export default App;
