import React from 'react';
import {Keyboard, View, StyleSheet, TouchableOpacity, Image} from "react-native";
import CustomText from "../shared/CustomText";
import Icons from "../../constants/Icons";
import {useTheme} from "react-native-paper";
import Icon from 'react-native-vector-icons/Entypo';


export default function CustomHeader({
                                       isNewPost = false,
                                       navigation,
                                       title,
                                       hideReturn = false,
                                       showRightIcon = false,
                                       onRightPress
                                     }) {

  const {colors} = useTheme();

  const goBack = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      {
        hideReturn ?
          <View style={{width: 40}}/> :
          <TouchableOpacity onPress={() => goBack()} style={{width: 40, height: 40, justifyContent: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icons.headerBack color={colors.fontColor}/>
            </View>
          </TouchableOpacity>
      }
      <View style={{flexGrow: 1, alignItems: 'center'}}>
        <CustomText children={isNewPost ? title : '@' + title} color={colors.fontColor} size={14} fontWeight={'600'}/>
      </View>
      {
        showRightIcon ?
          <View style={{width: 40, height: 40, alignItems: 'flex-end', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => onRightPress()}
                              style={{width: 40, alignItems: 'flex-end', paddingRight: 5}}>
              <Icon
                name="dots-three-horizontal"
                size={20}
                color={colors.fontColor}
              />
            </TouchableOpacity>
          </View> : <View style={{width: 40}}/>
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 5
  },
});
