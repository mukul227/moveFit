import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Picture from "../shared/Picture";
import CustomText from "../shared/CustomText";
import {useTheme} from "react-native-paper";
import Dot from "../shared/Dot";
import Icons from "../../constants/Icons";
import {TouchableOpacity} from "react-native-gesture-handler";

const WorkoutListByWeeks = ({workouts, weekId, trainers, onItemPress}) => {
  const {colors} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.singleProgramBackground}]}>
      {
        workouts ?
        workouts.map((workout, index) => {
          return(
            <TouchableOpacity
              onPress={() => onItemPress(workout.id, weekId)}
              key={index} style={[styles.wrapper, {backgroundColor: colors.singleProgramBackground, shadowColor: colors.singleProgramShadow}]}>
              <View style={{width: '40%'}}>
                <Picture source={workout.thumbnail} style={styles.workoutImage}/>
              </View>
              <View style={styles.workoutDescription}>
                <CustomText children={workout.name} size={16} color={colors.primaryColor} fontWeight={'700'}/>
                <View style={{flexDirection: 'row'}}>
                {
                  trainers.map((trainer) => {
                    return(
                      <View key={trainer.id} style={styles.trainerWrapper}>
                          <Picture source={trainer.photo} style={styles.trainerImage}/>
                        <CustomText children={trainer.first_name} style={{marginLeft: 6}} color={colors.fontColor}/>
                      </View>
                    )
                  })
                }
                </View>
                <CustomText children={workout.duration + ' Min'} style={{marginLeft: 5}} color={colors.fontColor}/>
              </View>
              <Icons.ArrowRight color={colors.singleProgramArrow}/>
            </TouchableOpacity>
          )
        }) :
        null
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20
  },
  wrapper: {
    padding: 12,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 10.00,

    elevation: 10,
  },
  workoutImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.7,
    borderRadius: 20
  },
  workoutDescription: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'space-between'
  },
  trainerWrapper: {
    marginRight: 5,
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center'
  },
  trainerImage: {
    width: 25,
    height: 25,
    borderRadius: 100
  }
});

export default WorkoutListByWeeks;
