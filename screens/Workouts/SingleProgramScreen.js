import React from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity, Dimensions, Platform} from 'react-native';
import {useTheme} from "react-native-paper";
import Wrapper from "../../components/shared/Wrapper";
import CustomText from "../../components/shared/CustomText";
import Picture from "../../components/shared/Picture";
import Icons from "../../constants/Icons";
import Dot from "../../components/shared/Dot";
import WorkoutSingleProgramList from "../../components/workouts/WorkoutSingleProgramList";
import {ImageHeaderScrollView} from 'react-native-image-header-scroll-view';
import {useDispatch, useSelector} from "react-redux";
import {programSelector} from "../../store/programs";
import {getWorkoutSaga} from "../../store/workouts";
import {startProgramSaga} from "../../store/programs/actions";
import Button from "../../components/shared/Button";
import {isTutorialStartProgramVisibleSelector} from "../../store/helpers";
import {setIsAchievementModalShown, showTutorialStartProgramVisible} from "../../store/helpers/actions";
import {setShowConfettiAchievement} from "../../store/profile/actions";

const heightWindow = Dimensions.get('window').height;
const widthWindow = Dimensions.get('window').width;

const SingleProgramScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const program = useSelector(programSelector());
  const tutorialVisible = useSelector(isTutorialStartProgramVisibleSelector());
  const { programEquipments, programWeeks, trainers } = program;
  const {colors} = useTheme();

  const getFitnessLevelIcon = (level) => {
    switch (level){
      case 'beginner':
        return <Icons.BI color={colors.primaryColor}/>;
      case 'intermediate':
        return <Icons.IA color={colors.primaryColor}/>;
      case 'advanced':
        return <Icons.AA color={colors.primaryColor}/>;
    }
  }


  const titleWrapper = () => {
    return (
      <View style={styles.titleWrapperView}>
        <CustomText children={program.name} size={26} fontWeight={'700'} style={{opacity: 1}} color={colors.fontColor}/>
        <View style={[styles.layoutFlex, {width: '100%', marginTop: 10}]}>
          {
            trainers.map((trainer) => {
              return(
                <View key={trainer.id} style={[styles.layoutFlex, {marginRight: 5}]}>
                  <View>
                    <Picture source={trainer.photo} style={styles.trainerImage}/>
                  </View>
                  <CustomText children={trainer.first_name} size={15} style={{marginLeft: 5}} color={colors.fontColor}/>
                </View>
              )
            })
          }
          <Dot/>
          <View style={styles.layoutFlex}>
            <Icons.WakeUp color={colors.primaryColor}/>
            <CustomText children={program.duration} size={15} style={{marginLeft: 5}} color={colors.fontColor}/>
          </View>
          <Dot/>
          <View style={styles.layoutFlex}>
            {getFitnessLevelIcon(program.fitness_level)}
            <CustomText children={program.fitness_level} size={15} style={{marginLeft: 5}} color={colors.fontColor}/>
          </View>
        </View>
      </View>
    )
  }

  const equipment = () => {
    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {
          programEquipments.map(({equipment}, index) => {
            return (
              <CustomText key={equipment.id} children={programEquipments.length === index + 1 ? `${equipment.name}.` : `${equipment.name}, `} size={15} fontWeight={'700'} color={colors.fontColor}/>
            );
          })
        }
      </View>
    );
  };

  const descriptionWrapper = () => {
    return (
      <View style={{width: '100%'}}>
        <View style={[styles.equipmentWrapper, {borderColor: colors.singleProgramBorder}]}>
          <CustomText children={'Equipment'} size={15} style={{marginBottom: 10}} color={colors.fontColor}/>
          {equipment()}
        </View>
        <View style={{padding: 15}}>
          <CustomText children={'Overview'} size={15} style={{marginBottom: 10}} color={colors.fontColor}/>
          <CustomText children={program.description} size={15} fontWeight={'700'} color={colors.fontColor}/>
        </View>
      </View>
    )
  }

  const renderNav = () => {
    return (
        <View style={styles.headerNavWrapper}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icons.ArrowLeft color={'white'}/>
          </TouchableOpacity>
          <View style={[styles.followerIndicator, {backgroundColor: colors.singleWorkoutFollowerIndicator}]}>
            <Icons.UserIcon color={'white'} width={20}/>
            <CustomText children={program.numberOfUsers} color={'white'} style={{marginLeft: 5}}/>
          </View>
      </View>
    )
  }

  const onTutorialClick = () => {
    dispatch(showTutorialStartProgramVisible(false));
    dispatch(setIsAchievementModalShown(true));
    dispatch(setShowConfettiAchievement(true));
  }

  const onWorkoutPress = (workoutId, weekId) => dispatch(getWorkoutSaga({workoutId, weekId}));

  return (
    <Wrapper paddingHorizontal={0} showStatusBar={false} paddingBottom={0}>
      {
        tutorialVisible ?
        // true ?
          <TouchableOpacity onPress={() => onTutorialClick()} style={[styles.tutorialContainer, {top: Platform.OS === 'ios' ? 0 : 30}]}>
            <View style={[styles.tutorialWrapper, {bottom: Platform.OS === 'ios' ? 0 : -1}]}>
              <Button isActive={true} borderColor={colors.primaryColor} title={ 'Program started'} backgroundColor={colors.primaryColor}/>
            </View>
            <View style={[styles.skyBottomContainer, { bottom: Platform.OS === 'ios' ? 100 : 105 }]}>
              <View style={styles.triangle}/>
              <View style={[styles.skyBottomWrapper, {left: '15%'}]}>
                <CustomText style={{textAlign: 'center'}} fontWeight={'600'} children={"Great! You`ve added a program! Click the calendar to see your schedule, or select a workout to get Moving!"}/>
              </View>
            </View>
          </TouchableOpacity> : null
      }
      {renderNav()}
      <ImageHeaderScrollView
        maxHeight={300}
        showsVerticalScrollIndicator={false}
        bounces={false}
        minHeight={100}
        renderHeader={() => (
          <View>
            <Picture style={styles.headerImage} source={program.thumbnail}/>
          </View>
        )}
        disableHeaderGrow={false}
        headerContainerStyle={{backgroundColor: colors.singleProgramBackground}}
      >
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{backgroundColor: colors.singleProgramBackground, minHeight: heightWindow - 300}}
        >
          {titleWrapper()}
          {descriptionWrapper()}
          <WorkoutSingleProgramList program={program} navigation={navigation} data={programWeeks} trainers={trainers} onItemPress={onWorkoutPress}/>
        </ScrollView>
      </ImageHeaderScrollView>
      <View style={[styles.bottomWrapper,{backgroundColor: colors.backgroundColor}]}>
        <Button isActive={!program.started} onPress={() => dispatch(startProgramSaga(program.id))} borderColor={program.started ? colors.calendarDisabledColor : colors.primaryColor} title={ program.started ? 'Program started' : 'Start Program'} backgroundColor={ program.started ? colors.calendarDisabledColor : colors.primaryColor}/>
      </View>
    </Wrapper>
  );
};

