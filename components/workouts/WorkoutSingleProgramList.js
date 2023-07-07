import React, {useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import CustomText from "../shared/CustomText";
import {useTheme} from "react-native-paper";
import {TouchableOpacity} from "react-native-gesture-handler";
import WorkoutListByWeeks from "./WorkoutListByWeeks";
import Button from "../shared/Button";
import {useDispatch, useSelector} from "react-redux";
import {startProgramSaga} from "../../store/programs/actions";
import {scheduleWorkoutSelector} from "../../store/calendar";
import {programSelector} from "../../store/programs";

const WorkoutSingleProgramList = ({program, data, navigation, trainers, onItemPress}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const [selectedWeek, setSelectedWeek] = useState(0);
  const Item = ({index, item}) => {
    return (
      <TouchableOpacity
        onPress={() => setSelectedWeek(index)}
        style={[styles.weekTabItem, {
          borderBottomWidth: selectedWeek === index ? 2 : 0,
          borderBottomColor: colors.primaryColor
        }]}>
        <CustomText color={selectedWeek === index ? colors.singleProgramSelectedWeek : colors.singleProgramWeek} size={14} children={item.name} style={{letterSpacing: 1.1}}/>
      </TouchableOpacity>
    );
  }

  const renderItem = ({item, index}) => (
    <Item item={item} index={index}/>
  );

  return (
    <View style={{width: '100%'}}>
      <View>
        <View style={styles.weeksList}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            horizontal
            renderItem={(item, index) => renderItem(item, index)}
            keyExtractor={item => item.id}
          />
        </View>
        <WorkoutListByWeeks weekId={data[selectedWeek]?.id} navigation={navigation} workouts={data[selectedWeek]?.workouts} trainers={trainers} onItemPress={onItemPress}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 170,
    marginRight: 15
  },
  weekTabItem: {
    height: 25,
    marginRight: 20,
  },
  weeksList: {
    width: '100%',
    height: 40,
    paddingHorizontal: 20
  }
});


export default WorkoutSingleProgramList;
