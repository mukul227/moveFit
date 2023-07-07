import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomText from "../shared/CustomText";
import Icons from "../../constants/Icons";
import {useSelector} from "react-redux";
import {themeSelector} from "../../store/helpers";

const NoHabits = ({colors}) => {

  const theme = useSelector(themeSelector());

    return (
        <View style={styles.container}>
            <View/>
            {
              theme === 'light' ? <Icons.HeartBlueGradient/> : <Icons.HeartPurpleGradient/>
            }
            <View style={{ width:'100%'}}>
                <CustomText children={'Let’s start with'} size={32} color={colors.fontColor} fontWeight={'700'}/>
                <CustomText children={'healthy habits.'} size={32} color={colors.fontColor} fontWeight={'700'}/>
                <CustomText children={'Click “+” to add your first habit.'} size={16} color={colors.fontColor} fontWeight={'500'}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width:'100%',
        justifyContent:'space-between',
        marginBottom:40,
        flex:1,
        alignItems:'center',
    }
});

export default NoHabits;
