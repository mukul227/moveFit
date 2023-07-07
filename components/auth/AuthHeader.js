import React from 'react';
import {View, StyleSheet, TouchableOpacity} from "react-native";
import Icons from "../../constants/Icons";
import {useTheme} from "react-native-paper";
import {useSelector} from "react-redux";
import {themeSelector} from "../../store/helpers";

export default function AuthHeader({navigation, hideReturn = true, color = '#32A1C7', isEdit = false, marginBottom = 0}) {

    const goBack = () => {
        navigation.goBack();
    }

    const {colors} = useTheme();
    const theme = useSelector(themeSelector());

  return (
      <View style={[styles.container, {marginTop: 15, marginBottom}]}>
        {
          hideReturn ?
            <View style={{width: '35%'}}/> :
            <TouchableOpacity onPress={() => goBack()} style={{width: '35%'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icons.ArrowLeft color={colors.fontColor}/>
                </View>
            </TouchableOpacity>
        }
          <View style={{width: '30%', alignItems: 'center'}}>
            {
              theme === 'light' ? <Icons.BlueGradientLogo/> : <Icons.PurpleGradientLogo/>
            }
          </View>
          <View style={{width: '35%'}} />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    arrowImage: {
      width: 30,
      height: 20,
      resizeMode: 'contain'
    }
});
