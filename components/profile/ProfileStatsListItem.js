import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomText from "../shared/CustomText";
import Icons from "../../constants/Icons";

const ProfileStatsListItem = ({ item, index, colors }) => {
  return (
    <View style={[styles.container, {backgroundColor: colors.statsBoxColor}]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {item.icon}
          <CustomText children={item.title} size={12} fontWeight={'bold'} color={item.color} style={{marginLeft: 6}}/>
        </View>
        {
          item.difference ?
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CustomText children={`${item.difference}%`} size={12} color={item.difference > 0 ? '#1D9D9A' : '#BA4141'}/>
              {
                item.difference > 0 ?
                  <Icons.ArrowUp color={'#1D9D9A'}/> :
                  <Icons.ArrowDown color={'#BA4141'}/>
              }
            </View>:
              null
        }
      </View>
      <View style={styles.bottomText}>
        <CustomText children={Number(item.value) ? Math.ceil(item.value) : '0'} size={32} fontWeight={'bold'} color={item.color}/>
        <CustomText children={item.unit} size={14} color={item.color} style={{marginLeft: 4, marginBottom: 6}}/>
        {
          item.time ?
            <View style={styles.bottomTextTime}>
            <CustomText children={item.seconds} size={32} fontWeight={'bold'} color={item.color}/>
            <CustomText children={'sec'} size={14} color={item.color} style={{marginLeft: 4, marginBottom: 6}}/>
            </View>: null
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    marginBottom: 15,
    padding: 15,
    borderRadius: 20
  },
  bottomText: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  bottomTextTime: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 5
  }
});

export default ProfileStatsListItem;
