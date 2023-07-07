import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import CircleWithProgressComponent from "./CircleWithProgressComponent";

const HabitModalDays = ({week, onPress, selectedDay }) => {
    const windowWidth = Dimensions.get('window').width;

    return (
        <View style={styles.container}>
            {
                week.map((day) => {
                    return (
                        <CircleWithProgressComponent
                            key={day.id}
                            inCircleText={day.day[0]}
                            progress={day.progress}
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

export default HabitModalDays;
