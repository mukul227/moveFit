import React, {useState} from 'react';
import Wrapper from "../../components/shared/Wrapper";
import CustomHeader from "../../components/shared/CustomHeader";
import Picture from "../../components/shared/Picture";
import {ScrollView, StyleSheet, View} from "react-native";
import CustomText from "../../components/shared/CustomText";
import moment from "moment";
import {useTheme} from "react-native-paper";
import DeletePostModal from "../../components/profile/DeletePostModal";
import {useDispatch, useSelector} from "react-redux";
import {deletePostSaga, reportPostSaga} from "../../store/profile/actions";
import {userDataSelector} from "../../store/friends";

const SinglePostScreen = ({route, navigation }) => {

  const dispatch = useDispatch();
    const {item} = route.params;
    const {colors} = useTheme();
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const isAuthUser = useSelector(userDataSelector());

    const onActionPressFn = () => {
      if (isAuthUser.isAuthUser) {
        dispatch(deletePostSaga(item.id));
        setIsDeleteModalVisible(false);
      } else {
        dispatch(reportPostSaga({post_id: item.id}));
      }
    }

    return (
        <Wrapper>
            <CustomHeader onRightPress={() => setIsDeleteModalVisible(true)} showRightIcon={true} title={item?.user?.username} navigation={navigation}/>
            <Picture style={styles.picture} source={item?.image}/>
            <View style={styles.titleContainer}>
                <CustomText children={`${item?.user?.first_name} ${item?.user?.last_name}`} fontWeight={'600'} size={16} color={colors.singlePostDescription}/>
                <CustomText children={moment(item?.createdAt).format('MMM DD, YYYY')} fontWeight={'600'} size={16} color={colors.singlePostDescription}/>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <CustomText children={item?.description} size={16} color={colors.singlePostDescription}/>
            </ScrollView>
          <DeletePostModal isAuthUser={isAuthUser?.isAuthUser} onActionPress={() => onActionPressFn()} isVisible={isDeleteModalVisible} onClose={() => setIsDeleteModalVisible(false)}/>
        </Wrapper>
    );
};

const styles = StyleSheet.create({
    picture: {
        width: '100%',
        aspectRatio: 1/1.2,
        borderRadius: 20,
        marginTop: 10
    },
    titleContainer: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 10,
        justifyContent: 'space-between'
    }
});

export default SinglePostScreen;
