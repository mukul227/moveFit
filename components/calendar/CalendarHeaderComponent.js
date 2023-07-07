import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from "react-native-paper";
import Icons from "../../constants/Icons";
import CustomText from "../shared/CustomText";

const CalendarHeaderComponent = ({onItemPress, isList}) => {

    const {colors} = useTheme();

    return (
        <View style={[styles.headerWrapper]}>
            <CustomText children={'Calendar'} size={22} fontWeight={'700'} color={colors.fontColor}/>
            <TouchableOpacity onPress={onItemPress} style={styles.calendarIcon}>
                {
                    isList ?
                        <Icons.List color={colors.primaryColor} />
                        :
                        <Icons.Calendar color={colors.primaryColor} />
                }
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    headerWrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 8
    },
    calendarIcon: {
        paddingVertical: 5,
        paddingHorizontal: 5
    }
});


export default CalendarHeaderComponent;
