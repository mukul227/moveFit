import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import AuthHeader from "../../components/auth/AuthHeader";
import StatusBarComp from "../../components/shared/StatusBarComp";
import CheckBoxComponent from "../../components/auth/CheckBoxComponent";
import {fitnessLevel} from '../../dataForCheckList/data'
import CheckboxTitle from "../../components/auth/CheckboxTitle";

export default function OnBoardingWorkoutTypeScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <StatusBar translucent barStyle="dark-content" />
      <StatusBarComp/>
      <AuthHeader navigation={navigation}/>
      <CheckboxTitle
        fontWeight={'600'}
        marginTop={40}
        title={"Choose your fitness level"}
      />
      <CheckBoxComponent navigation={navigation} objectKey={'fitness_level'} where={'OnBoardingThemeScreen'}  data={fitnessLevel}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 15
  },
});
