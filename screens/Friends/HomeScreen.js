import React, {useEffect, useState} from 'react';
import Wrapper from "../../components/shared/Wrapper";
import {useTheme} from "react-native-paper";
import FriendsHeaderComponent from "../../components/friends/FriendsHeaderComponent";
import FriendsSearchComponent from "../../components/friends/FriendsSearchComponent";
import FriendsList from "../../components/friends/FriendsList";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsersSaga, syncContactsSaga} from "../../store/friends/actions";
import {allUsersSelector} from "../../store/friends";
import {Alert, Linking, Platform, View, PermissionsAndroid, Dimensions, BackHandler} from "react-native";
import {redirectToFriendProfileSaga} from "../../store/profile/actions";
import Contacts from 'react-native-contacts';
import Button from "../../components/shared/Button";

const windowWidth = Dimensions.get('window').width;

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const [username, setUsername] = useState('');
  const [contactPermission, setContactPermission] = useState(null);

  const onSearchFriend = (text) => {
    setUsername(text);
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])

  const onUserPress = (item) => {
    dispatch(redirectToFriendProfileSaga(item));
    // dispatch(redirectToSingleUserFromFriendsStackSaga(item.id));
  }

  useEffect(() => {
    if (Platform.OS === 'ios') {
      Contacts.checkPermission().then(permission => {
        setContactPermission(permission);
      })
    } else {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
        .then((res) => {
          console.log(res);
          setContactPermission(res)
        })
        .catch((error) => {
          console.error('Permission error: ', error);
        });
    }
  },[]);

  const syncContacts = () => {
    if (contactPermission === false) {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'Move app would like to view your contacts.',
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
        // buttonPositive: 'Please accept bare mortal',
      })
        .then((res) => {
          if (res === 'granted') {
            Contacts.getAll()
              .then((contacts) => {
                setContactPermission(res)
                Contacts.getAll().then((res) => {
                  dispatch(syncContactsSaga(res));
                })
              })
              .catch((e) => {
                console.log(e);
              });
          }
        })
        .catch((error) => {
          console.error('Permission error: ', error);
        });
    }
    if (contactPermission === 'undefined') {
      Contacts.requestPermission().then(permission => {
        setContactPermission(permission)
        if (permission === 'authorized') {
          Contacts.getAll().then((res) => {
            dispatch(syncContactsSaga(res));
          })
        }
      });
    }
    if (contactPermission === 'denied') {
      Alert.alert(
        "Contact permission required \n",
        "Please, go to Settings and enable contact permission.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Go to Settings", onPress: () => Linking.openSettings() }
        ]
      );
    }
  }

  const getUsers = (page, limit, username) => dispatch(getAllUsersSaga(page, limit, username));
  const users = useSelector(allUsersSelector());
  const {isLoading, data} = users;

  useEffect(() => {
    getUsers(1, 50, username);
  },[username])

  const onRefresh = () => dispatch(getAllUsersSaga(1, 50, username));

  const onLoadMore = () => {

    if (users.total > users.limit * users.page) {
      dispatch(getAllUsersSaga(users.page + 1, 50, username));
    }
  };

  return (
      <Wrapper paddingBottom={Platform.OS === 'ios' ? 65 : 35}  backgroundColor={colors.profileHomeBackgroundColor} statusBarColor={colors.profileHomeBackgroundColor}>
        <FriendsHeaderComponent permission={contactPermission}/>
        <FriendsSearchComponent onSearch={(text) => onSearchFriend(text)}/>
        <FriendsList colors={colors} data={data} onLoadMore={onLoadMore} onRefresh={onRefresh} refreshing={isLoading} onItemPress={(item) => onUserPress(item)}/>
        <View style={{width: windowWidth, marginTop: 35, position: 'absolute', bottom: 95, paddingHorizontal: '5%'}}>
          {
            (contactPermission === 'denied' || contactPermission === 'undefined' || contactPermission === false) &&
              <Button  addContactIcon={true} setWidth={'100%'} isActive={true} onPress={()=> syncContacts()} title={'Sync Contacts'} gradientColors={colors.primaryColorGradient} borderColor={ colors.backgroundColor} />
          }
        </View>
      </Wrapper>
  );
};

export default HomeScreen;
