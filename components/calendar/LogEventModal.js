import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {createNewEventSaga, isLogEventModalShown} from "../../store/calendar/actions";
import {isLogEventModalShowSelector} from "../../store/calendar";
import {LogEventForm} from "./LogEventForm";
import RnAndroidKeyboardAdjust from "rn-android-keyboard-adjust";

const windowHeight = Dimensions.get('window').height;

const LogEventModal = ({colors}) => {

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(isLogEventModalShown(false))
    RnAndroidKeyboardAdjust.setAdjustResize();
  };

  const isModalVisible = useSelector(isLogEventModalShowSelector());

  const onSaveEvent = (values) => {
    dispatch(createNewEventSaga(values))
    RnAndroidKeyboardAdjust.setAdjustResize();
  }

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const onKeyboardDidShow = (e) => {
    setKeyboardHeight(e.endCoordinates.height);
  }

  const onKeyboardDidHide = (e) => {
    setKeyboardHeight(0);
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    const hideSubscription = Keyboard.addListener('keyboardWillHide', onKeyboardDidHide);
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

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
        <View
          style={[styles.centeredView, {bottom: keyboardHeight > 0 ? null : 0, top: keyboardHeight === 0 ? null : 0}]}>
          <View style={[styles.modalView, {
            backgroundColor: colors.statsBoxColor,
            height: keyboardHeight > 0 ? windowHeight - keyboardHeight : 'auto'
          }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <LogEventForm colors={colors} onSubmit={(value) => onSaveEvent(value)}/>
            </ScrollView>
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
  },
  modalView: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    paddingBottom: 20,
    paddingHorizontal: 20,
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
  }
});

export default LogEventModal;
