import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, View, Text, Platform, Vibration} from "react-native";
import CustomText from "../../shared/CustomText";
import Icons from "../../../constants/Icons";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import {useTheme} from "react-native-paper";
let Sound = require('react-native-sound');
Sound.setCategory('Playback');

const ExerciseCountdownModal = ({ isVisible, workout, startFirstVideo }) => {

  const [key, setKey] = useState(0);
  const [sound, setSound] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(null);

  const {colors} = useTheme();

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
    <Modal
      animationType='fade'
      transparent={true}
      visible={isVisible}
    >
      <View style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
        <View style={{marginTop: '16%'}}>
          <Icons.Logo_W width={74} height={20} color={colors.primaryColor}/>
        </View>
        <View style={{marginTop: '18%'}}>
          <CustomText style={{textAlign: 'center'}} children={workout.name} color={colors.primaryColor} size={26} fontWeight={'700'}/>
        </View>

        <View style={styles.countdownWrapper}>
          <CountdownCircleTimer
            key={key}
            strokeWidth={15}
            isPlaying
            duration={3}
            colors={colors.timerColors}
            colorsTime={[3, 2, 1, 0]}
            onUpdate={(e) => {
              if (e < 4) {
                Vibration.vibrate();
              }
              setTimerSeconds(e)
            }}
            onComplete={() => startFirstVideo()}
          >
            {({ remainingTime }) => <Text style={[styles.countdownText, {color: colors.primaryColor}]}>{remainingTime}</Text>}
          </CountdownCircleTimer>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  countdownWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  countdownCircleOuter: {
    position: 'absolute',
    width: '50%',
    aspectRatio: 1,
    borderRadius: 500,
    padding: 10
  },
  countdownCircleInner: {
    width: '100%',
    height: '100%',
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center'
  },
  exerciseWrapper: {
    marginTop: '4%',
    flexDirection: 'row',
    alignItems: "flex-end"
  },
  exerciseDuration: {
    marginLeft: 4,
    paddingBottom: 1
  },
  countdownText: {
    fontSize: 60,
    fontFamily: 'Avenir',
    fontWeight: '700'
  }
});

export default ExerciseCountdownModal;
