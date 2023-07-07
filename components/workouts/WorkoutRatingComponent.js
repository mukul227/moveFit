import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomText from "../shared/CustomText";
import {useTheme} from "react-native-paper";
import Icons from "../../constants/Icons";

export default function WorkoutRatingComponent({setSelectedItem}) {

    const ratings = [
        {
            id: 1,
            value: 1,
            selected: false
        },
        {
            id: 2,
            value: 2,
            selected: false
        },
        {
            id: 3,
            value: 3,
            selected: false
        },
        {
            id: 4,
            value: 4,
            selected: false
        },
        {
            id: 5,
            value: 5,
            selected: false
        }
    ]

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [rates, setSelectedRates] = useState(ratings);

    const {colors} = useTheme();

    const onChangeItem = (index, rating) => {
        setSelectedIndex(index);
        setSelectedItem(rating.id);
        setSelectedRates(rates.map((rate) => {
            if ( rate.id <= index + 1){
                rate.selected = true;
            } else {
                rate.selected = false;
            }
            return rate;
        }));
    }

    return (
        <View style={[styles.container]}>
            <CustomText size={16} style={{marginBottom: 10}} color={colors.singleProgramArrow} children={'Rate this workout'} />
            <View style={{flexDirection: 'row',}}>
                {
                    rates.map((rating, index) => {
                        return (
                            <TouchableOpacity key={rating.id.toString()} style={[styles.ratingButton, {backgroundColor: rating.selected  ? colors.primaryColor : colors.notificationBox}]} onPress={() => onChangeItem(index, rating)}>
                                <Icons.Jim2 color={rating.selected  ? '#fff' : colors.primaryColor}/>
                            </TouchableOpacity>
                        );
                    })
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        alignItems: 'center',
        marginBottom: 1,
        paddingTop: 20,
    },
    ratingButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        width: 45,
        aspectRatio: 1,
        borderRadius: 10,
        borderColor: 'lightgray',
        borderWidth: 0.2
    }
});
