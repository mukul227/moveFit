import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from "react-native";
import Icons from "../../constants/Icons";
import CustomText from "../shared/CustomText";
import {useSelector} from "react-redux";
import {workoutSelector} from "../../store/workouts";

const PlayWorkoutRepsHeader = ({
                             navigation,
                             data
                           }) => {

  const workoutData = useSelector(workoutSelector());

  const goBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <View style={styles.upperWrapper}>
        <TouchableOpacity onPress={goBack} style={styles.arrowWrapper}>
          <Icons.ArrowLeft color={'black'}/>
        </TouchableOpacity>
        <View style={styles.titleWrapper}>
          <Text>
          <CustomText children={'Reps: '} size={18} fontWeight={'600'} color={'#444'} style={{textAlign: 'center'}}/>
          <CustomText children={data.exercise.name} size={18} fontWeight={'600'} color={'#444'} style={{textAlign: 'center'}}/>
          </Text>
        </View>
        <View style={styles.viewsWrapper}>
          <View style={styles.blueIndicator}>
            <Icons.profileTab color={'white'} width={14}/>
            <CustomText children={workoutData.numberOfUsers} size={12} color={'white'}/>
          </View>
        </View>
      </View>
      <View style={styles.lowerWrapper}>
        <View style={styles.opacityBackground}>
        <Text>
          <CustomText children={data.quantity} size={18} fontWeight={'600'} color={'white'} style={{textAlign: 'center'}}/>
          <CustomText children={' reps'} size={18} fontWeight={'600'} color={'white'} style={{textAlign: 'center'}}/>
        </Text>
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
    marginTop: 8,
    justifyContent: 'center',
    width: '100%'
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
    borderRadius: 10,
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

export default PlayWorkoutRepsHeader;
