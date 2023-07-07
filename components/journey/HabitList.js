import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    FlatList, TouchableOpacity
} from 'react-native';
import CustomText from "../shared/CustomText";
import Icons from "../../constants/Icons";

const HabitList = ({data, setItem, colors, onBack}) => {

  const [list, setList] = useState([]);

  useEffect(() => {
    if (data.length) {
    setList(data);
    }
  },[data]);

  const onItemPress = selectedItem => {
    setItem(selectedItem);
    setList(
      list.map(el => {
          if (el.id === selectedItem.id) {
            return Object.assign({}, el, {selected: true});
          } else if (el.selected) {
            return Object.assign({}, el, {selected: false});
          }
          return el;
        })
    );
  };

  const Item = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => onItemPress({...item, selected: true})}
        style={[styles.wrapper, {backgroundColor: colors.habitModalItem}]}>
        {item.icon}
        <CustomText children={item.title} size={16} style={{marginLeft: 10}} fontWeight={'500'} color={colors.fontColor}/>
      </TouchableOpacity>
    )
  };

  const renderItem = ({item}) => (
    <Item item={item}/>
  );

  return (
    <View style={{width: '100%', marginTop: 15}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={onBack}>
          <Icons.ArrowLeft color={colors.fontColor}/>
        </TouchableOpacity>
        <CustomText children={'New Habit'} size={22} fontWeight={'700'} color={colors.fontColor} style={{marginLeft: 20}}/>
      </View>
      <FlatList
        contentContainerStyle={{paddingHorizontal: 5, paddingTop: 15}}
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 55,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 10
  }
});

export default HabitList;
