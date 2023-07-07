import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Dimensions, View, PanResponder, AppState, Platform, StatusBar} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {weekIdSelector, workoutSelector} from "../../store/workouts";
import CustomText from "../../components/shared/CustomText";
import PlayExercisePopUp from "../../components/workouts/exercises/PlayExercisePopUp";
import {workoutPlayerService, ItemType} from "../../services/WorkoutPlayerService";
import PlayVideoComponent from "./PlayVideoComponent";
import CongratsWorkoutModal from "../../components/workouts/exercises/CongratsWorkoutModal";
import FeedbackWorkoutModal from "../../components/workouts/FeedbackWorkoutModal";
import moment from "moment";
import {setIsAchievementModalShown} from "../../store/helpers/actions";
import {setShowConfettiAchievement} from "../../store/profile/actions";
import {leaveFeedbackSaga} from "../../store/workouts/actions";
import {achievementSelector} from "../../store/profile";
import ExerciseCountdownModal from "../../components/workouts/exercises/ExerciseCountdownModal";
import {useTheme} from "react-native-paper";
import PlayWorkoutHeader from "../../components/workouts/PlayWorkoutHeader";
import {workoutService} from "../../services/WorkoutService";
import asyncStorageService from "../../services/AsyncStorageService";
import {themeSelector} from "../../store/helpers";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const PlayWorkoutScreen = ({navigation}) => {
  const workout = useSelector(workoutSelector());

  const weekId = useSelector(weekIdSelector());
  const theme = useSelector(themeSelector())

  const {colors} = useTheme();


  const dispatch = useDispatch();
  const achievement = useSelector(achievementSelector())
  const handleSendFeedback = (data) => dispatch(leaveFeedbackSaga(data));

  let translateY = -screenHeight;
  let screenOrder = [1, 2, 3];
  let screenMultiplier = [0, 0, 0];
  let screenItemsArray = [];
  let longPressTimer = null;
  let workoutDidComplete = false;

  const [showAmrapView, setShowAmrapView] = useState(false);
  const [amrapSec, setAmrapSec] = useState(0);

  const [translateYValue, setTranslateYValue] = useState(-screenHeight);
  const [screen1multiplier, setScreen1multiplier] = useState(0);
  const [screen2multiplier, setScreen2multiplier] = useState(0);
  const [screen3multiplier, setScreen3multiplier] = useState(0);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [startDurationWorkout, setStartDurationWorkout] = useState(null);
  const [endDurationWorkout, setEndDurationWorkout] = useState(null);
  const [showCongratModal, setShowCongratModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [startingModalShow, setStartingModalShow] = useState(true);
  const [activeItem, setActiveItem] = useState(null);
  const [timerStopped, setTimerStopped] = useState(false);
  const [screenItems, setScreenItems] = useState([]);
  const [paused, setPaused] = useState(false);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  let keepPaused = false;

  useEffect(() => {
      workoutPlayerService.handleScreenItemsUpdate(handleScreenItemsUpdate);
      workoutPlayerService.handleNextItem(handleNextItem);
      workoutPlayerService.handleAmrapTick(handleAmrapTick);
      workoutPlayerService.handleRestart(handleRestart);
      workoutPlayerService.initialize(workout);
      setStartDurationWorkout(moment(new Date()));
  }, []);

  useEffect( () => {
    const subscription = AppState.addEventListener("change", async nextAppState => {
      // if (appState.current.match(/inactive|background/)) {
      //
      // }
        const completed = await asyncStorageService.getItem('completed');
      if (!completed) {
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        if (appState.current === 'inactive' || appState.current === 'background') {
          keepPaused = true;
          setOpenPopUp(true);
          pauseWorkout(true);
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleScreenItemsUpdate = (data) => {
    if (!workoutPlayerService.canSwipeUp()) {
      console.log('last one');
    }
    screenItemsArray[screenOrder[0] - 1] = data.upperScreenItem ? {...data.upperScreenItem, isActive: false} : null;
    screenItemsArray[screenOrder[1] - 1] = data.middleScreenItem ? {...data.middleScreenItem, isActive: true, lastItem: !workoutPlayerService.canSwipeUp()} : null;
    screenItemsArray[screenOrder[2] - 1] = data.lowerScreenItem ? {...data.lowerScreenItem, isActive: false} : null;

    setActiveItem(screenItemsArray[screenOrder[1] - 1]);

    if (data.middleScreenItem?.type === ItemType.AMRAP) {
      // amrap is active - show the timer
      setShowAmrapView(true);
    } else {
      setShowAmrapView(false);
      // amrap isn't active - hide the timer
    }

    setScreenItems(screenItemsArray);
  }

  const pauseWorkout = (paused) => {
    setPaused(paused);
    workoutPlayerService.setAmrapPaused(paused);
  }

  const handleAmrapTick = (data) => {
    // update amrap timer state (seconds)x
    setAmrapSec(data.seconds)
  }

  const workoutCleanup = () => {
    if (workoutDidComplete) return;

    workoutDidComplete = true;
    workoutPlayerService.cleanupHandlers();
    setEndDurationWorkout(moment(new Date()));
    setOpenPopUp(false);
    setTimerStopped(true);
  }

  const workoutCompleted = async () => {
    workoutCleanup();

    setShowCongratModal(true);

    try {
      await workoutService.completeWorkout(workout.id, weekId)
    } catch (e) {
      console.log({e});
    }
    // TODO: @damir go to workout completed screen?
  }

  function moveLastScreenUp() {
    screenOrder.unshift(screenOrder.pop());
    screenMultiplier[screenOrder[0] - 1] -= 3;
    switch (screenOrder[0]) {
      case 1:
        setScreen1multiplier(screenMultiplier[screenOrder[0] - 1]);
        break;
      case 2:
        setScreen2multiplier(screenMultiplier[screenOrder[0] - 1]);
        break;
      case 3:
        setScreen3multiplier(screenMultiplier[screenOrder[0] - 1]);
        break;
    }
  }

  function moveFirstScreenDown() {
    screenOrder.push(screenOrder.shift());
    screenMultiplier[screenOrder[2] - 1] += 3;
    switch (screenOrder[2]) {
      case 1:
        setScreen1multiplier(screenMultiplier[screenOrder[2] - 1]);
        break;
      case 2:
        setScreen2multiplier(screenMultiplier[screenOrder[2] - 1]);
        break;
      case 3:
        setScreen3multiplier(screenMultiplier[screenOrder[2] - 1]);
        break;
    }
  }

  function shouldIgnorePan(gestureState) {
    if (gestureState.dy > 0) {
      // swiping down
      if (workoutPlayerService.canSwipeDown()) {
        return false;
      }
    } else {
      if (workoutPlayerService.canSwipeUp()) {
        return false;
      } else {
        // allow swipe up for end workout!
        return false;
      }
    }

    return true;
  }

  const goToNextItem = () => {
    workoutPlayerService.goToNextItem();
  }

  const handleNextItem = () => {
    if (workoutDidComplete) return;

    if (!workoutPlayerService.canSwipeUp()) {
      // workout completed
      workoutCompleted();
      return;
    }

    let currentY = translateY;
    let targetY = translateY - screenHeight;

    const interval = setInterval(() => {
      currentY = Math.max(targetY, currentY - 35);
      if (currentY <= targetY) {
        clearInterval(interval);
        moveFirstScreenDown();
        workoutPlayerService.next();
      }
      setTranslateYValue(currentY);
    }, 1);

    translateY -= screenHeight;
  }

  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,

      onMoveShouldSetPanResponder: (_, gestureState) => {
        const { dx, dy } = gestureState
        return (dx > 2 || dx < -2 || dy > 2 || dy < -2)
      },

      onMoveShouldSetPanResponderCapture: (_, gestureState) => {
        const { dx, dy } = gestureState
        return (dx > 2 || dx < -2 || dy > 2 || dy < -2)
      },

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        keepPaused = false;

        longPressTimer = setTimeout(() => {
          keepPaused = true;
          setOpenPopUp(true);
          longPressTimer = null;
        }, 600);

        pauseWorkout(true);
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        if (workoutDidComplete) return;

        if (shouldIgnorePan(gestureState)) return;

        if (keepPaused) return;

        pauseWorkout(true);

        if (Math.abs(gestureState.dx) > 12 || Math.abs(gestureState.dy) > 12) {
          keepPaused = false;
          if (longPressTimer) {
            clearTimeout(longPressTimer);
            longPressTimer = null;
          }
        }

        if (workoutPlayerService.canSwipeUp()) {
          const yPos = translateY + gestureState.dy;
          setTranslateYValue(yPos);
        } else {
          if (gestureState.dy < 0) {
            if (Math.abs(gestureState.dy) >= screenHeight / 6) {
              workoutCompleted();
            }
          } else {
            const yPos = translateY + gestureState.dy;
            setTranslateYValue(yPos);
          }
        }

      },
      onPanResponderTerminationRequest: (evt, gestureState) =>
        true,
      onPanResponderRelease: (evt, gestureState) => {
        if (longPressTimer) {
          keepPaused = false;
          clearTimeout(longPressTimer);
        }

        if (workoutDidComplete) return;

        if (shouldIgnorePan(gestureState)) return;
        if (gestureState.dy < 0) {
          if (!workoutPlayerService.canSwipeUp() && !keepPaused) {
            setTimeout(() => {
              pauseWorkout(false);
              setTranslateYValue(translateY);
            }, 1);

            return;
          }
        }

        const velocityMultiplier = Math.max(1, Math.abs(gestureState.vy / 0.8));

        if (Math.abs(gestureState.dy) >= screenHeight / 2 || (Math.abs(gestureState.dy) >= screenHeight / 8.5 && velocityMultiplier > 1.55)) {
          if (keepPaused) return;
          if (gestureState.dy > 0) {
            let currentY = translateY + gestureState.dy;
            let targetY = translateY + screenHeight;
            const interval = setInterval(() => {
              currentY = Math.min(targetY, currentY + velocityMultiplier * 25);
              if (currentY >= targetY) {
                clearInterval(interval);
                moveLastScreenUp();
                workoutPlayerService.previous();
                pauseWorkout(false);
              }
              setTranslateYValue(currentY);
            }, 1);

            translateY += screenHeight;

          } else {
            let currentY = translateY + gestureState.dy;
            let targetY = translateY - screenHeight;
            const interval = setInterval(() => {
              currentY = Math.max(targetY, currentY - velocityMultiplier * 25);
              if (currentY <= targetY) {
                clearInterval(interval);
                moveFirstScreenDown();
                workoutPlayerService.next();
                pauseWorkout(false);
              }
              setTranslateYValue(currentY);
            }, 1);

            translateY -= screenHeight;
            // moveFirstScreenDown();
          }
        } else {
          // stay on same item

          // resume break countdown if break is active
          if (screenItemsArray.length > 2 && !screenItemsArray[screenOrder[1] - 1].isActive) {
            if (!keepPaused) {
              pauseWorkout(false);
            }
          }

          let currentY = translateY + gestureState.dy;
          let targetY = translateY;
          let moveDown = true;
          if (gestureState.dy < 0) {
            moveDown = false;
          }

          const interval = setInterval(() => {
            if (!moveDown) {
              currentY = Math.min(targetY, currentY + 25);
              if (currentY >= targetY) {
                clearInterval(interval);
                if (!keepPaused) pauseWorkout(false);
              }
            } else {
              currentY = Math.max(targetY, currentY - 25);
              if (currentY <= targetY) {
                clearInterval(interval);
                if (!keepPaused) pauseWorkout(false);
              }
            }

            setTranslateYValue(currentY);
          }, 1);
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        if (shouldIgnorePan(gestureState)) return;

        setTranslateYValue(translateY);
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      }
    })
  ).current;

  const onRestartFromPopUp = () => {
    workoutPlayerService.restart();
  }

  const handleRestart = () => {
    if (longPressTimer) clearTimeout(longPressTimer);
    longPressTimer = null;
    translateY = -screenHeight;
    screenOrder = [1, 2, 3];
    screenMultiplier = [0, 0, 0];
    screenItemsArray = [];
    setShowAmrapView(false);
    keepPaused = false;
    setPaused(false);
    setAmrapSec(0);
    setTranslateYValue(-screenHeight);
    setScreen1multiplier(0);
    setScreen2multiplier(0);
    setScreen3multiplier(0);
    setScreenItems([]);

    setOpenPopUp(false);
    workoutPlayerService.cleanupHandlers();

    workoutPlayerService.handleScreenItemsUpdate(handleScreenItemsUpdate);
    workoutPlayerService.handleNextItem(handleNextItem);
    workoutPlayerService.handleAmrapTick(handleAmrapTick);
    workoutPlayerService.handleRestart(handleRestart);
    workoutPlayerService.initialize(workout);
    setStartDurationWorkout(moment(new Date()));
  }

  const onCongratsSubmitPress = async () => {
    await asyncStorageService.setItem('completed', true);
    setShowCongratModal(false);
    setShowFeedbackModal(true);
  }

  const onBackToHome = (data) => {
    handleSendFeedback(data);
    setShowFeedbackModal(false);
    navigation.navigate('HomeScreen');
    if(achievement) {
      dispatch(setIsAchievementModalShown(true))
      dispatch(setShowConfettiAchievement(true))
    }
  }

  const onSharePressFn = (data) => {
    handleSendFeedback(data);
    setShowFeedbackModal(false);
    navigation.navigate('ShareProgressScreen');
  }

  const pad = (num, size) => {
    var s = "000000000" + num;
    return s.substr(s.length-size);
  }

  const onAmrapFinish = () => {
    setOpenPopUp(false);
    pauseWorkout(false);
    workoutPlayerService.finishAmrap()

  }

  const getStatusBar = () => {
    if (Platform.OS === 'ios') {
      if (activeItem?.item?.type === 'break' || startingModalShow) {
        return theme === 'dark' ? 'light-content' : 'dark-content';
      }
      return 'dark-content';
    } else {
      return theme === 'dark' ? 'light-content' : 'dark-content';
    }
  }

  return (
    <View style={{flex: 1, width: screenWidth,paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
      <StatusBar animated={true} barStyle={getStatusBar()}/>
      {
        activeItem && activeItem.item.type !== 'break' && <PlayWorkoutHeader
          navigation={navigation}
          timerStopped={timerStopped}
          data={activeItem}
          paused={paused}
          onRestTimeEnd={() => goToNextItem()}
          onGoBack={() => workoutCleanup()}
        />
      }
      <PlayExercisePopUp
        onAmrapQuit={() => onAmrapFinish()}
        onRestart={() => onRestartFromPopUp()}
        onWorkoutQuit={() => workoutCleanup()}
        activeItem={activeItem}
        navigation={navigation}
        isVisible={openPopUp}
        onMarkAsCompleted={() => workoutCompleted()}
        onModalClose={() => { activeItem.isActive = true; setOpenPopUp(false); pauseWorkout(false); }}
      />
      <CongratsWorkoutModal startDuration={startDurationWorkout} endDuration={endDurationWorkout} isVisible={showCongratModal} onSubmitPress={() => onCongratsSubmitPress()}/>
      <FeedbackWorkoutModal onSharePress={(val) => {
        onSharePressFn({rate: val.selectedRating, difficulty: val.selectedOption, workout_id: workout.id});
      }} onPressToHome={(val) => {
        onBackToHome({rate: val.selectedRating, difficulty: val.selectedOption, workout_id: workout.id});
      }} isVisible={showFeedbackModal}/>
      {
        startingModalShow ?
          <ExerciseCountdownModal isVisible={startingModalShow} startFirstVideo={() => setStartingModalShow(false)} colors={colors}
                                  workout={workout}/> :
          <View {...panResponder.panHandlers}>
            {
              showAmrapView &&
              <View style={styles.amrapWrapper}>
                <View style={styles.opacityBackground}>
                  <CustomText size={20} children={pad(Math.floor(amrapSec / 60), 2) + ':' + pad((amrapSec % 60), 2)} color={'white'} fontWeight={'600'}/>
                </View>
              </View>
            }
            <View style={[styles.screen1, {transform: [{translateY: translateYValue + screen1multiplier * screenHeight}]}]}>
              {
                screenItems[0] &&
                <PlayVideoComponent paused={paused} timerStopped={timerStopped}  openPopUp={openPopUp} onRestTimeEnd={() => {
                  goToNextItem()
                }} navigation={navigation} data={screenItems[0]} />
              }
            </View>
            <View style={[styles.screen2, {transform: [{translateY: translateYValue + screen2multiplier * screenHeight}]}]}>

              {
                screenItems[1] &&
                <PlayVideoComponent paused={paused} timerStopped={timerStopped} openPopUp={openPopUp} onRestTimeEnd={() => {
                  goToNextItem()
                }} navigation={navigation} data={screenItems[1]}/>
              }

            </View>
            <View style={[styles.screen3, {transform: [{translateY: translateYValue + screen3multiplier * screenHeight}]}]}>
              {
                screenItems[2] &&
                <PlayVideoComponent paused={paused} timerStopped={timerStopped} openPopUp={openPopUp} onRestTimeEnd={() => {
                  goToNextItem()
                }} navigation={navigation} data={screenItems[2]}/>
              }
            </View>
          </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  amrapWrapper: {
    position: 'absolute',
    top: screenHeight - 135,
    width: screenWidth,
    zIndex: 999
  },
  screen1: {
    backgroundColor: 'white',
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen2: {
    backgroundColor: 'white',
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screen3: {
    backgroundColor: 'white',
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default PlayWorkoutScreen;
