import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions, TouchableOpacity, Platform, StatusBar,
} from 'react-native';
import Icons from "../../constants/Icons";
import {useTheme} from "react-native-paper";
import CustomText from "./CustomText";
import {preferenceWidgetHelper} from "../../helpers/preferenceWidgetHelper";
import {useDispatch, useSelector} from "react-redux";
import {activeUserSelector} from "../../store/auth";
import {finishTutorialSaga, showTutorialVisible} from "../../store/helpers/actions";
import authService from "../../services/AuthService";
import {setActiveUser} from "../../store/auth/actions";
import {widgetTopSelector} from "../../store/helpers";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const titles = [
  "Click here to start creating healthy habits today!",
  "Find your program's schedule here!",
  "Click here to Move with your friends!",
  "Edit profile, add progress photos, and see your achievements here!",
]

const TutorialComponent = () => {

  const {colors} = useTheme();

  const dispatch = useDispatch();

  const [selectedStep, setSelectedStep] = useState(0);

  const topWrapper = useSelector(widgetTopSelector());

  const {myPreference} = useSelector(activeUserSelector());
  const {location, fitness_level} = myPreference;
  const locationTitle = preferenceWidgetHelper.getLocationTitle(location);
  const fitnessLevelTitle = preferenceWidgetHelper.getFitnessLevelTitle(fitness_level);
  const fitnessLevelIcon = preferenceWidgetHelper.getFitnessLevelIcon(fitness_level, colors);

  const getBottomView = () => {
    let wrapperWidth = 59;
    let first = windowWidth / 5;
    let restSpace = first - wrapperWidth;
    let left = (wrapperWidth * selectedStep) + (wrapperWidth / 2) + (restSpace * selectedStep);

    return left;
  }

  const moveBottomView = () => {
    switch (selectedStep) {
      case 1:
        return '10%'
      case 2:
        return '25%'
      case 3:
        return '35%'
      case 4:
        return '42%'
      default:
        return '0%'

    }
  }

  const updateUserTutorialProperty = async () => {
    try {
      await authService.updateUser({tutorial: true});
    } catch (e) {
      console.log({e});
    }
  }

  const onClick = async () => {
    if (selectedStep === 4) {
      dispatch(finishTutorialSaga())
    } else {
      setSelectedStep(selectedStep + 1)
    }
  }


  return (
    <TouchableOpacity activeOpacity={1} onPress={() => onClick()} style={styles.container}>
      {
        selectedStep === 0 ?
          <View style={[styles.skyTopContainer, {top: topWrapper + 80}]}>
            <View style={styles.skyTopWrapper}>
              <View style={styles.triangle}/>
              <CustomText children={'Click here to change any part of your program!'} size={15} fontWeight={'600'}/>
            </View>
          </View> : null
      }
      {
        selectedStep === 0 && topWrapper !== 0 ?
          <View style={[styles.topBarContainer, {top: topWrapper - 10}]}>
            <View style={styles.topBarWrapper}>
              <View style={[styles.widgetInner, {width: '32%'}]}>
                <View style={styles.iconWrapperWidget}>
                  <Icons.workoutTab color={colors.primaryColor} height={24}/>
                </View>
                <CustomText size={12} style={{marginTop: 5}} color={colors.primaryColor} children={locationTitle}/>
              </View>
              <View style={[styles.widgetInner, styles.middleInner, {width: '36%'}]}>
                <View style={styles.iconWrapperWidget}>
                  <Icons.weight color={colors.primaryColor} height={24}/>
                </View>
                <CustomText size={12} style={{marginTop: 5}} color={colors.primaryColor}
                            children={myPreference.preference.name}/>
              </View>
              <View style={[styles.widgetInner, {width: '32%'}]}>
                <View style={styles.iconWrapperWidget}>
                  {fitnessLevelIcon}
                </View>
                <CustomText size={12} style={{marginTop: 5}} color={colors.primaryColor} children={fitnessLevelTitle}/>
              </View>
            </View>
          </View> : null
      }
      <View style={[styles.tabBarContainer, {bottom: Platform.OS === 'ios' ? 23 : 0}]}>
        <View style={[styles.tabBarWrappers, {backgroundColor: 'transparent'}]}/>
        <View style={[styles.tabBarWrappers, {backgroundColor: selectedStep === 1 ? 'white' : 'transparent'}]}>
          {
            selectedStep === 1 ?
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Icons.habitTab color={colors.unFocusedBottomTabIconColor}/>
                <CustomText children={'Habits'} size={11} style={{letterSpacing: -0.1}}/>
              </View> : null
          }
        </View>
        <View style={[styles.tabBarWrappers, {backgroundColor: selectedStep === 2 ? 'white' : 'transparent'}]}>
          {
            selectedStep === 2 ?
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Icons.calendarTab color={colors.unFocusedBottomTabIconColor}/>
                <CustomText children={'Calendar'} size={11} style={{letterSpacing: -0.1}}/>
              </View> : null
          }
        </View>
        <View style={[styles.tabBarWrappers, {backgroundColor: selectedStep === 3 ? 'white' : 'transparent'}]}>
          {
            selectedStep === 3 ?
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Icons.friendsTab color={colors.unFocusedBottomTabIconColor}/>
                <CustomText children={'Friends'} size={11} style={{letterSpacing: -0.1}}/>
              </View> : null
          }
        </View>
        <View style={[styles.tabBarWrappers, {backgroundColor: selectedStep === 4 ? 'white' : 'transparent'}]}>
          {
            selectedStep === 4 ?
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Icons.profileTab color={colors.unFocusedBottomTabIconColor}/>
                <CustomText children={'Profile'} size={11} style={{letterSpacing: -0.1}}/>
              </View> : null
          }
        </View>
      </View>
      {
        selectedStep !== 0 ?
          <View style={[styles.skyBottomContainer, {bottom: Platform.OS === 'ios' ? 100 : 70}]}>
            <View style={[styles.triangle2, {left: getBottomView()}]}/>
            <View style={[styles.skyBottomWrapper, {left: moveBottomView()}]}>
              <CustomText children={titles[selectedStep - 1]} size={15} style={{textAlign: 'center'}} fontWeight={'600'}/>
            </View>
          </View> : null
      }
    </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10,
    bottom: 0
  },
  tabBarContainer: {
    position: 'absolute',
    height: 54,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  tabBarWrappers: {
    marginTop: 4,
    width: 59,
    height: 54,
    borderRadius: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  topBarContainer: {
    paddingHorizontal: 23,
    width: '100%',
    position: 'absolute',
    // top: 54,
  },
  topBarWrapper: {
    width: '100%',
    paddingTop: 16,
    paddingBottom: 12,
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  widgetInner: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  middleInner: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: 'rgba(139, 155, 167, 0.2)',
    borderRightColor: 'rgba(139, 155, 167, 0.2)'
  },
  iconWrapperWidget: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  skyTopContainer: {
    width: '100%',
    height: 140,
    paddingHorizontal: 23
  },
  skyTopWrapper: {
    width: '70%',
    backgroundColor: 'white',
    marginTop: 15,
    paddingVertical: 15,
    borderRadius: 20,
    paddingHorizontal: 15
  },
  skyBottomContainer: {
    width: '100%',
    position: 'absolute',
  },
  skyBottomWrapper: {
    width: '55%',
    backgroundColor: 'white',
    marginTop: 15,
    paddingVertical: 15,
    borderRadius: 20,
    paddingHorizontal: 15,
    left: '10%'
  },
  triangle: {
    position: 'absolute',
    width: 15,
    height: 15,
    borderRadius: 2,
    backgroundColor: 'white',
    top: -7,
    left: 50,
    transform: [{rotate: "45deg"}]
  },
  triangle2: {
    position: 'absolute',
    width: 15,
    height: 15,
    borderRadius: 2,
    backgroundColor: 'white',
    bottom: -7,
    transform: [{rotate: "45deg"}]
  }
});

export default TutorialComponent;
