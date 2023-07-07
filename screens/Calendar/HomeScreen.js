import React, {useEffect, useState} from 'react';
import {BackHandler, Platform, View} from 'react-native';
import Wrapper from "../../components/shared/Wrapper";
import {useTheme} from "react-native-paper";
import CalendarHeaderComponent from "../../components/calendar/CalendarHeaderComponent";
import {getEventsSaga, isLogEventModalShown} from "../../store/calendar/actions";
import {useDispatch, useSelector} from "react-redux";
import CalendarEventsListComponent from "../../components/calendar/CalendarEventsListComponent";
import {calendarEventsSelector} from "../../store/calendar";
import moment from "moment";
import CalendarWholeScreenList from "../../components/calendar/CalendarWholeScreenList";
import {fromCalendar} from "../../store/workouts/actions";

const HomeScreen = ({}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch()
  const getAllEvents = (id) => dispatch(getEventsSaga(id))
  const calendarData = useSelector(calendarEventsSelector())
  const [isList, setIsList] = useState(false)

  const onModalOpen = () => {
    dispatch(isLogEventModalShown(true))
  }

  useEffect(() => {
    dispatch(fromCalendar(false))
    getAllEvents(null)
  }, [])

  const onCalendarIconPress = () => {
    setIsList(!isList)
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])

  const onSelectedDayPress = (day) => {
    getAllEvents(moment(day.timestamp).format())
    setIsList(false)
  }


  return (
    <Wrapper paddingHorizontal={0} paddingBottom={Platform.OS === 'ios' ? 75 : 50}>
      <View style={{paddingHorizontal: 20}}>
        <CalendarHeaderComponent onItemPress={() => onCalendarIconPress()} isList={isList}/>
      </View>
      {
        isList ?
          <CalendarWholeScreenList colors={colors} onSelectedDayPress={(day) => onSelectedDayPress(day)}/>
          :
          <CalendarEventsListComponent data={calendarData} colors={colors}/>
      }
    </Wrapper>
  );
};

export default HomeScreen;

