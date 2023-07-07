import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import CustomText from "../../shared/CustomText";
import Icons from "../../../constants/Icons";
import {useDispatch} from "react-redux";
import {logout} from "../../../store/auth";

const SettingsFooter = ({ colors }) => {
  const dispatch = useDispatch();

  const onLogout = () => dispatch(logout());

  return (
    <TouchableOpacity onPress={onLogout} style={styles.logoutWrapper}>
      <Icons.Logout color={colors.exerciseArrow}/>
      <CustomText children={'Log Out'} color={colors.primaryColor} size={15} style={{marginHorizontal: 8}}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutWrapper: {
    marginBottom: 25,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  }
});


export default SettingsFooter;
