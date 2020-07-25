import React, { useState } from "react";
import { Text, Button } from "react-native";

const Toggle = () => {
  const [isToggled, setToggle] = useState(false);

  return (
    <>
      <Button title="toggle" onPress={() => setToggle(!isToggled)}></Button>
      {isToggled && <Text>Hello</Text>}
    </>
  );
};

export default Toggle;
