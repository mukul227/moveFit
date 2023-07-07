import React, {useEffect, useState} from 'react';
import Wrapper from "../../components/shared/Wrapper";
import CustomHeader from "../../components/shared/CustomHeader";
import Icons from "../../constants/Icons";
import {useTheme} from "react-native-paper";
import CustomText from "../../components/shared/CustomText";
import {StyleSheet, View} from "react-native";
import Button from "../../components/shared/Button";
import {useDispatch, useSelector} from "react-redux";
import {
  cancelSubscriptionSaga,
  getActiveSubscriptionSaga,
  reactivateSubscriptionSaga
} from "../../store/stripe/actions";
import {activeSubscriptionSelector} from "../../store/stripe";
import moment from "moment";
import ConfirmationModal from "../../components/shared/ConfirmationModal";
import {showConfirmationModal} from "../../store/helpers/actions";
import {themeSelector} from "../../store/helpers";

const MySubscriptionScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const {colors} = useTheme();
  const [subtitle, setSubtitle] = useState('');

  useEffect(() => {
    dispatch(getActiveSubscriptionSaga());
  }, []);

  const subscription = useSelector(activeSubscriptionSelector());
  const theme = useSelector(themeSelector());

  const onPressAction = () => {
      dispatch(cancelSubscriptionSaga());
      dispatch(showConfirmationModal(false));
  }

  const onModalOpen = () => {
      setSubtitle('cancel your subscription');
      dispatch(showConfirmationModal(true));
  }

  return (
    <Wrapper statusBarColor={colors.profileHomeBackgroundColor} backgroundColor={colors.profileHomeBackgroundColor}>
      <CustomHeader isNewPost={true} title={'My Subscription'} navigation={navigation}/>
      {
        theme === "light" ? <Icons.BlueGradientLogo style={{marginVertical: 20}}/> : <Icons.PurpleGradientLogo style={{marginVertical: 20}}/>
      }
      <CustomText children={ subscription ? 'Active Subscription' : "You don't have active subscription."} color={ subscription ? colors.primaryColor : colors.fontColor} size={ subscription ? 26 : 22} fontWeight={'700'}/>
      {subscription ?
        <View style={{ flex: 1, justifyContent: 'space-between'}}>
          <View>
            <View style={[styles.fields, {backgroundColor: colors.subscriptionFieldBackground, marginTop: 15}]}>
              <CustomText children={'Plan'} size={16} color={colors.singlePostDescription}/>
              <CustomText children={subscription.planName} size={16} color={colors.primaryColor} fontWeight={'700'}/>
            </View>
            <View style={[styles.fields, {backgroundColor: colors.subscriptionFieldBackground}]}>
              <CustomText children={'Valid Until'} size={16} color={colors.singlePostDescription}/>
              <CustomText children={moment.unix(subscription.validTo).format('MMM Do YYYY, h:mm a')} size={16} color={colors.primaryColor} fontWeight={'700'}/>
            </View>
            <View style={[styles.fields, {backgroundColor: colors.subscriptionFieldBackground}]}>
              <CustomText children={'Status'} size={16} color={colors.singlePostDescription}/>
              <CustomText children={ subscription.status} size={16} color={colors.primaryColor} fontWeight={'700'}/>
            </View>
            <View style={[styles.fields, {backgroundColor: colors.subscriptionFieldBackground}]}>
              <CustomText children={'Renewal'} size={16} color={colors.singlePostDescription}/>
              <CustomText children={ subscription.cancelAtPeriodEnd ? 'off' : 'on'} size={16} color={colors.primaryColor} fontWeight={'700'}/>
            </View>
          </View>
          { !subscription.cancelAtPeriodEnd ?
            <Button borderColor={colors.primaryColor} onPress={() => onModalOpen()}
                    title={ 'Cancel Subscription'} gradientColors={colors.primaryColorGradient} style={{marginBottom: 20}}/> : null
          }
          <ConfirmationModal onPressConfirm={() => onPressAction()} title={'Subscription'} subtitle={subtitle} colors={colors}/>
          </View> : null
      }
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  fields: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.2 },
    shadowOpacity:  0.3,
    shadowRadius: 1,
    elevation: 5,
    borderRadius: 20,
    marginBottom: 10,
    height: 55,
    paddingHorizontal: 15
  }
});

export default MySubscriptionScreen;
