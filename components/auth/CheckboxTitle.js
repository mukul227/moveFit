import React from 'react';
import {Text, View, StyleSheet} from "react-native";
import CustomText from "../shared/CustomText";

export default function CheckboxTitle({title, subtitle, boldedTitle, additionalTitle, titleFontSize = 25, fontWeight, marginTop}) {

  return (
    <View style={[styles.container, {marginTop}]}>
      <Text>
        <CustomText style={{letterSpacing: 0.3}} fontWeight={fontWeight} size={titleFontSize} children={title}/>
        {
          boldedTitle ?
            <CustomText style={{letterSpacing: 0.3}} fontWeight={'700'} size={titleFontSize} children={boldedTitle}/> : null
        }
        {
          additionalTitle ?
            <CustomText style={{letterSpacing: 0.3}} fontWeight={fontWeight} size={titleFontSize} children={additionalTitle}/> : null
        }
      </Text>
      {
        subtitle ?
          <CustomText style={{marginTop: 6, letterSpacing: 0.3}} color={'#222A31'} size={16} children={subtitle}/> : null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  }
});
