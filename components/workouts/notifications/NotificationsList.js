import React from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import NotificationsListItem from "./NotificationsListItem";
import CustomText from "../../shared/CustomText";

const NotificationsList = ({ notifications, colors, onNotificationPress, onAnswerPress, refreshing, onRefresh, onLoadMore }) => {
  const renderListItem = ({ item }) => (
    <NotificationsListItem item={item} colors={colors} handleOnPress={onNotificationPress} onAnswerPress={onAnswerPress}/>
  );

  return (
    <View style={{flex: 1}}>
      {
        notifications?.length === 0 ?
          <CustomText children={'Sorry, no notifications yet.'} color={colors.fontColor} size={15}/> :
          <FlatList
            data={notifications}
            renderItem={renderListItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={colors.primaryColor}
              />
            }
            refreshing={refreshing}
            onEndReachedThreshold={0.3}
            onEndReached={onLoadMore}
            style={{flex: 1}}
          />
      }
    </View>
  );
};

export default NotificationsList;
