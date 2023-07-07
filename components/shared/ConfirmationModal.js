import React, { useState} from 'react';
import {
  View,
  StyleSheet,
  Modal, TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {showConfirmationModal} from "../../store/helpers/actions";
import {isConfirmationModalOpenSelector} from "../../store/helpers";
import CustomText from "./CustomText";
import Icons from "../../constants/Icons";

const ConfirmationModal = ({colors, title, subtitle, onPressConfirm}) => {

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(showConfirmationModal(false))
  };

  const isModalVisible = useSelector(isConfirmationModalOpenSelector());

  return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView,{backgroundColor:colors.statsBoxColor}]}>
            <View style={[styles.headerWrapper, {backgroundColor: colors.primaryColor }]}>
              <CustomText size={18} color={'white'} fontWeight={'500'} children={title} fontWeight={'600'}/>
              <TouchableOpacity onPress={() => handleCloseModal()} style={{paddingHorizontal: 20, paddingVertical: 5}}>
                <Icons.Close color={'white'}/>
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <CustomText size={18} color={colors.fontColor} fontWeight={'600'} style={{textAlign: 'center'}} children={'Are you sure you want to ' + subtitle + '?'}/>
              <TouchableOpacity onPress={onPressConfirm} style={[styles.confirmButton, {backgroundColor: colors.primaryColor}]}>
                <CustomText children={'Confirm'} fontWeight={'700'} size={18} color={'white'}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: "center",
  },
  modalView: {
    overflow: 'hidden',
    width: '80%',
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
  },
  modalContent: {
    alignItems: 'center',
    margin: 10,
    width: '90%',
    paddingVertical: 20
  },
  confirmButton: {
    marginTop: 50,
    width: '100%',
    height:45,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ConfirmationModal;
