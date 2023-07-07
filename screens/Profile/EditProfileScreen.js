import React from 'react';
import Wrapper from "../../components/shared/Wrapper";
import OnBoardingCreateAccountScreen from "../Auth/OnBoardingCreateAccountScreen";
import {Platform} from "react-native";

const EditProfileScreen = ({ navigation }) => {

  return (
    <Wrapper paddingBottom={Platform.OS === 'ios' ? 90 : 45}>
        <OnBoardingCreateAccountScreen isEdit={true} navigation={navigation}/>
    </Wrapper>
  );
};

export default EditProfileScreen;
