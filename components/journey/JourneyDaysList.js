import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import CircleWithProgressComponent from "./CircleWithProgressComponent";
import moment from "moment";

const JourneyDaysList = ({week, onPress, selectedDay }) => {
    const windowWidth = Dimensions.get('window').width;

    return (
        <View style={styles.container}>
            {
                week.map((day) => {
                    return (
                        <CircleWithProgressComponent
                            key={day.id}
                            inCircleText={moment(day.date).format('dddd')[0]}
                            progress={day.percentage}
                            ifToday={moment(day.date).format('dddd') === moment(Date.now()).format('dddd')}
                            size={(windowWidth-96)/7}
                            isSelected={selectedDay === day}
                        onPress={() => onPress(day)}/>
                    )
                })
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10
    }
});

export default JourneyDaysList;
