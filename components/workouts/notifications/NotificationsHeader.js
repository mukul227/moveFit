import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomText from "../../shared/CustomText";
import Icons from "../../../constants/Icons";

const NotificationsHeader = ({ navigation, colors }) => {


  const goBackPress = () => {
    navigation.navigate('HomeScreen')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center', marginLeft: -10}} onPress={() => goBackPress()}>
        <Icons.ArrowLeft color={colors.fontColor}/>
      </TouchableOpacity>
      <CustomText color={colors.fontColor} size={22} children={'Notifications'} fontWeight={'700'} style={{marginTop: 10}}/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 54,
    marginBottom: 12,
    width: '100%'
  }
});

export default NotificationsHeader;
