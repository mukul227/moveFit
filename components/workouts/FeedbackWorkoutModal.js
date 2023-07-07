import React, {useState} from 'react';
import {StyleSheet, View, Modal, Dimensions} from 'react-native';
import CustomText from "../shared/CustomText";
import {useTheme} from "react-native-paper";
import CheckBoxComponent from "../auth/CheckBoxComponent";
import {optionsForFeedback} from "../../dummyData/options-for-feedback";
import WorkoutRatingComponent from "./WorkoutRatingComponent";
import WorkoutFeedbackModalButtons from "./WorkoutFeedbackModalButtons";

const FeedbackWorkoutModal = ({isVisible, navigation, onPressToHome, onSharePress}) => {

  const {colors} = useTheme();
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, {backgroundColor: colors.statsBoxColor}]}>
          <View style={styles.headerWrapper}>
            <CustomText size={22} color={colors.fontColor} fontWeight={'700'} children={'Give us feedback!'}
                        style={{marginTop: 20}}/>
            <CustomText size={16} color={colors.singlePostDescription} children={'You completed your first workout!'}/>
          </View>
          <CheckBoxComponent setSelectedItem={(selectedOption) => setSelectedOption(selectedOption)}
                             notOnboarding={true} navigation={navigation} data={optionsForFeedback}/>
          <View style={{width: '100%', marginBottom: 40}}>
            <WorkoutRatingComponent setSelectedItem={(selectedItem) => setSelectedRating(selectedItem)}/>
            <WorkoutFeedbackModalButtons onPressShare={() => onSharePress({selectedOption, selectedRating})}
                                         onPressToHome={() => onPressToHome({selectedOption, selectedRating})}/>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: "center",
  },
  modalView: {
    overflow: 'hidden',
    width: '100%',
    height: windowHeight / 1.2,
    paddingHorizontal: 15,
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
    paddingLeft: 20,
    alignItems: 'center',
  }
});


export default FeedbackWorkoutModal;
