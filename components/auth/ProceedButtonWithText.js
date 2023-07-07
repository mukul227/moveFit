import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Modal, Image} from "react-native";
import CustomText from "../shared/CustomText";
import Button from "../shared/Button";
import WebViewComponent from "./webViewComponent";
import {useTheme} from "react-native-paper";

export default function ProceedButtonWithText({title, showLinks = false, link, link2, isFormValid, onHandlePress, onHandlePressLink, firstLinkUrl, secondLinkUrl, hideButton}) {

    const [modalVisible, setModalVisible] = useState(false);
    const [webLink, setWebLink] = useState('https://google.com/');

    const manageLinks = (getLink) => {
        setModalVisible(true);
        setWebLink(getLink)
    }

    const {colors} = useTheme();

    return (
        <View style={styles.container}>
            <View style={styles.innerWrapper}>
                { title ? <CustomText size={16} color={'#6B8093'} style={{letterSpacing: 0.3}} children={title}/> : null}
                {
                    showLinks ?
                      <View>
                          {
                              !link2 ?
                                <TouchableOpacity onPress={onHandlePressLink}>
                                    <CustomText size={16} color={'#6B8093'} style={{letterSpacing: 0.3}} textDecorationLine={'underline'} children={link}/>
                                </TouchableOpacity>
                                :
                                <CustomText textDecorationLine={'none'} size={16} color={'#6B8093'}>
                                    <TouchableOpacity onPress={ () => manageLinks(firstLinkUrl)}>
                                        <CustomText children={link} textDecorationLine={'underline'} size={16} color={'#6B8093'}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <CustomText textDecorationLine={'none'} size={16} color={'#6B8093'} children={' and '}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => manageLinks(secondLinkUrl)}>
                                        <CustomText textDecorationLine={'underline'} size={16} color={'#6B8093'} children={link2}/>
                                    </TouchableOpacity>
                                </CustomText>
                          }
                      </View> : null
                }
            </View>
            {
                hideButton ? null :
                    <Button
                        backgroundColor={'transparent'}
                        borderColor={'transparent'}
                        gradientColors={ isFormValid ? colors.primaryColorGradient : colors.primaryColorGradientDisabled}
                        showCenterIcon={true}
                        setWidth={'25%'}
                        onPress={() => onHandlePress()}
                        isActive={isFormValid}
                    />
            }
            <View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeModalButton}>
                                <Image source={require('../../assets/ArrowLeft.png')}/>
                                <CustomText style={{marginLeft: 5}} color={'#32A1C7'} children={'Return'}/>
                            </TouchableOpacity>
                            <WebViewComponent link={webLink}/>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 40,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    innerWrapper: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '70%',
        justifyContent: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        flex: 1,
        width: '100%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        // padding: 35,
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
    closeModalButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        paddingLeft: 15,
        paddingTop: 10
    },
});
