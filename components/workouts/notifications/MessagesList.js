import React from 'react';
import {FlatList} from 'react-native';
import MessagesListItem from "./MessagesListItem";

const MessagesList = ({ messages, colors, onMessagePress }) => {
  const renderListItem = ({ item }) => (
    <MessagesListItem item={item} colors={colors} messages={messages} onMessagePress={onMessagePress}/>
  );

  return (
    <FlatList
      data={messages}
      renderItem={renderListItem}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default MessagesList;