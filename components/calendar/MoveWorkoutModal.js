import React from 'react';
import {StyleSheet, View, Modal, TouchableOpacity} from 'react-native';
import CustomText from "../shared/CustomText";
import Icons from "../../constants/Icons";

const MoveWorkoutModal = ({ isVisible, onModalClose, colors, onOptionPress }) => {
    const moveOptions = [
        {id: 1, title: 'Move this workout only', moveAll: false },
        {id: 2, title: 'Move all future workouts', moveAll: true},
    ];

    return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={isVisible}
            >
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, {backgroundColor: colors.notificationBox}]}>
                        <View style={[styles.headerWrapper, {backgroundColor: colors.primaryColor }]}>
                            <CustomText size={15} color={'white'} fontWeight={'700'} children={'Move Workouts'}/>
                            <TouchableOpacity onPress={onModalClose} style={styles.closeBtn}>
                                <Icons.Close color={'white'}/>
                            </TouchableOpacity>
                        </View>

                        {
                            moveOptions?.map((item) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => onOptionPress(item)}
                                        key={item.id}
                                        style={[styles.item, {borderBottomColor: colors.borderColor, borderBottomWidth: item.id === 2 ? 0 : 1}]}
                                    >
                                        <View style={styles.moveOption}>
                                            <CustomText children={item.title} style={{marginLeft: 15}} size={16} fontWeight={'600'} color={colors.fontColor}/>
                                            <Icons.ArrowRight color={colors.fontColor}/>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }

                    </View>
                </View>
            </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: "center",
    },
    modalView: {
        backgroundColor: "white",
        overflow: 'hidden',
        width: '90%',
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    headerWrapper: {
        width: '100%',
        height: 44,
        flexDirection: 'row',
        paddingLeft: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    item: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
    },
    moveOption: {
        flexDirection: 'row',
        paddingVertical: 15,
        justifyContent:'space-between',
        paddingRight:16,
        width:'100%'
    },
    closeBtn: {
        paddingHorizontal: 20,
        paddingVertical: 5
    }
});

export default MoveWorkoutModal;
