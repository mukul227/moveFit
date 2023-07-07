import React from 'react';
import {Keyboard, View, StyleSheet, TouchableOpacity, Platform, Dimensions} from "react-native";
import CustomText from "../shared/CustomText";
import {useTheme} from "react-native-paper";

const {height} = Dimensions.get('window');

export default function AuthTitle({title, subtitle, topMargin, isEdit}) {
    const {colors} = useTheme();

    return (
        <View style={ [topMargin? styles.containerWithMargin : styles.container, {alignItems: isEdit ? 'center' : 'flex-start'}]}>
            <View>
                <CustomText style={{letterSpacing: 0.3}} size={Platform.OS === 'ios' && height < 600 ? 20 : 24} children={title} fontWeight={'600'} color={colors.fontColor}/>
                <CustomText style={{marginTop: Platform.OS === 'ios' && height < 600 ? 20 : 10, letterSpacing: 0.5}} color={'#222A31'} size={16} children={subtitle}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        width: '100%',
        alignItems: 'flex-start'
    },
    containerWithMargin: {
        marginTop: Platform.OS === 'ios' && height < 600 ? 15 : 70,
        width: '100%',
        alignItems: 'flex-start'
    },
});
