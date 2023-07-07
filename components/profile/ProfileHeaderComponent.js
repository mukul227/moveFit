import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Picture from "../shared/Picture";
import CustomText from "../shared/CustomText";
import Icons from "../../constants/Icons";
import ProfileTabSelectComponent from "./ProfileTabSelectComponent";
import VerticalLinearGradientButton from "../shared/VerticalLinearGradientButton";
import {launchImageLibrary} from "react-native-image-picker";
import {useDispatch, useSelector} from "react-redux";
import {userDataSelector} from "../../store/friends";
import {updateUser} from "../../store/auth";
import {getFollowSaga, removeFromUserArraySaga} from "../../store/profile/actions";
import {userArrSelector} from "../../store/profile";

const ProfileHeaderComponent = ({onItemPress, colors, onFollowPress, onSettingsPress, showUserContent, selectedTab}) => {

  const dispatch = useDispatch();
  const goBack = () => dispatch(removeFromUserArraySaga());
  const userArr = useSelector(userArrSelector())

  const userSetData = useSelector(userDataSelector());


  const getFriendStatus = () => {
    if (userSetData?.user?.isFriend) {
      if (userSetData?.user?.friendStatus) {
        return 'Unfollow';
      } else {
        return 'Requested';
      }
    } else {
      return 'Follow';
    }
  };

  const openGallery = () => {
    launchImageLibrary({
      includeBase64: true,
      maxWidth: 400,
      maxHeight: 400
    }, response => {
      if (!response.didCancel) {
        dispatch(updateUser({"isUpdatePhoto": true, 'photo': 'data:image/jpeg;base64,' + response.assets[0].base64}));
      }
    }).catch((e) => {
      console.log(e);
    });
  }

  return (
    <View style={[styles.container, {backgroundColor: colors.bottomTabColor}]}>
      <View style={styles.topOfHeader}>
        {/*{*/}
        {/*  userSetData !== null && userSetData?.isAuthUser ?*/}
        {/*    <CustomText children={"My Profile"} fontWeight={'bold'} color={colors.fontColor} size={22}/> :*/}
        {/*    <TouchableOpacity onPress={goBack} style={{paddingRight: 50}}>*/}
        {/*      <Icons.ArrowLeft color={colors.fontColor}/>*/}
        {/*    </TouchableOpacity>*/}
        {/*}*/}
        {userSetData !==null && userArr.length > 0 ?
            <TouchableOpacity onPress={goBack} style={{width: 40, height: 40, marginLeft: -10, justifyContent: 'center', alignItems: 'center'}}>
              <Icons.ArrowLeft color={colors.fontColor}/>
            </TouchableOpacity> :
          userSetData !== null && userSetData?.isAuthUser ?
              <CustomText children={"My Profile"} fontWeight={'bold'} color={colors.fontColor} size={22}/> :
              <TouchableOpacity onPress={goBack} style={{paddingRight: 50}}>
                <Icons.ArrowLeft color={colors.fontColor}/>
              </TouchableOpacity>
        }
        {
          userSetData !== null && userSetData?.isAuthUser ?
            <TouchableOpacity onPress={onSettingsPress}>
              <Icons.Settings color={colors.profileSettingsIcon}/>
            </TouchableOpacity> :
            null
        }
      </View>
      <View style={{flexDirection: 'row', width: '100%', padding: 15, minHeight: 125}}>
        {
          userSetData ?
            <TouchableOpacity disabled={!userSetData.isAuthUser} onPress={() => openGallery()}>
              {
                userSetData !== null && userSetData?.user?.photo ? <Picture style={styles.profileImage} source={userSetData?.user?.photo}/> :
                  <Icons.ProfileIcon width={80} height={80} color={colors.primaryColor}/>
              }
            </TouchableOpacity> : null
        }
        {
          userSetData !== null ?
            <View style={{marginLeft: 15, flex: 1}}>
              <CustomText size={24} children={`${userSetData?.user?.first_name} ${userSetData?.user?.last_name}`}
                          fontWeight={'500'} color={colors.fontColor}/>
              <CustomText size={14} children={`@${userSetData?.user?.username}`} fontWeight={'300'} color={colors.fontColor}
                          style={{marginBottom: 2}}/>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => dispatch(getFollowSaga({action: 'followers', user: userSetData}))}
                                  disabled={!showUserContent()}>
                  <CustomText size={14}
                              children={userSetData?.user?.numberOfFollowers + (userSetData?.user?.numberOfFollowers === 1 ? ' Follower' : ' Followers')}
                              color={colors.profileTabTitles}/>
                </TouchableOpacity>
                <CustomText children={' · '}/>
                <TouchableOpacity onPress={() => dispatch(getFollowSaga({action: 'following', user: userSetData}))}
                                  disabled={!showUserContent()}>
                  <CustomText size={14}
                              children={userSetData?.user?.numberOfFollowing + ' Following'}
                              color={colors.profileTabTitles}/>
                </TouchableOpacity>
              </View>
              {
                userSetData?.isAuthUser ?
                  null :
                  <View style={{marginTop: 20}}>
                    <VerticalLinearGradientButton
                      width={'80%'} onItemPress={() => onFollowPress(userSetData?.user)}
                      backgroundColors={userSetData?.user?.isFriend ? colors.unfollowButtonGradient : colors.followButtonGradient}
                      title={getFriendStatus()}
                      textColor={userSetData?.user?.isFriend ? colors.unfollowButtonFontColor : colors.followButtonFontColor}
                      disabled={getFriendStatus() === 'Requested'}/>
                  </View>
              }
            </View> : null
        }

      </View>
      <ProfileTabSelectComponent selectedTab={selectedTab} setSelectedItem={onItemPress}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 1,
    paddingTop: 40,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  topOfHeader: {
    // minHeight: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 15,
    paddingTop: 10
  }
});

export default ProfileHeaderComponent;
