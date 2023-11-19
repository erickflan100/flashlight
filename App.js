import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Torch from "react-native-torch";
import Shake from '@shakebugs/react-native-shake';

export default function App() {
  const [toggle, setToggle] = useState(false);

  const handleChangeToggle = () => {
    setToggle(!toggle);
  }

  useEffect(() => {
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    Shake.setShakeOpenListener(() => {
      console.log('Shake opened!');
  });
  }, [])

  return (
    <View style={toggle ? styles.containerLight : styles.container}>
      <TouchableOpacity onPress={() => handleChangeToggle()} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={toggle ? styles.lightingOn : styles.lightingOff}
          source={toggle ? require("./assets/icons/eco-light.png") : require("./assets/icons/eco-light-off.png")}
        />
        <Image
          style={styles.logoDio}
          source={toggle ? require("./assets/icons/logo-dio.png") : require("./assets/icons/logo-dio-white.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#353535",
    alignItems: "center",
    justifyContent: "center",
  },
  containerLight: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  lightingOn: {
    resizeMode: "contain",
    width: 150,
    height: 150,
  },
  lightingOff: {
    resizeMode: "contain",
    width: 150,
    height: 150,
    tintColor: "white",
  },
  logoDio: {
    resizeMode: "contain",
    width: 250,
    height: 250,
  }
});
