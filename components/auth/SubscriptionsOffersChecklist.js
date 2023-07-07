import React from 'react';
import {View, Text} from "react-native";
import CustomText from "../shared/CustomText";
import Icons from "../../constants/Icons";
import {useTheme} from "react-native-paper";

export default function SubscriptionsOffersChecklist({title}) {

  const { colors } = useTheme();

  return (
    <View style={{width: '100%', marginTop: 20}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{paddingRight: 10, width: '10%'}}>
          <Icons.FilledColor color={colors.primaryColor}/>
        </View>
        <View style={{width: '90%'}}>
        <Text>
          <CustomText color={colors.fontColor} children={'REAL '} fontWeight={'700'} size={15}/>
          <CustomText
            color={colors.fontColor}
            children={'videos recorded by our fitness coaches with step-by-step instructions for each personalized workout routine'}
            size={15}/>
        </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginVertical: 15}}>
        <View style={{paddingRight: 10, width: '10%'}}>
          <Icons.FilledColor color={colors.primaryColor}/>
        </View>
        <View style={{width: '90%'}}>
        <Text>
          <CustomText color={colors.fontColor} children={'Move '} fontWeight={'700'} size={15}/>
          <CustomText
            color={colors.fontColor}
            children={'with friends - follow your friends fitness journeys with our follow feature, workout with friends and share your progress with others '}
            size={15}/>
        </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{paddingRight: 10, width: '10%'}}>
          <Icons.FilledColor color={colors.primaryColor}/>
        </View>
        <View style={{width: '90%'}}>
        <Text>
          <CustomText
            color={colors.fontColor}
            children={'Our Habit Tracker feature - designed to assist you in building and maintaining healthy habits to keep your goals the'}
            size={15}/>
          <CustomText color={colors.fontColor} children={' TOP '} fontWeight={'700'} size={15}/>
          <CustomText
            color={colors.fontColor}
            children={'priority'}
            size={15}/>
        </Text>
        </View>
      </View>
    </View>
  );
}
