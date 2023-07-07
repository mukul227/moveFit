import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import Icons from "../../../constants/Icons";

const ProfileStatus = ({ colors, items, selectedItem, onValueChange, user }) => {
  return (
    <View style={[styles.input, {borderColor: colors.backgroundColor}]}>
      <View style={{position: 'absolute', left: 8}}>
        {user?.public ? <Icons.Globe width={24} height={24} color={colors.primaryColor}/> : <Icons.Lock width={24} height={24} color={colors.primaryColor}/>}
      </View>
      <RNPickerSelect
        onValueChange={onValueChange}
        useNativeAndroidPickerStyle={false}
        underlineColorAndroid='transparent'
        value={selectedItem}
        placeholder={{}}
        style={{
          inputIOS: [styles.iosInput, {color: colors.fontColor}],
          inputAndroid: [styles.androidInput, {color: colors.fontColor}],
          placeholder: {
            color: '#777B80'
          }
        }}
        items={items}
      />
      <View style={styles.arrowDownIcon}>
        <Icons.ArrowDown width={18} height={18} color={colors.fontColor}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 8,
    width: 130,
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1
  },
  iosInput: {
    paddingVertical: 8,
    paddingHorizontal: 40
  },
  androidInput: {
    paddingVertical: 8,
    paddingHorizontal: 40
  },
  arrowDownIcon: {
    position: 'absolute',
    alignItems: 'center',
    right: 8
  }
});

export default ProfileStatus;
