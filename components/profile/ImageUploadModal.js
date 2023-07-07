import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useDispatch} from "react-redux";
import CustomText from "../shared/CustomText";
import {useTheme} from "react-native-paper";
import Icons from "../../constants/Icons";
import Icon from "react-native-vector-icons/Entypo";

const ImageUploadModal = ({isModalVisible, onClose, onGalleryOpen, onCameraOpen}) => {

  const dispatch = useDispatch();
  const {colors} = useTheme();

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
              <CustomText size={15} color={colors.backgroundColor} style={{paddingLeft: 20}} fontWeight={'500'} children={'Choose image for your post'}/>
              <TouchableOpacity onPress={() => onClose()} style={{paddingHorizontal: 20, paddingVertical: 5}}>
                <Icons.Close color={colors.backgroundColor}/>
              </TouchableOpacity>
            </View>
            <View style={{padding: 30}}>
              <CustomText style={{textAlign: 'center'}} children={'Choose gallery or camera'} color={colors.fontColor} size={16} fontWeight={'600'}/>
            </View>
            <View style={styles.middleWrapper}>
              <View style={{flexDirection: 'row', marginBottom: 20}}>
                <TouchableOpacity
                  onPress={() => onGalleryOpen()}
                  style={[styles.buttonPick, {borderColor: colors.primaryColor, marginRight: 40, backgroundColor: colors.backgroundColor}]}>
                  <Icon
                    name="folder-images"
                    size={40}
                    color={colors.primaryColor}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onCameraOpen()}
                  style={[styles.buttonPick, {borderColor: colors.primaryColor, backgroundColor: colors.backgroundColor}]}>
                  <Icon
                    name="camera"
                    size={40}
                    color={colors.primaryColor}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.bottomWrapper}>
              <TouchableOpacity onPress={() => onClose()} style={styles.closeButton}>
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
  },
  buttonPick: {
    width: 70,
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  middleWrapper: {
    width: '100%',
    paddingHorizontal: '10%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ImageUploadModal;
