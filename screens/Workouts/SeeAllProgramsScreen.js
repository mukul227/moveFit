import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useTheme} from "react-native-paper";
import Wrapper from "../../components/shared/Wrapper";
import Icons from "../../constants/Icons";
import SeeAllProgramsList from "../../components/workouts/SeeAllProgramsList";
import {useDispatch, useSelector} from "react-redux";
import {allProgramsDataSelector, getProgramSaga} from "../../store/programs";

const SeeAllProgramsScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {colors} = useTheme();

  const programData = useSelector(allProgramsDataSelector());
  const {data, title} = programData;

  const onPressItem = programId => dispatch(getProgramSaga(programId));

  return (
    <Wrapper>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{marginVertical: 10}}>
        <Icons.ArrowLeft color={colors.fontColor}/>
      </TouchableOpacity>
      <SeeAllProgramsList colors={colors} data={data} title={title} navigation={navigation}
                          onPressItem={onPressItem}/>
    </Wrapper>
  );
};

export default SeeAllProgramsScreen;
