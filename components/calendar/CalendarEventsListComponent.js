import React, {useEffect, useRef, useState} from 'react';
import { FlatList, StyleSheet, View} from 'react-native';
import CustomText from "../shared/CustomText";
import CalendarEventsListItem from "./CalendarEventsListItem";
import MoveWorkoutModal from "./MoveWorkoutModal";
import PlusButton from "../shared/PlusButton";
import {
    isLogEventModalShown,
    setIsCalendarModalOpen,
    setMoveCalendarObject,
    setScheduleWorkout
} from "../../store/calendar/actions";
import {useDispatch, useSelector} from "react-redux";
import LogEventModal from "./LogEventModal";
import {moveCalendarObjectSelector} from "../../store/calendar";
import MoveWorkoutCalendarModal from "./MoveWorkoutCalendarModal";
import moment from "moment";
import RnAndroidKeyboardAdjust from "rn-android-keyboard-adjust";
import {getWorkoutSaga} from "../../store/workouts";
const INITIAL_DATE = moment(new Date()).format('YYYY-MM-DD');
const CalendarEventsListComponent = ({data, colors}) => {
    const [moveModal, setMoveModal] = useState(false)
    const dispatch = useDispatch()
    const moveObject = useSelector(moveCalendarObjectSelector());

    const  onLongPress = (item) => {
        let itemDate = new Date(item?.date);
        itemDate.setUTCHours(0,0,0,0)

        if(!moment(itemDate).isBefore(INITIAL_DATE)){
            dispatch(setScheduleWorkout(item))
            setMoveModal(true)
        }
    }

  const  onPressItem = (item) => {
    const data = {
      workoutId: item.workout_id,
      weekId: item.program_week_id,
      programId: item.program_id,
      fromCalendar: true
    }

    dispatch(getWorkoutSaga(data))
  }

    const renderListItem = ({ item }) => (
        <CalendarEventsListItem item={item} colors={colors} onPressItem={(item) => onPressItem(item)} onLongPress={(item) => onLongPress(item)} />
    )


    const onModalOpen = () => {
        dispatch(isLogEventModalShown(true))
        RnAndroidKeyboardAdjust.setAdjustNothing();
    }

    const onOptionPress = (item) => {
        dispatch(setMoveCalendarObject({...moveObject, moveAll: item.moveAll}))
        setMoveModal(false)
        dispatch(setIsCalendarModalOpen(true))
    }

    const onMoveModalClose = () => {
        setMoveModal(false)
        dispatch(setMoveCalendarObject({moveAll:false, date:null  }))
    }


    const myRef = useRef(null);

    useEffect(() => {
        if(data.length > 20) {
            myRef?.current?.scrollToIndex({ index: 14, animated: true });
        }
    }, [data]);

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={{flexGrow:1}}
                ref={myRef}
                data={data}
                renderItem={renderListItem}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                onScrollToIndexFailed={info => {
                    const wait = new Promise(resolve => setTimeout(resolve, 500));
                    wait.then(() => {
                            myRef?.current?.scrollToIndex({ index: 14, animated: true });
                    });
                }}
                ListEmptyComponent={() => {
                    return(
                        <View style={{alignItems:'center'}}>
                            <CustomText children={'Loading...'} colors={colors}/>
                        </View>
                    )
                }}
            />
            <PlusButton bottom={20} onPress={onModalOpen}/>
            <MoveWorkoutModal colors={colors} isVisible={moveModal} onModalClose={() => onMoveModalClose() } onOptionPress={(item) => onOptionPress(item)}/>
            <LogEventModal colors={colors}/>
            <MoveWorkoutCalendarModal colors={colors}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width:'100%',
        justifyContent:'space-between',
        marginTop:15,
        flex: 1
    }
});

export default CalendarEventsListComponent;
