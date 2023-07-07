import React from 'react';
import {Keyboard, View, StyleSheet, TouchableOpacity, Text} from "react-native";
import CustomText from "../shared/CustomText";

export default function SubscriptionTitle({color}) {

  return (
    <View style={{alignItems: 'center'}}>
      <CustomText color={color} children={'Ultimate workouts'} size={17} style={{marginTop: 20}}/>
      <Text>
        <CustomText color={color} children={'Katie'} fontWeight={'700'} size={17}/>
        <CustomText color={color} children={' and '} size={17}/>
        <CustomText color={color} children={'Josh'} fontWeight={'700'} size={17}/>
      </Text>
      <Text style={{textAlign: 'center', marginTop: 10}}>
        <CustomText color={color} children={'MOVE '} fontWeight={'700'} size={17}/>
        <CustomText
          color={color}
          children={'is designed to help you crush your goals and see amazing fitness results in as little as 3 months! Our personalized fitness program is meant to be versatile so that anyone can use it - with a program that is specific to '}
          size={17}/>
        <CustomText color={color} children={'YOU.'} fontWeight={'700'} size={17}/>
        <CustomText color={color} children={'\n MOVE '} fontWeight={'700'} size={17}/>
        <CustomText color={color} children={'Features: '} size={17}/>
      </Text>
    </View>
  );
}
