import React, {useState} from 'react';
import {StyleSheet, View, Modal, TouchableOpacity} from 'react-native';
import CustomText from "../shared/CustomText";

const DeletePostModal = ({ onClose, isVisible, onActionPress, isAuthUser }) => {


  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {

      }}
    >
      <View style={styles.centeredView}>
        <TouchableOpacity onPress={() => onActionPress()} style={styles.modalViewTop}>
          <CustomText children={isAuthUser ? 'Delete Post' : 'Report Post'} color={'#458bd4'} size={18}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClose()} style={styles.modalViewBottom}>
          <CustomText children={'Cancel'} color={'#458bd4'} size={18}/>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalViewBottom: {
    position: 'absolute',
    bottom: 90,
    width: '90%',
    height: 56,
    justifyContent: 'center',
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
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
  modalViewTop: {
    position: 'absolute',
    bottom: 160,
    width: '90%',
    height: 56,
    justifyContent: 'center',
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
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
  topButtons: {
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default DeletePostModal;
