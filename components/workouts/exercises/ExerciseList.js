import React from 'react';
import {View} from 'react-native';
import ExerciseListItem from "./ExerciseListItem";
import CustomText from "../../shared/CustomText";
import {useDispatch, useSelector} from "react-redux";
import {programSelector} from "../../../store/programs";
import {startProgramSaga} from "../../../store/programs/actions";
import ConfirmationModal from "../../shared/ConfirmationModal";
import {showConfirmationModal} from "../../../store/helpers/actions";

const ExerciseList = ({ data, colors, onItemPress, onButtonPress }) => {
  const program = useSelector(programSelector());
  const dispatch = useDispatch();
  const onPressAction = (programId) => {
      dispatch(startProgramSaga(programId));
      dispatch(showConfirmationModal(false));
  }
  return (
    <View>
      <CustomText children={'Exercises'} color={colors.exerciseTitle} size={15} fontWeight={'500'} style={{marginTop: 16, marginLeft: 16}}/>
      {
        data.map(item => {
          if (item.type !== 'break') {
            return <ExerciseListItem key={item.id} item={item} colors={colors} onItemPress={onItemPress}/>
          }
        })
      }
      <View style={{padding: 20}}>
        {/*<Button isActive={data.length} borderColor={colors.primaryColor} title={program && program.started ? 'Start Workout' : 'Join the program'} onPress={ program.started ? onButtonPress : () => dispatch(showConfirmationModal(true))} backgroundColor={colors.primaryColor}/>*/}
        <ConfirmationModal onPressConfirm={() => onPressAction(program.id)} title={'Join the program'} subtitle={'join this program'} colors={colors}/>
      </View>
    </View>
  );
};

export default ExerciseList;
