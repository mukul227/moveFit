import React from 'react';
import {TouchableOpacity, StyleSheet, Dimensions, Image, View} from 'react-native';
import CustomText from "./CustomText";
import {useDispatch, useSelector} from "react-redux";
import {useTheme} from "react-native-paper";
import Icons from "../../constants/Icons";
import {onPressNotificationSaga, setPushNotification} from "../../store/notifications/actions";
import {pushNotificationSelector} from "../../store/notifications";

const windowWidth = Dimensions.get('window').width;

const InAppNotification = ({notification}) => {

  const { colors } = useTheme();

  const dispatch = useDispatch();

  const pushNotification = useSelector(pushNotificationSelector());

  const handleNotifications = (data) => dispatch(setPushNotification(data));

  const onPressNotification = () => {
    dispatch(onPressNotificationSaga(notification));
  }

  return (
    <TouchableOpacity
      onPress={() => onPressNotification()}
      style={[styles.wrapper, {backgroundColor: colors.innAppNotificationBackground}]}>
      <View style={{width: '20%', paddingVertical: 10}}>
        {
          pushNotification.data.userPhoto ?
            <Image source={{uri: pushNotification.data.userPhoto}} style={styles.userImage} /> :
              <Icons.ProfileIcon width={70} height={70} color={colors.primaryColor}/>
        }
      </View>
      <View style={styles.textWrapper}>
        <CustomText children={pushNotification.notification.title} size={16} color={colors.primaryColor} style={{flexWrap: 'wrap'}} fontWeight={'800'}/>
        <CustomText children={pushNotification.notification.body} color={colors.primaryColor} style={{flexWrap: 'wrap'}}/>
      </View>
      <TouchableOpacity
        onPress={() => handleNotifications({
        isVisible: false,
        data: {},
        notification: {}
      })}
        style={styles.closeButton}>
        <Icons.Close color={colors.primaryColor} width={25}/>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
export default InAppNotification;

const styles = StyleSheet.create({
  wrapper: {
    width: windowWidth - 34,
    position: 'absolute',
    marginLeft: 17,
    height: 'auto',
    top: 50,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,
  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 100,
    resizeMode: 'cover'
  },
  closeButton: {
    position:'absolute',
    top: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    right: 10,
    borderRadius: 100,
    width: 30,
    height: 30
  },
  textWrapper: {
    justifyContent: 'space-between',
    width: '80%',
    paddingHorizontal: 25,
    paddingVertical: 15,
    height: '100%'
  }
});
