import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import Icons from "../../constants/Icons";
import CustomText from "../shared/CustomText";
import {useDispatch} from "react-redux";
import {setWidgetTop} from "../../store/helpers/actions";

const WorkoutAdjustWidget = ({ locationTitle, preferenceTitle, fitnessLevelTitle, fitnessLevelIcon, colors, setIsWidgetModalVisible }) => {

  const dispatch = useDispatch();
  const wrapperContainerRef = useRef(null);
  const [measure, setMeasure] = useState(null);

  useEffect(() => {
    if (wrapperContainerRef?.current) {
      wrapperContainerRef?.current?.measureInWindow((x, y, width, height) => {
        if (y !== 0) {
          dispatch(setWidgetTop(y))
        }
        setMeasure(y);
      })
    }
  }, [measure]);

  return (
    <View ref={wrapperContainerRef}  style={[styles.widgetWrapper, {backgroundColor: colors.bottomTabColor}]}>
      <TouchableOpacity onPress={() => setIsWidgetModalVisible(1)} style={[styles.widgetInner, {width: '32%'}]}>
        <View style={styles.iconWrapperWidget}>
          <Icons.workoutTab color={colors.primaryColor} height={24}/>
        </View>
        <CustomText size={12} style={{marginTop: 5}} color={colors.fontColor} children={locationTitle}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsWidgetModalVisible(2)} style={[styles.widgetInner, styles.middleInner, {width: '36%'}]}>
        <View style={styles.iconWrapperWidget}>
          <Icons.weight color={colors.primaryColor} height={24}/>
        </View>
        <CustomText size={12} style={{marginTop: 5}} color={colors.fontColor} children={preferenceTitle}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsWidgetModalVisible(3)} style={[styles.widgetInner, {width: '32%'}]}>
        <View style={styles.iconWrapperWidget}>
          {fitnessLevelIcon}
        </View>
        <CustomText size={12} style={{marginTop: 5}} color={colors.fontColor} children={fitnessLevelTitle}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  widgetWrapper: {
    width: '100%',
    paddingTop: 16,
    paddingBottom: 12,
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  widgetInner: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  middleInner: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: 'rgba(139, 155, 167, 0.2)',
    borderRightColor: 'rgba(139, 155, 167, 0.2)'
  },
  iconWrapperWidget: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default WorkoutAdjustWidget;
