import React from 'react';
import {Platform, View} from 'react-native';
import SettingsListItem from "./SettingsListItem";

const SettingsList = ({ items, colors, navigation, onPressItem, healthPermissionResponse }) => {
  return (
      <View>
        {
          Platform.OS === 'ios' ?
              items.map(item => {
                return (
                    <SettingsListItem onPressItem={(item) => onPressItem(item)} healthPermissionResponse={healthPermissionResponse} navigation={navigation} colors={colors} item={item} key={item.id}/>
                );
              })
              :
              items.map((item, index) => {
                return (
                    <View>
                      {
                        item.id !== 3 ?
                            <SettingsListItem onPressItem={(item) => onPressItem(item)} navigation={navigation} colors={colors} item={item} key={index}/>
                            :
                            null
                      }
                    </View>
                );
              })
        }
      </View>
  );
};

export default SettingsList;
