import React from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import Icons from "../../constants/Icons";
import {useSelector} from "react-redux";
import {activityIndicatorSelector} from "../../store/helpers";
import {themeSelector} from "../../store/helpers";

const WorkoutHeader = ({ colors, onNotificationsPress }) => {

  const theme = useSelector(themeSelector());
  const showIndicator = useSelector(activityIndicatorSelector());

  return (
    <View style={[styles.headerWrapper, {backgroundColor: colors.backgroundColor}]}>
      {
        theme === 'light' ? <Icons.BlueGradientLogo/> : <Icons.PurpleGradientLogo/>
      }
      <TouchableOpacity onPress={onNotificationsPress} style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}}>
        {
          showIndicator ?
            <View style={styles.indicator}/> : null
        }
        <Icons.Bell color={colors.primaryColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: 'red',
    position: 'absolute',
    top: 3,
    right: 0,
    zIndex: 999
  }
});

export default WorkoutHeader;
