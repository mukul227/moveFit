import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ProfileStatsListItem from "./ProfileStatsListItem";

const ProfileStatsList = ({ data, colors }) => {

  return (
      <View style={styles.items}>
          {data.map((item) =>
              <ProfileStatsListItem item={item} key={item.id.toString()} colors={colors}/>
              )}
      </View>
  );
};

const styles = StyleSheet.create({
    items: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 15,
        justifyContent: 'space-between'
    }
});

export default ProfileStatsList;
