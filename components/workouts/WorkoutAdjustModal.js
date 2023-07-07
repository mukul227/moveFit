import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Modal, TouchableOpacity} from 'react-native';
import CustomText from "../shared/CustomText";
import Icons from "../../constants/Icons";
import {useDispatch} from "react-redux";
import { preferenceWidgetHelper } from "../../helpers/preferenceWidgetHelper";
import { locationsList, weightTypeList, fitnessLevelList} from "../../constants/preferenceWidgetData";
import SelectedPreferenceList from "./SelectedPreferenceList";
import {adjustWorkoutSaga} from "../../store/workouts/actions";

const WorkoutAdjustModal = ({ isVisible, preferences, onModalClose, preference, fitnessLevelIcon, colors, selectedTab }) => {
  const dispatch = useDispatch();
  const { location, fitness_level } = preference;

  const [selectedPreference, setSelectedPreference] = useState(null);
  const [preferenceList, setPreferenceList] = useState(null);

  const selectedPreferenceList = [
    {id: 1, title: preferenceWidgetHelper.getLocationTitle(location), icon: <Icons.workoutTab color={colors.primaryColor}/>},
    {id: 2, title: preference.preference.name, icon: <Icons.weight color={colors.primaryColor}/>},
    {id: 3, title: preferenceWidgetHelper.getFitnessLevelTitle(fitness_level), icon: fitnessLevelIcon}
  ];

  useEffect(() => {
    if (selectedTab) {
      getPreferenceList(selectedTab);
      setSelectedPreference(selectedTab)
    }
  },[selectedTab])

  const getPreferenceList = (selectedPreference) => {
    switch (selectedPreference) {
      case 1:
        setPreferenceList(locationsList)
        break;

      case 2:
        setPreferenceList(preferences)
        break;

      case 3:
        setPreferenceList(fitnessLevelList)
        break;
    }
  };

  const onPreferencePress = (item, selectedPreference) => {
    setSelectedPreference(null);
    onModalClose();
    dispatch(adjustWorkoutSaga(getData(item, selectedPreference)))
  };

  const onModalClosePress = () => {
    onModalClose();
    setSelectedPreference(null);
  };

  const getData = (item, selectedPreference) => {
    switch (selectedPreference) {
      case 1:
        const location = {
          preference: {
            location: item.value
          }
        };
        return location;

      case 2:
        const preference = {
          preference: {
            preference_id: item.id
          }
        };
        return preference;

      case 3:
        const fitnessLevel = {
          preference: {
            fitness_level: item.value
          }
        };
        return fitnessLevel;
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, {backgroundColor: colors.notificationBox}]}>
            <View style={[styles.headerWrapper, {backgroundColor: colors.primaryColor }]}>
              <CustomText size={15} color={colors.backgroundColor} fontWeight={'500'} children={'Adjust Workout'}/>
              <TouchableOpacity onPress={onModalClosePress} style={{paddingHorizontal: 20, paddingVertical: 5}}>
                <Icons.Close color={colors.backgroundColor}/>
              </TouchableOpacity>
            </View>
            <SelectedPreferenceList selectedPreferences={selectedPreference} setSelectedPreference={itemId => setSelectedPreference(itemId)} selectedPreference={selectedPreference} selectedPreferenceList={selectedPreferenceList} getPreferenceList={getPreferenceList} preferenceList={preferenceList} colors={colors} onPreferencePress={onPreferencePress}/>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: 'rgba(0,0,0,0.5)',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    overflow: 'hidden',
    width: '90%',
    borderRadius: 20,
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
  headerWrapper: {
    width: '100%',
    height: 44,
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default WorkoutAdjustModal;
