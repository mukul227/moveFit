import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  TextInput, Linking, Platform, TouchableOpacity, Dimensions
} from 'react-native';
import {useFocusEffect} from "@react-navigation/native";
import CustomText from '../shared/CustomText';
import PhoneInput from 'react-native-phone-number-input';
import {KeyboardAccessoryView} from "react-native-keyboard-accessory";
import ProceedButtonWithText from "./ProceedButtonWithText";
import {useTheme} from "react-native-paper";

const {height} = Dimensions.get('window');

export const PhoneNumberForm = ({onSubmit, errorServer, navigation}) => {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [isFormValid, setIsFormValid] = useState(false);
  const phoneInput = useRef();
  const numberInput = useRef();

  const {colors} = useTheme();

  const handleChange = (value) => {
    setCountryCode(value);
    const targetPhoneNumber = value.replace('+', '') + phoneNumber;
    // const checkValid = phoneInput.current?.isValidNumber(targetPhoneNumber);
    const checkValid = phoneInput.current?.isValidNumber(phoneNumber);
    if (checkValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const onSubmitPress = () => {
    onSubmit(
      phoneInput.current?.getNumberAfterPossiblyEliminatingZero()
        .formattedNumber + parseInt(phoneNumber, 10)
    );
  };

  const onNumberPress = (value) => {
    setPhoneNumber(value);
    const targetPhoneNumber = countryCode.replace('+', '') + value;
    // const checkValid = phoneInput.current?.isValidNumber(targetPhoneNumber);
    const checkValid = phoneInput.current?.isValidNumber(value);
    if (checkValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      numberInput?.current?.focus();
    }, [])
  );

  return(
        <View style={styles.wrapper}>
          <View style={{width: '100%', flexDirection: 'row', borderColor: isFormValid ? colors.primaryColor :'black', borderWidth: 1, borderRadius: 20, overflow: 'hidden'}}>
            <View style={{paddingLeft: 17}}>
              <PhoneInput
                ref={phoneInput}
                codeTextStyle={{color: 'black'}}
                flagButtonStyle={ isFormValid ? styles.flagButtonActive : styles.flagButtonDefault}
                layout={'first'}
                containerStyle={{width: '100%', height: 50}}
                textContainerStyle={styles.textContainerOverride}
                onChangeFormattedText={(number) => {
                  numberInput?.current?.focus();
                  handleChange(number);
                }}
                autoFocus
                defaultCode="US"
                />
            </View>
            <View style={[styles.phoneInputView, ]}>
              <View style={{flexDirection: 'row', height: 50, alignItems: 'center'}}>
                {
                  countryCode !== '' ?
                    <CustomText size={16} children={'(' + countryCode + ') '} color={'black'}/> : null
                }
                <TextInput
                  style={{fontSize: 16, paddingHorizontal: 15, color: 'black'}}
                  onChangeText={(text) => onNumberPress(text)}
                  value={phoneNumber}
                  placeholder="Your phone number"
                  keyboardType="numeric"
                  ref={numberInput}
                  autoFocus={true}
                />
              </View>
            </View>
          </View>
            <KeyboardAccessoryView
              animateOn="all"
              avoidKeyboard={true}
              alwaysVisible={true}
              androidAdjustResize={true}
              style={{borderTopWidth: 0, backgroundColor: 'white'}}
            >
              <View style={{width: '100%', paddingVertical: 10, marginBottom: 15}} >
                <CustomText textDecorationLine={'none'} size={Platform.OS === 'android' ? 13 : (Platform.OS === 'ios' && height < 600 ? 13 : 16)} color={'#6B8093'}>
                  <TouchableOpacity disabled={true}>
                    <CustomText children={'By pressing continue you accept our '} textDecorationLine={'none'} size={Platform.OS === 'android' ? 13 : (Platform.OS === 'ios' && height < 600 ? 13 : 16)} color={'#6B8093'}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={ () => Linking.openURL('https://movefit.com/privacy-policy')}>
                    <CustomText children={'Privacy Policy '} textDecorationLine={'underline'} size={Platform.OS === 'android' ? 13 : (Platform.OS === 'ios' && height < 600 ? 13 : 16)} color={'#0277BD'}/>
                  </TouchableOpacity>
                  <TouchableOpacity disabled={true}>
                    <CustomText textDecorationLine={'none'} size={Platform.OS === 'android' ? 13 : (Platform.OS === 'ios' && height < 600 ? 13 : 16)} color={'#6B8093'} children={'and'}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Linking.openURL('https://movefit.com/terms')}>
                    <CustomText textDecorationLine={'underline'} size={Platform.OS === 'android' ? 13 : (Platform.OS === 'ios' && height < 600 ? 13 : 16)} color={'#0277BD'} children={'Terms And Conditions'}/>
                  </TouchableOpacity>
                </CustomText>
              </View>
            <ProceedButtonWithText onHandlePress={() => onSubmitPress()} title={"We will send a verification code to your number"} isFormValid={isFormValid}/>
            </KeyboardAccessoryView>
        </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    width: '100%',
    // marginTop: Platform.OS === 'ios' && height < 600 ? 10 : 90,
    marginTop: Platform.OS === 'ios' && height < 600 ? 10 : (Platform.OS === 'ios' && (height < 700) ? 40 : 90),
    justifyContent: 'space-between',
  },

  textContainerOverride: {
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
    paddingVertical: 0,
  },
  flagButtonActive: {
    overflow: 'hidden',
    height: 50,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderColor: '#32A1C7',
  },
  flagButtonDefault: {
    overflow: 'hidden',
    height: 50,
    borderTopWidth: 0,
    borderLeftWidth:0,
    borderBottomWidth:0,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderColor: 'white',
  },
  phoneInputView: {
    flexGrow: 1,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopRightRadius: 20,
  },
});
