import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, ScrollView, StatusBar} from 'react-native';
import AuthHeader from "../../components/auth/AuthHeader";
import StatusBarComp from "../../components/shared/StatusBarComp";
import SubscriptionTitle from "../../components/auth/SubscriptionTitle";
import SubscriptionsOffersChecklist from "../../components/auth/SubscriptionsOffersChecklist";
import SubscriptionListComponent from "../../components/auth/SubscriptionListComponent";
import {subscription} from "../../dataForCheckList/data";
import {useTheme} from "react-native-paper";
import {stripeService} from "../../services/StripeService";

export default function OnBoardingSubscriptionScreen({navigation, route}) {

  const scrollViewRef = useRef();

  const checkUserEverSubscribed = async () => {
    try {
      await stripeService.checkIsEverSubscribed();
    }catch (e) {
      console.log({e});
    }
  }

  useEffect(() => {
    checkUserEverSubscribed();
  },[])

  const { colors } = useTheme();

  const onItemPress = () => {
    scrollViewRef.current.scrollToEnd({animated: true})
  }

  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
      <StatusBar translucent barStyle="dark-content" />
      <StatusBarComp backgroundColor={colors.backgroundColor}/>
      <AuthHeader color={colors.primaryColor} navigation={navigation} marginBottom={15}/>
      <ScrollView ref={scrollViewRef} contentContainerStyle={{paddingBottom: 40}} showsVerticalScrollIndicator={false}>
        <SubscriptionTitle color={colors.fontColor} />
        <SubscriptionsOffersChecklist />
        <SubscriptionListComponent onItemPressFn={() => onItemPress()} navigation={navigation} fromProfile={route.params?.fromProfile} data={subscription}/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 15
  }
});
