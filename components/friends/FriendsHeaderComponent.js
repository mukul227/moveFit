import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme} from "react-native-paper";
import CustomText from "../shared/CustomText";
import Icons from "../../constants/Icons";
import Contacts from "react-native-contacts";
import {syncContactsSaga} from "../../store/friends/actions";
import {useDispatch} from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";

const FriendsHeaderComponent = ({permission = null, title= 'Friends', addBackButton = false, navigation}) => {

  const dispatch = useDispatch();
    const {colors} = useTheme();

    const redirectToContactScreen = () => {
      Contacts.getAll().then((res) => {
        dispatch(syncContactsSaga(res));
      })
    }

    return (
        <View style={[styles.headerWrapper, {justifyContent: addBackButton ? 'flex-start' : 'space-between'}]}>
          {
            addBackButton &&
            <TouchableOpacity onPress={() => navigation.goBack()} style={{padding: 10, marginLeft: -10}}>
              <AntDesign color={colors.primaryColor} name={'left'} size={25}/>
            </TouchableOpacity>
          }
            <CustomText children={title} size={22} fontWeight={'700'} color={colors.fontColor}/>
          {
            (permission === 'authorized' || permission === true) &&
            <TouchableOpacity onPress={() => redirectToContactScreen()} style={{width: 40, height: 40, paddingBottom: 5, justifyContent: 'center', alignItems: 'center'}}>
              <Icons.BlueContact color={colors.primaryColor}/>
            </TouchableOpacity>
          }
        </View>
    );
};

const styles = StyleSheet.create({
    headerWrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 8
    },
    addFriend: {
        padding: 5
    }
});

export default FriendsHeaderComponent;

