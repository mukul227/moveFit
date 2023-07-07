import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ContactsListItem from "./ContactsListItem";
import CustomText from "../shared/CustomText";

const ContactsList = ({ data, colors, onItemPress, refreshing, onRefresh, onLoadMore }) => {
    const renderListItem = ({ item }) => (
        <ContactsListItem item={item} colors={colors} onItemPress={onItemPress}/>
    );

    return (
        <View style={styles.container}>
            <View style={{flex: 1}}>
                {data?.length > 0 ?
                    <FlatList
                        data={data}
                        contentContainerStyle={{paddingBottom: 60}}
                        renderItem={renderListItem}
                        keyExtractor={item => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                :
                    <View  style={styles.noContacts} >
                        <CustomText children={'No Contacts Available'} color={colors.fontColor} size={18}/>
                        <CustomText children={"When your contacts are on Move, you'll see them here"} color={colors.fontColor} size={18} style={{textAlign:'center', marginTop: 20}}/>
                    </View>}

            </View>
        </View>
    );
};

export default ContactsList;

const styles = StyleSheet.create({
    container: {
        width:'100%',
        marginTop: 8,
        flexGrow: 1
    },
    noContacts: {
        flexGrow: 1,
        alignItems:'center',
        justifyContent:'center'
    }
});
