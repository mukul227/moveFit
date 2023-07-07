import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Picture from "../../shared/Picture";
import CustomText from "../../shared/CustomText";
import Icons from "../../../constants/Icons";
import VerticalLinearGradientButton from "../../shared/VerticalLinearGradientButton";

const NotificationsListItem = ({ item, colors, handleOnPress, onAnswerPress }) => {
  const { sender_id } = item;

  return (
    <TouchableOpacity
      onPress={() => handleOnPress(item)}
      style={[styles.item, {backgroundColor: item.type === 'sendMessage' ? colors.primaryColor : colors.notificationBox}]}
      disabled={item.type === 'followRequest' || item.type === 'sendMessage'}
    >
      <View style={{height: '100%'}}>
        {
          item.sender.photo ?
          <Picture source={item.sender.photo} style={styles.profileImage}/> :
          <Image source={require('../../../assets/Profile.png')} style={[styles.profileImage, {backgroundColor: colors.backgroundColor}]}/>
        }
      </View>
      <View style={{flex: 1}}>
        <View style={styles.itemInnerWrapper}>
          <View>
            <CustomText children={ item.text} size={14} color={ item.type !== 'sendMessage' ? colors.fontColor : 'white'} fontWeight={'600'}/>
            {
              item.type === 'workoutFinished' ?
              <CustomText children={'Send a message!'} color={colors.primaryColor} size={14} textDecorationLine={'underline'}/> :
              null
            }
          </View>
          <View style={{alignItems: 'flex-end'}}>
            {
              item.type === 'newFollow' || item.type === 'followRequest' ?
              <Icons.ArrowRight color={colors.fontColor}/> :
              null
            }
          </View>
        </View>
        {
          item.type === 'followRequest' ?
          <View style={styles.buttonsWrapper}>
              <VerticalLinearGradientButton width={'48%'} backgroundColors={colors.followButtonGradient} borderColor={colors.primaryColor} textColor={colors.fontColor} onItemPress={() => onAnswerPress('decline', sender_id)} title={'Decline'}/>
              <VerticalLinearGradientButton width={'48%'} backgroundColors={colors.followButtonGradient} textColor={'white'} onItemPress={() => onAnswerPress('accept', sender_id)} title={'Accept'}/>
          </View> :
          null
        }
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 8,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemInnerWrapper: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  }
})

export default NotificationsListItem;
