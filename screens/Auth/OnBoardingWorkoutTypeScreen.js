import React, {useEffect, useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import AuthHeader from "../../components/auth/AuthHeader";
import StatusBarComp from "../../components/shared/StatusBarComp";
import CheckBoxComponent from "../../components/auth/CheckBoxComponent";
import {typeOfWorkout} from '../../dataForCheckList/data'
import CheckboxTitle from "../../components/auth/CheckboxTitle";
import {profileService} from "../../services/ProfileService";

export default function OnBoardingWorkoutTypeScreen({ navigation }) {

  const [data, setData] = useState([]);

  const getPreferences = async () => {
    try {
      const res = await profileService.getPreferences();
      let arr = [];
      res.map((item, index) => {
        const data = {
          id: item.id,
          title: item.name,
          selected: index === 0
        }
        arr.push(data);
      })
      setData(arr);
    } catch (e) {
      console.log({e});
    }
  }

  useEffect(() => {
    getPreferences()
  },[])

  return (
    <View style={styles.container}>
      <StatusBar translucent barStyle="dark-content" />
      <StatusBarComp/>
      <AuthHeader navigation={navigation}/>
      <CheckboxTitle
        fontWeight={'700'}
        marginTop={40}
        title={"What type of workout do you prefer?"}
      />
      <CheckBoxComponent navigation={navigation} objectKey={'preference'}  where={'OnBoardingFitnessLevelScreen'}  data={data}/>
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
