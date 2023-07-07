import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import LottieView from 'lottie-react-native';
import {useDispatch} from "react-redux";
import {showConfetti} from "../../store/helpers/actions";
import {setShowConfettiAchievement} from "../../store/profile/actions";

const ConfettiComponent = ({showConfettiProp, fromModal=false}) => {

  const dispatch = useDispatch();

  const handleHideComponent = () => {
    if (fromModal) {
      dispatch(setShowConfettiAchievement(false));
    } else {
      dispatch(showConfetti(false))
    }
  };

  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showConfettiProp) {
      handleLikeAnimation();
    }
  },[showConfettiProp])

  const handleLikeAnimation = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
    }).start(() => handleHideComponent());
  };

  return (
    <View pointerEvents="none" style={styles.container}>
      <LottieView
        progress={progress}
        style={{height: '100%'}}
        source={require('../../assets/confetti2.json')} autoPlay />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  }
});

export default ConfettiComponent;
