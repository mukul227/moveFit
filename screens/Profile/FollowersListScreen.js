import React from 'react';
import Wrapper from "../../components/shared/Wrapper";
import {useTheme} from "react-native-paper";
import FriendsList from "../../components/friends/FriendsList";
import {useDispatch, useSelector} from "react-redux";
import {Platform, StyleSheet, TouchableOpacity, View} from "react-native";
import CustomText from "../../components/shared/CustomText";
import {
  authUserFollowListTypeSelector,
  followListTypeSelector,
  followUsersSelector,
  userArrSelector
} from "../../store/profile";
import Icons from "../../constants/Icons";
import {getAllFollowersFollowingSaga, redirectToFriendProfileSaga} from "../../store/profile/actions";
import {userDataSelector} from "../../store/friends";

const FollowersListScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { colors } = useTheme();
    const type = useSelector(followListTypeSelector());
    const users = useSelector((followUsersSelector()));
    const listType = useSelector((followListTypeSelector()));
    const listTypeAuthUser = useSelector((authUserFollowListTypeSelector()));
    const currentUser = useSelector((userDataSelector()));
    const userArr = useSelector((userArrSelector()));

    const goBack = () => navigation.goBack();
    const onUserPress = (item) => {
      dispatch(redirectToFriendProfileSaga(item));
    }
    const {isLoading, data} = users;

    const onRefresh = () => dispatch(getAllFollowersFollowingSaga(1, 10, userArr.length ? type : listTypeAuthUser, currentUser.user.id));

    const onLoadMore = () => {
        if (users.total > users.limit * users.page) {
            dispatch(getAllFollowersFollowingSaga(users.page + 1, 10, userArr.length ? type : listTypeAuthUser, currentUser.user.id));
        }
    };

    return (
        <Wrapper paddingBottom={Platform.OS === 'ios' ? 80 : 5}  backgroundColor={colors.profileHomeBackgroundColor} statusBarColor={colors.profileHomeBackgroundColor}>
            <View style={styles.backButton}>
                <TouchableOpacity onPress={goBack} style={{width:'30%'}}>
                    <Icons.ArrowLeft color={colors.fontColor}/>
                </TouchableOpacity>
                <CustomText
                  children={userArr.length ? type : listTypeAuthUser}
                  size={20}
                  color={colors.fontColor}
                  fontWeight={'800'}
                  style={{width:'40%', textAlign:'center'}}
                />
            </View>
            <FriendsList colors={colors} data={data} onLoadMore={onLoadMore} onRefresh={onRefresh} refreshing={isLoading} onItemPress={(item) => onUserPress(item)}/>
        </Wrapper>
    );
};

const styles = StyleSheet.create({
  backButton: {
    flexDirection:'row',
    marginTop:10,
    alignItems:'center'
  }
});

export default FollowersListScreen;
