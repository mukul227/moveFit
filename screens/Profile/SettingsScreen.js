import React, {useState} from 'react';
import {Linking, ScrollView, View} from 'react-native';
import {useTheme} from "react-native-paper";
import Wrapper from "../../components/shared/Wrapper";
import SettingsHeader from "../../components/profile/settings/SettingsHeader";
import SettingsList from "../../components/profile/settings/SettingsList";
import ProfileDetails from "../../components/profile/settings/ProfileDetails";
import SettingsFooter from "../../components/profile/settings/SettingsFooter";
import Icons from "../../constants/Icons";
import {useDispatch, useSelector} from "react-redux";
import {userDataSelector} from "../../store/friends";
import {updateProfileStatusSaga, updateProfileThemeSaga} from "../../store/profile";
import {healthService} from "../../services/HealthService";
import Icon from "react-native-vector-icons/Ionicons";
import DeleteAccountModal from "../../components/profile/settings/DeleteAccountModal";
import {useFocusEffect} from "@react-navigation/native";

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { colors } = useTheme();

  const user = useSelector(userDataSelector());

  const settingsItemList = [
    {id: 1, icon: <Icons.profileTab color={colors.backgroundColor}/>, title: 'Profile', screen: 'EditProfileScreen'},
    {id: 2, icon: <Icons.Subscription color={colors.backgroundColor}/>, title: user?.user?.subscribed ? 'My Subscription' : 'Subscribe Now', screen: 'MySubscriptionScreen', activeSubscription: user?.user?.subscription ? user?.user?.subscription : null, subscribed: user?.user?.subscribed},
    {id: 3, icon: <Icons.AppleHealth color={colors.backgroundColor}/>, title: 'Connect Apple Health'},
    {id: 4, icon: <Icon name="close-circle-outline" size={24} color={colors.backgroundColor}/>, title: 'Delete Account'},
    {id: 5, icon: <Icon name="md-mail-outline" size={24} color={colors.backgroundColor}/>, title: 'Contact Us'}
  ];

  const [selectedProfileStatus, setSelectedProfileStatus] = useState(user?.user?.public ? 1 : 0);
  const [isDeleteAccountModalVisible, setIsDeleteAccountModalVisible] = useState(false);
  const [healthPermissionResponse, setHealthPermissionResponse] = useState(null);

  const profileStatusArr = [{value: 0, label: 'Private'}, {value: 1, label: 'Public'}];

  const onProfileStatusChange = profileStatus => {
    setSelectedProfileStatus(profileStatus);
    const userData = {
      public: profileStatus
    };
    dispatch(updateProfileStatusSaga(userData));
  };

  const onThemePress = () => dispatch(updateProfileThemeSaga());

  const checkHealthPermission = async () => {
    setHealthPermissionResponse(await healthService.appleHealthInit());
  }

  useFocusEffect(
    React.useCallback( () => {
      checkHealthPermission()
    }, [])
  )

  const onPressItem = async (item) => {
    switch (item.id) {
      case 1:
        navigation.navigate(item.screen);
        break;
      case 2:
        if (!user?.user?.subscribed) {
          navigation.navigate('AuthNavigator', {
            screen: 'OnBoardingStackNavigator', params: {
              screen: 'OnBoardingSubscriptionScreen', params: {fromProfile: true}
            }
          });
        }
        break;
      case 3:
        if (healthPermissionResponse === true) {
          await Linking.openURL('App-Prefs:HEALTH&path=SOURCES_ITEM');
        } else {
          setHealthPermissionResponse(await healthService.requestPermission());
        }
        break;
      case 4:
        setIsDeleteAccountModalVisible(true);
        break;
      case 5:
        await Linking.openURL('mailto:customerservice@movefit.com')
        break;
      default:
        navigation.navigate(item.screen);
    }
  };

  return (
    <Wrapper paddingBottom={77}>
      <View showsVerticalScrollIndicator={false} style={{flex: 1, width: '100%', backgroundColor: colors.backgroundColor}}>
        <SettingsHeader navigation={navigation} colors={colors} onItemPress={onThemePress}/>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            {
              user &&
                <ProfileDetails colors={colors} user={user?.user} items={profileStatusArr} selectedItem={selectedProfileStatus} onValueChange={onProfileStatusChange}/>
            }
            <SettingsList onPressItem={(item) => onPressItem(item)} healthPermissionResponse={healthPermissionResponse} navigation={navigation} colors={colors} items={settingsItemList}/>
          </View>
        </ScrollView>
        <SettingsFooter colors={colors}/>
      </View>
      <DeleteAccountModal
        isModalVisible={isDeleteAccountModalVisible}
        setIsModalVisible={(value) => setIsDeleteAccountModalVisible(value)}
        onDeleteAccount={() => setIsDeleteAccountModalVisible(false)}
        colors={colors}
      />
    </Wrapper>
  );
};

export default SettingsScreen;
