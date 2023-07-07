import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Platform} from 'react-native';
import CustomText from "../shared/CustomText";
import {useTheme} from "react-native-paper";
import {useSelector} from "react-redux";
import {userDataSelector} from "../../store/friends";

const ProfileTabSelectComponent = ({setSelectedItem, selectedTab = 0}) => {

  useEffect(() => {
    setSelectedIndex(selectedTab)
  },[selectedTab])

  const userData = useSelector(userDataSelector());
    const authData = [
      {
        id: 1,
        title: 'Progress'
      },
      {
        id: 2,
        title: 'Workouts'
      },
      {
        id: 3,
        title: 'Posts'
      }
    ]

    const otherAndAndroidUserData = [
       {
        id: 1,
        title: 'Progress'
       },
      {
        id: 2,
        title: 'Workouts'
      },
      {
        id: 3,
        title: 'Posts'
      }
    ]

  const friendData = [
      {
          id: 1,
          title: 'Progress'
      },
    {
      id: 2,
      title: 'Workouts'
    },
    {
      id: 3,
      title: 'Posts'
    }
  ]

    const [selectedIndex, setSelectedIndex] = useState(0);

    const {colors} = useTheme();

    const onChangeItem = (index, item) => {
        setSelectedIndex(index);
        setSelectedItem(item.id);
    }

    // useEffect(() => {
    //   setSelectedIndex(0);
    // }, [userData]);

    return (
        <View style={styles.container}>
                { userData?.isAuthUser && Platform.OS === 'ios' ? authData.map((item ,index) =>
                    <TouchableOpacity key={item.id.toString()} style={[ styles.singleTabItem, {borderBottomColor: colors.primaryColor, borderBottomWidth: selectedIndex === index ? 1.5 : 0}]} onPress={() => onChangeItem(index, item)}>
                        <CustomText style={{paddingBottom: 4}} children={item.title} color={ selectedIndex === index ? colors.fontColor : colors.profileTabTitles} size={14}/>
                    </TouchableOpacity>
                ) : !userData?.isAuthUser ? friendData.map((item, index) =>
                  <TouchableOpacity key={item.id.toString()} style={[ styles.singleTabItem, {borderBottomColor: colors.primaryColor, borderBottomWidth: selectedIndex === index ? 1.5 : 0}]} onPress={() => onChangeItem(index, item)}>
                    <CustomText style={{paddingBottom: 4}} children={item.title} color={ selectedIndex === index ? colors.fontColor : colors.profileTabTitles} size={14}/>
                  </TouchableOpacity>
                  ) : otherAndAndroidUserData.map((item ,index) =>
                  <TouchableOpacity key={item.id.toString()} style={[ styles.singleTabItem, {borderBottomColor: colors.primaryColor, borderBottomWidth: selectedIndex === index ? 1.5 : 0}]} onPress={() => onChangeItem(index, item)}>
                    <CustomText style={{paddingBottom: 4}} children={item.title} color={ selectedIndex === index ? colors.fontColor : colors.profileTabTitles} size={14}/>
                  </TouchableOpacity>
                )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    singleTabItem: {
        width: '27%',
        alignItems: 'center',
        paddingTop:8,
    }
});


export default ProfileTabSelectComponent;
