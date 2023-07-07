import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Modal, Image, Platform} from "react-native";
import CustomText from "../shared/CustomText";
import Icons from "../../constants/Icons";
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from "react-native-paper";
import Button from "../shared/Button";
import WebViewComponent from "./webViewComponent";
import {useDispatch, useSelector} from "react-redux";
import {stripeSelector} from "../../store/stripe";
import authService from "../../services/AuthService";
import {setActiveUser} from "../../store/auth/actions";
import {stripeService} from "../../services/StripeService";
import {subscriptionsSelector} from "../../store/iap";
import {requestSubscriptionSaga} from "../../store/iap/actions";

export default function SubscriptionListComponent({data, navigation, fromProfile, onItemPressFn}) {

  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  const link = useSelector(stripeSelector())
  const subscriptions = useSelector(subscriptionsSelector());

  const onSubscribePress = async () => {
    dispatch(requestSubscriptionSaga(subscriptions.find((subscription) => subscription.productId === productId)));
  };

  const {colors} = useTheme();

  const [options, setOptions] = useState([]);
  const [subType, setSubType] = useState('3months');
  const [productId, setProductId] = useState('move.3_months.subscription');
  const [isEverSubscribed, setIsEverSubscribed] = useState(null);
  const [monthlyPrice, setMonthlyPrice] = useState(0);
  const [priceCurrencyCode, setPriceCurrencyCode] = useState(null);

  useEffect(() => {
    if (data.length) {
      setOptions(data);
    }
  }, [data]);

  useEffect(() => {
    stripeService.checkIsEverSubscribed().then((res) => {
      setIsEverSubscribed(res);
    });
    const subscription = subscriptions?.find((el) => el?.productId === 'move.monthly.subscription');
    if (Platform.OS === 'ios') {
      setMonthlyPrice(Number(subscription?.price).toFixed(2));
      setPriceCurrencyCode(subscription?.currency === 'USD' ? '$' : subscription?.currency);
    } else {
      if (subscription && subscription.subscriptionOfferDetails && subscription.subscriptionOfferDetails.length > 1) {
        setMonthlyPrice(Number(subscription?.subscriptionOfferDetails[1]?.pricingPhases?.pricingPhaseList[0]?.priceAmountMicros));
        setPriceCurrencyCode(subscription?.subscriptionOfferDetails[1]?.pricingPhases?.pricingPhaseList[0]?.priceCurrencyCode === 'USD' ? '$' : subscription?.subscriptionOfferDetails[1]?.pricingPhases?.pricingPhaseList[0]?.priceCurrencyCode);
      } else {
        setMonthlyPrice(Number(subscription?.subscriptionOfferDetails[0]?.pricingPhases?.pricingPhaseList[0]?.priceAmountMicros));
        setPriceCurrencyCode(subscription?.subscriptionOfferDetails[0]?.pricingPhases?.pricingPhaseList[0]?.priceCurrencyCode === 'USD' ? '$' : subscription?.subscriptionOfferDetails[0]?.pricingPhases?.pricingPhaseList[0]?.priceCurrencyCode);
      }

    }

  }, []);

  const onItemPress = selectedItem => {
    setOptions(
      options.map(el => {
        if (el.id === selectedItem.id) {
          setSubType(selectedItem.type);
          setProductId(selectedItem.productId);
          return Object.assign({}, el, {selected: true});
        } else if (el.selected) {
          return Object.assign({}, el, {selected: false});
        }
        return el;
      })
    );
    onItemPressFn();
  };

  const onCloseModal = async () => {
    await authService.getAuthUser().then((res) => {
      if (res.subscribed) {
        authService.updateUserInStorage(res);
        dispatch(setActiveUser(res));
        navigation.navigate('MainNavigator', {screen: 'Workouts'});
      }
    })
    await setModalVisible(false);
  }

  const checkRedirectionToHome = async (val) => {
    if (val) {
      await onCloseModal();
    }
  }

  const onSkip = () => {
    if (fromProfile) {
      navigation.navigate('MainNavigator', {screen: 'Profile', params: {
          screen: 'HomeScreen'
        }});
    } else {
      navigation.navigate('MainNavigator', {screen: 'Habits'});
    }
  }

  const setPrice = (item, subs) => {
    const subscription = subs.find((el) => el?.productId === item?.productId);
    if (Platform.OS === 'ios') {
      return subscription?.localizedPrice;
    } else {
      if (subscription?.subscriptionOfferDetails[0]?.pricingPhases) {
        if (subscription?.subscriptionOfferDetails[0]?.pricingPhases?.pricingPhaseList.length > 1) {
          if (subscription?.subscriptionOfferDetails[0]?.pricingPhases?.pricingPhaseList[0].priceAmountMicros === '0')
          {
            return subscription?.subscriptionOfferDetails[0]?.pricingPhases?.pricingPhaseList[1]?.formattedPrice;
          }
        }
      }
      return subscription?.subscriptionOfferDetails[0]?.pricingPhases?.pricingPhaseList[0]?.formattedPrice;
    }
  }

  const getSavings = (item, subscriptions) => {
    const subscription = subscriptions?.find((el) => el?.productId === item?.productId);
    let subscriptionPrice = 0;

    if (Platform.OS === 'ios') {
      subscriptionPrice = Number(subscription?.price).toFixed(2);
    } else {
      if (subscription && subscription.subscriptionOfferDetails && subscription.subscriptionOfferDetails.length > 1) {
        subscriptionPrice = Number(subscription?.subscriptionOfferDetails[1]?.pricingPhases?.pricingPhaseList[0]?.priceAmountMicros);
      } else {
        subscriptionPrice = Number(subscription?.subscriptionOfferDetails[0]?.pricingPhases?.pricingPhaseList[0]?.priceAmountMicros);
      }
    }
    let savings = 0;
    switch (subscription?.productId) {
      case 'move.monthly.subscription':
        savings = 0;
        break;
      case 'move.3_months.subscription':
        savings = 3 * Number(monthlyPrice) - Number(subscriptionPrice);
        break;
      case 'move.6_months.subscription':
        savings = 6 * Number(monthlyPrice) - Number(subscriptionPrice);
        break;
      case 'move.1_year.subscription':
        savings = 12 * Number(monthlyPrice) - Number(subscriptionPrice);
        break;
      default:
        savings = 0;
    }

    if (Platform.OS === 'ios') {
      return savings.toLocaleString();
    } else {
      return Math.round(savings / Math.pow(10, 6)).toLocaleString();
    }
  };

  return (
    <View style={{width: '100%', marginTop: 20}}>
      {
        options.map((item, index) => {
          const backgroundColor = item.selected ? colors.primaryColor : colors.backgroundColor;
          const fontColor = item.selected ? 'white' : colors.fontColor;
          const topViewBackground = item.selected ? colors.backgroundColor : colors.primaryColor;
          const topViewBorderColor = item.selected ? colors.borderColor : colors.primaryColor;
          const topViewTextColor = item.selected ? colors.primaryColor : 'white';
          const perMonthColor = item.selected ? 'white' : colors.perMonthColor;

          return (
            <TouchableOpacity
              onPress={() => onItemPress({...item, selected: true})}
              key={item.id} style={[styles.container, {borderColor: colors.borderColor, borderWidth: item.selected ? 0 : 1, backgroundColor, marginTop: item.topView ? 20 : 15}]}>
              {
               item.selected ?
                 <LinearGradient start={{x: 1, y: 1}} end={{x: 0, y: 0}} colors={colors.primaryColorGradient}
                                 style={{width: '100%', position: 'absolute', height: 80, borderRadius: 20}}/> : null
              }
              {
                item.topView ?
                  <View style={[styles.topView, {borderColor: topViewBorderColor, backgroundColor: topViewBackground}]}>
                    <CustomText color={topViewTextColor} fontWeight={'700'} size={12} children={item.topView}/>
                  </View> : null
              }
              <View style={{flexDirection: 'row', paddingHorizontal: 16, width: '100%', alignItems: 'center'}}>
                <View style={{width: '90%'}}>
                  <CustomText color={fontColor} children={item.title} size={14} fontWeight={'600'}/>
                  <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                    <CustomText color={fontColor} children={setPrice(item,subscriptions)} size={24} fontWeight={'600'}/>
                    {item.productId !== 'move.monthly.subscription' ?
                      <Text style={{marginBottom: 2}}>
                        <CustomText color={perMonthColor} children={priceCurrencyCode + ' ' + getSavings(item, subscriptions)} size={16}/>
                        <CustomText children={' savings'} color={'lightgray'} size={16}/>
                      </Text> :
                      null
                    }
                    <View/>
                  </View>
                </View>
                <View style={{width: '10%'}}>
                  {item.selected ? <Icons.FilledWhite/> : <Icons.UnfilledColor color={colors.unfilledColor}/>}
                </View>
              </View>
            </TouchableOpacity>
          )
        })
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
              <TouchableOpacity onPress={() => onCloseModal()} style={styles.closeModalButton}>
                <CustomText style={{marginLeft: 5}} color={'#32A1C7'} children={'Return'}/>
              </TouchableOpacity>
              <WebViewComponent redirectToHome={(val) => checkRedirectionToHome(val)} link={link?.url}/>
            </View>
          </View>
        </Modal>
      </View>

      <Button
        onPress={() => onSubscribePress()}
        gradientColors={colors.primaryColorGradient}
        style={{marginTop: 30}}
        title={'Subscribe now!'}/>
      {
        isEverSubscribed !== null && !isEverSubscribed?.everSubscribed ?
          <CustomText children={'7 Days Free Trial!'} size={16} color={colors.primaryColor} style={{textAlign: 'center', marginTop: 10}}/> : null
      }
      <View style={styles.skipView}>
        <TouchableOpacity onPress={() => onSkip()} style={styles.skipTouch}>
          <CustomText children={fromProfile ? 'Cancel' : 'Skip'} size={16} color={colors.primaryColor} textDecorationLine={'underline'}/>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  },
  topView: {
    position: 'absolute',
    borderWidth: 1,
    backgroundColor: '#71C8C6',
    paddingHorizontal: 15,
    paddingVertical: 1,
    borderRadius: 7,
    top: -10
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
  skipView: {
    width: '100%',
    alignItems:'center',
    marginTop:10
  },
  skipTouch: {
    paddingVertical: 5,
    alignItems:'center',
    width:'20%'
  }
});
