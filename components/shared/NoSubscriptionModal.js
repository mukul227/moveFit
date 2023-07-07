import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {subscriptionModalSelector} from "../../store/helpers";
import CustomText from "./CustomText";
import {useTheme} from "react-native-paper";
import CustomButton from "./Button";
import Icons from "../../constants/Icons";
import {navigateFromSubscriptionModal, showSubscriptionModal} from "../../store/helpers/actions";

const NoSubscriptionModal = ({isModalVisible}) => {

  const dispatch = useDispatch();
  const {colors} = useTheme();

  const subscriptionModal = useSelector(subscriptionModalSelector());
  const handleCloseModal = () => dispatch(showSubscriptionModal({isVisible: false, tab: ''}))

  const navigateToSubscription = () => {
    dispatch(navigateFromSubscriptionModal())
  }

  return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, {backgroundColor:colors.singleProgramBackground,borderColor:colors.primaryColor}]}>
            <View style={[styles.headerWrapper, { backgroundColor: colors.primaryColor}]}>
              <CustomText size={15} color={colors.backgroundColor} style={{paddingLeft: 20}} fontWeight={'500'} children={'Subscribe Now'}/>
              <TouchableOpacity onPress={() => handleCloseModal()} style={{paddingHorizontal: 20, paddingVertical: 5}}>
                <Icons.Close color={colors.backgroundColor}/>
              </TouchableOpacity>
            </View>
            <View style={{padding: 30}}>
              <CustomText style={{textAlign: 'center'}} children={'To unlock ' + subscriptionModal.tab + ' , you need to be subscribed.'} color={colors.fontColor} size={16} fontWeight={'600'}/>
            </View>
            <View style={styles.bottomWrapper}>
              <CustomButton borderColor={colors.primaryColor} backgroundColor={colors.primaryColor} onPress={() => navigateToSubscription()} setWidth={'90%'} title={'Subscribe Now'} />
              <TouchableOpacity onPress={() => handleCloseModal()} style={styles.closeButton}>
                <CustomText children={'Cancel'} textDecorationLine={'underline'} fontWeight={'500'} color={colors.primaryColor}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
  );
};

const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    height: windowHeight,
    width: '100%',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  modalView: {
    borderRadius: 20,
    paddingBottom: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position:'absolute',
    alignItems:'center',
    borderWidth: 0.5
  },
  bottomWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  closeButton: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  }
});

export default NoSubscriptionModal;
