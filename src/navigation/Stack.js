import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import Welcome from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import ModalScreen from "../screens/ModalScreen";
import MarkerScreen from "../screens/MarkerScreen";
import AuthScreen from "../screens/AuthScreen";

const MainNavigator = createStackNavigator(
  {
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
    initialRouteName: "Home",
    mode: "modal",
    transparentCard: true,
    cardStyle: { opacity: 1 }
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
    Welcome: {
      screen: Welcome,
      navigationOptions: {
        gesturesEnabled: false,
        header: null
      }
    }
  },
  {
    initialRouteName: "Welcome"
  }
);

const RootNavigator = createSwitchNavigator({
  // Auth: AuthNavigator,
  Main: MainNavigator
});

const App = createAppContainer(RootNavigator);

export default App;
