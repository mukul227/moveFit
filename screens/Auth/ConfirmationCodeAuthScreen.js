import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {CodeVerificationForm} from "../../components/auth/CodeVerificationForm";
import {useDispatch, useSelector} from 'react-redux';
import {verificationCodeSaga} from '../../store/auth/actions';
import {verificationCodeErrorSelector} from "../../store/errors";
import AuthHeader from "../../components/auth/AuthHeader";
import StatusBarComp from "../../components/shared/StatusBarComp";
import AuthTitle from "../../components/auth/AuthTitle";

export default function ConfirmationCodeAuthScreen({ navigation }) {

  const dispatch = useDispatch();
  const beError = useSelector(verificationCodeErrorSelector());
  const handleOnSubmitPress = (values) => {
      dispatch(verificationCodeSaga(values));
  }

  return (
      <View style={styles.container}>
        <StatusBar translucent barStyle="dark-content" />
          <StatusBarComp/>
          <AuthHeader hideReturn={false} navigation={navigation}/>
        <AuthTitle topMargin={true} title={"Verification Code"} subtitle={'Enter the code that we sent you'} />
          <CodeVerificationForm error={beError} onSubmitPress={(values) => handleOnSubmitPress(values)}/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 15
  }
});
