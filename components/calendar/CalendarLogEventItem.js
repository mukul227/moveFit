import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import CustomText from "../shared/CustomText";
import moment from "moment";

const windowWidth = Dimensions.get('window').width;
const CalendarLogEventItem = ({ event, colors }) => {

    return (
        <View style={styles.item}>
                <View style={{alignItems:'flex-start'}}>
                    <CustomText children={'PERSONAL'} size={14} color={colors.calendarWorkoutLocationTitle} />
                    <CustomText children={event?.name} color={colors.fontColor} size={18} fontWeight={'600'} style={{paddingVertical: 8}}/>
                    <CustomText children={event?.description} color={colors.fontColor} size={14}/>
                </View>
                <View style={styles.trainerInfo}>
                    <CustomText children={`${moment(event.start_time, 'HH:mm').format('hh:mm A')}`}  size={14} color={colors.fontColor} fontWeight={'500'}/>
                    <CustomText children={`${moment(event.end_time, 'HH:mm').format('hh:mm A')}`} size={14} color={colors.exerciseSubtitle} fontWeight={'500'}/>
                </View>
        </View>
    );
};


const styles = StyleSheet.create({
    item: {
        width:windowWidth,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical: 12,
        paddingHorizontal:20
    },
    trainerInfo: {
        alignItems:'center'
    }
});


export default CalendarLogEventItem;
