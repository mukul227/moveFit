import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import { Platform, NativeModules } from 'react-native';
import {useTheme} from "react-native-paper";

export default function StatusBarComp({backgroundColor = 'white'}) {

    const { colors } = useTheme();

    // const [iphoneStatusBar, setIphoneStatusBar] = useState(0);
    // const { StatusBarManager } = NativeModules;
    //
    // StatusBarManager.getHeight((statusBarHeight)=>{
    //     setIphoneStatusBar(statusBarHeight.height);
    // })
    // const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? iphoneStatusBar : StatusBarManager.HEIGHT;

    return (
        <View style={[styles.container,{height:40, backgroundColor: backgroundColor ? backgroundColor : colors.backgroundColor}]}>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
});
