import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from "react-native-paper";

const Dot = ({backgroundColor, size = 5}) => {

  const { colors } = useTheme();

  return (
    <View style={[styles.dot, {backgroundColor: backgroundColor ? backgroundColor : colors.primaryColor, width: size, height: size}]}/>
  );
};

const styles = StyleSheet.create({
  dot: {
    borderRadius: 100,
    marginHorizontal: 6
  }
});

export default Dot;
