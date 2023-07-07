import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
    Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {showConfettiSelector, themeSelector} from "../../store/helpers";
import CustomText from "./CustomText";
import Button from "./Button";
import {useTheme} from "react-native-paper";
import {helperService} from "../../services/HelperService";
import {closeAchievementModalSaga} from "../../store/profile/actions";
import {achievementConfettiSelector, achievementSelector} from "../../store/profile";
import ConfettiComponent from "./ConfettiComponent";

const AchievementModal = ({isModalVisible}) => {

    const dispatch = useDispatch();
    const theme = useSelector(themeSelector());
    const achievement = useSelector(achievementSelector());
    const confetti = useSelector(achievementConfettiSelector());
    const {colors} = useTheme();

    const handleCloseModal = () => {
        dispatch(closeAchievementModalSaga())
    };

    return (

        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                }}
            >
                <TouchableWithoutFeedback onPress={() => handleCloseModal()}>
                    <View style={styles.modalOverlay}/>
                </TouchableWithoutFeedback>
                    <View style={[styles.modalView,{backgroundColor:colors.singleProgramBackground,borderColor:colors.primaryColor}]}>
                        <CustomText children={'Congratulations!'} color={colors.fontColor} size={16} fontWeight={'600'}/>
                        <CustomText children={'You earned an achievement!'} color={colors.fontColor} size={16} fontWeight={'600'}/>
                        {helperService.getAchievementForModal(achievement, theme)}
                        <CustomText children={achievement?.name} size={14} fontWeight={'600'} color={colors.fontColor} style={{textAlign:'center'}}/>
                        <Button borderColor={colors.achievementModal}
                                gradientColors={colors.followButtonGradient}
                                title={'Continue'} style={{marginTop: 30}}
                                backgroundColor={colors.achievementModal}
                                onPress={() => dispatch(closeAchievementModalSaga())}/>
                    </View>
                {confetti ? <ConfettiComponent fromModal={true} showConfettiProp={confetti}/> : null}
            </Modal>
        </View>

    );
};

const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    centeredView: {
        position: 'absolute',
        width: '100%',
        justifyContent: 'center',
        alignItems:'center'
    },
    modalView: {
        borderRadius: 20,
        width: '90%',
        marginLeft:'5%',
        padding: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor:'white',
        position:'absolute',
        top: windowHeight*0.25,
        alignItems:'center',
        borderWidth: 0.5
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    keyboardView: {
        width: '100%',
        backgroundColor: 'transparent',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    }
});

export default AchievementModal;
