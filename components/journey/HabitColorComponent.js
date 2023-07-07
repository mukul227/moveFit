import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icons from "../../constants/Icons";

const HabitColorComponent = ({colorOptions, onPress, isSelected, onOpenPicker, colors }) => {
    const windowWidth = Dimensions.get('window').width;

    return (
        <View style={styles.container}>
            {
                colorOptions?.map((color, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => onPress(color)}
                            style={[styles.item, {backgroundColor: color, width:(windowWidth-96)/7}]}>
                            {
                                isSelected === color ?
                                    <Icons.FilledColor width={16} color={'#FFFFFF'}/>
                                    : null
                            }
                        </TouchableOpacity>
                    )
                })
            }
            <TouchableOpacity
                onPress={() => onOpenPicker()}
                style={[styles.item, {backgroundColor: colors.statsBoxColor,borderColor:colors.primaryColor,borderWidth:1, width:(windowWidth-96)/7}]}>
                <Icons.plus color={colors.primaryColor}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-start',
        marginTop:10,
        marginBottom:30
    },
    item: {
        aspectRatio:1,
        borderRadius: 100,
        alignItems:'center',
        justifyContent:'center',
        marginRight:10,
    }
});

export default HabitColorComponent;
