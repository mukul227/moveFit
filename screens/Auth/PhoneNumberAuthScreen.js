import React, {useCallback, useRef, useState} from 'react';
import {View, StyleSheet, StatusBar, Dimensions, TouchableOpacity} from 'react-native';
import {PhoneNumberForm} from '../../components/auth/PhoneNumberForm';
import {useDispatch} from 'react-redux';
import {phoneNumberSaga} from '../../store/auth/actions';
import StatusBarComp from "../../components/shared/StatusBarComp";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthTitle from "../../components/auth/AuthTitle";
import Recaptcha from 'react-native-recaptcha-that-works';
import ActivityIndicatorComponent from "../../components/shared/ActivityIndicatorComponent";

export default function PhoneNumberAuthScreen({navigation}) {

  const dispatch = useDispatch();

  const [key, setKey] = useState('');
  const [phoneServer, setPhoneServer] = useState(null);

  const $recaptcha = useRef();

  const size = 'normal';

  const handleClosePress = useCallback(() => {
    $recaptcha.current.close();
  }, []);

  const handleOnSubmit = phoneNumber => {
    let data = {
      phoneNumber,
      recaptchaToken: key
    }
    setPhoneServer(phoneNumber);
    $recaptcha.current.open();
    // dispatch(phoneNumberSaga(data));
  };
  return (
    <View style={[styles.container]}>
      <StatusBar translucent barStyle="dark-content" />
      <StatusBarComp/>
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
          setKey(token);
          dispatch(phoneNumberSaga({phoneNumber: '+' + phoneServer.replace(/\D/g, ''), recaptchaToken: token}))
        }}
      />
        <AuthHeader hideReturn={false} navigation={navigation}/>
        <AuthTitle topMargin={true} title={"Let's get you started"} subtitle={'Please enter your phone number'} />
        <PhoneNumberForm onSubmit={phone => handleOnSubmit(phone)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: 'white'
  },
});
