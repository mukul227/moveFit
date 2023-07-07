import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomText from "../shared/CustomText";
import Icons from "../../constants/Icons";

const AchievementComponent = ({ achievement, colors }) => {
  return (
    <TouchableOpacity
      onPress={() => console.log('ACHIEVEMENT')}
      style={[styles.container, {backgroundColor: colors.statsBoxColor, borderColor: colors.primaryColor}]}
    >
      {achievement.icon}
      <View style={{width: '50%'}}>
        <CustomText children={achievement.title} color={colors.primaryColor} size={24} fontWeight={'bold'}/>
        <CustomText children={achievement.description} color={colors.fontColor} size={14} fontWeight={'bold'}/>
      </View>
      <Icons.ArrowRight color={colors.primaryColor}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    borderWidth: 1,
    padding: 20
  }
});

export default AchievementComponent;
