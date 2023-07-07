import React, {useEffect, useRef, useState} from 'react';
import {Modal, StyleSheet, View, TouchableOpacity} from "react-native";
import CustomText from "../../shared/CustomText";
import {useTheme} from "react-native-paper";
import Icons from "../../../constants/Icons";

const PlayExercisePopUp = ({ isVisible, activeItem, onModalClose, navigation, onRestart, onMarkAsCompleted, onAmrapQuit, onWorkoutQuit }) => {

  const { colors } = useTheme();

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.modalWrapperMain}>
            <CustomText children={'Paused'} size={22} color={'black'} fontWeight={'700'}/>
            <TouchableOpacity
              onPress={() => onModalClose()}
              style={{paddingVertical: 5, paddingLeft: 10}}>
              <Icons.Close color={colors.primaryColor} />
            </TouchableOpacity>
          </View>
          {
            activeItem?.type === 'amrap' &&
            <TouchableOpacity onPress={() => onAmrapQuit()} style={styles.button}>
              <View style={{width: '10%'}}>
                <Icons.quitPause />
              </View>
              <CustomText children={'Skip Amrap'} fontWeight={'700'} size={16} />
            </TouchableOpacity>
          }
          <TouchableOpacity onPress={() => onRestart()} style={styles.button}>
            <View style={{width: '10%'}}>
              <Icons.restartPause />
            </View>
            <CustomText children={'Restart'} fontWeight={'700'} size={16} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onMarkAsCompleted()} style={styles.button}>
            <View style={{width: '10%'}}>
              <Icons.checkBoxPause />
            </View>
            <CustomText children={'Mark as Completed'} fontWeight={'700'} size={16}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            onWorkoutQuit();
            navigation.goBack();
          }} style={styles.button}>
            <View style={{width: '10%'}}>
              <Icons.quitPause />
            </View>
            <CustomText children={'Quit Workout'} fontWeight={'700'} size={16}/>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  wrapper: {
    width: '100%',
    paddingBottom: 70,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#F1F3F5',
    bottom: 0,
    position: 'absolute',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    marginBottom: 10
  },
  modalWrapperMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  }
});

export default PlayExercisePopUp;
