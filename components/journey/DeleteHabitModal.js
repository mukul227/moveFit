import React from 'react';
import {
    View,
    StyleSheet,
    Modal, TouchableWithoutFeedback, Dimensions, TouchableOpacity,
} from 'react-native';
import CustomText from "../shared/CustomText";


const DeleteHabitModal = ({colors, isModalVisible,handleCloseModal, onCancel, onDeletePress }) => {

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

                    <View style={[styles.modalView,{backgroundColor:colors.singleProgramBackground}]}>
                        <CustomText fontWeight={'500'} style={styles.textStl} size={18}
                                    children={'Are you sure you want to delete a repeating habit?'} color={colors.fontColor}/>
                        <View style={styles.btnView}>
                            <TouchableOpacity onPress={() => onCancel()}  style={[styles.btn,{ borderRightWidth: 1, borderRightColor:'#EEF3F5'}]}>
                                <CustomText children={'Cancel'} color={colors.fontColor} size={16}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onDeletePress()} style={styles.btn}>
                                <CustomText children={'Delete'} color={'#C73232'} size={16} fontWeight={'700'}/>
                            </TouchableOpacity>
                        </View>
                    </View>
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
        alignItems: 'center',
        bottom: 0,
    },
    modalView: {
        borderRadius: 20,
        width: '90%',
        marginLeft:'5%',
        // paddingHorizontal: 30,
        paddingTop:30,
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
        top: windowHeight*0.4,
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
    btn: {
        width:'50%',
        alignItems:'center',
        padding:15,
    },
    textStl: {
        textAlign:'center',
        paddingHorizontal: 10,
        marginBottom: 25
    },
    btnView: {
        width:'100%',
        flexDirection:'row',
        borderTopWidth: 1,
        borderTopColor:'#EEF3F5'
    }
});

export default DeleteHabitModal;
