import React from 'react';
import {Modal, View, Text, StyleSheet} from 'react-native';
import CustomText from './CustomText';
import Button from './Button';
import {useDispatch} from 'react-redux';
import {setGlobalError} from '../../store/errors';

const GlobalErrorModal = ({isVisible}) => {

  const dispatch = useDispatch();

  const handleCloseModal = () => {
   dispatch(setGlobalError(false));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <CustomText size={18} style={{fontWeight: 'bold'}} children={'Ooops, something went wrong!'}/>
          <Button title={'Close'} style={{marginTop: 20}} onPress={() => handleCloseModal()}/>
        </View>
      </View>

    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: '90%',
    minHeight: 250,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default GlobalErrorModal;
