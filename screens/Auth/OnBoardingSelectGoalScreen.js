import React, {useEffect, useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import AuthHeader from "../../components/auth/AuthHeader";
import StatusBarComp from "../../components/shared/StatusBarComp";
import AuthTitle from "../../components/auth/AuthTitle";
import CheckBoxComponent from "../../components/auth/CheckBoxComponent";
import {whatBringsYuToMoveFit} from '../../dataForCheckList/data'
import CheckboxTitle from "../../components/auth/CheckboxTitle";
import {profileService} from "../../services/ProfileService";

export default function OnBoardingSelectGoalScreen({ navigation }) {

  const [data, setData] = useState([]);

  const getGoals = async () => {
    try {
      const res = await profileService.getGoals();
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
    getGoals()
  },[])

    return (
        <View style={styles.container}>
          <StatusBar translucent barStyle="dark-content" />
            <StatusBarComp/>
            <AuthHeader navigation={navigation}/>
            <CheckboxTitle
              marginTop={40}
              titleFontSize={22}
              fontWeight={'500'}
              title={"What brings you to"}
              boldedTitle={' Move'}
              additionalTitle={'?'}
              subtitle={'You can select one or more'} />
            <CheckBoxComponent navigation={navigation} where={'OnBoardingPreferWorkoutScreen'} singleSelection={false}  data={data}/>
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
