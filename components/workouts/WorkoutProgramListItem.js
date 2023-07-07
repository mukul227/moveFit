import React from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import Picture from "../shared/Picture";
import CustomText from "../shared/CustomText";
import {useTheme} from "react-native-paper";
import Dot from "../shared/Dot";
import Icons from "../../constants/Icons";

const WorkoutProgramListItem = ({item, onPressItem, isFromSeeAll}) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity onPress={() => onPressItem(item.id)} style={ isFromSeeAll ? {marginVertical:10} : styles.container}>
      <View>
        <Picture source={item.thumbnail} style={[styles.image, {aspectRatio: isFromSeeAll ? 1 : 1.5}]}/>
      </View>
      <View style={{justifyContent: 'space-between', flex: 1}}>
        <CustomText children={item.name} fontWeight={'700'} size={isFromSeeAll ? 20 : 17} style={{marginTop: 5}} color={colors.primaryColor}/>
        <View>
          <CustomText size={15} color={colors.fontColor} children={`${item.duration} Min`}/>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            {
              item.trainers.map((trainer) => {
                return(
                  <View key={trainer.id.toString()} style={styles.trainerDetails}>
                    <View>
                      <Picture style={styles.trainerImage} source={trainer.photo}/>
                    </View>
                    <CustomText size={15} color={colors.fontColor} children={trainer.first_name}/>
                  </View>
                )
              })
            }
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 170,
    marginRight: 15
  },
  image: {
    width: '100%',
    height: undefined,
    resizeMode: 'cover',
    borderRadius: 20
  },
  trainerImage: {
    borderRadius: 15,
    width: 30,
    height: 30,
    marginRight: 6
  },
  trainerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  }
});

export default WorkoutProgramListItem;
