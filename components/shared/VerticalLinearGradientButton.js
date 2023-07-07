import React from 'react';
import LinearGradient from "react-native-linear-gradient";
import CustomText from "./CustomText";
import {StyleSheet, TouchableOpacity} from "react-native";

const VerticalLinearGradientButton = ({width, backgroundColors, borderColor, title, textColor, onItemPress, disabled}) => {
  return (
    <TouchableOpacity onPress={() => onItemPress()} style={{borderRadius: 10, borderWidth: borderColor ? 1 : 0, borderColor: borderColor, width: width}} disabled={disabled}>
      <LinearGradient start={{x: 1, y: 1}} end={{x: 1, y: 0}} colors={borderColor ? ['transparent', 'transparent'] : backgroundColors} style={styles.container}>
        <CustomText children={title} size={14} color={textColor}/>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default VerticalLinearGradientButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 10
  }
});
