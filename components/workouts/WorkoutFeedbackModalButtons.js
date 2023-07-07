import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomText from "../shared/CustomText";
import {useTheme} from "react-native-paper";
import Icons from "../../constants/Icons";

export default function WorkoutFeedbackModalButtons({onPressToHome, onPressShare}) {

    const {colors} = useTheme();

    return (
        <View style={[styles.container]}>
            <TouchableOpacity style={[{backgroundColor: colors.primaryColor}, styles.shareButton]} onPress={onPressShare}>
                <Icons.Logout color={'white'} style={styles.shareIcon}/>
                <CustomText children={'Share your progress!'} fontWeight={'700'} color={'white'} size={16}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toHomeButton} onPress={onPressToHome}>
                <CustomText children={'Continue to Home'} fontWeight={'700'} textDecorationLine={'underline'} color={colors.primaryColor} size={16}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        marginTop: 40,
        alignItems: 'center',
        marginBottom: 1,
        paddingTop: 20,
    },
    toHomeButton: {
        width: '50%',
        alignItems: 'center',
        height: 50,
        marginVertical: 10
    },
    shareButton: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderRadius: 20,
        justifyContent: 'center'
    },
    shareIcon: {
        position: 'absolute',
        right: '85%',
        transform: [{rotate: '90deg'}]
    }
});
