import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomText from "../../shared/CustomText";
import Icons from "../../../constants/Icons";

const MessagesListItem = ({ item, colors, onMessagePress }) => {
  return (
    <TouchableOpacity
      onPress={() => onMessagePress(item)}
      style={[styles.item, {backgroundColor: colors.notificationModalBackground, borderColor: colors.borderColor}]}
    >
      <CustomText children={item.title} color={colors.fontColor} fontWeight={'600'} size={17}/>
      <Icons.SendPlane color={colors.primaryColor}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '100%',
    marginBottom: 8,
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default MessagesListItem;
