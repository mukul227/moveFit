import React from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity, Image, Dimensions} from 'react-native';
import {useTheme} from "react-native-paper";
import Wrapper from "../../components/shared/Wrapper";
import CustomText from "../../components/shared/CustomText";
import Picture from "../../components/shared/Picture";
import Icons from "../../constants/Icons";
import Dot from "../../components/shared/Dot";
import {ImageHeaderScrollView} from 'react-native-image-header-scroll-view';
import ExerciseList from "../../components/workouts/exercises/ExerciseList";
import Button from "../../components/shared/Button";
import LinearGradient from "react-native-linear-gradient";
import {useDispatch, useSelector} from "react-redux";
import {fromCalendarSelector, playWorkoutSaga, workoutSelector} from "../../store/workouts";
import {setIsBottomTabVisible, showConfirmationModal} from "../../store/helpers/actions";
import {programSelector} from "../../store/programs";

const SingleWorkoutScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const workout = useSelector(workoutSelector());
  const program = useSelector(programSelector());
  const fromCalendar = useSelector(fromCalendarSelector());
  const { workoutEquipments, workoutItems } = workout;
  const heightWindow = Dimensions.get('window').height
  const {colors} = useTheme();

  const titleWrapper = () => {
    return (
      <View style={styles.titleWrapperView}>
        <CustomText children={workout.name} color={colors.primaryColor} size={26} fontWeight={'700'}/>
        <View style={styles.titleDetails}>
          <CustomText children={workoutItems.length + (workoutItems.length === 1 ? ' Exercise' : ' Exercises')} size={15} color={colors.fontColor}/>
          <Dot/>
          <CustomText children={workout.duration + (workout.duration === 1 ? ' Min' : ' Mins')} size={15} style={{marginLeft: 5}} color={colors.fontColor}/>
        </View>
      </View>
    )
  }

  const equipment = () => {
    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {
          workoutEquipments.map(({equipment}, index) => {
            return (
              <CustomText key={equipment.id} children={workoutEquipments.length === index + 1 ? `${equipment.name}.` : `${equipment.name}, `} size={15} fontWeight={'700'} color={colors.fontColor}/>
            );
          })
        }
      </View>
    );
  };

  const descriptionWrapper = () => {
    return (
      <View style={{width: '100%'}}>
        <View style={[styles.equipmentWrapper, {borderColor: colors.singleWorkoutBorder}]}>
          <CustomText children={'Equipment'} size={15} style={{marginBottom: 10}} color={colors.fontColor}/>
          {equipment()}
        </View>
      </View>
    )
  }

  const onGoBack = () => {
    if (fromCalendar) {
      dispatch(setIsBottomTabVisible(0));
      navigation.navigate('MainNavigator', {screen: 'Calendar'})
    } else {
      navigation.goBack()
    }
  }

  const renderNav = () => {
    return (
      <View style={styles.headerNavWrapper}>
        {/*<TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>*/}
        <TouchableOpacity onPress={() => onGoBack()} style={styles.backButton}>
          <Icons.ArrowLeft color={'white'}/>
        </TouchableOpacity>
      </View>
    )
  }

  const onExercisePress = exerciseId => {
    console.log('GO TO EXERCISE', exerciseId);
  };

  const onStartWorkoutPress = () => dispatch(playWorkoutSaga(workout.id));

  return (
    <Wrapper paddingHorizontal={0} showStatusBar={false} paddingBottom={0}>
      {renderNav()}
      <ImageHeaderScrollView
        maxHeight={300}
        showsVerticalScrollIndicator={false}
        bounces={false}
        minHeight={100}
        renderHeader={() => (
          <View>
            <Picture source={workout.thumbnail} style={styles.headerImage}/>
          </View>
        )}
        disableHeaderGrow={false}
        headerContainerStyle={{backgroundColor: colors.singleWorkoutBackground}}
      >
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{backgroundColor: colors.singleWorkoutBackground, minHeight: heightWindow - 300}}>
          {titleWrapper()}
          {descriptionWrapper()}
          <ExerciseList data={workoutItems} navigation={navigation} colors={colors} onItemPress={onExercisePress} onButtonPress={onStartWorkoutPress}/>
        </ScrollView>
      </ImageHeaderScrollView>
      <View style={{height: 110, justifyContent: 'center', backgroundColor: 'transparent'}}>
        <Button setWidth={'90%'} style={{marginLeft: '5%'}} isActive={workoutItems.length} borderColor={colors.primaryColor} title={program && program.started ? 'Start Workout' : 'Join the program'} onPress={ program.started ? onStartWorkoutPress : () => dispatch(showConfirmationModal(true))} backgroundColor={colors.primaryColor}/>
      </View>
    </Wrapper>
  );
};

export default SingleWorkoutScreen;

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: '100%',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20
  },
  titleWrapperView: {
    width: '100%',
    marginTop: 15,
    paddingHorizontal: 16,
    paddingBottom: 12
  },
  titleDetails: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
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
  backButton: {
    width: 35,
    borderRadius: 100,
    height: 35,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: "center",
    alignItems: 'center'
  }
});
