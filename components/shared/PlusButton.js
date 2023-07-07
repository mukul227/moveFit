import React from 'react';
import {TouchableOpacity, StyleSheet, Image, View} from 'react-native';
import Icons from "../../constants/Icons";
import {useTheme} from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";

const PlusButton = ({onPress, bottom = 100, right = '8%'}) => {
    const {colors} = useTheme();

    return (
      <TouchableOpacity style={[styles.container, {bottom: bottom, right: right}]} onPress={onPress}>
        <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 1}} colors={colors.primaryColorGradient}
                        style={[styles.container]}>
          <Icons.plus color={'#FFFFFF'}/>
        </LinearGradient>
</TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 50,
        height: 50,
        borderRadius: 25,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default PlusButton;
