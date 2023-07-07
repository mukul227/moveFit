import React, {useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import Icons from "../../constants/Icons";
import CustomText from "../shared/CustomText";
import {Countdown} from "react-native-element-timer";
import {useSelector} from "react-redux";
import {workoutSelector} from "../../store/workouts";

const PlayWorkoutHeader = ({
                             navigation,
                             data,
                             onRestTimeEnd,
                             paused,
                             timerStopped,
                             onGoBack
                           }) => {
  const workoutData = useSelector(workoutSelector());

  const countdownRefHeaderSecond = useRef(null);

  const goBack = () => {
    onGoBack();
    navigation.goBack();
  }

  useEffect(() => {
    if (timerStopped) {
      if (countdownRefHeaderSecond.current) {
        countdownRefHeaderSecond.current.pause();
      }
    }
    if (countdownRefHeaderSecond.current) {
      if (data.isActive) {
        countdownRefHeaderSecond.current.resume();
      } else {
        countdownRefHeaderSecond.current.pause();
      }
    }
  },[timerStopped, data])

  useEffect(() => {
    if (paused) {
      if (countdownRefHeaderSecond.current) {
        countdownRefHeaderSecond.current.pause();
      }
    } else {
      if (data.isActive && !timerStopped) {
        if (countdownRefHeaderSecond.current) {
          countdownRefHeaderSecond.current.resume();
        }
      }
    }
  },[paused]);

  useEffect(() => {
    if (data.isActive) {
      if (countdownRefHeaderSecond.current) {
        countdownRefHeaderSecond.current.start();
      }
    }else {
      if (countdownRefHeaderSecond.current) {
        countdownRefHeaderSecond.current.pause();
      }
    }
  },[data])

  return (
    <View style={styles.container}>
      <View style={styles.upperWrapper}>
        <TouchableOpacity onPress={goBack} style={styles.arrowWrapper}>
          <Icons.ArrowLeft color={'black'}/>
        </TouchableOpacity>
        <View style={styles.titleWrapper}>
          <CustomText children={data?.item.exercise?.name} size={18} fontWeight={'600'} color={'black'} style={{textAlign: 'center'}}/>
        </View>
        <View style={styles.viewsWrapper}></View>
      </View>
      <View style={styles.lowerWrapper}>
        <View style={[styles.opacityBackground]}>
          {
            data.type === 'amrap' &&
            <CustomText children={'AMRAP' + (data.item?.quantity > 0 ? ' - ' + data.item?.quantity + ' reps' : '')} color={'white'} fontWeight={'600'}/>
          }
          {
            data.type === 'exercise_reps' &&
            <CustomText children={data.item?.quantity ? data.item?.quantity + ' Reps' : 'Reps'} color={'white'} fontWeight={'600'}/>
          }
          {
            data.type === 'round' &&
            <CustomText children={'Round ' + data?.currentRound + '/' + data?.totalRounds} color={'white'} fontWeight={'600'}/>
          }
          {
            data.type === "exercise_duration" &&
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Countdown
                ref={countdownRefHeaderSecond}
                textStyle={styles.timerText}
                initialSeconds={data?.item?.quantity}
                onEnd={onRestTimeEnd}
                formatTime={'hh:mm:ss'}
              />
            </View>
          }
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    marginTop: 64
  },
  upperWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  lowerWrapper: {
    marginTop: 8
  },
  timerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
    fontFamily: 'Avenir Next Regular'
  },
  arrowWrapper: {
    width: '25%',
    paddingLeft: 16
  },
  titleWrapper: {
    width: '50%'
  },
  viewsWrapper: {
    width: '25%',
    paddingRight: 16
  },
  opacityBackground: {
    zIndex: 2,
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignSelf: 'center'
  },
  arrowOpacityBackground: {
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 100
  },
  blueIndicator: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: 'rgba(24, 162, 209, 0.8)',
    borderRadius: 100,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center'
  }
});

export default PlayWorkoutHeader;
