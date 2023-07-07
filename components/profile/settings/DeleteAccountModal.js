import React from 'react';
import {
  Dimensions,
  Image,
  Linking,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomText from '../../shared/CustomText';

const windowWidth = Dimensions.get('window').width;

const DeleteAccountModal = ({ isModalVisible, onDeleteAccount, colors }) => {
  const handleClick = async () => {
    await Linking.openURL('mailto:customerservice@movefit.com');
  };
  return (
    <Modal animationType="fade" transparent={true} visible={isModalVisible}>
      <View style={styles.modalBackground}>
        <View style={styles.modal}>
          <CustomText
            children={'Delete Account'}
            size={24}
            fontWeight={'700'}
            color={'#131415'}
            style={styles.title}
          />
          <CustomText
            children={`Your account is scheduled for deletion and will be deleted within 7 business days.`}
            size={18}
            fontWeight={'400'}
            color={'#131415'}
            style={styles.subtitle}
          />
          <CustomText
            onPress={handleClick}
            children={`You must send an email to customerservice@movefit.com to confirm account deletion!`}
            size={18}
            fontWeight={'400'}
            color={'#131415'}
            style={styles.subtitle}
          />

          <TouchableOpacity
            onPress={onDeleteAccount}
            style={[styles.button, { borderTopColor: colors.primaryColor }]}
          >
            <CustomText
              children={'Done'}
              size={18}
              color={'#131415'}
              fontWeight={'500'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteAccountModal;

const styles = StyleSheet.create({
  modalBackground: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modal: {
    borderRadius: 20,
    width: windowWidth - 32,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: 32,
    marginTop: 32,
  },
  button: {
    width: '100%',
    marginTop: 16,
    borderTopWidth: 1,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
