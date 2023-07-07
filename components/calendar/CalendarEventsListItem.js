import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import CustomText from "../shared/CustomText";
import moment from "moment";
import CalendarWorkoutItem from "./CalendarWorkoutItem";
import CalendarLogEventItem from "./CalendarLogEventItem";

const windowWidth = Dimensions.get('window').width;
const CalendarEventsListItem = ({ item, colors, onLongPress, onPressItem }) => {
    return (
        <View style={{width:windowWidth,}}>
            <CustomText children={moment.utc(item.date).format('dddd, MMM D')} color={colors.fontColor} size={15} style={[styles.date, {backgroundColor:colors.calendarDateHeader}]}/>
            {
                item.data.length ?
                    <View>
                    {
                        item.data.map((event, index) => {
                            return (
                                <View key={event.id} style={{borderBottomWidth: item.data.length > index+1 ? 1 : 0, borderBottomColor: colors.calendarEventBottomLine}}>
                                { event.workout_id ?
                                    <CalendarWorkoutItem onPressItem={(item) => onPressItem(item)} event={event} colors={colors} onLongPress={(item) =>onLongPress(item)}/>
                                    :
                                    <CalendarLogEventItem event={event} colors={colors}/>
                                }
                                </View>
                            )
                        })
                    }
                    </View>
                    :
                    <CustomText children={'No Events'} color={colors.calendarDateNoWorkout} style={styles.noEvents}/>
            }
        </View>
    );
};


const styles = StyleSheet.create({
    date: {
        paddingVertical: 8,
        paddingHorizontal: 20
    },
    noEvents: {
        paddingVertical:15,
        paddingHorizontal: 20
    }

});


export default CalendarEventsListItem;
