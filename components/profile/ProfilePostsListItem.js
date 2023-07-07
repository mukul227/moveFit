import React from 'react';
import {Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Picture from "../shared/Picture";
import CustomText from "../shared/CustomText";
import {useTheme} from "react-native-paper";

const {width} = Dimensions.get('window');

const ProfilePostsListItem = ({item, navigation}) => {

    const {colors} = useTheme();

    return (
        <TouchableOpacity style={[styles.container, {backgroundColor: colors.backgroundColor,}]} onPress={() => navigation.navigate('SinglePostScreen', {item})}>
          {item.thumbnail ? <Picture source={item.thumbnail} style={{width: '100%', aspectRatio: 1}}/> : null}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: (width) / 3,
        aspectRatio: 1,
        alignItems: 'center',
        padding: 1
    }
});


export default ProfilePostsListItem;
