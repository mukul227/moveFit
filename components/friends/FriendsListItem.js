import React,{memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomText from "../shared/CustomText";
import Picture from "../shared/Picture";
import Icons from "../../constants/Icons";

const FriendsListItem = ({ item, colors, onItemPress }) => {
    const { isFriend, friendStatus } = item;

    const showUserDetails = () => (isFriend && friendStatus) || item.public;

    return (
        <TouchableOpacity
            onPress={() => onItemPress(item)}
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
                <CustomText children={`${item.first_name} ${item.last_name}`} color={colors.fontColor} size={18} fontWeight={'600'}/>
                {
                    showUserDetails() ?
                    <View>
                        <CustomText children={`${item.completed_workouts ? item.completed_workouts : 0} Workouts Completed`} style={{marginBottom: 4}} color={colors.friendCompletedWorkoutColor} size={14}/>
                    </View> :
                    null
                }
            </View>
            <View style={styles.arrowView}>
                <Icons.ArrowRight height={28} width={28} color={colors.fontColor} />
            </View>
        </TouchableOpacity>
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
        alignItems:'center'
    },
    profileImage: {
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    photoView: {
        marginRight: 8,
        height:'100%',
        alignItems:'flex-start'
    },
    arrowView: {
        paddingRight: 16,
        justifyContent:'center'
    },
    infoView: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default memo(FriendsListItem);
