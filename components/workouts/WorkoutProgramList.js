import React from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import CustomText from "../shared/CustomText";
import WorkoutProgramListItem from "./WorkoutProgramListItem";
import Icons from "../../constants/Icons";

const WorkoutProgramList = ({data = null, colors, title, navigation, onPressItem, onSeeAllPress}) => {
  const renderItem = ({ item }) => (
    <WorkoutProgramListItem onPressItem={onPressItem} item={item}/>
  );

  const renderEmptyContainer = () => {
    return (
      <View style={{width: '100%', alignItems: 'center'}}>
        <CustomText style={{textAlign: 'center'}} children={'There are currently no new programs'} color={colors.fontColor} size={18}/>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.programsTitle}>
        <CustomText children={title} size={21} fontWeight={'700'} color={colors.fontColor}/>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => onSeeAllPress(data)}>
            {
                data?.length > 1 ?
                <View style={{flexDirection: 'row'}}>
                    <CustomText children={'See all'} color={colors.seeAllColor} size={15} style={{marginRight: 5}} fontWeight={'500'}/>
                    <Icons.ArrowRight color={colors.seeAllColor}/>
                </View> : null
            }
        </TouchableOpacity>
      </View>
        {
            data?.length === 0 ?
                renderEmptyContainer() :
                <FlatList
                    data={data}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
        }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 30
  },
  programsTitle: {
      flexDirection: 'row',
      marginBottom: 15,
      justifyContent: 'space-between',
      alignItems: 'flex-end',
  }
});

export default WorkoutProgramList;
