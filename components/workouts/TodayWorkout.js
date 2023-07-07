import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import Picture from "../shared/Picture";
import CustomText from "../shared/CustomText";
import Icons from "../../constants/Icons";
import Dot from "../shared/Dot";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

const TodayWorkout = ({data, colors, onItemPress, isWorkout}) => {

  const [values, setValues] = useState({});

  useEffect(() => {
    if (isWorkout) {
      const bindData = {
        id: data.workout.id,
        thumbnail: data.workout.thumbnail,
        name: data.workout.name,
        trainers: data.program.trainers,
        duration: data.workout.duration,
      }
      setValues(bindData);
    } else {
      const bindData = {
        id: data.id,
        thumbnail: data.thumbnail,
        name: data.name,
        trainers: data.trainers,
        duration: data.duration,
      }
      setValues(bindData);
    }
  }, [data])

  return (
    <TouchableOpacity onPress={() => onItemPress(values.id)} style={styles.container}>
      {
        data && data.completed === true  ?
          <View style={{position: 'absolute', width: '100%', aspectRatio: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', zIndex: 999, borderRadius: 20}}>
            <AntDesign name={'checkcircle'} size={38} color={'white'} style={{marginBottom: 15}}/>
            <CustomText children={'COMPLETED'} size={31} color={'white'} fontWeight={'bold'}/>
          </View> : null
      }
      <View style={styles.opacityBackground}>
        <CustomText children={isWorkout ? "Today's Workout": "Recommended Program"} color={'#EDF0F2'} fontWeight={'500'} size={20}/>
      </View>
      <View style={styles.imageWrapper}>
        {
          values.thumbnail ?
            <Picture source={values?.thumbnail} style={styles.image}/> : null
        }
      </View>
      <View style={styles.bottomWrapper}>
        <View style={{flex: 1}}>
          <View style={styles.opacityBackground}>
            <CustomText children={values.name} fontWeight={'700'} size={22} color={'#F7F7F7'}/>
          </View>
          <View style={styles.bottomWrapper}>
            <View style={[styles.opacityBackground, {flexDirection: 'row'}]}>
              {
                values.trainers?.map((trainer) => {
                  return (
                    <View key={trainer.id} style={styles.trainerWrapper}>
                      <View>
                        {
                          trainer?.photo ?
                            <Picture source={trainer?.photo} style={styles.trainerImage}/> : null
                        }
                      </View>
                      <CustomText children={trainer.first_name} size={16} color={'#F7F7F7'} fontWeight={'700'}/>
                    </View>
                  )
                })
              }
              <View style={styles.durationWrapper}>
                <Dot backgroundColor={'#F7F7F7'}/>
                <Icons.WakeUp style={{marginRight: 6}} color={'#F7F7F7'}/>
                <CustomText children={`${values.duration} min`} size={16} color={'#F7F7F7'} fontWeight={'700'}/>
              </View>
            </View>
            <Icons.Play color={colors.primaryColor}/>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 20,
    backgroundColor: 'transparent',
    marginTop: 15,
    justifyContent: 'space-between'
  },
  imageWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20
  },
  bottomWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  trainerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5
  },
  trainerImage: {
    borderRadius: 15,
    width: 30,
    height: 30,
    marginRight: 6
  },
  durationWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  opacityBackground: {
    zIndex: 2,
    margin: 12,
    padding: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignSelf: 'flex-start'
  }
});

export default TodayWorkout;
