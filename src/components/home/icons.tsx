import React, { cloneElement } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  Dimensions
} from "react-native";
import styled from "styled-components";

const { width } = Dimensions.get("window");

const Circle = styled.View`
  background-color: ${props => props.theme.body};
  width: 40px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 64
  }
});

interface Tab {
  action: string;
  icon: any;
  toggle: any;
}

interface StaticTabbarProps {
  tabs: Tab[];
  value: Animated.Value;
  toggle: any;
  navigation: any;
}

export default class Icons extends React.PureComponent<StaticTabbarProps> {
  values: Animated.Value[] = [];

  constructor(props: StaticTabbarProps) {
    super(props);
    const { tabs } = this.props;
    this.values = tabs.map(
      (tab, index) => new Animated.Value(index === 0 ? 1 : 0)
    );
  }

  onPress = (index: number, tab) => {
    const { value, tabs } = this.props;
    const tabWidth = width / tabs.length;
    Animated.sequence([
      Animated.parallel(
        this.values.map(v =>
          Animated.timing(v, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true
          })
        )
      ),
      Animated.parallel([
        Animated.spring(value, {
          toValue: tabWidth * index,
          useNativeDriver: true
        }),
        Animated.spring(this.values[index], {
          toValue: 1,
          useNativeDriver: true
        })
      ])
    ]).start();
  };

  render() {
    const { tabs, value, toggle, navigation, theme } = this.props;
    const tabWidth = width / tabs.length;
    return (
      <View style={styles.container}>
        {tabs.map((tab, key) => {
          const tabWidth = width / tabs.length;
          const cursor = tabWidth * key;
          const opacity = value.interpolate({
            inputRange: [cursor - tabWidth, cursor, cursor + tabWidth],
            outputRange: [1, 0, 1],
            extrapolate: "clamp"
          });
          const translateY = this.values[key].interpolate({
            inputRange: [0, 1],
            outputRange: [64, 0],
            extrapolate: "clamp"
          });
          const opacity1 = this.values[key].interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: "clamp"
          });
          return (
            <React.Fragment key={key}>
              <TouchableWithoutFeedback
                onPress={() => {
                  if (tab.action == "toggle") {
                    toggle();
                  } else {
                    navigation.navigate(tab.action);
                  }
                  this.onPress(key, tab);
                }}
              >
                <Animated.View style={[styles.tab, { opacity }]}>
                  {cloneElement(tab.icon, {
                    active: true,
                    theme: theme.mode
                  })}
                </Animated.View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  if (tab.action == "toggle") {
                    toggle();
                  }
                }}
              >
                <Animated.View
                  style={{
                    position: "absolute",
                    top: -8,
                    left: tabWidth * key,
                    width: tabWidth,
                    height: 64,
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: opacity1,
                    transform: [{ translateY }]
                  }}
                >
                  <Circle>
                    {cloneElement(tab.icon, {
                      active: true,
                      theme: theme.mode
                    })}
                  </Circle>
                </Animated.View>
              </TouchableWithoutFeedback>
            </React.Fragment>
          );
        })}
      </View>
    );
  }
}
