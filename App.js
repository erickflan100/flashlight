import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import Torch from "react-native-torch";
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [toggle, setToggle] = useState(false);
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => Accelerometer.setUpdateInterval(400);
  // const _fast = () => Magnetometer.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(gyro => {setData(gyro)}));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _slow();
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const handleChangeToggle = () => {
    setToggle(!toggle);
  }

  useEffect(() => {
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    if(x > 1) {
      handleChangeToggle();
    }else if(x < -0.90) {
      handleChangeToggle();
    }
  }, [x]);


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
      <Text>x: {x} y: {y} z: {z}</Text>
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
