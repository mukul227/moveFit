import React, { useState} from 'react';
import { StyleSheet, View} from 'react-native';
import {CalendarList, LocaleConfig} from "react-native-calendars";
import moment from "moment";

const INITIAL_DATE = moment(new Date()).format('YYYY-MM-DD');

const CalendarWholeScreenList = ({colors, onSelectedDayPress}) => {
    const [selected, setSelected] = useState(INITIAL_DATE);

    const onDayPress = (day) => {
        setSelected(day.dateString);
        onSelectedDayPress(day)
    };

    LocaleConfig.locales['us'] = {
        monthNames: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],
        monthNamesShort: ['Jan.', 'Feb.', 'Mar', 'Apr', 'May', 'Jun', 'Jul.', 'Aug', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
        dayNames: ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayNamesShort: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        today: "Today"
    };
    LocaleConfig.defaultLocale = 'us';
    return (
        <View style={styles.container}>
            <CalendarList
                // Callback which gets executed when visible months change in scroll view. Default = undefined
                onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={6}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={6}
                // Enable or disable scrolling of calendar list
                scrollEnabled={true}
                // Enable or disable vertical scroll indicator. Default = false
                showScrollIndicator={false}
                onDayPress={onDayPress}
                markedDates={{
                    [selected]: {
                        selected: true,
                        disableTouchEvent: false,
                        selectedColor: colors.primaryColor,
                        selectedTextColor: 'white',
                    },
                }}
                theme={{
                    'stylesheet.calendar.header': {
                        monthText: {
                            color: colors.primaryColor,
                            ...styles.monthStyle
                        },
                    },
                    dayTextColor: colors.fontColor,
                    textDayFontSize: 18,
                    textDayFontWeight:'700',
                    calendarBackground: colors.backgroundColor,
                    selectedTextColor: colors.primaryColor,
                    todayTextColor:colors.primaryColor,
                    textDayHeaderFontSize: 12,
                    textDayHeaderFontWeight: '900',
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width:'100%',
        justifyContent:'space-between',
        marginTop:15,
        flex: 1
    },
    monthStyle: {
        alignItems: 'flex-start',
        width: '100%',
        fontWeight:'900',
        fontFamily:'Avenir Heavy',
        fontSize: 16,
    }
});

export default CalendarWholeScreenList;
