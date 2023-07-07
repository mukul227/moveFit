import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Modal, TouchableWithoutFeedback, Dimensions, Keyboard, Platform,
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {showHabitModal} from "../../store/journey/actions";
import {isHabitModalOpenSelector} from "../../store/journey";
import HabitList from "./HabitList";
import Icons from "../../constants/Icons";
import CreateHabitForm from "./CreateHabitForm";
import RnAndroidKeyboardAdjust from "rn-android-keyboard-adjust";

const windowHeight = Dimensions.get('window').height;
const HabitModal = ({colors}) => {
    const habitList = [
        {
            id: 1,
            icon: <Icons.Water color={colors.fontColor}/>,
            title: 'Drink Water',
            value: 'drinkWater',
            selected: false
        },
        {
            id: 2,
            icon: <Icons.Walking color={colors.fontColor}/>,
            title: 'Walking',
            value: 'walking',
            selected: false
        },
        {
            id: 3,
            icon: <Icons.Running color={colors.fontColor}/>,
            title: 'Running',
            value: 'running',
            selected: false
        },
        {
            id: 4,
            icon: <Icons.Swimming color={colors.fontColor}/>,
            title: 'Swim',
            value: 'swim',
            selected: false
        },
        {
            id: 5,
            icon: <Icons.WakeUp color={colors.fontColor}/>,
            title: 'Wake up',
            value: 'wakeUp',
            selected: false
        },
        {
            id: 6,
            icon: <Icons.plus color={colors.fontColor}/>,
            title: 'Custom',
            value: 'custom',
            selected: false
        },
    ]

    const dispatch = useDispatch();
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    const onKeyboardDidShow = (e) => {
        setKeyboardHeight(e.endCoordinates.height);
    }

    const onKeyboardDidHide = (e) => {
        setKeyboardHeight(0);
    }

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
        const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const handleCloseModal = () => {
        dispatch(showHabitModal(false))
        setHideList(false);
        RnAndroidKeyboardAdjust.setAdjustResize();
    };

    const isModalVisible = useSelector(isHabitModalOpenSelector());
    const [hideList, setHideList] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const setSelectedItemFn = (item) => {
        setHideList(true);
        setSelectedItem(item);
    }

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                }}
            >
                <View style={{paddingTop: Platform.OS === 'ios' ? 50 : 0}}>
                    <View style={[styles.modalView,{backgroundColor: colors.backgroundColor}]}>
                        {
                            !hideList ?
                                <HabitList onBack={() => handleCloseModal()} colors={colors} data={habitList} setItem={(item) => setSelectedItemFn(item)}/> :
                                <CreateHabitForm onBlurInput={() => onKeyboardDidHide()} closeList={() => {
                                    setHideList(false);
                                    RnAndroidKeyboardAdjust.setAdjustResize();
                                }} item={selectedItem} colors={colors}/>
                        }
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modalView: {
        width: '100%',
        height: '100%',
        paddingBottom: 0,
        paddingHorizontal: 20,
    },
});

export default HabitModal;
