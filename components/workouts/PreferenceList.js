import React from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import CustomText from "../shared/CustomText";

const PreferenceList = ({ preferenceList, colors, onPreferencePress }) => {
  return (
    <View style={[styles.container, {backgroundColor: colors.notificationBox}]}>
      {
        preferenceList.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => onPreferencePress(item)}
              key={item.title}
              style={[styles.item, {borderBottomColor: colors.borderColor, borderBottomWidth: preferenceList.length === index + 1 ? 0 : 1}]}
            >
              <CustomText children={item.title} size={16} fontWeight={'600'} color={colors.fontColor}/>
            </TouchableOpacity>
          );
        })
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  item: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 16
  }
});

export default PreferenceList;
