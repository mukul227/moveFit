import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import CustomText from "../shared/CustomText";
import WorkoutProgramListItem from "./WorkoutProgramListItem";

const SeeAllProgramsList = ({navigation, data, colors, title, onPressItem}) => {
    const renderItem = ({ item }) => (
        <WorkoutProgramListItem isFromSeeAll={true} onPressItem={onPressItem} item={item}/>
    );

    return (
        <View style={styles.container}>
            <CustomText children={title} color={colors.fontColor} size={26} fontWeight={'700'}/>
            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '90%'
    }
});

export default SeeAllProgramsList;
