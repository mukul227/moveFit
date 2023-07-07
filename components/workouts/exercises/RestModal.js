import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet,View, Vibration, Platform} from "react-native";
import {useTheme} from "react-native-paper";
import {Countdown} from "react-native-element-timer";
import LinearGradient from "react-native-linear-gradient";
import CustomText from "../../shared/CustomText";
import {useSelector} from "react-redux";
import {themeSelector} from "../../../store/helpers";
import Icons from "../../../constants/Icons";
let Sound = require('react-native-sound');
Sound.setCategory('Playback');

const RestModal = ({openPopUp, onRestTimeEnd, isActive, paused, quantity, timerStopped}) => {

  const theme = useSelector(themeSelector());
  const [sound, setSound] = useState(null)

  const countdownRefHeader = useRef(null);
  const [timerSeconds, setTimerSeconds] = useState(null);

  const {colors} = useTheme();

  useEffect(() => {
    if (timerStopped) {
      if (countdownRefHeader.current) {
        countdownRefHeader.current.pause();
      }
    }
  },[timerStopped])

  const onCountdown = (time) => {
    setTimerSeconds(time)
    if (time < 4) {
      Vibration.vibrate();
    }
  }

  useEffect(() => {
    if (openPopUp) {
      if (countdownRefHeader.current) {
        countdownRefHeader.current.pause();
      }
    } else {
      if (isActive && !timerStopped) {
        if (countdownRefHeader.current) {
          countdownRefHeader.current.resume();
        }
      }
    }
  },[openPopUp])

  useEffect(() => {
    if (isActive) {
      countdownRefHeader.current.start();

    } else {
      if(sound != null){
        if(sound.isPlaying()){
          sound.stop();//Lo detiene si hay otro tocando
        }
      }
      countdownRefHeader.current.pause();
    }
  }, [isActive]);

  useEffect(() => {
    if (paused) {
      countdownRefHeader.current.pause();
    } else {
      if (isActive) {
        countdownRefHeader.current.resume();
      }
    }
  }, [paused]);

  useEffect(() => {
    if (timerSeconds === 3) {
        let soundy = new Sound( Platform.OS === 'ios' ? 'countdownFinal.mp3' : 'countdownfinal.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
          // loaded successfully
          soundy.play((success) => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });
          // Play the sound with an onEnd callback
        });
        setSound(soundy);
    }

  },[timerSeconds])

  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
      {
        theme === 'light' ? <Icons.BlueGradientLogo width={141} height={38} style={{marginLeft: -20}}/> : <Icons.PurpleGradientLogo/>
      }
      <CustomText color={colors.fontColor} children={'Rest Time'} size={23} style={{marginVertical: 45}} fontWeight={'700'}/>
      <View style={styles.countDownWrapper}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={colors.primaryColorGradient}
                        style={styles.linearGradient}>
          <Countdown
            ref={countdownRefHeader}
            textStyle={styles.timerText}
            initialSeconds={quantity}
            onEnd={() => setTimeout(() => {
              onRestTimeEnd()
            }, 500)}
            onTimes={(e) => onCountdown(e)}
          />
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  timerText: {
    fontSize: 90,
    color: 'white',
    fontWeight: '600',
    fontFamily: 'Avenir Next Regular'
  },
  linearGradient: {
    width: 200,
    borderRadius: 100,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  countDownWrapper: {
    width: 225,
    height: 225,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#daebf3'
  }
});

export default RestModal;
