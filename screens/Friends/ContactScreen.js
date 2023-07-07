import React, {useState} from 'react';
import Wrapper from "../../components/shared/Wrapper";
import {useTheme} from "react-native-paper";
import FriendsHeaderComponent from "../../components/friends/FriendsHeaderComponent";
import {useDispatch, useSelector} from "react-redux";
import {allUsersSelector, contactsSelector} from "../../store/friends";
import {useFocusEffect} from "@react-navigation/native";
import {Alert, Linking, Platform, StyleSheet, View} from "react-native";
import ContactsList from "../../components/friends/ContactsList";
import CustomText from "../../components/shared/CustomText";

const ContactScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const [data, setData] = useState([]);

  const contacts = useSelector(contactsSelector());

  useFocusEffect(
    React.useCallback(() => {
        setData(contacts)
    }, [contacts])
  );

  return (
      <Wrapper paddingBottom={Platform.OS === 'ios' ? 95 : 52}  backgroundColor={colors.profileHomeBackgroundColor} statusBarColor={colors.profileHomeBackgroundColor}>
        <FriendsHeaderComponent addBackButton={true} title={'Sync Contacts'} navigation={navigation}/>
        <ContactsList colors={colors} data={data} />
        <CustomText style={styles.bottomInfoText} size={12} color={'gray'} children={'Contact Sync is country code sensitive (i.e. +1)'}/>
      </Wrapper>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  bottomInfoText: {
    width: '100%',
    textAlign: 'center',
    marginBottom: 10
  }
});

