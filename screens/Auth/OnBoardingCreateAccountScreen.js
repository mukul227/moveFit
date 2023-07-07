import React from 'react';
import {View, StyleSheet, TouchableOpacity, StatusBar, ScrollView,} from 'react-native';
import AuthHeader from "../../components/auth/AuthHeader";
import StatusBarComp from "../../components/shared/StatusBarComp";
import AuthTitle from "../../components/auth/AuthTitle";
import {UserDetailsForm} from "../../components/auth/UserDetailsForm";
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../../store/auth";
import {useTheme} from "react-native-paper";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";

export default function OnBoardingCreateAccountScreen({ navigation, isEdit }) {

  const dispatch = useDispatch();
  const {colors} = useTheme();

    const handleOnSubmit = (value) => {
      dispatch(updateUser(value));
    }

    return (
      <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: colors.backgroundColor}}>
          <KeyboardAvoidingView style={{flex: 1}}
                                behavior={"position"}
                                keyboardVerticalOffset={-150}
          >
        <View style={[styles.container, {backgroundColor: colors.backgroundColor, paddingHorizontal: isEdit ? 0 : 15}]}>
          <StatusBar translucent barStyle={colors.backgroundColor === 'white' ? "dark-content" : "light-content"}/>
          { isEdit ? null : <StatusBarComp/>}
          <AuthHeader color={colors.primaryColor} isEdit={isEdit} hideReturn={!isEdit} navigation={navigation}/>
          <AuthTitle isEdit={isEdit} title={ isEdit ? "Profile" : "Create your account"} subtitle={ isEdit ? null : 'Tell us about yourself'} />
          <UserDetailsForm isEditProfile={isEdit} onSubmit={(values) => handleOnSubmit(values)}/>
        </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
});
