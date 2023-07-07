import React, {useEffect, useState} from 'react';
import {
  Dimensions, Platform,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import {themeSelector} from "../../store/helpers";
import {useSelector} from "react-redux";
import CustomText from "../shared/CustomText";
import {helperService} from "../../services/HelperService";
import ProfileStatsComponent from "./ProfileStatsComponent";

const AchievementListComponent = ({achievements, colors, dataForWidget, isAuthUser, user}) => {
  const theme = useSelector(themeSelector())
  const [counterData, setCounterData] = useState(null)
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      let data = [{id: 1, value: user.habits_streak},{id: 2, value: user.completed_workouts},{id: 3, value: user.workouts_shared}];
      // setCounterData([{id: 1, value: user.habits_streak},{id: 2, value: user.completed_workouts},{id: 3, value: user.workouts_shared}]);
      setCounterData([...data]);
    }
    return () => (mounted = false);

  },[user])

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {isAuthUser && Platform.OS === 'ios' ?
        <ProfileStatsComponent data={dataForWidget} colors={colors}/>
        :
        null
      }
      {
        <View style={styles.dataView}>
          <CustomText children={'Keep the streak going!'} style={{marginBottom: 20}} size={18} fontWeight={'bold'} color={colors.fontColor}/>
          <View style={styles.achievementView}>
            {
              counterData?.length ?
                  counterData.map((achievement) => {
                    return (
                        <View key={achievement.id} style={styles.achievementItem}>
                          {helperService.getCounterIcon(achievement.id,achievement.value,  theme)}
                          {helperService.getCounterTitle(achievement.id, colors)}
                        </View>
                    )
                  })
                  :
                  <CustomText children={'No data'} size={15} fontWeight={'300'} color={colors.fontColor}/>
            }
          </View>
        </View>
      }
      {
        achievements?.map((item, index) => {
          return (
            <View key={index} style={styles.dataView}>
              <CustomText children={item.title} size={18} fontWeight={'bold'} color={colors.fontColor}/>
              <View style={styles.achievementView}>
                {
                  item?.data.length ?
                    item?.data?.map((achievement) => {
                      return (
                        <View key={achievement.id} style={styles.achievementItem}>
                          {helperService.getAchievementIcon(achievement, theme)}
                          <CustomText children={achievement.name} size={14} fontWeight={'600'} color={colors.fontColor} style={{textAlign:'center'}}/>
                        </View>
                      )
                    })
                    :
                    <CustomText children={'No Achievements'} size={15} fontWeight={'300'} color={colors.fontColor}/>
                }
              </View>
            </View>
          )
        })
      }

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: 'blue'
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24
  },
  achievementView: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
  },
  achievementItem: {
    width: '33%',
    marginVertical: 1,
    alignItems: 'center',
    paddingHorizontal: 5
  },
  dataView: {
    marginVertical: 10
  }
});

export default AchievementListComponent;

