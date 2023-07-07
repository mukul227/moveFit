import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomText from "../shared/CustomText";
import  Icons  from '../../constants/Icons';
import {useTheme} from "react-native-paper";

const CheckboxListItem = ({onPress, item}) => {
  const {colors} = useTheme();

  const backgroundColor = item.selected ? colors.backgroundColor : colors.notificationBox;

  return (
    <TouchableOpacity
      onPress={() => onPress({...item, selected: true})}
      style={[styles.container, item.selected ? styles.selectedItemWrapper : null, {backgroundColor,  borderWidth: 1, borderColor: colors.backgroundColor}]}
    >
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        { item.icon ? item.icon : null}
        <CustomText fontWeight={item.selected ? '600' : '100'} size={18} color={colors.fontColor} children={item.title}/>
      </View>
      {item.selected ? <Icons.FilledColor color={colors.primaryColor} /> : <Icons.UnfilledColor color={colors.primaryColor} />}
    </TouchableOpacity>
  );
};


export default CheckboxListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 19,
    paddingVertical: 18,
    borderRadius: 20,
    backgroundColor: 'white',
    width: '100%',
    marginVertical: 5,
    justifyContent: 'space-between'
  },
  selectedItemWrapper: {
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 1.22,

    elevation: 3,
  },
  checkBoxWrapper: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#71C8C6',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
