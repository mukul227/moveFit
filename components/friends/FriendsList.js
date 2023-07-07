import React from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import FriendsListItem from "./FriendsListItem";

const FriendsList = ({ data, colors, onItemPress, refreshing, onRefresh, onLoadMore }) => {
    const renderListItem = ({ item }) => (
        <FriendsListItem item={item} colors={colors} onItemPress={onItemPress}/>
    );

    return (
        <View style={styles.container}>
            <View style={{flex: 1}}>
                <FlatList
                    data={data}
                    contentContainerStyle={{paddingBottom: 80}}
                    renderItem={renderListItem}
                    keyExtractor={(item, index) => item + index}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor={colors.primaryColor}
                        />
                    }
                    onEndReachedThreshold={0.3}
                    onEndReached={onLoadMore}
                />
            </View>
        </View>
    );
};

export default FriendsList;

const styles = StyleSheet.create({
    container: {
        width:'100%',
        marginTop: 8,
        flexGrow: 1
    },
});
