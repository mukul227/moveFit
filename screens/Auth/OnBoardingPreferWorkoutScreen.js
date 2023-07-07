import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import AuthHeader from "../../components/auth/AuthHeader";
import StatusBarComp from "../../components/shared/StatusBarComp";
import CheckBoxComponent from "../../components/auth/CheckBoxComponent";
import {preferWorkout} from '../../dataForCheckList/data'
import CheckboxTitle from "../../components/auth/CheckboxTitle";

export default function OnBoardingPreferWorkoutScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <StatusBar translucent barStyle="dark-content" />
      <StatusBarComp/>
      <AuthHeader navigation={navigation}/>
      <CheckboxTitle
        fontWeight={'600'}
        marginTop={40}
        title={"Where do you prefer to workout?"}
      />
      <CheckBoxComponent navigation={navigation} objectKey={'location'} where={'OnBoardingWorkoutTypeScreen'}  data={preferWorkout}/>
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
