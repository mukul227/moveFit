import React from 'react';
import {TouchableOpacity, StyleSheet, Image, View} from 'react-native';
import CustomText from "./CustomText";
import LinearGradient from "react-native-linear-gradient";
import Icons from "../../constants/Icons";

const CustomButton = ({
                        showCenterIcon,
                        title,
                        style,
                        setWidth,
                        leftIcon,
                        gradientColors,
                        isActive = true,
                        activeWhite = false,
                        textColor = 'white',
                        onPress,
                        addContactIcon = false,
                        backgroundColor = '#32A1C7',
                        borderColor = null,
                        fontSize = 16,
                        ...props
                      }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!isActive}
      style={[
        style,
        styles.container,
        {
          backgroundColor: backgroundColor ? backgroundColor : activeWhite ? 'white' : isActive ? '#32A1C7' : '#ffff',
          borderWidth: backgroundColor || gradientColors ? 1 : 1,
          borderColor: borderColor ? borderColor : isActive ? '#32A1C7' : '#8B9DAD',
          width: setWidth ? setWidth : '100%',
        }
      ]}
      {...props}
    >
      {
        gradientColors ?
          <LinearGradient start={{x: 1, y: 0}} end={{x: 0, y: 1}} colors={gradientColors}
                          style={{width: '100%', position: 'absolute', height: 50, borderRadius: 20}}/> : null
      }
      {
        addContactIcon &&
         <Icons.WhiteContact  style={{position: 'absolute', left: 30}}/>
      }
      {leftIcon ?
        <Image source={leftIcon} style={{width: 20, height: 20, position: 'absolute', left: 15}}/>
        : null
      }
      {
        title ?
          <CustomText size={fontSize} children={title} fontWeight={'700'}
                      color={!isActive ? '#8B9DAD' : textColor}/> : null
      }
      {
        showCenterIcon ?
          isActive ? <Image source={require('../../assets/ArrowWhite3x.png')}
                            style={{width: 40, height: 40, position: 'absolute'}}/> :
            <Image source={require('../../assets/ArrowGray3x.png')}
                   style={{width: 40, height: 40, position: 'absolute'}}/> : null
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CustomButton;
