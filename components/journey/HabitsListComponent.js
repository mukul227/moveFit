import React, {useState} from 'react';
import { FlatList, StyleSheet, View} from 'react-native';
import HabitItem from "./HabitItem";
import NoHabits from "./NoHabits";
import DeleteHabitModal from "./DeleteHabitModal";
import {useDispatch} from "react-redux";
import {deleteHabitSaga} from "../../store/journey/actions";

const HabitsListComponent = ({data, colors, onCompleted, onClick}) => {
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [deletedItem, setDeletedItem] = useState(null)

    const renderListItem = ({ item }) => (
        <HabitItem item={item} colors={colors} onCompleted={(item) => onCompleted(item)} onLngPress={(item) => onLngPress(item)}/>
    );

    const onLngPress = (item) => {
        setIsModalVisible(true)
        setDeletedItem(item)
    }

    const onCancelPress = () => {
        setIsModalVisible(false)
        setDeletedItem(null)
    }

    const onDelete = () => {
        setIsModalVisible(false)
        dispatch(deleteHabitSaga(deletedItem.id))
        setDeletedItem(null)
        onClick()
    }

    return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={{flexGrow:1}}
                    data={data}
                    renderItem={renderListItem}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => {
                        return(
                            <NoHabits colors={colors}/>
                        )
                    }}
                />
                <DeleteHabitModal
                    isModalVisible={isModalVisible}
                    colors={colors}
                    handleCloseModal={() => setIsModalVisible(false)}
                    onCancel={() => onCancelPress()}
                    onDeletePress={() => onDelete()}
                />
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width:'100%',
        justifyContent:'space-between',
        marginTop:15,
        flex: 1
    }
});

export default HabitsListComponent;
