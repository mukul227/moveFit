import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Modal, TouchableOpacity, Platform} from 'react-native';
import {useTheme} from "react-native-paper";
import Icons from "../../../constants/Icons";
import CustomText from "../../shared/CustomText";
import {workoutStats} from '../../../dataForProfileStats/data';
import ProfileStatsList from "../../profile/ProfileStatsList";
import {useDispatch, useSelector} from "react-redux";
import {showConfetti} from "../../../store/helpers/actions";
import ConfettiComponent from "../../shared/ConfettiComponent";
import {showConfettiSelector} from "../../../store/helpers";
import {healthService} from "../../../services/HealthService";
import {workoutSelector} from "../../../store/workouts";
import moment from "moment";

const CongratsWorkoutModal = ({isVisible, onSubmitPress, startDuration, endDuration}) => {

  const [heartRateValue, setHeartRateValue] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const workoutData = useSelector(workoutSelector());

  useEffect(() => {
    if (endDuration !== null) {
      let duration = moment.duration(endDuration.diff(startDuration));
      let time = duration.asSeconds();
      let minutes = Math.floor(time / 60);
      setMinutes(minutes);
      setSeconds(time - minutes * 60)
    }
  }, [endDuration])

  const getHealthValues = async () => {
    const heartRate = await healthService.getHeartRate();
    if(heartRate){
      setHeartRateValue(heartRate[0]?.quantity)
    }
  }

  useEffect(() => {
    if (Platform.OS === 'ios') {
      getHealthValues()
    }
  },[])

  const workoutStats = [
    {
      id: 1,
      title: 'Time',
      icon: <Icons.WakeUp width={24} height={24} color={'#1DA1F3'}/>,
      value: minutes,
      seconds: seconds.toFixed(0),
      unit: 'min',
      time: true,
      color: '#1DA1F3'
    },
    {
      id: 2,
      title: 'Heart',
      icon: <Icons.Heart width={24} height={24} color={'#BA4141'}/>,
      difference: 0,
      value: heartRateValue,
      unit: 'bpm',
      color: '#BA4141'
    },
    {
      id: 3,
      title: 'Avg Active Calories',
      icon: <Icons.LocalFire width={24} height={24} color={'#FD6955'}/>,
      difference: 0,
      value: workoutData.active_calories,
      unit: 'cal',
      color: '#FD6955'
    },
    {
      id: 4,
      title: 'Avg Total Calories',
      icon: <Icons.Fire width={24} height={24} color={'#B43DA7'}/>,
      value: workoutData.total_calories,
      unit: 'cal',
      color: '#B43DA7'
    }
  ];

  const {colors} = useTheme();
  const dispatch = useDispatch();
  const confetti = useSelector(showConfettiSelector());
  useEffect(() => {
    if (isVisible) {
      dispatch(showConfetti(true));
    }
  }, [isVisible]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, {backgroundColor: colors.profileHomeBackgroundColor}]}>
          <Icons.successImage />
          <CustomText children={'Congratulations!'} size={22} fontWeight={'700'} color={colors.fontColor} style={{marginTop: 15}}/>
          <CustomText children={'You completed your workout!'} size={16} fontWeight={'200'} color={colors.fontColor} style={{marginTop: 5, marginBottom: 25}}/>
          <ProfileStatsList data={workoutStats} colors={colors}/>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={() => onSubmitPress()} style={[styles.button, {backgroundColor: colors.primaryColor}]}>
              <Icons.ArrowWhite />
            </TouchableOpacity>
          </View>
        </View>
        {confetti ? <ConfettiComponent showConfettiProp={confetti}/> : null}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: '100%',
    justifyContent: "flex-end",
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: "center",
  },
  modalView: {
    overflow: 'hidden',
    width: '100%',
    paddingBottom: 101,
    borderRadius: 20,
    paddingTop: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    width: 80,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#32A1C7',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 30,
    alignItems: 'flex-end',
    paddingHorizontal: 25
  }
});


export default CongratsWorkoutModal;
