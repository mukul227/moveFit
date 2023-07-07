import React, {useEffect, useState} from 'react';
import Wrapper from "../../components/shared/Wrapper";
import {useTheme} from "react-native-paper";
import JourneyDaysList from "../../components/journey/JourneyDaysList";
import CustomText from "../../components/shared/CustomText";
import moment from "moment";
import PlusButton from "../../components/shared/PlusButton";
import HabitModal from "../../components/journey/HabitModal";
import {useDispatch, useSelector} from "react-redux";
import {getHabitsSaga, setCompletedSaga, showHabitModal} from "../../store/journey/actions";
import HabitsListComponent from "../../components/journey/HabitsListComponent";
import {BackHandler, Platform} from "react-native";
import {habitsSelector} from "../../store/journey";

const HomeScreen = ({ }) => {
    const [title, setTitle] = useState(moment(Date.now()).format('dddd'));
    const { colors } = useTheme();
    const dispatch = useDispatch()
    const getAllHabits = () => dispatch(getHabitsSaga())
    const habitsData = useSelector(habitsSelector())
    const [selectedDay, setSelectedDay] = useState(null);
    const [clickedDay, setClickedDay] = useState(Date.now());
    useEffect(() => {
        getAllHabits()
    }, [])

    useEffect(() => {
        let day = habitsData?.filter(day => moment(day.date).format('dddd') === moment(clickedDay).format('dddd'))
        setSelectedDay(habitsData[day[0]?.id -1])
        setTitle(moment(habitsData[day[0]?.id -1]?.date).format('dddd'))
    }, [habitsData])

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])

    const onModalOpen = () => {
        dispatch(showHabitModal(true))
        setClickedDay(selectedDay.date)
    }

    const onPressDay = (day) => {
        if(moment(day.date).format('dddd') === moment(Date.now()).format('dddd')){
            setTitle('Today')
        } else {
            setTitle(moment(day.date).format('dddd'))
        }
        setSelectedDay(day)
    };

    const onCompleted = (item) => {
        let data = {
            obj: {
             date:  selectedDay.date
            },
            habit: item
        }
        setClickedDay(selectedDay.date)
        dispatch(setCompletedSaga(data))
    }

  return (
      <Wrapper paddingHorizontal={18} paddingBottom={Platform.OS === 'ios' ? 75 : 50} showStatusBar={true}  backgroundColor={colors.backgroundColor}>
          <CustomText children={title} size={22} fontWeight={'700'} color={colors.fontColor} style={{marginVertical:16, textAlign:'center'}}/>
          <JourneyDaysList week={habitsData} onPress={(day) => onPressDay(day)} selectedDay={selectedDay}/>
          <HabitsListComponent onClick={() => setClickedDay(selectedDay.date)} colors={colors} data={selectedDay?.habits} onCompleted={(item) => onCompleted(item)}/>
          <PlusButton  onPress={() => onModalOpen()}/>
          <HabitModal colors={colors}/>
      </Wrapper>
  );
};

export default HomeScreen;
