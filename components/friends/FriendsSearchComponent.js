import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {useTheme} from "react-native-paper";
import Icons from "../../constants/Icons";

const FriendsSearchComponent = ({onSearch}) => {

    const {colors} = useTheme();

    return (
        <View style={[styles.headerWrapper, {borderColor: colors.searchBorderColor}]}>
                <Icons.Search color={colors.searchIconColor} />
                <TextInput
                  style={[styles.input, {color: colors.fontColor}]}
                  onChangeText={(text) => onSearch(text)}
                  placeholder={'Search for friends'}
                  placeholderTextColor={colors.seeAllColor}
                  selectionColor={colors.primaryColor}
                  // onFocus={() => onFocused()}
                  // onBlur={() => onBlurred()}
                  // ref={searchInput}
                />
        </View>
    );
};

const styles = StyleSheet.create({
    headerWrapper: {
        width: '100%',
        alignItems: 'center',
        flexDirection:'row',
        borderWidth: 1,
        borderRadius:20,
        height: 55,
        paddingLeft: 19,
        marginTop: 8
    },
    input: {
        marginLeft: 10,
        height: 55,
        width:'100%',
        fontSize: 16
    }
});


export default FriendsSearchComponent;
