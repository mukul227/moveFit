import React, {useState, useRef, useCallback} from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput, Platform} from 'react-native';
import PropTypes from 'prop-types';
import CustomText from "../shared/CustomText";
import {KeyboardAccessoryView} from 'react-native-keyboard-accessory';
import {useDispatch, useSelector} from "react-redux";
import {phoneNumberSelector} from "../../store/auth";
import {phoneNumberSaga} from "../../store/auth/actions";
import ProceedButtonWithText from "./ProceedButtonWithText";
import CountDown from 'react-native-countdown-component';
import {useTheme} from "react-native-paper";
import {verificationCodeError} from "../../store/errors/actions";
import ActivityIndicatorComponent from "../shared/ActivityIndicatorComponent";
import Recaptcha from "react-native-recaptcha-that-works";

export const CodeVerificationForm = ({onSubmitPress, verificationError, navigation, error}) => {

  console.log(error);

  const dispatch = useDispatch();

  const ref_input2 = useRef();

  const {colors} = useTheme();

  const $recaptcha = useRef();

  const size = 'normal';

  const [code, setCode] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [showSendAgain, setShowSendAgain] = useState(false);
  const [countdown, setCountdown] = useState(125);

  const checkFormValidation = (value) => {
    if (value.length === 5) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }

    const phoneNumber = useSelector(phoneNumberSelector());

    const sendAgainSubmit = () => {
      $recaptcha.current.open();
        // setCountdown(countdown + 1)
        // setShowSendAgain(false);
        // dispatch(phoneNumberSaga({phoneNumber, recaptchaToken: 'test'}));
    };

    const onVerificationCodeChange = (value) => {
      if (error.isVisible) {
        dispatch(verificationCodeError({
          isVisible: true,
          text: ''
        }))
      }
        setCode(value);
        checkFormValidation(value);
        if(value.length === 5){
            onSubmitPress(value);
            setCode('');
        }
    };

  const handleClosePress = useCallback(() => {
    $recaptcha.current.close();
  }, []);

  return(
      <View style={styles.wrapper}>
        <Recaptcha
          loadingComponent={
            <ActivityIndicatorComponent />
          }
          ref={$recaptcha}
          lang="en"
          style={{backgroundColor: 'rgba(0,0,0,0.2)'}}
          headerComponent={<TouchableOpacity title="Close" onPress={handleClosePress} />}
          siteKey="6Lczn0ojAAAAAO-01LfPm7e9J-3W8WbKxmq5VfPN"
          baseUrl="https://movefit.com"
          size={size}
          theme="light"
          // onLoad={() => alert('onLoad event')}
          // onClose={() => alert('onClose event')}
          onError={(err) => {
            console.log('error', err);
          }}
          onExpire={() => alert('onExpire event')}
          onVerify={(token) => {
            dispatch(phoneNumberSaga({phoneNumber: phoneNumber.phoneNumber, recaptchaToken: token}));
            setCountdown(countdown + 1)
            setShowSendAgain(false);
          }}
        />
        <TextInput
          selectionColor="white"
          maxLength={5}
          ref={ref_input2}
          value={code}
          onChangeText={(text) => {
              onVerificationCodeChange(text)
          }}
          autoFocus={true}
          keyboardType="numeric"
          style={{width: '100%', backgroundColor: 'transparent', height: Platform.OS === 'ios' ? 0 : 55, fontSize: 0, position: 'absolute', zIndex: 999}}
        />
        <View>
        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center',paddingHorizontal: '10%'}}>
            <View style={[styles.input,{borderColor:code.length === 0 ? colors.primaryColor :'#E8EBED',backgroundColor:'#ffffff'}]}>
              <CustomText size={20} children={code[0]} color={'black'}/>
            </View>
            <View style={[styles.input,{borderColor:code.length === 1 ? colors.primaryColor:'#E8EBED',backgroundColor:'#ffffff' }]}>
              <CustomText size={20} children={code[1]} color={'black'}/>
            </View>
            <View style={[styles.input,{borderColor:code.length === 2 ? colors.primaryColor:'#E8EBED',backgroundColor:'#ffffff' }]}>
              <CustomText size={20} children={code[2]} color={'black'}/>
            </View>
            <View style={[styles.input,{borderColor:code.length === 3 ? colors.primaryColor:'#E8EBED',backgroundColor:'#ffffff'}]}>
              <CustomText size={20} children={code[3]} color={'black'}/>
            </View>
            <View style={[styles.input,{borderColor:code.length === 4 ? colors.primaryColor:'#E8EBED',backgroundColor:'#ffffff'}]}>
                <CustomText size={20} children={code[4]} color={'black'}/>
            </View>
        </View>
          {
            showSendAgain ?
              <View style={styles.resendCodeText}>
                <CustomText size={16} color={colors.exerciseSubtitle} children={" Didn't get the code? "}/>
                <TouchableOpacity onPress={() => sendAgainSubmit()}>
                  <CustomText size={16} textDecorationLine={'underline'} color={colors.exerciseSubtitle} children={"Resend"}/>
                </TouchableOpacity>
              </View>
              :
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                <CustomText size={16} children={'Your code will be valid for '} color={'rgba(20, 20, 20, 0.4)'}
                            style={{marginTop: Platform.OS === 'ios' ? -1 : 1}}/>
                <CountDown
                  until={countdown}
                  timeToShow={['M', 'S']}
                  separatorStyle={{width: 'auto', height: 'auto', color: 'rgba(20, 20, 20, 0.4)', fontWeight: '400'}}
                  showSeparator
                  digitStyle={{backgroundColor: 'white', borderWidth: 0, borderColor: '#1CC625', width: 'auto', height: 16}}
                  digitTxtStyle={{color: 'rgba(20, 20, 20, 0.4)', fontWeight: '400'}}
                  onFinish={() => setShowSendAgain(true)}
                  timeLabels={{m: '', s: ''}}
                  size={14}
                />
                <CustomText size={16} children={' seconds.'} color={'rgba(20, 20, 20, 0.4)'} style={{marginTop: Platform.OS === 'ios' ? -1 : 1}}/>
              </View>
          }
          {
            error.isVisible ?
              <View style={styles.verificationError}>
                <CustomText children={error.text} color={'red'}/>
              </View> : null
          }
        </View>
      </View>
  )
};

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    marginTop: 80,
  },
  separator: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#f8f8fa',

    marginVertical: 20,
    alignItems: 'center'
  },
  socialButton: {
    width: '45%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 12.22,

    elevation: 3,
  },
  input: {
    width: 56,
    aspectRatio: 1,
    marginRight: 8,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  resendCodeText: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 15
  },
  verificationError: {
    width: '100%',
    alignItems: 'center',
    marginTop: 15
  }
});
