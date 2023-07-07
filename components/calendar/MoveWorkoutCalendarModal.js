import React, { useState} from 'react';
import {
    View,
    StyleSheet,
    Modal, TouchableWithoutFeedback
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {
    moveWorkoutSaga,
    setIsCalendarModalOpen,
    setMoveCalendarObject
} from "../../store/calendar/actions";
import CustomText from "../shared/CustomText";
import {Calendar} from "react-native-calendars/src/index";
import {isCalendarModalOpenSelector, moveCalendarObjectSelector, scheduleWorkoutSelector} from "../../store/calendar";
import moment from "moment";
import Button from "../shared/Button";

const INITIAL_DATE = moment(new Date()).format('YYYY-MM-DD');
const MoveWorkoutCalendarModal = ({colors}) => {
    const [selected, setSelected] = useState(null);
    const moveObject = useSelector(moveCalendarObjectSelector());

    const dispatch = useDispatch();

    const handleCloseModal = () => {
        dispatch(setIsCalendarModalOpen(false))
        dispatch(setMoveCalendarObject({moveAll:false, date:null  }))
    };

    const isModalVisible = useSelector(isCalendarModalOpenSelector());
    const scheduleWorkout = useSelector(scheduleWorkoutSelector());

    const onMoveDate = () => {
        dispatch(moveWorkoutSaga())
    }

    const getMinDate = () => {
        let workoutDateMinus14 = moment(scheduleWorkout?.date).subtract(14, 'days').format('YYYY-MM-DD');
        if(moment(workoutDateMinus14).isBefore(INITIAL_DATE)) {
            return INITIAL_DATE
        }
        return workoutDateMinus14
    }

    const getMaxDate = () => {
        return moment(scheduleWorkout?.date).add(14, 'days').format('YYYY-MM-DD')
    }

    const onDayPress = (day) => {
        setSelected(day.dateString)
        dispatch(setMoveCalendarObject({...moveObject, date: moment.utc(day.timestamp).format('YYYY-MM-DD')}))
    }

    return (

        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                }}
            >
                <TouchableWithoutFeedback onPress={() => handleCloseModal()}>
                    <View style={styles.modalOverlay}/>
                </TouchableWithoutFeedback>
                <View style={[styles.centeredView,{backgroundColor: colors.backgroundColor, borderTopLeftRadius:20, borderTopRightRadius: 20}]}>
                     <View style={styles.modalTitle}>
                         <CustomText color={colors.fontColor} children={ moveObject?.moveAll ? 'Move all future workouts' : 'Move this workout only'} size={22} fontWeight={'700'}/>
                     </View>
                    <Calendar
                        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                        minDate={getMinDate()}
                        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                        maxDate={getMaxDate()}
                        // Handler which gets executed on day press. Default = undefined
                        onDayPress={(day) => onDayPress(day)}
                        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                        monthFormat={'yyyy MMM'}
                        // Hide month navigation arrows. Default = false
                        hideArrows={true}
                        markedDates={{
                            [selected]: {
                                selected: true,
                                disableTouchEvent: false,
                                selectedColor: colors.primaryColor,
                                selectedTextColor: 'white',
                            },
                        }}
                        hideExtraDays={true}
                        enableSwipeMonths={true}
                        theme={{
                            'stylesheet.calendar.header': {
                                monthText: {
                                    color: colors.primaryColor,
                                    ...styles.monthStyle
                                },
                            },
                            textDayFontSize: 18,
                            textDayFontWeight:'700',
                            calendarBackground: colors.backgroundColor,
                            dayTextColor: colors.fontColor,
                            textDisabledColor:colors.calendarDisabledColor,
                            selectedTextColor: colors.primaryColor,
                            todayTextColor:colors.primaryColor,
                            textDayHeaderFontSize: 12,
                            textDayHeaderFontWeight: '900',
                        }}
                    />
                    <View style={styles.btnStyle}>
                        <Button onPress={() => onMoveDate()} isActive={selected} backgroundColor={ selected ? colors.primaryColor : colors.calendarDisabledColor} borderColor={selected ? colors.primaryColor : colors.calendarDisabledColor } title={'Move Workout'} />
                    </View>
                </View>
            </Modal>
        </View>

    );
};

const styles = StyleSheet.create({
    centeredView: {
        position: 'absolute',
        width: '100%',
        justifyContent: 'center',
        bottom: 0,
    },
    modalView: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
        paddingBottom: 20,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    keyboardView: {
        width: '100%',
        backgroundColor: 'transparent',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    monthStyle: {
        width: '100%',
        fontWeight:'900',
        fontFamily:'Avenir Heavy',
        fontSize: 16,
    },
    modalTitle: {
        width: '100%',
        paddingTop: 30,
        paddingBottom:10,
        paddingHorizontal: 20
    },
    btnStyle: {
        paddingVertical: 30,
        paddingHorizontal: 20
    }
});

export default MoveWorkoutCalendarModal;
