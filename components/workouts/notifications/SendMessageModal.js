import React from 'react';
import {Modal, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import CustomText from "../../shared/CustomText";
import MessagesList from "./MessagesList";

const SendMessageModal = ({ isModalOpen, onOverlayPress, colors, messages, notification, onMessagePress }) => {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={isModalOpen}
    >
      <TouchableWithoutFeedback onPress={onOverlayPress}>
        <View style={styles.modalOverlay}/>
      </TouchableWithoutFeedback>
      <View style={[styles.modalView, {backgroundColor: colors.notificationModalBackground}]}>
        <CustomText children={`Send ${notification?.sender.first_name} a message`} size={22} fontWeight={'700'} color={colors.fontColor} style={{marginTop: 14, marginBottom: 24}}/>
        <MessagesList colors={colors} messages={messages} onMessagePress={onMessagePress}/>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    width: '100%',
    height: '60%',
    position: 'absolute',
    bottom: 0,
    borderRadius: 20,
    padding: 16,
    paddingBottom: 40
  }
})

export default SendMessageModal;
