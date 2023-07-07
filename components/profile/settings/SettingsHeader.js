import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from "react-native";
import CustomText from "../../shared/CustomText";
import Icons from "../../../constants/Icons";
import {useDispatch, useSelector} from "react-redux";
import {themeSelector} from "../../../store/helpers";
import {changeTheme} from "../../../store/helpers/actions";

const SettingsHeader = ({ navigation, colors, onItemPress }) => {
  const goBack = () => navigation.goBack();
  const theme = useSelector(themeSelector());
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icons.ArrowLeft color={colors.fontColor}/>
          <CustomText style={{marginLeft: 5}} color={colors.fontColor} size={22} children={'Settings'} fontWeight={'bold'}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.themeIconWrapper, {borderColor: colors.backgroundColor,  backgroundColor:colors.backgroundColor}]} onPress={onItemPress}>
        {
          theme === 'light' ?
          <Icons.LIght/> :
          <Icons.Dark/>
        }
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  themeIconWrapper: {
    borderWidth:1,
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default SettingsHeader;
