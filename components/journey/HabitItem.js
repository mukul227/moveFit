import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomText from "../shared/CustomText";
import Icons from "../../constants/Icons";
import {helperService} from "../../services/HelperService";
import {useTheme} from "react-native-paper";
import {healthService} from "../../services/HealthService";


const HabitItem = ({ item, onCompleted, onLngPress }) => {
    const [isVisible, setIsVisible] = useState(false);
    const {colors} = useTheme();

    const getIcon = (item) => {
        switch (item.type) {
            case 'walking':
                return <Icons.Walking color={'white'}/>
            case 'running':
                return <Icons.Running color={'white'}/>
            case 'drinkWater':
                return <Icons.Water color={'white'}/>
            case 'swim':
                return <Icons.Swimming color={'white'}/>
            case 'wakeUp':
                return <Icons.WakeUp color={'white'}/>
            case 'custom':
                return <Icons.Barbells color={'white'}/>
        }
    }

    const getGoal = (item) => {
        switch (item.type) {
            case 'walking':
                return `${item.goal} steps`
            case 'running':
                return `0/${item.goal} miles`
            case 'drinkWater':
                return `0/${item.goal}`
            case 'swim':
                return `0/${item.goal} miles`
            case 'wakeUp':
                return `0/${item.goal}`
            case 'custom':
                return `${item.goal}`
        }
    }

    const getTitle = (item) => {
        switch (item.type) {
            case 'custom':
                return helperService.camel2title(item.custom_name)
            default:
                return helperService.camel2title(item.type)
        }
    }

    const AppleCondition = async () => {
        const res = await healthService.appleHealthInit();
        if(Platform.OS === 'ios' && item.type === 'walking') {
            if(res){
                setIsVisible(false)
            } else {
                setIsVisible(true)
            }
        } else {
            setIsVisible(false)
        }
    }

    useEffect(()=> {
        AppleCondition()
    },[])

    const onAppleRequest = async () => {
        await healthService.requestPermission()
    }

    return (
        <TouchableOpacity onLongPress={() => onLngPress(item)} style={[styles.item, {backgroundColor: item.color}]}>
            <View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    {
                        getIcon(item)
                    }
                    <CustomText children={getTitle(item)} color={'white'} style={{marginLeft: 10}} size={16} fontWeight={'500'}/>
                </View>
                {
                    isVisible ?
                        <TouchableOpacity onPress={() => onAppleRequest()} style={styles.appleButton}>
                            <Icons.AppleHealth color={colors.fontColor}/>
                            <CustomText textDecorationLine={'underline'} children={'Connect Apple Health'} color={colors.fontColor} style={{marginLeft: 12}} size={16}/>
                        </TouchableOpacity> : null
                }

            </View>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <CustomText children={item.goal} color={'white'} style={{marginHorizontal: 10}} size={16} fontWeight={'500'}/>
                <TouchableOpacity onPress={() => onCompleted(item)}>
                    {
                        item.completed ?
                            <Icons.FilledWhite/>
                            :
                            <Icons.UnfilledColor  color={'white'}/>
                    }
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    item: {
        width: '100%',
        marginBottom: 8,
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    appleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4
    }

});


export default HabitItem;
