import React from 'react';
import {ScrollView, View} from 'react-native';
import AchievementComponent from "./AchievementComponent";
import ProfileStatsList from "./ProfileStatsList";

const ProfileStatsComponent = ({ data, achievement, colors }) => {
  return (
    <View style={{marginTop: 20}}>
        {/*<AchievementComponent achievement={achievement} colors={colors}/>*/}
      <ProfileStatsList data={data} colors={colors}/>
    </View>
  );
};

export default ProfileStatsComponent;
