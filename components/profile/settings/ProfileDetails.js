import React from 'react';
import {Image, View, StyleSheet} from 'react-native'
import CustomText from "../../shared/CustomText";
import ProfileStatus from "./ProfileStatus";
import Picture from "../../shared/Picture";
import Icons from "../../../constants/Icons";

const ProfileDetails = ({ colors, user, items, selectedItem, onValueChange }) => {
  return (
    <View style={{marginVertical: 24, alignItems: 'center'}}>
      <View>
        {
          user?.photo ?
          <Picture source={user.photo} style={styles.profileImage}/> :
          <Icons.ProfileIcon width={80} height={80} color={colors.primaryColor} style={{marginRight: 6}}/>
        }
      </View>
      <CustomText children={`${user.first_name} ${user.last_name}`} size={24} color={colors.fontColor} style={{marginTop: 8, marginBottom: 15}}/>
      <ProfileStatus user={user} colors={colors} items={items} selectedItem={selectedItem} onValueChange={onValueChange}/>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40
  }
});

export default ProfileDetails;
