import React from "react";
import { Switch } from "react-native";

const SettingSwitch = props => (
  <Switch
    trackColor={{ true: "grey", false: "grey" }}
    thumbColor={props.switchValue ? "green" : "yellow"}
    value={props.switchValue}
    onValueChange={props.ToggleSwitch}
  />
);

export default SettingSwitch;
