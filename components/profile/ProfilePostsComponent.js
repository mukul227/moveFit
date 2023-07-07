import React from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import ProfilePostsListItem from "./ProfilePostsListItem";
import CustomText from "../shared/CustomText";

const ProfilePostsComponent = ({data, navigation, refreshing, onRefresh, onLoadMore, colors}) => {

    const renderListItem = ({item}) => (
      <ProfilePostsListItem item={item} navigation={navigation}/>
    );

    return (
        <View style={styles.container}>
            {
                data.length ?
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal={false}
                    renderItem={renderListItem}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor={colors.primaryColor}
                            progressViewOffset={30}
                        />
                    }
                    onEndReachedThreshold={0.3}
                    onEndReached={onLoadMore}
                /> :
                <View style={styles.noPost}>
                    <CustomText children={'No posts'}/>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
    },
    noPost: {
        alignItems:'center',
        marginTop: 100
    }
});


export default ProfilePostsComponent;
