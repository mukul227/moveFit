import React, {useEffect, useRef} from 'react';
import {StyleSheet, View} from "react-native";
import CustomText from "../shared/CustomText";
import Icons from "../../constants/Icons";
import {Countdown} from "react-native-element-timer";

const PlayWorkoutFooter = ({workoutLength, index, data, onRestTimeEnd, openPopUp, timerStopped}) => {

  const countdownRefFooter = useRef(null);

  useEffect(() => {
    if (data.isActive) {
      if (countdownRefFooter.current) {
        countdownRefFooter.current.start();
      }
    }else {
      if (countdownRefFooter.current) {
        countdownRefFooter.current.pause();
      }
    }
  },[data.isActive]);

  useEffect(() => {
    if (timerStopped) {
      if (countdownRefFooter.current) {
        countdownRefFooter.current.pause();
      }
    }
  },[timerStopped])

  useEffect(() => {
    if (openPopUp) {
      if (countdownRefFooter.current) {
        countdownRefFooter.current.pause();
      }
    } else {
      if (data.isActive && !timerStopped) {
        if (countdownRefFooter.current) {
          countdownRefFooter.current.resume();
        }
      }
    }
  },[openPopUp])

  return (
    <View style={styles.container}>
      {
        data?.type === 'round' && data?.item?.type === "exercise_duration" &&
        <View style={styles.opacityBackground2}>
          <Countdown
            ref={countdownRefFooter}
            textStyle={styles.timerText}
            initialSeconds={data?.item?.quantity}
            onEnd={onRestTimeEnd}
          />
          <CustomText children={' Sec'} size={20} color={'white'} fontWeight={'600'}/>
        </View>
      }
      {
        data?.type === 'round' && data?.item?.type === "exercise_reps" &&
        <View style={styles.opacityBackground2}>
          <CustomText children={data?.item?.quantity + ' Reps'} size={20} color={'white'} fontWeight={'600'}/>
        </View>
      }
      <View style={[styles.opacityBackground]}>
        {/*<CustomText style={{textAlign: 'center', marginBottom: 10}} children={desc?.description ? desc?.description : ' '} color={'#444'} fontWeight={'700'} size={15}/>*/}
        <CustomText children={data?.lastItem ? 'Swipe up to finish workout' : 'Swipe up for the next exercise'} color={'black'} fontWeight={'700'} size={15}/>
      </View>
      <Icons.ArrowDown color={'black'}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 40,
    alignItems: 'center'
  },
  opacityBackground: {
    zIndex: 2,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: 'center'
  },
  opacityBackground2: {
    zIndex: 2,
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignSelf: 'center'
  },
  timerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
    fontFamily: 'Avenir Next Regular'
  },
});

export default PlayWorkoutFooter;
