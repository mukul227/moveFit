import React from 'react';
import {View, StyleSheet, TextInput, StatusBar} from 'react-native';
import AuthHeader from "../../components/auth/AuthHeader";
import StatusBarComp from "../../components/shared/StatusBarComp";
import AuthTitle from "../../components/auth/AuthTitle";
import ProceedButtonWithText from "../../components/auth/ProceedButtonWithText";
import {useDispatch} from "react-redux";
import {updateUser} from "../../store/auth";
import {KeyboardAccessoryView} from "react-native-keyboard-accessory";
import CustomText from "../../components/shared/CustomText";
import {useTheme} from "react-native-paper";

export default function OnBoardingUsernameScreen({navigation}) {

  const dispatch = useDispatch();
  const {colors} = useTheme();

  const [text, setText] = React.useState("");

  const onSubmit = () => {
    dispatch(updateUser({username: text}));
  }

  const hasWhiteSpace = (s) => {
    return !(/\s/).test(s);
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent barStyle="dark-content" />
      <StatusBarComp/>
      <AuthHeader navigation={navigation}/>
      <View style={{flex: 1}}>
        <AuthTitle title={"Choose your username"} subtitle={'We like real names'}/>
        <TextInput style={[styles.input, {color: colors.fontColor }]} onChangeText={(text) => setText(text)} value={text} placeholder="Username"  autoFocus={true}/>
        {!hasWhiteSpace(text) && <CustomText children={'*Please enter a username without spaces.'} color={'red'}/>}
      </View>
      <KeyboardAccessoryView animateOn='all' avoidKeyboard={true} alwaysVisible={true} androidAdjustResize={true} style={styles.keyboardAccessoryView}>
        <ProceedButtonWithText
          onHandlePress={() => onSubmit()}
          isFormValid={text !== "" && hasWhiteSpace(text)}
        />
      </KeyboardAccessoryView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    justifyContent: 'space-between'
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#E8EBED',
    marginTop: 80,
    padding: 15,
  },
  keyboardAccessoryView: {
    borderTopWidth: 0,
    backgroundColor: 'white'
  }
});
