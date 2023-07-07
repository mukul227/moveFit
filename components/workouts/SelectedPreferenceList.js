import React from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import CustomText from "../shared/CustomText";
import Icons from "../../constants/Icons";
import PreferenceList from "./PreferenceList";

const SelectedPreferenceList = ({ selectedPreferenceList, setSelectedPreference, selectedPreference, colors, getPreferenceList, preferenceList, onPreferencePress, selectedPreferences }) => {
  console.log(selectedPreference);
  return (
    <View style={{width: '100%'}}>
      {
        selectedPreferenceList.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSelectedPreference(item.id);
                getPreferenceList(item.id);
              }}
              key={item.title}
              style={[styles.item, {borderBottomColor: colors.borderColor, borderBottomWidth: selectedPreferenceList.length === index + 1 ? 0 : 1, height: selectedPreferences === 1 ? 40 : 60}]}
            >
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {item.icon}
                <CustomText children={item.title} style={{marginLeft: 15}} size={16} fontWeight={'600'} color={colors.fontColor}/>
              </View>
              <View style={{padding: 15}}>
                <Icons.ArrowRight color={colors.fontColor}/>
              </View>
            </TouchableOpacity>
          );
        })
      }
      {
        selectedPreference && <PreferenceList preferenceList={preferenceList} colors={colors} onPreferencePress={item => onPreferencePress(item, selectedPreference)}/>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginLeft: 16,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default SelectedPreferenceList;
