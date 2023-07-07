import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useTheme} from "react-native-paper";
import LottieView from "lottie-react-native";
import {useSelector} from "react-redux";
import {themeSelector} from "../../store/helpers";

const ActivityIndicatorComponent = ({ animating }) => {

  const theme = useSelector(themeSelector());

  return (
    <View style={styles.loading}>
      <View  style={[styles.loading]}/>
      <LottieView
        style={{zIndex: 999, width: '35%'}}
        source={theme === 'light' ? require('../../assets/blueLoader.json') : require('../../assets/purpleLoader.json')} autoPlay />
    </View>
  );
};
export default ActivityIndicatorComponent;


const backgroundColor = '#ffffff';
const styles = StyleSheet.create({
  bgColor: {
    backgroundColor
  },
  loading: {
    alignItems: 'center',
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 999
  },
  middleViewLight: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: '30%',
    height: '10%',
    left: '35%',
    top:'45%',
    borderRadius: 100
  },
  middleViewDark: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: '30%',
    height: '10%',
    left: '35%',
    top:'45%',
    borderRadius: 100
  }
});
