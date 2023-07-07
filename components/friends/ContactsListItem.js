import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomText from "../shared/CustomText";
import Picture from "../shared/Picture";
import Icons from "../../constants/Icons";
import Button from "../shared/Button";
import LinearGradient from "react-native-linear-gradient";
import {useTheme} from "react-native-paper";
import {friendsService} from "../../services/FriendsService";
import {useDispatch} from "react-redux";
import Contacts from "react-native-contacts";
import {followFromContactsSaga, syncContactsSaga} from "../../store/friends/actions";

const ContactsListItem = ({item, onItemPress}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const onFollowPress = async (id) => {
      Contacts.getAll().then((res) => {
        dispatch(followFromContactsSaga({id, contacts: res}))
      })
  }

  return (
    <View
      style={[styles.item, {backgroundColor: colors.statsBoxColor}]}
    >
      <View style={styles.photoView}>
        {
          item?.photo ?
            <Picture source={item.photo} style={styles.profileImage}/> :
            <Icons.ProfileIcon width={50} height={50} color={colors.primaryColor}/>
        }
      </View>
      <View style={styles.infoView}>
        <CustomText children={`${item.first_name} ${item.last_name}`} color={colors.fontColor} size={18}
                    fontWeight={'600'}/>

        <CustomText children={`${item.completedWorkouts ? item.completedWorkouts : 0} Workouts Completed`}
                    style={{marginBottom: 4}} color={colors.friendCompletedWorkoutColor} size={14}/>
      </View>
      <View style={styles.arrowView}>
        <TouchableOpacity
          onPress={() => onFollowPress(item.id)}
          style={[
            {width: '100%', justifyContent: 'center', alignItems: 'center'}
          ]}
        >
          <LinearGradient start={{x: 1, y: 0}} end={{x: 0, y: 1}} colors={colors.primaryColorGradient}
                          style={{width: '100%', position: 'absolute', height: 40, borderRadius: 13}}/>
          <CustomText size={16} children={'Follow'} fontWeight={'500'}
                      color={'white'}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '100%',
    marginBottom: 8,
    borderRadius: 20,
    paddingVertical: 20,
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  photoView: {
    marginRight: 8,
    height: '100%',
    alignItems: 'flex-start'
  },
  arrowView: {
    paddingRight: 10,
    width: 120
  },
  infoView: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default ContactsListItem;
