import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import Picture from "../shared/Picture";

import {useTheme} from "react-native-paper";
import {useDispatch, useSelector} from "react-redux";
import {postImageSelector} from "../../store/profile";
import {createNewPostSaga} from "../../store/profile/actions";
import ProceedButtonWithText from "../auth/ProceedButtonWithText";

const ProfileNewPostComponent = ({}) => {

    const {colors} = useTheme();
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const image = useSelector(postImageSelector());
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView style={styles.container}
                                  behavior={"position"}
                                  keyboardVerticalOffset={0}
            >
                <View style={styles.inner}>
                    <View style={styles.pictureContainer}>
                        <Picture style={styles.picture} source={image}/>
                    </View>
                    <TextInput
                        style={[ styles.textInput, {color: colors.fontColor, borderColor: colors.borderColor}]}
                        onChangeText={(text) => setText(text)}
                        value={text}
                        placeholder="Write a description..."
                        placeholderTextColor={'#70767B'}
                        multiline={true}
                        numberOfLines={7}
                        minHeight={150}
                        maxHeight={150}
                        maxLength={255}
                        textAlignVertical={"top"}
                    />
                    <ProceedButtonWithText isFormValid={true} onHandlePress={() => dispatch(createNewPostSaga({image, text}))}/>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    picture: {
        width: '100%',
        height: '100%',
        borderRadius: 20
    },
    inner: {
        width: '100%',
        position: "relative",
        justifyContent: "space-around"
    },
    textInput: {
        marginVertical: 30,
        padding: 20,
        paddingTop: 15,
        borderWidth: 1,
        borderRadius: 20,
    },
    pictureContainer: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 20,
        marginTop: 10
    }
});


export default ProfileNewPostComponent;
