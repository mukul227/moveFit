import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomText from "../shared/CustomText";
import Icons from "../../constants/Icons";
import Picture from "../shared/Picture";
import Dot from "../shared/Dot";

const windowWidth = Dimensions.get('window').width;
const CalendarWorkoutItem = ({ event, colors, onLongPress, onPressItem }) => {


    return (
            <TouchableOpacity onPress={() => onPressItem(event)} onLongPress={() => onLongPress(event)} style={styles.item}>
              <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '60%'}}>
                <View style={styles.checkbox}>
                    {
                        event.completed ?
                            <Icons.FilledColor color={colors.primaryColor}/> :
                            <Icons.UnfilledColor color={colors.primaryColor}/>
                    }
                </View>
                <View style={styles.workoutInfo}>
                    <View style={{alignItems:'flex-start'}}>
                        <CustomText children={event.program.location.toUpperCase()} size={14} color={colors.calendarWorkoutLocationTitle} />
                        <CustomText children={event.workout.name} color={colors.fontColor} size={18} fontWeight={'600'} style={{paddingVertical: 8}}/>
                        <CustomText style={{textTransform: 'capitalize'}} children={event.workout.fitness_level} color={colors.fontColor} size={14}/>
                        <CustomText children={`${event.workout.duration} min`} size={15} color={colors.fontColor} fontWeight={'500'}/>
                    </View>
                </View>
              </View>
              <View style={{flexDirection: 'row', width: '40%', justifyContent: 'flex-end'}}>
              {
                event?.program?.trainers.map((trainer) => {
                  return(
                    <View key={trainer.id.toString()} style={styles.trainerInfo}>
                      <Picture source={trainer.photo} style={styles.trainerImage}/>
                      <CustomText children={trainer.first_name} color={colors.fontColor} size={15} fontWeight={'500'}/>
                    </View>
                  )
                })
              }
              </View>
            </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    item: {
        width:windowWidth,
        justifyContent: 'space-between',
        flexDirection:'row',
        alignItems:'center',
        paddingVertical: 12,
        paddingHorizontal:20,
        flexWrap: 'wrap'
    },
    trainerImage: {
        borderRadius: 15,
        width: 30,
        height: 30,
        marginRight: 6
    },
    checkbox: {
        width:'10%',
        alignItems:'flex-start',
        marginRight: 20
    },
    workoutInfo: {
        justifyContent:'space-between',
        flexDirection:'row',
        width:'80%'
    },
    trainerInfo: {
        // flexDirection:'row',
        marginRight: 15,
        alignItems:'center'
    }
});


export default CalendarWorkoutItem;
