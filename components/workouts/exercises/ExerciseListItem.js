import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Picture from "../../shared/Picture";
import CustomText from "../../shared/CustomText";
import Icons from "../../../constants/Icons";
import {useTheme} from "react-native-paper";
import Dot from "../../shared/Dot";

const ExerciseListItem = ({item, onItemPress}) => {
  console.log(item);
  const {colors} = useTheme();
  const [expandableHeight, setExpandableHeight] = useState(0)

  const getItemTypeName = (val) => {
    switch (val.type) {
      case 'round':
        return val.round.name;

      case 'amrap':
        return val.amrap.name;

      case 'exercise_duration':

      case 'exercise_reps':
        return val.exercise.name;
    }
  };

  const getItemTypeValue = (val) => {
    switch (val.type) {
      case 'round':
        return 'Number of rounds: ' + val.round.value;

      case 'amrap':
        return val.amrap.time + ' min';

      case 'exercise_duration':
        return val.quantity + ' sec';

      case 'exercise_reps':
        return val.quantity ? val.quantity + ' Reps' : '';
    }
  };

  const getPlaceholderImage = (val) => {
    switch (val.type) {
      case 'round':
        return require('../../../assets/icons/roundIcon.jpeg');

      case 'amrap':
        return require('../../../assets/icons/amrapIcon.jpeg');
      default :
        return require('../../../assets/Profile.png');
    }
  };

  const SubItems = ({item}) => {
    const data = item.amrap ? item.amrap.items : item.round.items;
    if (expandableHeight) {
      return (
        <View style={{width: '100%'}}>
          {
            data.map((val, index) => {
              if (val.type !== 'break') {
                return (
                  <View key={index} style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Dot/>
                    <CustomText children={val.exercise?.name} color={colors.primaryColor}/>
                  </View>
                )
              }
            })
          }
        </View>
      )
    } else {
      return <View/>
    }

  }

  const onItemClick = (item) => {
    if (expandableHeight === 0) {
      setExpandableHeight('auto')
    } else {
      setExpandableHeight(0)
    }
  }

  return (
    <TouchableOpacity
      disabled={!(item.type === 'round' || item.type === 'amrap')}
      onPress={() => onItemClick(item.id)}
      style={[styles.item, {borderColor: colors.singleWorkoutBorder, backgroundColor: colors.exerciseItemBackground}]}
    >
      {
        item.type === 'amrap' || item.type === 'round' ?
          <View style={{height: '100%'}}>
            <Image source={getPlaceholderImage(item)} style={styles.image}/>
          </View> :
          <View style={{height: '100%'}}>
            {
              item?.exercise?.thumbnail ?
                <Picture source={item?.exercise?.thumbnail} style={styles.image}/> :
                <Image source={require('../../../assets/icons/workoutIcon.png')} style={styles.image}/>
            }
          </View>
      }
      <View style={{flex: 1, paddingHorizontal: 12}}>
        <CustomText children={getItemTypeName(item)} size={18} fontWeight={'600'} color={colors.exerciseTitle}/>
        <CustomText children={getItemTypeValue(item)} size={14} color={colors.exerciseSubtitle} fontWeight={'500'}/>
        {
          item.type === 'round' || item.type === 'amrap' ? <SubItems item={item}/> : null
        }
      </View>
      {
        item.type === 'round' || item.type === 'amrap' ?
          <Icons.ArrowRight style={{transform: [{rotate: expandableHeight ? ' 270deg' : '90deg'}]}}
                            color={colors.exerciseArrow}/> : null
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 20
  }
});

export default ExerciseListItem;