export default SingleProgramScreen;

const styles = StyleSheet.create({
  titleWrapperView: {
    width: '100%',
    height: 100,
    marginTop: 15,
    alignItems: 'center'
  },
  layoutFlex: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  equipmentWrapper: {
    width: '100%',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    padding: 15
  },
  headerNavWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    paddingHorizontal: 20,
    zIndex: 999,
    paddingTop: 45
  },
  headerImage: {
    width: '100%',
    height: '100%',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20
  },
  trainerImage: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  backButton: {
    width: 35,
    borderRadius: 100,
    height: 35,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: "center",
    alignItems: 'center'
  },
  followerIndicator: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center'
  },
  skyBottomContainer: {
    width: '100%',
    position: 'absolute',
  },
  skyBottomWrapper: {
    width: '70%',
    backgroundColor: 'white',
    marginTop: 15,
    paddingVertical: 15,
    borderRadius: 20,
    paddingHorizontal: 15,
    left: '10%'
  },
  tutorialContainer: {
    position: 'absolute',
    width: widthWindow,
    height: heightWindow,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1
  },
  tutorialWrapper: {
    width: '100%',
    height: 80,
    paddingHorizontal: 20,
    position: 'absolute',
  },
  triangle: {
    position: 'absolute',
    width: 15,
    height: 15,
    borderRadius: 2,
    backgroundColor: 'white',
    bottom: -7,
    left: '47%',
    transform: [{rotate: "45deg"}]
  },
  bottomWrapper: {
    width: '100%',
    height: 80,
    backgroundColor: 'white',
    paddingHorizontal: 20
  }
});
