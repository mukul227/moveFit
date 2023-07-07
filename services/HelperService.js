import ApiService from './ApiService';
import Icons from "../constants/Icons";
import React from "react";
import CustomText from "../components/shared/CustomText";
import {View} from "react-native";
import {SvgUri} from "react-native-svg";

class HelperService extends ApiService {

    camel2title = (camelCase) => camelCase
        .replace(/([A-Z])/g, (match) => ` ${match}`)
        .replace(/^./, (match) => match?.toUpperCase())
        .trim();

    titleCase = (str) => {
        let strAr = str.toLowerCase().split(' ');
        for (let i = 0; i < strAr.length; i++) {
            strAr[i] = strAr[i].charAt(0).toUpperCase() + strAr[i].slice(1);
        }
        return strAr.join(' ');
    }

    getAchievementSectionTitle = (key) => {
        switch (key) {
            case 'general':
                return 'Move with Friends'

            case 'habits':
                return 'Habit Tracker'

            case 'workouts':
                return 'Workout'
        }
    }

    getAchievementForModal = (achievement, theme) => {
        return  <View style={{width: 72, height: 72,marginTop:20, marginBottom: 10}}><SvgUri
                width="72"
                height="72"
                uri={theme === 'light' ? achievement?.url_light : achievement?.url_dark}
        /></View>
    }

    getAchievementIcon = (achievement, theme) => {
        return <View style={{width: 72, height: 72,marginTop:20, marginBottom: 10}}><SvgUri
            width="72"
            height="72"
            uri={theme === 'light' ? (achievement?.earned ?  achievement?.url_light : achievement?.url_light_disabled) : (achievement?.earned ?  achievement?.url_dark : achievement?.url_dark_disabled)}
        /></View>
    }

    getCounterIcon = (id,value,  theme) => {
        return theme === 'light' ? <View style={{ alignItems:'center', justifyContent:'center'}}><Icons.Counter />
                <CustomText children={value} color={'white'} size={18} fontWeight={'800'} style={{position:'absolute'}}/></View> :
            <View style={{ alignItems:'center', justifyContent:'center'}}><Icons.CounterDark />
                <CustomText children={value} color={'white'} size={18} fontWeight={'800'} style={{position:'absolute'}}/></View>
    }

    getCounterTitle = (id, colors) => {
        switch (id) {
            case 1:
                return <CustomText children={'Habits'} size={14} fontWeight={'600'} color={colors.fontColor} style={{textAlign:'center'}}/>

            case 2:
                return <CustomText children={'Completed Workouts'} size={14} fontWeight={'600'} color={colors.fontColor} style={{textAlign:'center'}}/>

            case 3:
                return <CustomText children={'Shared Workouts'} size={14} fontWeight={'600'} color={colors.fontColor} style={{textAlign:'center'}}/>

        }
    }
}

export const helperService = new HelperService();
