import React from "react";
import {View, StyleSheet, Image, Dimensions} from 'react-native';

const OnboardingListItem = ({item}) => {
  const width = Dimensions.get('window').width;

  return(
    <View style={[styles.container, {width}]}>
      <Image source={item.image} style={{width, height: '100%'}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default OnboardingListItem;
